import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  SELECTION_CASE_COUNT,
  namedSelectionRows,
  selectionRows,
} from "../scripts/conformance/families/occurrence-selection.ts";
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
  OccurrenceSelection,
  SourceSnapshot,
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
  "selection.txt",
);
const TOKEN = "[A-Za-z0-9][A-Za-z0-9._+-]*";
const CLAIM_PATTERN = new RegExp(
  `^(\\d+)-(\\d+)/(${TOKEN})/(${TOKEN})@(${TOKEN})/(-?(?:0|[1-9]\\d*))/(?:(${TOKEN})|-)$`,
);
const ORDINAL_LIST = /^(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*))*$/;

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

function parseOrdinals(field: string, prefix: string): readonly number[] {
  if (field === `${prefix}:-`) return [];
  const marker = `${prefix}:`;
  if (!field.startsWith(marker)) throw new SyntaxError(`invalid ${prefix} ordinal field: ${field}`);
  const value = field.slice(marker.length);
  if (!ORDINAL_LIST.test(value)) throw new SyntaxError(`invalid ${prefix} ordinal list: ${field}`);
  return value.split(".").map(Number);
}

function ordinalField(prefix: string, ordinals: readonly number[]): string {
  return `${prefix}:${ordinals.length === 0 ? "-" : ordinals.join(".")}`;
}

