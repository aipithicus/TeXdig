import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  classInputCount,
  classInputRange,
  classInputs,
} from "../scripts/conformance/families/utf8-classes.ts";
import { randomUtf8Rows } from "../scripts/conformance/families/utf8-random.ts";
import { lineRows } from "../scripts/conformance/families/topology-lines.ts";
import { randomConversionRows } from "../scripts/conformance/families/topology-conversions.ts";
import { mutationRows } from "../scripts/conformance/families/snapshot-identity.ts";
import { sliceRows } from "../scripts/conformance/families/slice-laws.ts";
import {
  DECLARED_ENCODING,
  GENERATOR,
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
  decodeUtf8Oracle,
  lineProjectionOracle,
  sha256,
  utf8OracleViolation,
  utf8PrefixViolation,
  utf8Row,
} from "../scripts/conformance/oracles.ts";
import {
  SourceSlice,
  SourceSnapshot,
  SourceTopology,
  atomOffset,
  byteOffset,
  byteSpan,
  containsSpan,
  crosses,
  decodeUtf8,
  intersects,
  listUnits,
  properlyContains,
  utf16Offset,
} from "../packages/texdig/src/source/index.js";

const root = resolve(import.meta.dirname, "..", "fixtures", "conformance");
const timeout = 120_000;

function fixture(path: string): ReturnType<typeof parseFixture> {
  return parseFixture(readFileSync(resolve(root, path), "utf8"));
}

function header(parsed: ReturnType<typeof parseFixture>, name: string): readonly string[] {
  const values = parsed.headers.get(name);
  if (values === undefined) throw new Error(`missing ${name} header`);
  return values;
}

function snapshot(
  input: Uint8Array,
  sourceId = "conformance.tex",
  revision = 0,
  declaredEncoding = DECLARED_ENCODING,
): SourceSnapshot {
  return new SourceSnapshot(input, { sourceId, revision, declaredEncoding });
}

function fixtureInput(fields: readonly string[]): {
  readonly bytes: Uint8Array;
  readonly declaredEncoding: string;
} {
  return {
    bytes: decodeBytes(fields[0] ?? ""),
    declaredEncoding: decodeDeclaredEncoding(fields[1] ?? ""),
  };
}

function sourceUtf8Row(input: Uint8Array, declaredEncoding: string): string {
  const units = decodeUtf8(input);
  const materialized = listUnits(units);
  const unitField =
    materialized.length === 0
      ? "U:-"
      : `U:${materialized.map((unit) => `${String(unit.span.start)}-${String(unit.span.end)}:${unit.valid ? "S" : "I"}:${unit.value.toString(16).toUpperCase()}`).join(",")}`;
  return row([
    encodeBytes(input),
    encodeDeclaredEncoding(declaredEncoding),
    unitField,
    `N:${String(units.invalidCount)}`,
    `M:${units.hasBom ? "1" : "0"}`,
  ]);
}

function checkUtf8Rows(
  rows: Iterable<string>,
  checkPrefix: boolean,
): { readonly value: string; readonly count: number } {
  function* checked(): Generator<string> {
    for (const expected of rows) {
      const inputFields = fixtureInput(expected.split(" ; "));
      const input = inputFields.bytes;
      const oracleUnits = decodeUtf8Oracle(input);
      const oracleProblem = utf8OracleViolation(input, oracleUnits);
      if (oracleProblem !== undefined) throw new Error(`${expected}: ${oracleProblem}`);
      const prefixProblem = checkPrefix ? utf8PrefixViolation(input, oracleUnits) : undefined;
      if (prefixProblem !== undefined) throw new Error(`${expected}: ${prefixProblem}`);
      const actual = sourceUtf8Row(input, inputFields.declaredEncoding);
      if (actual !== expected)
        throw new Error(`fixture/source disagreement\nfixture: ${expected}\nsource:  ${actual}`);
      yield expected;
    }
  }
  return digestRows(checked());
}

