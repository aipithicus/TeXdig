import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  SPAN_SET_CASE_COUNT,
  namedSpanSetRows,
  spanSetRows,
} from "../scripts/conformance/families/span-set-algebra.ts";
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
import type { OracleInterval } from "../scripts/conformance/span-set-oracle.ts";
import {
  SourceSlice,
  SourceSnapshot,
  SpanSet,
  byteOffset,
  byteSpan,
  type ByteSpan,
} from "../packages/texdig/src/index.js";

const fixturePath = resolve(
  import.meta.dirname,
  "..",
  "fixtures",
  "conformance",
  "span-set",
  "algebra.txt",
);
const SPAN_PATTERN = /\[(\d+),(\d+)\)/g;

function fixture(): ReturnType<typeof parseFixture> {
  return parseFixture(readFileSync(fixturePath, "utf8"));
}

function header(parsed: ReturnType<typeof parseFixture>, name: string): readonly string[] {
  const values = parsed.headers.get(name);
  if (values === undefined) throw new Error(`missing ${name} header`);
  return values;
}

function parseIntervals(field: string, prefix: string): readonly OracleInterval[] {
  if (field === `${prefix}:-`) return [];
  const marker = `${prefix}:`;
  if (!field.startsWith(marker)) throw new SyntaxError(`invalid ${prefix} span field: ${field}`);
  const value = field.slice(marker.length);
  const matches = [...value.matchAll(SPAN_PATTERN)];
  if (matches.length === 0 || matches.map((match) => match[0]).join(",") !== value) {
    throw new SyntaxError(`invalid ${prefix} span list: ${field}`);
  }
  return matches.map((match) => ({ start: Number(match[1]), end: Number(match[2]) }));
}

function parseWindow(field: string): ByteSpan {
  const match = /^W:\[(\d+),(\d+)\)$/.exec(field);
  if (match === null) throw new SyntaxError(`invalid span-set window: ${field}`);
  return byteSpan(Number(match[1]), Number(match[2]));
}

function intervalField(prefix: string, intervals: Iterable<OracleInterval>): string {
  const values = Array.from(intervals, (item) => `[${String(item.start)},${String(item.end)})`);
  return `${prefix}:${values.length === 0 ? "-" : values.join(",")}`;
}

function sameMembers(left: SpanSet, right: SpanSet): boolean {
  if (!left.snapshot.isCompatibleWith(right.snapshot) || left.count !== right.count) return false;
  for (let index = 0; index < left.count; index++) {
    const leftSpan = left.at(index);
    const rightSpan = right.at(index);
    if (leftSpan.start !== rightSpan.start || leftSpan.end !== rightSpan.end) return false;
  }
  return true;
}

function requireSame(left: SpanSet, right: SpanSet, law: string): void {
  if (!sameMembers(left, right)) throw new Error(`${law} span-set disagreement`);
}

