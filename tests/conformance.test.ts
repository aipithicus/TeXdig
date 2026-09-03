import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { classInputs } from "../scripts/conformance/families/utf8-classes.ts";
import { randomUtf8Rows } from "../scripts/conformance/families/utf8-random.ts";
import { lineRows } from "../scripts/conformance/families/topology-lines.ts";
import { randomConversionRows } from "../scripts/conformance/families/topology-conversions.ts";
import { mutationRows } from "../scripts/conformance/families/snapshot-identity.ts";
import { sliceRows } from "../scripts/conformance/families/slice-laws.ts";
import {
  decodeBytes,
  digestRows,
  parseDigest,
  parseFixture,
  row,
} from "../scripts/conformance/format.ts";
import {
  decodeUtf8Oracle,
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

function snapshot(input: Uint8Array, sourceId = "conformance.tex", revision = 0): SourceSnapshot {
  return new SourceSnapshot(input, { sourceId, revision });
}

function sourceUtf8Row(input: Uint8Array): string {
  const units = decodeUtf8(input);
  const materialized = listUnits(units);
  const unitField =
    materialized.length === 0
      ? "U:-"
      : `U:${materialized.map((unit) => `${String(unit.span.start)}-${String(unit.span.end)}:${unit.valid ? "S" : "I"}:${unit.value.toString(16).toUpperCase()}`).join(",")}`;
  const bytes =
    input.length === 0
      ? "-"
      : Array.from(input, (value) => value.toString(16).padStart(2, "0").toUpperCase()).join(" ");
  return row([
    bytes,
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
      const input = decodeBytes(expected.split(" ; ")[0] ?? "");
      const oracleProblem = utf8OracleViolation(input);
      if (oracleProblem !== undefined) throw new Error(`${expected}: ${oracleProblem}`);
      const prefixProblem = checkPrefix ? utf8PrefixViolation(input) : undefined;
      if (prefixProblem !== undefined) throw new Error(`${expected}: ${prefixProblem}`);
      const actual = sourceUtf8Row(input);
      if (actual !== expected)
        throw new Error(`fixture/source disagreement\nfixture: ${expected}\nsource:  ${actual}`);
      yield expected;
    }
  }
  return digestRows(checked());
}

function checkClassRows(
  length: number,
  checkPrefix: boolean,
): { readonly value: string; readonly count: number } {
  function* checked(): Generator<string> {
    for (const input of classInputs(length)) {
      const oracleProblem = utf8OracleViolation(input);
      if (oracleProblem !== undefined) throw new Error(`${utf8Row(input)}: ${oracleProblem}`);
      const prefixProblem = checkPrefix ? utf8PrefixViolation(input) : undefined;
      if (prefixProblem !== undefined) throw new Error(`${utf8Row(input)}: ${prefixProblem}`);
      const expected = decodeUtf8Oracle(input);
      const actual = decodeUtf8(input);
      if (
        actual.count !== expected.length ||
        actual.invalidCount !== expected.filter((unit) => !unit.valid).length
      ) {
        throw new Error(`fixture/source decoder count disagreement: ${utf8Row(input)}`);
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
          throw new Error(`fixture/source decoder unit disagreement: ${utf8Row(input)}`);
        }
      }
      yield utf8Row(input);
    }
  }
  return digestRows(checked());
}

function expectDigest(
  text: string,
  actual: { readonly value: string; readonly count: number },
): void {
  const expected = parseDigest(text);
  expect(actual).toEqual({ value: expected.value, count: expected.count });
}

describe("conformance format", () => {
  it("parses all eight families and rejects unknown schemas", () => {
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
    expect(() =>
      parseFixture("# family: test/bad\n# schema: 2\n# generator: x\n- ; X:0\n"),
    ).toThrow(/unsupported conformance schema/);
  });
});