function validateClassInput(
  input: Uint8Array,
  checkPrefix: boolean,
): ReturnType<typeof decodeUtf8Oracle> {
  const expected = decodeUtf8Oracle(input);
  const describeInput = (): string => utf8Row(input, expected);
  const oracleProblem = utf8OracleViolation(input, expected);
  if (oracleProblem !== undefined) throw new Error(`${describeInput()}: ${oracleProblem}`);
  const prefixProblem = checkPrefix ? utf8PrefixViolation(input, expected) : undefined;
  if (prefixProblem !== undefined) throw new Error(`${describeInput()}: ${prefixProblem}`);
  const actual = decodeUtf8(input);
  let invalidCount = 0;
  for (const unit of expected) if (!unit.valid) invalidCount++;
  const hasBom = input.length >= 3 && input[0] === 0xef && input[1] === 0xbb && input[2] === 0xbf;
  if (
    actual.byteLength !== input.length ||
    actual.count !== expected.length ||
    actual.invalidCount !== invalidCount ||
    actual.hasBom !== hasBom ||
    actual.starts.length !== expected.length + 1 ||
    actual.values.length !== expected.length ||
    actual.valid.length !== expected.length
  ) {
    throw new Error(`fixture/source decoder summary disagreement: ${describeInput()}`);
  }
  for (let index = 0; index < expected.length; index++) {
    const unit = expected[index];
    if (
      unit === undefined ||
      actual.starts[index] !== unit.start ||
      actual.starts[index + 1] !== unit.end ||
      actual.valid[index] !== (unit.valid ? 1 : 0) ||
      actual.values[index] !== unit.value
    ) {
      throw new Error(`fixture/source decoder unit disagreement: ${describeInput()}`);
    }
  }
  return expected;
}

function checkClassRows(
  length: number,
  checkPrefix: boolean,
): { readonly value: string; readonly count: number } {
  function* checked(): Generator<string> {
    for (const input of classInputs(length)) {
      const expected = validateClassInput(input, checkPrefix);
      yield utf8Row(input, expected);
    }
  }
  return digestRows(checked());
}

function checkClassRange(
  length: number,
  startCode: number,
  endCode: number,
  checkPrefix: boolean,
): number {
  let count = 0;
  for (const input of classInputs(length, startCode, endCode)) {
    validateClassInput(input, checkPrefix);
    count++;
  }
  return count;
}

function environmentInteger(name: string, fallback: number): number {
  const text = process.env[name];
  if (text === undefined) return fallback;
  const value = Number(text);
  if (!Number.isSafeInteger(value) || value < 0)
    throw new RangeError(`${name} must be a non-negative safe integer`);
  return value;
}

function deepShard(): ReturnType<typeof classInputRange> {
  const count = environmentInteger("TEXDIG_CONFORMANCE_SHARD_COUNT", 1);
  const index = environmentInteger("TEXDIG_CONFORMANCE_SHARD_INDEX", 0);
  return classInputRange(5, index, count);
}

function expectDigest(
  text: string,
  actual: { readonly value: string; readonly count: number },
): void {
  const expected = parseDigest(text);
  expect(actual).toEqual({ value: expected.value, count: expected.count });
}

