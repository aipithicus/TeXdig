import { describe, expect, it } from "vitest";

import { fatalScalars } from "../../../../scripts/conformance/oracles.ts";
import { type Utf8Units, decodeUtf8, listUnits, unitAt } from "./utf8.js";

function bytes(...values: number[]): Uint8Array {
  return Uint8Array.from(values);
}

/** `[start, end, valid, value]` per unit, for compact expectations. */
function flat(units: Utf8Units): [number, number, number, number][] {
  return listUnits(units).map((u) => [u.span.start, u.span.end, u.valid ? 1 : 0, u.value]);
}

function isSurrogate(scalar: number): boolean {
  return scalar >= 0xd800 && scalar <= 0xdfff;
}

function minimumScalarForLength(length: number): number {
  switch (length) {
    case 1:
      return 0;
    case 2:
      return 0x80;
    case 3:
      return 0x800;
    default:
      return 0x10000;
  }
}

/**
 * The laws every decode must satisfy, checked against the fatal-mode oracle.
 * Returns the first violated law, or `undefined`. Written without assertions so
 * the censuses can run hundreds of thousands of inputs in a few seconds.
 */
function firstViolation(input: Uint8Array): string | undefined {
  const units = decodeUtf8(input);
  const n = input.length;

  if (units.byteLength !== n) {
    return "byteLength";
  }
  if (
    units.starts.length !== units.count + 1 ||
    units.values.length !== units.count ||
    units.valid.length !== units.count
  ) {
    return "column lengths";
  }
  if (units.starts[0] !== 0 || units.starts[units.count] !== n) {
    return "starts do not tile the input";
  }

  let invalid = 0;
  const scalars: number[] = [];
  for (let i = 0; i < units.count; i++) {
    const start = units.starts[i] ?? -1;
    const end = units.starts[i + 1] ?? -1;
    const length = end - start;
    const value = units.values[i] ?? -1;
    if (length < 1 || length > 4) {
      return `unit ${String(i)} has length ${String(length)}`;
    }
    if (units.valid[i] === 1) {
      if (value > 0x10ffff || isSurrogate(value) || value < minimumScalarForLength(length)) {
        return `unit ${String(i)} decodes to an inadmissible scalar ${String(value)}`;
      }
      scalars.push(value);
    } else {
      invalid++;
      if (length !== 1 || value !== input[start]) {
        return `invalid unit ${String(i)} is not its own raw byte`;
      }
    }
  }
  if (units.invalidCount !== invalid) {
    return "invalidCount";
  }
  const bom = n >= 3 && input[0] === 0xef && input[1] === 0xbb && input[2] === 0xbf;
  if (units.hasBom !== bom) {
    return "hasBom";
  }

  const expected = fatalScalars(input);
  if (invalid === 0) {
    if (expected === undefined) {
      return "oracle rejects input the decoder accepted";
    }
    if (expected.length !== scalars.length || expected.some((v, k) => v !== scalars[k])) {
      return "scalar values differ from the oracle";
    }
  } else if (expected !== undefined) {
    return "oracle accepts input the decoder rejected";
  }
  return undefined;
}

function checkLaws(input: Uint8Array): Utf8Units {
  expect(firstViolation(input)).toBeUndefined();
  return decodeUtf8(input);
}