describe("UTF-8 conformance", () => {
  it("matches every named expectation", () => {
    const parsed = fixture("utf8/named.txt");
    for (const expected of parsed.rowTexts) {
      const input = decodeBytes(expected.split(" ; ")[0] ?? "");
      expect(sourceUtf8Row(input)).toBe(expected);
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
  it("re-enumerates the length-five class digest", () => {
    const digest = header(fixture("utf8/classes.txt"), "digest")[4] ?? "";
    expectDigest(digest, checkClassRows(5, true));
  }, 900_000);
});

describe("span conformance", () => {
  it("matches all 441 cell-oracle rows", () => {
    const parsed = fixture("span/predicates.txt");
    expect(parsed.rows).toHaveLength(441);
    for (const fields of parsed.rows) {
      const numbers = fields
        .slice(1, 3)
        .flatMap((field) => [...field.matchAll(/\d+/g)].map((match) => Number(match[0])));
      const a = byteSpan(numbers[0] ?? 0, numbers[1] ?? 0);
      const b = byteSpan(numbers[2] ?? 0, numbers[3] ?? 0);
      const actual = [
        containsSpan(a, b),
        properlyContains(a, b),
        intersects(a, b),
        crosses(a, b),
      ].map((value) => (value ? "1" : "0"));
      expect(actual).toEqual(fields.slice(3).map((field) => field.slice(2)));
    }
  });
});

function checkLineRow(expected: string): void {
  const fields = expected.split(" ; ");
  const input = decodeBytes(fields[0] ?? "");
  const topology = SourceTopology.of(snapshot(input));
  expect(`L:${topology.lineStarts.join(",")}`).toBe(fields[1]);
  const indexes: number[] = [];
  const positions: string[] = [];
  for (let offset = 0; offset <= input.length; offset++) {
    const index = topology.getLineIndex(byteOffset(offset));
    indexes.push(index);
    const position = topology.lineColumn(byteOffset(offset), "atoms");
    positions.push(
      `${String(position.lineIndex)}/${String(position.byteColumn)}/${String(position.atomColumn)}/${String(position.utf16Column)}`,
    );
  }
  expect(`I:${indexes.join(",")}`).toBe(fields[2]);
  expect(`P:${positions.join(",")}`).toBe(fields[3]);
  for (let line = 0; line < topology.lineCount; line++) {
    const extent = topology.getLineExtent(line);
    expect(extent.start).toBe(topology.lineStarts[line]);
    expect(extent.end).toBe(topology.lineStarts[line + 1] ?? input.length);
  }
  for (let start = 0; start <= input.length; start++)
    for (let end = start; end <= input.length; end++)
      expect(topology.project(byteSpan(start, end)).count).toBeGreaterThan(0);
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
  const input = decodeBytes(expected.split(" ; ")[0] ?? "");
  const topology = SourceTopology.of(snapshot(input));
  const triples = [
    [0, 0, 0],
    ...topology
      .listAtoms()
      .map((atom, index) => [
        atom.span.end,
        topology.byteToUtf16(atom.span.end, "atoms"),
        index + 1,
      ]),
  ];
  expect(`B:${triples.map((triple) => triple.join("/")).join(",")}`).toBe(expected.split(" ; ")[1]);
  for (const [byte, utf16, atom] of triples) {
    expect(topology.atomToByte(atomOffset(atom ?? 0, "atoms"), "atoms")).toBe(byte);
    expect(topology.utf16ToByte(utf16Offset(utf16 ?? 0, "atoms"), "atoms")).toBe(byte);
  }
  const boundaries = new Set(triples.map((triple) => triple[0]));
  for (let byte = 0; byte <= input.length; byte++) {
    if (!boundaries.has(byte))
      expect(() => {
        topology.validateByteOffset(byteOffset(byte));
      }).toThrow(RangeError);
  }
}

describe("snapshot conformance", () => {
  it("matches hash vectors, the compatibility matrix, and the mutation digest", () => {
    const parsed = fixture("snapshot/identity.txt");
    for (const fields of parsed.rows) {
      const input = decodeBytes(fields[0] ?? "");
      if (fields[1]?.startsWith("V:")) {
        expect(snapshot(input).contentHash).toBe(fields[1].slice(2));
        expect(sha256(input)).toBe(fields[1].slice(2));
      } else {
        const right = /R:(.*)\|([^|]+)\|(\d+)/.exec(fields[2] ?? "");
        if (right === null) throw new Error("invalid compatibility row");
        const leftSnapshot = snapshot(input, "a.tex", 4);
        const rightSnapshot = snapshot(
          decodeBytes(right[1] ?? ""),
          right[2] ?? "",
          Number(right[3]),
        );
        expect(leftSnapshot.isCompatibleWith(rightSnapshot) ? "K:1" : "K:0").toBe(fields[3]);
      }
    }
    expectDigest(header(parsed, "digest")[0] ?? "", digestRows(mutationRows()));
  });
});

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
  const input = decodeBytes(fields[0] ?? "");
  const window = [...(fields[1] ?? "").matchAll(/\d+/g)].map((match) => Number(match[0]));
  const parent = snapshot(input);
  const slice = SourceSlice.create(parent, byteSpan(window[0] ?? 0, window[1] ?? 0));
  const expectedChild = (fields[2] ?? "").slice(2);
  const actualChild = slice.child.copyBytes();
  const actualChildText =
    actualChild.length === 0
      ? "-"
      : Array.from(actualChild, (value) => value.toString(16).padStart(2, "0").toUpperCase()).join(
          " ",
        );
  expect(actualChildText).toBe(expectedChild);
  const nested = [...(fields[3] ?? "").matchAll(/\d+/g)].map((match) => Number(match[0]));
  const inner = SourceSlice.create(slice.child, byteSpan(nested[0] ?? 0, nested[1] ?? 0));
  expect(slice.toParent(inner.window)).toEqual(byteSpan(nested[2] ?? 0, nested[3] ?? 0));
  for (let offset = 0; offset <= slice.child.byteLength; offset++)
    expect(slice.toChild(slice.toParent(byteOffset(offset)))).toBe(offset);
  if (fields[4] === "O:1") {
    const outside = (window[0] ?? 0) > 0 ? (window[0] ?? 0) - 1 : (window[1] ?? 0) + 1;
    expect(() => slice.toChild(byteOffset(outside))).toThrow(RangeError);
  }
}