describe("conformance format", () => {
  it("parses all eight families", () => {
    const paths = [
      "utf8/named.txt",
      "utf8/classes.txt",
      "utf8/random.txt",
      "span/predicates.txt",
      "topology/lines.txt",
      "topology/conversions.txt",
      "snapshot/identity.txt",
      "slice/laws.txt",
    ];
    for (const path of paths) expect(header(fixture(path), "family")).toHaveLength(1);
  });

  it("enforces required singleton headers and their values", () => {
    expect(() =>
      parseFixture(
        `# family: test/bad\n# schema: 2\n# generator: ${GENERATOR}\n- ; E:utf-8 ; X:0\n`,
      ),
    ).toThrow(/unsupported conformance schema/);
    expect(() => parseFixture("# schema: 1\n")).toThrow(/family/);
    expect(() => parseFixture(`# family: test/bad\n# schema: 1\n- ; E:utf-8 ; X:0\n`)).toThrow(
      /generator/,
    );
    expect(() =>
      parseFixture(
        `# family: test/bad\n# family: test/other\n# schema: 1\n# generator: ${GENERATOR}\n- ; E:utf-8 ; X:0\n`,
      ),
    ).toThrow(/must not repeat: family/);
    expect(() => parseFixture(`# family: bad\n# schema: 1\n# generator: ${GENERATOR}\n`)).toThrow(
      /family/,
    );
    expect(() =>
      parseFixture("# family: test/bad\n# schema: 1\n# generator: something-else\n"),
    ).toThrow(/generator/);
  });

  it("strips inline comments from headers and rows", () => {
    const parsed = parseFixture(
      `# family: test/comments # family note\n# schema: 1 # schema note\n# generator: ${GENERATOR} # generator note\n41 ; E:utf-8 ; X:1 # row note\n`,
    );
    expect(header(parsed, "family")).toEqual(["test/comments"]);
    expect(header(parsed, "generator")).toEqual([GENERATOR]);
    expect(parsed.rowTexts).toEqual(["41 ; E:utf-8 ; X:1"]);
  });

  it("requires headers before rows while allowing comments after them", () => {
    expect(() =>
      parseFixture(
        `# family: test/order\n# schema: 1\n# generator: ${GENERATOR}\n41 ; E:utf-8 ; X:1\n# seed: 0x1\n`,
      ),
    ).toThrow(/precede rows/);
    expect(() =>
      parseFixture(
        `# family: test/order\n# schema: 1\n# generator: ${GENERATOR}\n41 ; E:utf-8 ; X:1\n# ordinary comment\n`,
      ),
    ).not.toThrow();
  });

  it("requires the declared-encoding input field", () => {
    expect(() =>
      parseFixture(`# family: test/input\n# schema: 1\n# generator: ${GENERATOR}\n41 ; X:1\n`),
    ).toThrow(/fixture row/);
    expect(() =>
      parseFixture(
        `# family: test/input\n# schema: 1\n# generator: ${GENERATOR}\n41 ; encoding ; X:1\n`,
      ),
    ).toThrow(/declared encoding/);
  });

  it("partitions the deep class census without gaps or overlap", () => {
    const shards = 7;
    let cursor = 0;
    for (let index = 0; index < shards; index++) {
      const range = classInputRange(5, index, shards);
      expect(range.startCode).toBe(cursor);
      expect(range.endCode).toBeGreaterThan(range.startCode);
      cursor = range.endCode;
    }
    expect(cursor).toBe(classInputCount(5));
    expect(() => classInputRange(5, shards, shards)).toThrow(RangeError);
  });
});

describe("UTF-8 conformance", () => {
  it("matches every named expectation", () => {
    const parsed = fixture("utf8/named.txt");
    expect(parsed.rows.map((fields) => fields[0])).toEqual([
      "-",
      "41",
      "C3 A9",
      "E2 82 AC",
      "F0 9F 98 80",
      "7F DF BF EF BF BF F4 8F BF BF",
      "EF BB BF 41",
      "41 EF BB BF",
      "80",
      "E9 41",
      "E2 82 41",
      "E2 82",
      "C0 80",
      "E0 80 80",
      "ED A0 80",
      "F4 90 80 80",
      "F5 FF C1",
      "EF BB BF",
      "EF BF BD",
    ]);
    for (const expected of parsed.rowTexts) {
      const input = fixtureInput(expected.split(" ; "));
      expect(sourceUtf8Row(input.bytes, input.declaredEncoding)).toBe(expected);
    }
  });

  it(
    "re-enumerates class digests through length four",
    () => {
      const digests = header(fixture("utf8/classes.txt"), "digest");
      for (let length = 1; length <= 4; length++)
        expectDigest(digests[length - 1] ?? "", checkClassRows(length, false));
    },
    timeout,
  );

  it(
    "re-enumerates the seeded random digest and prefix law",
    () => {
      expectDigest(
        header(fixture("utf8/random.txt"), "digest")[0] ?? "",
        checkUtf8Rows(randomUtf8Rows(), true),
      );
    },
    timeout,
  );
});

describe.skipIf(process.env.TEXDIG_CONFORMANCE_DEEP !== "1")("deep UTF-8 conformance", () => {
  it("validates its assigned length-five class shard", () => {
    const shard = deepShard();
    expect(checkClassRange(5, shard.startCode, shard.endCode, true)).toBe(
      shard.endCode - shard.startCode,
    );
  }, 900_000);
});