describe("decodeUtf8 named cases", () => {
  it("decodes empty input to zero units", () => {
    const units = checkLaws(bytes());
    expect(units.count).toBe(0);
    expect(flat(units)).toEqual([]);
  });

  it("decodes ASCII and multi-byte scalars", () => {
    expect(flat(checkLaws(bytes(0x41)))).toEqual([[0, 1, 1, 0x41]]);
    expect(flat(checkLaws(bytes(0xc3, 0xa9)))).toEqual([[0, 2, 1, 0xe9]]);
    expect(flat(checkLaws(bytes(0xe2, 0x82, 0xac)))).toEqual([[0, 3, 1, 0x20ac]]);
    expect(flat(checkLaws(bytes(0xf0, 0x9f, 0x98, 0x80)))).toEqual([[0, 4, 1, 0x1f600]]);
    expect(
      flat(checkLaws(bytes(0x7f, 0xdf, 0xbf, 0xef, 0xbf, 0xbf, 0xf4, 0x8f, 0xbf, 0xbf))),
    ).toEqual([
      [0, 1, 1, 0x7f],
      [1, 3, 1, 0x7ff],
      [3, 6, 1, 0xffff],
      [6, 10, 1, 0x10ffff],
    ]);
  });

  it("preserves the byte-order mark as a unit and reports it", () => {
    const units = checkLaws(bytes(0xef, 0xbb, 0xbf, 0x41));
    expect(units.hasBom).toBe(true);
    expect(flat(units)).toEqual([
      [0, 3, 1, 0xfeff],
      [3, 4, 1, 0x41],
    ]);
    expect(checkLaws(bytes(0x41, 0xef, 0xbb, 0xbf)).hasBom).toBe(false);
  });

  it("decodes the literal U+FFFD sequence as an ordinary scalar", () => {
    expect(flat(checkLaws(bytes(0xef, 0xbf, 0xbd)))).toEqual([[0, 3, 1, 0xfffd]]);
  });

  it("keeps every invalid byte as its own one-byte unit", () => {
    expect(flat(checkLaws(bytes(0x80)))).toEqual([[0, 1, 0, 0x80]]);
    expect(flat(checkLaws(bytes(0xe9, 0x41)))).toEqual([
      [0, 1, 0, 0xe9],
      [1, 2, 1, 0x41],
    ]);
    expect(flat(checkLaws(bytes(0xe2, 0x82, 0x41)))).toEqual([
      [0, 1, 0, 0xe2],
      [1, 2, 0, 0x82],
      [2, 3, 1, 0x41],
    ]);
    expect(flat(checkLaws(bytes(0xe2, 0x82)))).toEqual([
      [0, 1, 0, 0xe2],
      [1, 2, 0, 0x82],
    ]);
  });

  it("rejects overlong, surrogate, and out-of-range encodings byte by byte", () => {
    expect(flat(checkLaws(bytes(0xc0, 0x80)))).toEqual([
      [0, 1, 0, 0xc0],
      [1, 2, 0, 0x80],
    ]);
    expect(flat(checkLaws(bytes(0xe0, 0x80, 0x80)))).toEqual([
      [0, 1, 0, 0xe0],
      [1, 2, 0, 0x80],
      [2, 3, 0, 0x80],
    ]);
    expect(flat(checkLaws(bytes(0xed, 0xa0, 0x80)))).toEqual([
      [0, 1, 0, 0xed],
      [1, 2, 0, 0xa0],
      [2, 3, 0, 0x80],
    ]);
    expect(flat(checkLaws(bytes(0xf4, 0x90, 0x80, 0x80)))).toEqual([
      [0, 1, 0, 0xf4],
      [1, 2, 0, 0x90],
      [2, 3, 0, 0x80],
      [3, 4, 0, 0x80],
    ]);
    expect(flat(checkLaws(bytes(0xf5, 0xff, 0xc1)))).toEqual([
      [0, 1, 0, 0xf5],
      [1, 2, 0, 0xff],
      [2, 3, 0, 0xc1],
    ]);
  });

  it("materializes units by ordinal and rejects bad ordinals", () => {
    const units = decodeUtf8(bytes(0x41, 0xc3, 0xa9));
    expect(unitAt(units, 1)).toEqual({ span: { start: 1, end: 3 }, valid: true, value: 0xe9 });
    expect(Object.isFrozen(unitAt(units, 0))).toBe(true);
    expect(() => unitAt(units, 2)).toThrow(RangeError);
    expect(() => unitAt(units, -1)).toThrow(RangeError);
    expect(() => unitAt(units, 0.5)).toThrow(RangeError);
  });
});

// The exhaustive class and seeded random populations are owned by
// tests/conformance.test.ts so the ordinary suite enumerates each census once.
