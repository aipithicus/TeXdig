import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  OCCURRENCE_CASE_COUNT,
  namedOccurrenceRows,
  occurrenceRows,
} from "../scripts/conformance/families/occurrence-batch.ts";
import {
  decodeBytes,
  decodeDeclaredEncoding,
  digestRows,
  encodeBytes,
  encodeDeclaredEncoding,
  parseDigest,
  parseFixture,
  row,
} from "../scripts/conformance/format.ts";
import {
  occurrenceOrderOracle,
  occurrenceRebaseOracle,
  type OracleOccurrence,
} from "../scripts/conformance/occurrence-oracle.ts";
import {
  OccurrenceBatchBuilder,
  SourceSlice,
  SourceSnapshot,
  byteOffset,
  byteSpan,
  type OccurrenceBatch,
  type OccurrenceOrder,
  type OccurrenceRecord,
} from "../packages/texdig/src/index.js";

const fixturePath = resolve(
  import.meta.dirname,
  "..",
  "fixtures",
  "conformance",
  "occurrence",
  "batch.txt",
);
const TOKEN = "[A-Za-z0-9][A-Za-z0-9._+-]*";
const CLAIM_PATTERN = new RegExp(
  `^(\\d+)-(\\d+)/(${TOKEN})/(${TOKEN})@(${TOKEN})/(-?(?:0|[1-9]\\d*))/(?:(${TOKEN})|-)$`,
);

function fixture(): ReturnType<typeof parseFixture> {
  return parseFixture(readFileSync(fixturePath, "utf8"));
}

function header(parsed: ReturnType<typeof parseFixture>, name: string): readonly string[] {
  const values = parsed.headers.get(name);
  if (values === undefined) throw new Error(`missing ${name} header`);
  return values;
}

function parseClaims(field: string): readonly OracleOccurrence[] {
  if (field === "C:-") return [];
  if (!field.startsWith("C:")) throw new SyntaxError(`invalid occurrence claim field: ${field}`);
  return field
    .slice(2)
    .split(",")
    .map((token): OracleOccurrence => {
      const match = CLAIM_PATTERN.exec(token);
      if (match === null) throw new SyntaxError(`invalid occurrence claim token: ${token}`);
      const required: Omit<OracleOccurrence, "ruleId"> = {
        start: Number(match[1]),
        end: Number(match[2]),
        kind: match[3] ?? "",
        producer: { id: match[4] ?? "", version: match[5] ?? "" },
        priority: Number(match[6]),
      };
      const ruleId = match[7];
      return ruleId === undefined ? required : { ...required, ruleId };
    });
}

function ordinalList(records: readonly OccurrenceRecord[]): string {
  return records.length === 0 ? "-" : records.map((record) => record.ordinal).join(".");
}

function claimToken(record: OccurrenceRecord): string {
  return `${String(record.span.start)}-${String(record.span.end)}/${record.kind}/${record.producer.id}@${record.producer.version}/${String(record.priority)}/${record.ruleId ?? "-"}`;
}

function orderedOrdinals(batch: OccurrenceBatch, order: OccurrenceOrder): string {
  return ordinalList(batch.ordered(order));
}

function querySignatures(batch: OccurrenceBatch): string {
  const signatures: string[] = [];
  for (let start = 0; start <= batch.snapshot.byteLength; start++) {
    for (let end = start; end <= batch.snapshot.byteLength; end++) {
      const query = byteSpan(start, end);
      signatures.push(
        `${ordinalList(batch.lookup.findIntersecting(query, "geometry"))}/${ordinalList(batch.lookup.findIntersecting(query, "priority-then-geometry"))}`,
      );
    }
  }
  return signatures.join(",");
}

function positionSignatures(batch: OccurrenceBatch): string {
  const signatures: string[] = [];
  for (let position = 0; position <= batch.snapshot.byteLength; position++) {
    const offset = byteOffset(position);
    signatures.push(
      `${ordinalList(batch.lookup.findContaining(offset, "geometry"))}/${ordinalList(batch.lookup.findContaining(offset, "priority-then-geometry"))}`,
    );
  }
  return signatures.join(",");
}