describe("span conformance", () => {
  it("matches all 441 cell-oracle rows", () => {
    const parsed = fixture("span/predicates.txt");
    expect(parsed.rows).toHaveLength(441);
    for (const fields of parsed.rows) {
      const numbers = fields
        .slice(2, 4)
        .flatMap((field) => [...field.matchAll(/\d+/g)].map((match) => Number(match[0])));
      const a = byteSpan(numbers[0] ?? 0, numbers[1] ?? 0);
      const b = byteSpan(numbers[2] ?? 0, numbers[3] ?? 0);
      const actual = [
        containsSpan(a, b),
        properlyContains(a, b),
        intersects(a, b),
        crosses(a, b),
      ].map((value) => (value ? "1" : "0"));
      expect(actual).toEqual(fields.slice(4).map((field) => field.slice(2)));
    }
  });
});

function checkLineRow(expected: string): void {
  const fields = expected.split(" ; ");
  const input = fixtureInput(fields);
  const source = snapshot(input.bytes, "conformance.tex", 0, input.declaredEncoding);
  const topology = SourceTopology.of(source);
  expect(source.decoding.declaredEncoding).toBe(input.declaredEncoding);
  expect(`L:${topology.lineStarts.join(",")}`).toBe(fields[2]);
  const expectedLineStarts = (fields[2] ?? "").slice(2).split(",").map(Number);
  const indexes: number[] = [];
  const positions: string[] = [];
  for (let offset = 0; offset <= input.bytes.length; offset++) {
    const index = topology.getLineIndex(byteOffset(offset));
    indexes.push(index);
    const position = topology.lineColumn(byteOffset(offset), "atoms");
    positions.push(
      `${String(position.lineIndex)}/${String(position.byteColumn)}/${String(position.atomColumn)}/${String(position.utf16Column)}`,
    );
  }
  expect(`I:${indexes.join(",")}`).toBe(fields[3]);
  expect(`P:${positions.join(",")}`).toBe(fields[4]);
  for (let line = 0; line < topology.lineCount; line++) {
    const extent = topology.getLineExtent(line);
    expect(extent.start).toBe(topology.lineStarts[line]);
    expect(extent.end).toBe(topology.lineStarts[line + 1] ?? input.bytes.length);
  }
  for (let start = 0; start <= input.bytes.length; start++) {
    for (let end = start; end <= input.bytes.length; end++) {
      const [expectedStart, expectedEnd] = lineProjectionOracle(expectedLineStarts, start, end);
      const actual = topology.project(byteSpan(start, end));
      if (
        actual.start !== expectedStart ||
        actual.end !== expectedEnd ||
        actual.count !== expectedEnd - expectedStart
      ) {
        throw new Error(
          `T4 projection disagreement for [${String(start)},${String(end)}): ` +
            `${String(actual.start)}-${String(actual.end)} != ${String(expectedStart)}-${String(expectedEnd)}`,
        );
      }
    }
  }
}

describe("topology conformance", () => {
  it(
    "matches all explicit line rows and the five-piece digest",
    () => {
      const parsed = fixture("topology/lines.txt");
      expect(parsed.rows).toHaveLength(341);
      for (const text of parsed.rowTexts) checkLineRow(text);
      const rows = [...lineRows(5, true)];
      for (const text of rows) checkLineRow(text);
      expectDigest(header(parsed, "digest")[0] ?? "", digestRows(rows));
    },
    timeout,
  );

  it(
    "round-trips named and random coordinate boundaries and rejects interiors",
    () => {
      const parsed = fixture("topology/conversions.txt");
      for (const expected of parsed.rowTexts) checkConversionRow(expected);
      const rows = [...randomConversionRows()];
      for (const expected of rows) checkConversionRow(expected);
      expectDigest(header(parsed, "digest")[0] ?? "", digestRows(rows));
    },
    timeout,
  );
});