function requireCanonical(set: SpanSet, law: string): void {
  let previous: ByteSpan | undefined;
  for (const member of set) {
    if (member.start >= member.end || (previous !== undefined && previous.end >= member.start)) {
      throw new Error(`${law} produced a noncanonical span set`);
    }
    previous = member;
  }
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

function checkAlgebraLaws(left: SpanSet, right: SpanSet): void {
  const empty = SpanSet.empty(left.snapshot);
  const whole = SpanSet.whole(left.snapshot);
  requireSame(left.union(empty), left, "B4 union-empty identity");
  requireSame(left.intersect(whole), left, "B4 intersect-whole identity");
  requireSame(left.union(left), left, "B4 union idempotence");
  requireSame(left.intersect(left), left, "B4 intersection idempotence");
  requireSame(left.union(right), right.union(left), "B4 union commutativity");
  requireSame(left.intersect(right), right.intersect(left), "B4 intersection commutativity");
  requireSame(left.union(left.intersect(right)), left, "B4 union absorption");
  requireSame(left.intersect(left.union(right)), left, "B4 intersection absorption");
  requireSame(left.subtract(left), empty, "B4 self subtraction");
  requireSame(left.union(left.complement()), whole, "B4 complement union");
  requireSame(left.intersect(left.complement()), empty, "B4 complement intersection");
  requireSame(left.complement().complement(), left, "B4 double complement");
}

function checkBasisLaws(
  source: SourceSnapshot,
  leftRaw: readonly OracleInterval[],
  rightRaw: readonly OracleInterval[],
  left: SpanSet,
  right: SpanSet,
): void {
  const compatible = new SourceSnapshot(source.copyBytes(), {
    sourceId: source.sourceId,
    revision: source.revision,
    declaredEncoding: "fixture-comparison",
  });
  const compatibleLeft = SpanSet.from(
    compatible,
    leftRaw.map((item) => byteSpan(item.start, item.end)),
  );
  const compatibleRight = SpanSet.from(
    compatible,
    rightRaw.map((item) => byteSpan(item.start, item.end)),
  );
  if (!left.equals(compatibleLeft)) throw new Error("B2 compatible equality disagreement");
  requireSame(left.union(compatibleRight), left.union(right), "B5 compatible union");
  requireSame(left.intersect(compatibleRight), left.intersect(right), "B5 compatible intersection");
  requireSame(left.subtract(compatibleRight), left.subtract(right), "B5 compatible subtraction");

  const variants: SourceSnapshot[] = [
    new SourceSnapshot(source.copyBytes(), {
      sourceId: `${source.sourceId}-other`,
      revision: source.revision,
    }),
    new SourceSnapshot(source.copyBytes(), {
      sourceId: source.sourceId,
      revision: source.revision + 1,
    }),
  ];
  if (source.byteLength > 0) {
    const changed = source.copyBytes();
    changed[0] = (changed[0] ?? 0) ^ 0xff;
    variants.push(
      new SourceSnapshot(changed, { sourceId: source.sourceId, revision: source.revision }),
    );
  }
  for (const variant of variants) {
    const foreign = SpanSet.from(
      variant,
      rightRaw.map((item) => byteSpan(item.start, item.end)),
    );
    if (left.equals(foreign)) throw new Error("B5 incompatible sets compared equal");
    requireError(() => left.union(foreign), "B5 union");
    requireError(() => left.intersect(foreign), "B5 intersection");
    requireError(() => left.subtract(foreign), "B5 subtraction");
  }
}

function sourceRow(expected: string): string {
  const fields = expected.split(" ; ");
  if (fields.length !== 16) throw new SyntaxError(`invalid span-set row: ${expected}`);
  const bytes = decodeBytes(fields[0] ?? "");
  if (bytes.some((value) => value !== 0)) throw new SyntaxError("span-set carrier must be zeroed");
  const declaredEncoding = decodeDeclaredEncoding(fields[1] ?? "");
  const leftRaw = parseIntervals(fields[2] ?? "", "A");
  const rightRaw = parseIntervals(fields[3] ?? "", "B");
  const window = parseWindow(fields[13] ?? "");
  const source = new SourceSnapshot(bytes, {
    sourceId: "span-set-conformance.tex",
    revision: 0,
    declaredEncoding,
  });
  const left = SpanSet.from(
    source,
    leftRaw.map((item) => byteSpan(item.start, item.end)),
  );
  const right = SpanSet.from(
    source,
    rightRaw.map((item) => byteSpan(item.start, item.end)),
  );
  const union = left.union(right);
  const intersection = left.intersect(right);
  const subtraction = left.subtract(right);
  const complement = left.complement();
  const namedSets: readonly (readonly [string, SpanSet])[] = [
    ["left", left],
    ["right", right],
    ["union", union],
    ["intersection", intersection],
    ["subtraction", subtraction],
    ["complement", complement],
  ];
  for (const [name, set] of namedSets) {
    requireCanonical(set, `B1 ${name}`);
  }
  checkAlgebraLaws(left, right);
  checkBasisLaws(source, leftRaw, rightRaw, left, right);

  const windowSet = SpanSet.from(source, [window]);
  const scoped = left.intersect(windowSet);
  const slice = SourceSlice.create(source, window);
  const rebased = scoped.toChild(slice);
  requireSame(rebased.toParent(slice), scoped, "B6 scoped round trip");
  const inside = [...left].every(
    (member) => window.start <= member.start && member.end <= window.end,
  );
  if (inside) requireSame(left.toChild(slice), rebased, "B6 direct downward rebase");
  else requireError(() => left.toChild(slice), "B6 outside downward rebase");

  const membership = Array.from({ length: source.byteLength }, (_, offset) =>
    left.contains(byteOffset(offset)) ? "1" : "0",
  ).join("");
  return row([
    encodeBytes(bytes),
    encodeDeclaredEncoding(declaredEncoding),
    intervalField("A", leftRaw),
    intervalField("B", rightRaw),
    intervalField("N", left),
    intervalField("M", right),
    intervalField("U", union),
    intervalField("I", intersection),
    intervalField("S", subtraction),
    intervalField("C", complement),
    `V:${String(left.coverage)}`,
    `P:${membership.length === 0 ? "-" : membership}`,
    `Q:${left.equals(right) ? "1" : "0"}`,
    `W:[${String(window.start)},${String(window.end)})`,
    intervalField("R", rebased),
    `O:${inside ? "1" : "0"}`,
  ]);
}

function* checkedSpanSetRows(): Generator<string> {
  for (const expected of spanSetRows()) {
    const actual = sourceRow(expected);
    if (actual !== expected) {
      throw new Error(`fixture/source disagreement\nfixture: ${expected}\nsource:  ${actual}`);
    }
    yield expected;
  }
}

describe("SpanSet conformance", () => {
  it("matches every explicit normalization, algebra, basis, and rebase row", () => {
    const parsed = fixture();
    expect(header(parsed, "family")).toEqual(["span-set/algebra"]);
    expect(header(parsed, "laws")).toEqual(["B1 B2 B3 B4 B5 B6"]);
    expect(parsed.rowTexts).toEqual([...namedSpanSetRows()]);
    expect(parsed.rows).toHaveLength(5);
    for (const expected of parsed.rowTexts) expect(sourceRow(expected)).toBe(expected);
  });

  it("re-enumerates the 500-case independent bitmap digest", () => {
    const parsed = fixture();
    const expected = parseDigest(header(parsed, "digest")[0] ?? "");
    expect(expected.tier).toBe("default");
    expect(expected.count).toBe(SPAN_SET_CASE_COUNT);
    expect(digestRows(checkedSpanSetRows())).toEqual({
      value: expected.value,
      count: expected.count,
    });
  });
});