function buildBatch(source: SourceSnapshot, claims: readonly OracleOccurrence[]): OccurrenceBatch {
  const builder = new OccurrenceBatchBuilder(source);
  for (const claim of claims) {
    builder.add({
      snapshot: source,
      span: byteSpan(claim.start, claim.end),
      kind: claim.kind,
      producer: claim.producer,
      priority: claim.priority,
      ...(claim.ruleId === undefined ? {} : { ruleId: claim.ruleId }),
    });
  }
  return builder.freeze();
}

function sameStringTable(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function sameProducerTable(
  left: OccurrenceBatch["producerTable"],
  right: OccurrenceBatch["producerTable"],
): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function requireBatchMatches(
  batch: OccurrenceBatch,
  snapshot: SourceSnapshot,
  claims: readonly OracleOccurrence[],
  tables: OccurrenceBatch,
  law: string,
): void {
  if (
    batch.snapshot !== snapshot ||
    batch.count !== claims.length ||
    !sameStringTable(batch.kindTable, tables.kindTable) ||
    !sameProducerTable(batch.producerTable, tables.producerTable) ||
    !sameStringTable(batch.ruleIdTable, tables.ruleIdTable)
  ) {
    throw new Error(`${law} changed the collection basis or interned metadata`);
  }
  for (let ordinal = 0; ordinal < claims.length; ordinal++) {
    const expected = claims[ordinal];
    const actual = batch.at(ordinal);
    if (
      expected === undefined ||
      actual.ordinal !== ordinal ||
      actual.snapshot !== snapshot ||
      actual.span.start !== expected.start ||
      actual.span.end !== expected.end ||
      actual.kind !== expected.kind ||
      actual.producer.id !== expected.producer.id ||
      actual.producer.version !== expected.producer.version ||
      actual.priority !== expected.priority ||
      actual.ruleId !== expected.ruleId
    ) {
      throw new Error(`${law} changed occurrence ${String(ordinal)}`);
    }
  }
  const orders: readonly OccurrenceOrder[] = ["geometry", "priority-then-geometry"];
  for (const order of orders) {
    const actual = batch.ordered(order).map((record) => record.ordinal);
    const expected = occurrenceOrderOracle(claims, order);
    if (
      actual.length !== expected.length ||
      actual.some((value, index) => value !== expected[index])
    ) {
      throw new Error(`${law} changed ${order} order`);
    }
  }
}

function checkRebaseLaw(
  bytes: Uint8Array,
  declaredEncoding: string,
  claims: readonly OracleOccurrence[],
): void {
  const rootBytes = new Uint8Array(bytes.length + 3);
  rootBytes[0] = 0x41;
  rootBytes[1] = 0x42;
  rootBytes.set(bytes, 2);
  rootBytes[rootBytes.length - 1] = 0x43;
  const root = new SourceSnapshot(rootBytes, {
    sourceId: "occurrence-rebase-root.tex",
    revision: 0,
    declaredEncoding,
  });
  const outer = SourceSlice.create(root, byteSpan(1, root.byteLength - 1));
  const inner = SourceSlice.create(outer.child, byteSpan(1, outer.child.byteLength));
  const direct = SourceSlice.create(root, byteSpan(2, root.byteLength - 1));
  const local = buildBatch(inner.child, claims);
  const inOuter = local.toParent(inner);
  const inRoot = inOuter.toParent(outer);
  const directLocal = buildBatch(direct.child, claims);
  const directRoot = directLocal.toParent(direct);
  const shiftedOne = occurrenceRebaseOracle(claims, 1);
  const shiftedTwo = occurrenceRebaseOracle(claims, 2);

  requireBatchMatches(inOuter, outer.child, shiftedOne, local, "O6 inner-to-outer");
  requireBatchMatches(inRoot, root, shiftedTwo, local, "O6 nested-to-root");
  requireBatchMatches(directRoot, root, shiftedTwo, local, "O6 direct-to-root");
  requireBatchMatches(
    inRoot.toChild(outer).toChild(inner),
    inner.child,
    claims,
    local,
    "O6 round trip",
  );

  const outsideBuilder = new OccurrenceBatchBuilder(root);
  outsideBuilder.add({
    snapshot: root,
    span: byteSpan(0, 1),
    kind: "outside",
    producer: { id: "rebase-oracle", version: "1" },
  });
  try {
    outsideBuilder.freeze().toChild(outer);
  } catch (error: unknown) {
    if (error instanceof RangeError) return;
    throw error;
  }
  throw new Error("O6 downward rebase accepted an outside occurrence");
}

function sourceRow(expected: string): string {
  const fields = expected.split(" ; ");
  const bytes = decodeBytes(fields[0] ?? "");
  const declaredEncoding = decodeDeclaredEncoding(fields[1] ?? "");
  const claims = parseClaims(fields[2] ?? "");
  const source = new SourceSnapshot(bytes, {
    sourceId: "occurrence-conformance.tex",
    revision: 0,
    declaredEncoding,
  });
  const batch = buildBatch(source, claims);
  const records = [...batch];
  for (let ordinal = 0; ordinal < records.length; ordinal++) {
    const record = records[ordinal];
    if (record?.ordinal !== ordinal || record.snapshot !== source) {
      throw new Error(`O1 discovery identity disagreement at ordinal ${String(ordinal)}`);
    }
  }
  const claimField = records.length === 0 ? "C:-" : `C:${records.map(claimToken).join(",")}`;
  const kindField = batch.kindTable.length === 0 ? "K:-" : `K:${batch.kindTable.join(",")}`;
  const producers = batch.producerTable.map((producer) => `${producer.id}@${producer.version}`);
  const producerField = producers.length === 0 ? "D:-" : `D:${producers.join(",")}`;
  const ruleField = batch.ruleIdTable.length === 0 ? "R:-" : `R:${batch.ruleIdTable.join(",")}`;
  checkRebaseLaw(bytes, declaredEncoding, claims);
  return row([
    encodeBytes(bytes),
    encodeDeclaredEncoding(declaredEncoding),
    claimField,
    kindField,
    producerField,
    ruleField,
    `G:${orderedOrdinals(batch, "geometry")}`,
    `Y:${orderedOrdinals(batch, "priority-then-geometry")}`,
    `X:${querySignatures(batch)}`,
    `P:${positionSignatures(batch)}`,
  ]);
}

function* checkedOccurrenceRows(): Generator<string> {
  for (const expected of occurrenceRows()) {
    const actual = sourceRow(expected);
    if (actual !== expected) {
      throw new Error(`fixture/source disagreement\nfixture: ${expected}\nsource:  ${actual}`);
    }
    yield expected;
  }
}

describe("occurrence conformance", () => {
  it("matches every explicit preservation, interning, ordering, and lookup row", () => {
    const parsed = fixture();
    expect(header(parsed, "family")).toEqual(["occurrence/batch"]);
    expect(header(parsed, "laws")).toEqual(["O1 O2 O3 O4 O5 O6"]);
    expect(parsed.rowTexts).toEqual([...namedOccurrenceRows()]);
    expect(parsed.rows).toHaveLength(4);
    for (const expected of parsed.rowTexts) expect(sourceRow(expected)).toBe(expected);
  });

  it("re-enumerates the 500-case brute-force lookup digest", () => {
    const parsed = fixture();
    const expected = parseDigest(header(parsed, "digest")[0] ?? "");
    expect(expected.tier).toBe("default");
    expect(expected.count).toBe(OCCURRENCE_CASE_COUNT);
    expect(digestRows(checkedOccurrenceRows())).toEqual({
      value: expected.value,
      count: expected.count,
    });
  });
});