function checkConversionRow(expected: string): void {
  const fields = expected.split(" ; ");
  const input = fixtureInput(fields);
  const source = snapshot(input.bytes, "conformance.tex", 0, input.declaredEncoding);
  const topology = SourceTopology.of(source);
  const boundaryField = fields[2] ?? "";
  if (!boundaryField.startsWith("B:")) throw new SyntaxError(`invalid boundary row: ${expected}`);
  const triples = boundaryField
    .slice(2)
    .split(",")
    .map((token) => {
      const match = /^(\d+)\/(\d+)\/(\d+)$/.exec(token);
      if (match === null) throw new SyntaxError(`invalid boundary token: ${token}`);
      return [Number(match[1]), Number(match[2]), Number(match[3])] as const;
    });

  for (const [byte, utf16, atom] of triples) {
    const bytePosition = byteOffset(byte);
    const utf16Position = utf16Offset(utf16, "atoms");
    const atomPosition = atomOffset(atom, "atoms");
    topology.validateByteOffset(bytePosition);
    const actual = [
      topology.byteToAtom(bytePosition, "atoms"),
      topology.atomToByte(atomPosition, "atoms"),
      topology.byteToUtf16(bytePosition, "atoms"),
      topology.utf16ToByte(utf16Position, "atoms"),
      topology.atomToUtf16(atomPosition, "atoms"),
      topology.utf16ToAtom(utf16Position, "atoms"),
    ];
    const wanted = [atom, byte, utf16, byte, utf16, atom];
    if (actual.some((value, index) => value !== wanted[index])) {
      throw new Error(
        `C1 conversion disagreement at ${String(byte)}/${String(utf16)}/${String(atom)}: ` +
          actual.join("/"),
      );
    }
  }

  const last = triples.at(-1);
  if (last === undefined) throw new Error(`C1 fixture has no boundaries: ${expected}`);
  if (
    topology.byteLength !== last[0] ||
    topology.utf16Length !== last[1] ||
    topology.atomCount !== last[2]
  ) {
    throw new Error(`C1 derived-length disagreement: ${expected}`);
  }

  const byteBoundaries = new Set(triples.map(([byte]) => byte));
  for (let byte = 0; byte <= input.bytes.length; byte++) {
    if (!byteBoundaries.has(byte)) {
      expectRangeError(
        () => {
          topology.validateByteOffset(byteOffset(byte));
        },
        `byte ${String(byte)}`,
      );
      expectRangeError(
        () => topology.byteToAtom(byteOffset(byte), "atoms"),
        `byte-to-atom ${String(byte)}`,
      );
      expectRangeError(
        () => topology.byteToUtf16(byteOffset(byte), "atoms"),
        `byte-to-UTF-16 ${String(byte)}`,
      );
      expectRangeError(
        () => topology.lineColumn(byteOffset(byte), "atoms"),
        `line-column ${String(byte)}`,
      );
    }
  }

  for (let index = 1; index < triples.length; index++) {
    const previousUtf16 = triples[index - 1]?.[1];
    const currentUtf16 = triples[index]?.[1];
    if (previousUtf16 !== undefined && currentUtf16 === previousUtf16 + 2) {
      const middle = utf16Offset(previousUtf16 + 1, "atoms");
      expectRangeError(
        () => topology.utf16ToByte(middle, "atoms"),
        `UTF-16-to-byte ${String(middle)}`,
      );
      expectRangeError(
        () => topology.utf16ToAtom(middle, "atoms"),
        `UTF-16-to-atom ${String(middle)}`,
      );
    }
  }
}

function expectRangeError(operation: () => unknown, context: string): void {
  try {
    operation();
  } catch (error: unknown) {
    if (error instanceof RangeError) return;
    throw error;
  }
  throw new Error(`C2/L3 expected RangeError for ${context}`);
}