function claimToken(record: OccurrenceRecord): string {
  return `${String(record.span.start)}-${String(record.span.end)}/${record.kind}/${record.producer.id}@${record.producer.version}/${String(record.priority)}/${record.ruleId ?? "-"}`;
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

function selectionOrdinals(selection: OccurrenceSelection, law: string): readonly number[] {
  const ordinals = [...selection];
  if (ordinals.length !== selection.count) {
    throw new Error(`${law} count disagrees with enumeration`);
  }
  let previous = -1;
  for (const ordinal of ordinals) {
    if (ordinal <= previous || !selection.contains(ordinal)) {
      throw new Error(`${law} enumeration is not a canonical ascending set`);
    }
    previous = ordinal;
  }
  for (let ordinal = 0; ordinal < selection.batch.count; ordinal++) {
    if (selection.contains(ordinal) !== ordinals.includes(ordinal)) {
      throw new Error(`${law} membership disagrees with enumeration`);
    }
  }
  return ordinals;
}

function selectionField(prefix: string, selection: OccurrenceSelection, law: string): string {
  return ordinalField(prefix, selectionOrdinals(selection, law));
}

function recordField(
  prefix: string,
  selection: OccurrenceSelection,
  order: OccurrenceOrder,
): string {
  const records = selection.records(order);
  if (records.some((record) => record.snapshot !== selection.batch.snapshot)) {
    throw new Error("SEL4 record projection changed snapshot identity");
  }
  return ordinalField(
    prefix,
    records.map((record) => record.ordinal),
  );
}

function coverageField(selection: OccurrenceSelection): string {
  const coverage = selection.coverage();
  if (coverage.snapshot !== selection.batch.snapshot) {
    throw new Error("SEL6 coverage changed snapshot object");
  }
  const spans = Array.from(coverage, (member) => `[${String(member.start)},${String(member.end)})`);
  return `V:${spans.length === 0 ? "-" : spans.join(",")}`;
}

function requireSame(left: OccurrenceSelection, right: OccurrenceSelection, law: string): void {
  if (!left.equals(right)) throw new Error(`${law} selection disagreement`);
}

function requireError(operation: () => unknown, law: string): void {
  try {
    operation();
  } catch (error: unknown) {
    if (error instanceof Error) return;
    throw error;
  }
  throw new Error(`${law} did not reject the invalid operation`);
}

function checkAlgebraLaws(left: OccurrenceSelection, right: OccurrenceSelection): void {
  const none = OccurrenceSelection.none(left.batch);
  const all = OccurrenceSelection.all(left.batch);
  requireSame(left.union(none), left, "SEL3 union-none identity");
  requireSame(left.intersect(all), left, "SEL3 intersect-all identity");
  requireSame(left.union(left), left, "SEL3 union idempotence");
  requireSame(left.intersect(left), left, "SEL3 intersection idempotence");
  requireSame(left.union(right), right.union(left), "SEL3 union commutativity");
  requireSame(left.intersect(right), right.intersect(left), "SEL3 intersection commutativity");
  requireSame(left.union(left.intersect(right)), left, "SEL3 union absorption");
  requireSame(left.intersect(left.union(right)), left, "SEL3 intersection absorption");
  requireSame(left.subtract(left), none, "SEL3 self subtraction");
  requireSame(left.union(left.complement()), all, "SEL3 complement union");
  requireSame(left.intersect(left.complement()), none, "SEL3 complement intersection");
  requireSame(left.complement().complement(), left, "SEL3 double complement");
  requireSame(all.subtract(left), left.complement(), "SEL3 all subtraction");
}

function checkExactBatchLaw(
  source: SourceSnapshot,
  claims: readonly OracleOccurrence[],
  leftRaw: readonly number[],
  left: OccurrenceSelection,
): void {
  const copy = buildBatch(source, claims);
  const foreign = OccurrenceSelection.from(copy, leftRaw);
  if (copy === left.batch) throw new Error("SEL5 failed to construct a distinct batch");
  if (left.equals(foreign)) throw new Error("SEL5 distinct batch selections compared equal");
  requireError(() => left.union(foreign), "SEL5 union");
  requireError(() => left.intersect(foreign), "SEL5 intersection");
  requireError(() => left.subtract(foreign), "SEL5 subtraction");
  if (!left.coverage().equals(foreign.coverage())) {
    throw new Error("SEL6 value-identical batch coverage disagrees");
  }
}

function sourceRow(expected: string): string {
  const fields = expected.split(" ; ");
  if (fields.length !== 18) throw new SyntaxError(`invalid selection row: ${expected}`);
  const bytes = decodeBytes(fields[0] ?? "");
  const declaredEncoding = decodeDeclaredEncoding(fields[1] ?? "");
  const claims = parseClaims(fields[2] ?? "");
  const leftRaw = parseOrdinals(fields[3] ?? "", "A");
  const rightRaw = parseOrdinals(fields[4] ?? "", "B");
  const source = new SourceSnapshot(bytes, {
    sourceId: "selection-conformance.tex",
    revision: 0,
    declaredEncoding,
  });
  const batch = buildBatch(source, claims);
  const left = OccurrenceSelection.from(batch, leftRaw);
  const right = OccurrenceSelection.from(batch, rightRaw);
  const predicate = OccurrenceSelection.fromPredicate(batch, (record) => record.priority >= 0);
  const union = left.union(right);
  const intersection = left.intersect(right);
  const subtraction = left.subtract(right);
  const complement = left.complement();
  for (const [name, selection] of [
    ["left", left],
    ["right", right],
    ["predicate", predicate],
    ["union", union],
    ["intersection", intersection],
    ["subtraction", subtraction],
    ["complement", complement],
  ]) {
    if (typeof name !== "string" || !(selection instanceof OccurrenceSelection)) {
      throw new Error("invalid SEL1 conformance selection table");
    }
    selectionOrdinals(selection, `SEL1 ${name}`);
  }
  checkAlgebraLaws(left, right);
  checkExactBatchLaw(source, claims, leftRaw, left);
  requireError(() => OccurrenceSelection.from(batch, [batch.count]), "SEL1 construction");
  requireError(() => left.contains(-1), "SEL1 negative membership");
  requireError(() => left.contains(batch.count), "SEL1 upper membership");

  const records = [...batch];
  const claimField = records.length === 0 ? "C:-" : `C:${records.map(claimToken).join(",")}`;
  const membership = Array.from({ length: batch.count }, (_, ordinal) =>
    left.contains(ordinal) ? "1" : "0",
  ).join("");
  return row([
    encodeBytes(bytes),
    encodeDeclaredEncoding(declaredEncoding),
    claimField,
    ordinalField("A", leftRaw),
    ordinalField("B", rightRaw),
    selectionField("N", left, "SEL1 left"),
    selectionField("M", right, "SEL1 right"),
    selectionField("F", predicate, "SEL1 predicate"),
    selectionField("U", union, "SEL2 union"),
    selectionField("I", intersection, "SEL2 intersection"),
    selectionField("S", subtraction, "SEL2 subtraction"),
    selectionField("X", complement, "SEL3 complement"),
    `K:${String(left.count)}`,
    `P:${membership.length === 0 ? "-" : membership}`,
    recordField("G", left, "geometry"),
    recordField("Y", left, "priority-then-geometry"),
    coverageField(left),
    `Q:${left.equals(right) ? "1" : "0"}`,
  ]);
}

function* checkedSelectionRows(): Generator<string> {
  for (const expected of selectionRows()) {
    const actual = sourceRow(expected);
    if (actual !== expected) {
      throw new Error(`fixture/source disagreement\nfixture: ${expected}\nsource:  ${actual}`);
    }
    yield expected;
  }
}

describe("occurrence-selection conformance", () => {
  it("matches every explicit ordinal, ordering, identity, and coverage row", () => {
    const parsed = fixture();
    expect(header(parsed, "family")).toEqual(["occurrence/selection"]);
    expect(header(parsed, "laws")).toEqual(["SEL1 SEL2 SEL3 SEL4 SEL5 SEL6"]);
    expect(parsed.rowTexts).toEqual([...namedSelectionRows()]);
    expect(parsed.rows).toHaveLength(5);
    for (const expected of parsed.rowTexts) expect(sourceRow(expected)).toBe(expected);
  });

  it("re-enumerates the 500-case independent Boolean-array digest", () => {
    const parsed = fixture();
    const expected = parseDigest(header(parsed, "digest")[0] ?? "");
    expect(expected.tier).toBe("default");
    expect(expected.count).toBe(SELECTION_CASE_COUNT);
    expect(digestRows(checkedSelectionRows())).toEqual({
      value: expected.value,
      count: expected.count,
    });
  });
});
