import { describe, expect, it } from "vitest";

import { type Utf8Units, decodeUtf8, listUnits, unitAt } from "./utf8.js";

function bytes(...values: number[]): Uint8Array {
  return Uint8Array.from(values);
}

function hex(input: Uint8Array): string {
  return Array.from(input, (b) => b.toString(16).padStart(2, "0")).join(" ");
}

/** `[start, end, valid, value]` per unit, for compact expectations. */
function flat(units: Utf8Units): [number, number, number, number][] {
  return listUnits(units).map((u) => [u.span.start, u.span.end, u.valid ? 1 : 0, u.value]);
}

/**
 * Oracle: the platform decoder in fatal mode. `ignoreBOM: true` keeps U+FEFF in
 * the output, matching the `atoms` convention. Returns the scalar sequence for
 * well-formed input and `undefined` for ill-formed input.
 */
const fatal = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });

function oracle(input: Uint8Array): number[] | undefined {
  try {
    return Array.from(fatal.decode(input), (ch) => ch.codePointAt(0) ?? -1);
  } catch {
    return undefined;
  }
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

  const expected = oracle(input);
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

/**
 * Prefix stability: a unit whose start leaves room for a full four-byte sequence
 * inside the prefix is decided identically with or without the suffix.
 */
function prefixInstability(input: Uint8Array): string | undefined {
  if (input.length < 5) {
    return undefined;
  }
  const prefix = input.subarray(0, input.length - 1);
  const stableBound = prefix.length - 4;
  const full = flat(decodeUtf8(input)).filter(([start]) => start <= stableBound);
  const partial = flat(decodeUtf8(prefix)).filter(([start]) => start <= stableBound);
  if (full.length !== partial.length) {
    return "unit count differs on the stable prefix";
  }
  for (let i = 0; i < full.length; i++) {
    const a = full[i];
    const b = partial[i];
    if (a === undefined || b === undefined || a.some((v, k) => v !== b[k])) {
      return `unit ${String(i)} differs on the stable prefix`;
    }
  }
  return undefined;
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

/**
 * Both boundary bytes of every class in the Unicode well-formed byte-sequence
 * table. A decoder that is correct on these representatives is correct on every
 * byte, because the table's decisions depend only on the class.
 */
const CLASS_REPRESENTATIVES: readonly number[] = [
  0x00, 0x7f, 0x80, 0x8f, 0x90, 0x9f, 0xa0, 0xbf, 0xc0, 0xc1, 0xc2, 0xdf, 0xe0, 0xe1, 0xec, 0xed,
  0xee, 0xef, 0xf0, 0xf1, 0xf3, 0xf4, 0xf5, 0xff,
];

const CENSUS_TIMEOUT_MS = 60_000;

describe("decodeUtf8 exhaustive class census", () => {
  it(
    "satisfies the laws and the oracle on every class sequence up to length four",
    () => {
      const reps = CLASS_REPRESENTATIVES;
      const base = reps.length;
      const buffer = new Uint8Array(4);
      const failures: string[] = [];
      let sequences = 0;
      for (let length = 1; length <= 4; length++) {
        const total = base ** length;
        for (let code = 0; code < total; code++) {
          let rest = code;
          for (let position = 0; position < length; position++) {
            buffer[position] = reps[rest % base] ?? 0;
            rest = Math.floor(rest / base);
          }
          const input = buffer.subarray(0, length);
          const violation = firstViolation(input);
          if (violation !== undefined && failures.length < 8) {
            failures.push(`${hex(input)}: ${violation}`);
          }
          sequences++;
        }
      }
      expect(failures).toEqual([]);
      expect(sequences).toBe(base + base ** 2 + base ** 3 + base ** 4);
    },
    CENSUS_TIMEOUT_MS,
  );
});

describe("decodeUtf8 seeded random census", () => {
  it(
    "satisfies the laws, the oracle, and prefix stability on longer inputs",
    () => {
      let state = 0x9e3779b9;
      const next = (): number => {
        state ^= state << 13;
        state ^= state >>> 17;
        state ^= state << 5;
        return state >>> 0;
      };
      const reps = CLASS_REPRESENTATIVES;
      const failures: string[] = [];
      for (let round = 0; round < 5000; round++) {
        const length = 5 + (next() % 12);
        const input = new Uint8Array(length);
        const fromClasses = round % 2 === 0;
        for (let k = 0; k < length; k++) {
          input[k] = fromClasses ? (reps[next() % reps.length] ?? 0) : next() % 256;
        }
        const violation = firstViolation(input) ?? prefixInstability(input);
        if (violation !== undefined && failures.length < 8) {
          failures.push(`${hex(input)}: ${violation}`);
        }
      }
      expect(failures).toEqual([]);
    },
    CENSUS_TIMEOUT_MS,
  );
});