describe("snapshot conformance", () => {
  it("matches hash vectors, the compatibility matrix, and the mutation digest", () => {
    const parsed = fixture("snapshot/identity.txt");
    for (const fields of parsed.rows) {
      const input = fixtureInput(fields);
      if (fields[2]?.startsWith("V:")) {
        const source = snapshot(input.bytes, "conformance.tex", 0, input.declaredEncoding);
        expect(source.contentHash).toBe(fields[2].slice(2));
        expect(source.decoding.declaredEncoding).toBe(input.declaredEncoding);
        expect(sha256(input.bytes)).toBe(fields[2].slice(2));
      } else {
        const left = /^A:(.*)\/(\d+)$/.exec(fields[2] ?? "");
        const right = /^R:(.*)\|([^|]+)\|([^|]+)\|(\d+)$/.exec(fields[3] ?? "");
        if (left === null || right === null) throw new Error("invalid compatibility row");
        const leftSnapshot = snapshot(
          input.bytes,
          left[1] ?? "",
          Number(left[2]),
          input.declaredEncoding,
        );
        const rightSnapshot = snapshot(
          decodeBytes(right[1] ?? ""),
          right[3] ?? "",
          Number(right[4]),
          decodeDeclaredEncoding(`E:${right[2] ?? ""}`),
        );
        const compatible = leftSnapshot.isCompatibleWith(rightSnapshot);
        expect(compatible ? "K:1" : "K:0").toBe(fields[4]);
        if (compatible) {
          expect(() => {
            leftSnapshot.ensureCompatibleWith(rightSnapshot);
          }).not.toThrow();
        } else {
          expect(() => {
            leftSnapshot.ensureCompatibleWith(rightSnapshot);
          }).toThrow();
        }
      }
    }
    expectDigest(header(parsed, "digest")[0] ?? "", digestRows(checkedMutationRows()));
  });
});

function* checkedMutationRows(): Generator<string> {
  for (const expected of mutationRows()) {
    const fields = expected.split(" ; ");
    const input = fixtureInput(fields);
    const match = /^M:(\d+)$/.exec(fields[2] ?? "");
    if (match === null) throw new SyntaxError(`invalid mutation row: ${expected}`);
    const index = Number(match[1]);
    if (index >= input.bytes.length)
      throw new RangeError(`mutation index outside carrier: ${expected}`);
    const changed = input.bytes.slice();
    changed[index] = (changed[index] ?? 0) ^ 0xff;
    const original = snapshot(input.bytes, "mutation.tex", 0, input.declaredEncoding);
    const mutated = snapshot(changed, "mutation.tex", 0, input.declaredEncoding);
    const actual = original.contentHash === mutated.contentHash ? "C:0" : "C:1";
    if (actual !== fields[3]) {
      throw new Error(`S1 fixture/source disagreement\nfixture: ${expected}\nsource: ${actual}`);
    }
    yield expected;
  }
}

describe("slice conformance", () => {
  it(
    "re-enumerates child bytes, inverse, rejection, and composition laws",
    () => {
      const parsed = fixture("slice/laws.txt");
      const rows = [...sliceRows()];
      for (const expected of rows) checkSliceRow(expected);
      expectDigest(header(parsed, "digest")[0] ?? "", digestRows(rows));
    },
    timeout,
  );
});

