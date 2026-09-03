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
import type { OracleOccurrence } from "../scripts/conformance/occurrence-oracle.ts";
import {
  OccurrenceBatchBuilder,
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
  const batch = builder.freeze();
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
    expect(header(parsed, "laws")).toEqual(["O1 O2 O3 O4 O5"]);
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
