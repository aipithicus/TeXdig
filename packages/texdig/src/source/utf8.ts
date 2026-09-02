/**
 * Byte-preserving UTF-8 decoding.
 *
 * The decoder partitions the input into units: one unit per well-formed scalar
 * (one to four bytes, per the well-formed byte-sequence table of the Unicode
 * Standard, §3.9) and one one-byte unit per invalid byte. Unit spans tile the
 * input exactly. An invalid unit carries its raw byte and no invented scalar;
 * the decoder never synthesizes U+FFFD, while the literal sequence `EF BF BD`
 * decodes to U+FFFD like any other scalar. A byte-order mark is preserved as a
 * unit and reported as a fact rather than stripped.
 *
 * Per decision D29 the units are the atoms of the `atoms` convention. Maximal
 * ill-formed subparts, which the `TextDecoder` conventions need, are a grouping
 * computed over invalid units when a consumer asks for them; they are never unit
 * identity. `TextDecoder` itself is disqualified as the decoder because
 * replacement loses byte identity, but it serves as the oracle in the tests.
 *
 * Storage is columnar: three typed arrays indexed by unit ordinal. The topology
 * decorates these units into atoms without decoding a second time.
 */

import { byteSpan, type ByteSpan } from "./span.js";

export interface Utf8Units {
  readonly byteLength: number;
  /** Number of units. Equals the number of atoms under the `atoms` convention. */
  readonly count: number;
  /** Number of invalid units, each exactly one byte. */
  readonly invalidCount: number;
  /** True when the input begins with the encoded byte-order mark `EF BB BF`. */
  readonly hasBom: boolean;
  /**
   * `count + 1` entries. Unit `i` covers bytes `[starts[i], starts[i + 1])`, and
   * `starts[count]` equals `byteLength`.
   */
  readonly starts: Readonly<Uint32Array>;
  /** The scalar value of a well-formed unit, or the raw byte of an invalid unit. */
  readonly values: Readonly<Uint32Array>;
  /** `1` for a well-formed scalar, `0` for a preserved invalid byte. */
  readonly valid: Readonly<Uint8Array>;
}

/** One unit, materialized for callers that prefer records to columns. */
export interface Utf8Unit {
  readonly span: ByteSpan;
  readonly valid: boolean;
  readonly value: number;
}

/**
 * Decodes `bytes` into units. Runs in one pass over the input and allocates only
 * the three result columns.
 */
export function decodeUtf8(bytes: Uint8Array): Utf8Units {
  const n = bytes.length;
  const starts = new Uint32Array(n + 1);
  const values = new Uint32Array(n);
  const valid = new Uint8Array(n);
  let count = 0;
  let invalidCount = 0;
  let i = 0;

  while (i < n) {
    const lead = bytes[i] ?? 0;
    let unitLength = 1;
    let value = lead;
    let wellFormed = lead <= 0x7f;

    if (!wellFormed) {
      // Unicode Table 3-7: the lead byte fixes the sequence length and the range
      // the second byte may take; every later byte is an ordinary continuation.
      let sequenceLength = 0;
      let secondLow = 0x80;
      let secondHigh = 0xbf;
      if (lead >= 0xc2 && lead <= 0xdf) {
        sequenceLength = 2;
      } else if (lead >= 0xe0 && lead <= 0xef) {
        sequenceLength = 3;
        if (lead === 0xe0) {
          secondLow = 0xa0;
        } else if (lead === 0xed) {
          secondHigh = 0x9f;
        }
      } else if (lead >= 0xf0 && lead <= 0xf4) {
        sequenceLength = 4;
        if (lead === 0xf0) {
          secondLow = 0x90;
        } else if (lead === 0xf4) {
          secondHigh = 0x8f;
        }
      }

      if (sequenceLength !== 0 && i + sequenceLength <= n) {
        const second = bytes[i + 1] ?? 0;
        if (second >= secondLow && second <= secondHigh) {
          let scalar = lead & (sequenceLength === 2 ? 0x1f : sequenceLength === 3 ? 0x0f : 0x07);
          scalar = (scalar << 6) | (second & 0x3f);
          let continuationsOk = true;
          for (let k = 2; k < sequenceLength; k++) {
            const continuation = bytes[i + k] ?? 0;
            if (continuation < 0x80 || continuation > 0xbf) {
              continuationsOk = false;
              break;
            }
            scalar = (scalar << 6) | (continuation & 0x3f);
          }
          if (continuationsOk) {
            wellFormed = true;
            unitLength = sequenceLength;
            value = scalar;
          }
        }
      }
    }

    starts[count] = i;
    values[count] = value;
    valid[count] = wellFormed ? 1 : 0;
    if (!wellFormed) {
      invalidCount++;
    }
    count++;
    i += unitLength;
  }
  starts[count] = n;

  const hasBom =
    n >= 3 && (bytes[0] ?? 0) === 0xef && (bytes[1] ?? 0) === 0xbb && (bytes[2] ?? 0) === 0xbf;

  return Object.freeze({
    byteLength: n,
    count,
    invalidCount,
    hasBom,
    starts: starts.slice(0, count + 1),
    values: values.slice(0, count),
    valid: valid.slice(0, count),
  });
}

/** Materializes unit `index`. Throws `RangeError` outside `[0, count)`. */
export function unitAt(units: Utf8Units, index: number): Utf8Unit {
  if (!Number.isSafeInteger(index) || index < 0 || index >= units.count) {
    throw new RangeError(
      `unit index out of range: ${String(index)} of ${String(units.count)} units`,
    );
  }
  const start = units.starts[index] ?? 0;
  const end = units.starts[index + 1] ?? 0;
  return Object.freeze({
    span: byteSpan(start, end),
    valid: units.valid[index] === 1,
    value: units.values[index] ?? 0,
  });
}

/** Materializes every unit in order. Intended for tests and small inputs. */
export function listUnits(units: Utf8Units): readonly Utf8Unit[] {
  return Array.from({ length: units.count }, (_, index) => unitAt(units, index));
}