function checkSliceRow(expected: string): void {
  const fields = expected.split(" ; ");
  const input = fixtureInput(fields);
  const window = [...(fields[2] ?? "").matchAll(/\d+/g)].map((match) => Number(match[0]));
  const parent = snapshot(input.bytes, "conformance.tex", 0, input.declaredEncoding);
  const slice = SourceSlice.create(parent, byteSpan(window[0] ?? 0, window[1] ?? 0));
  expect(slice.child.decoding.declaredEncoding).toBe(input.declaredEncoding);
  const expectedChild = (fields[3] ?? "").slice(2);
  const actualChild = slice.child.copyBytes();
  expect(encodeBytes(actualChild)).toBe(expectedChild);
  const nested = [...(fields[4] ?? "").matchAll(/\d+/g)].map((match) => Number(match[0]));
  const inner = SourceSlice.create(slice.child, byteSpan(nested[0] ?? 0, nested[1] ?? 0));
  expect(slice.toParent(inner.window)).toEqual(byteSpan(nested[2] ?? 0, nested[3] ?? 0));

  for (let child = 0; child <= slice.child.byteLength; child++) {
    const childOffset = byteOffset(child);
    const parentOffset = slice.toParent(childOffset);
    if (slice.toChild(parentOffset) !== childOffset) {
      throw new Error(`L1 child offset inverse failed at ${String(child)}`);
    }
  }
  for (let root = slice.window.start; root <= slice.window.end; root++) {
    const parentOffset = byteOffset(root);
    if (slice.toParent(slice.toChild(parentOffset)) !== parentOffset) {
      throw new Error(`L1 parent offset inverse failed at ${String(root)}`);
    }
  }

  const childBoundaries = [
    0,
    ...SourceTopology.of(slice.child)
      .listAtoms()
      .map((atom) => atom.span.end),
  ];
  for (let start = 0; start < childBoundaries.length; start++) {
    for (let end = start; end < childBoundaries.length; end++) {
      const childSpan = byteSpan(childBoundaries[start] ?? 0, childBoundaries[end] ?? 0);
      const parentSpan = byteSpan(
        slice.window.start + childSpan.start,
        slice.window.start + childSpan.end,
      );
      expectSameSpan(slice.toParent(childSpan), parentSpan, "L1 child span to parent");
      expectSameSpan(slice.toChild(parentSpan), childSpan, "L1 parent span to child");
    }
  }

  const direct = SourceSlice.create(parent, byteSpan(nested[2] ?? 0, nested[3] ?? 0));
  if (encodeBytes(inner.child.copyBytes()) !== encodeBytes(direct.child.copyBytes())) {
    throw new Error("L2 nested and direct child bytes differ");
  }
  for (let local = 0; local <= inner.child.byteLength; local++) {
    const localOffset = byteOffset(local);
    const viaInner = slice.toParent(inner.toParent(localOffset));
    const viaDirect = direct.toParent(localOffset);
    if (viaInner !== viaDirect) throw new Error(`L2 upward offset failed at ${String(local)}`);
    const viaNestedDown = inner.toChild(slice.toChild(viaDirect));
    if (viaNestedDown !== direct.toChild(viaDirect)) {
      throw new Error(`L2 downward offset failed at ${String(local)}`);
    }
  }
  const innerBoundaries = [
    0,
    ...SourceTopology.of(inner.child)
      .listAtoms()
      .map((atom) => atom.span.end),
  ];
  for (let start = 0; start < innerBoundaries.length; start++) {
    for (let end = start; end < innerBoundaries.length; end++) {
      const localSpan = byteSpan(innerBoundaries[start] ?? 0, innerBoundaries[end] ?? 0);
      const viaInner = slice.toParent(inner.toParent(localSpan));
      const viaDirect = direct.toParent(localSpan);
      expectSameSpan(viaInner, viaDirect, "L2 upward span composition");
      expectSameSpan(
        inner.toChild(slice.toChild(viaDirect)),
        direct.toChild(viaDirect),
        "L2 downward span composition",
      );
    }
  }

  const parentBoundaries = [
    0,
    ...SourceTopology.of(parent)
      .listAtoms()
      .map((atom) => atom.span.end),
  ];
  const outsideExists = slice.window.start > 0 || slice.window.end < parent.byteLength;
  expect(fields[5]).toBe(`O:${outsideExists ? "1" : "0"}`);
  for (let offset = 0; offset <= parent.byteLength; offset++) {
    if (offset < slice.window.start || offset > slice.window.end) {
      expectRangeError(() => slice.toChild(byteOffset(offset)), `outside offset ${String(offset)}`);
    }
  }
  for (let start = 0; start < parentBoundaries.length; start++) {
    for (let end = start; end < parentBoundaries.length; end++) {
      const parentSpan = byteSpan(parentBoundaries[start] ?? 0, parentBoundaries[end] ?? 0);
      if (!(slice.window.start <= parentSpan.start && parentSpan.end <= slice.window.end)) {
        expectRangeError(
          () => slice.toChild(parentSpan),
          `outside/crossing span [${String(parentSpan.start)},${String(parentSpan.end)})`,
        );
      }
    }
  }
}

function expectSameSpan(
  actual: { readonly start: number; readonly end: number },
  expected: { readonly start: number; readonly end: number },
  context: string,
): void {
  if (actual.start !== expected.start || actual.end !== expected.end) {
    throw new Error(
      `${context}: [${String(actual.start)},${String(actual.end)}) != ` +
        `[${String(expected.start)},${String(expected.end)})`,
    );
  }
}
