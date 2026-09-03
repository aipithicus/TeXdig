import { createHash } from "node:crypto";

import { encodeBytes, row } from "./format.ts";

export interface OracleUnit {
  readonly start: number;
  readonly end: number;
  readonly valid: boolean;
  readonly value: number;
}

export const CLASS_REPRESENTATIVES: readonly number[] = Object.freeze([
  0x00, 0x7f, 0x80, 0x8f, 0x90, 0x9f, 0xa0, 0xbf, 0xc0, 0xc1, 0xc2, 0xdf, 0xe0, 0xe1, 0xec, 0xed,
  0xee, 0xef, 0xf0, 0xf1, 0xf3, 0xf4, 0xf5, 0xff,
]);

const fatalDecoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });

export function fatalScalars(input: Uint8Array): readonly number[] | undefined {
  try {
    return Array.from(fatalDecoder.decode(input), (character) => character.codePointAt(0) ?? -1);
  } catch {
    return undefined;
  }
}

export function decodeUtf8Oracle(input: Uint8Array): readonly OracleUnit[] {
  const units: OracleUnit[] = [];
  let index = 0;
  while (index < input.length) {
    const lead = input[index] ?? 0;
    let length = 1;
    let value = lead;
    let valid = lead <= 0x7f;
    let wanted = 0;
    let low = 0x80;
    let high = 0xbf;
    if (!valid) {
      if (lead >= 0xc2 && lead <= 0xdf) {
        wanted = 2;
      } else if (lead >= 0xe0 && lead <= 0xef) {
        wanted = 3;
        low = lead === 0xe0 ? 0xa0 : 0x80;
        high = lead === 0xed ? 0x9f : 0xbf;
      } else if (lead >= 0xf0 && lead <= 0xf4) {
        wanted = 4;
        low = lead === 0xf0 ? 0x90 : 0x80;
        high = lead === 0xf4 ? 0x8f : 0xbf;
      }
      if (wanted !== 0 && index + wanted <= input.length) {
        const second = input[index + 1] ?? 0;
        if (second >= low && second <= high) {
          let scalar = lead & (wanted === 2 ? 0x1f : wanted === 3 ? 0x0f : 0x07);
          scalar = (scalar << 6) | (second & 0x3f);
          valid = true;
          for (let offset = 2; offset < wanted; offset++) {
            const continuation = input[index + offset] ?? 0;
            if (continuation < 0x80 || continuation > 0xbf) {
              valid = false;
              break;
            }
            scalar = (scalar << 6) | (continuation & 0x3f);
          }
          if (valid) {
            length = wanted;
            value = scalar;
          }
        }
      }
    }
    units.push({ start: index, end: index + length, valid, value });
    index += length;
  }
  return units;
}

export function utf8OracleViolation(input: Uint8Array): string | undefined {
  const units = decodeUtf8Oracle(input);
  let cursor = 0;
  const scalars: number[] = [];
  for (const unit of units) {
    if (unit.start !== cursor || unit.end <= unit.start || unit.end > input.length) {
      return "U1 exact tiling";
    }
    cursor = unit.end;
    if (unit.valid) {
      if (unit.value > 0x10_ffff || (unit.value >= 0xd800 && unit.value <= 0xdfff)) {
        return "U3 admissible scalars";
      }
      scalars.push(unit.value);
    } else if (unit.end - unit.start !== 1 || unit.value !== input[unit.start]) {
      return "U1 invalid-byte preservation";
    }
  }
  if (cursor !== input.length) {
    return "U1 exact tiling";
  }
  const fatal = fatalScalars(input);
  if ((fatal === undefined) !== units.some((unit) => !unit.valid)) {
    return "U4 fatal-oracle agreement";
  }
  if (
    fatal !== undefined &&
    (fatal.length !== scalars.length || fatal.some((v, i) => v !== scalars[i]))
  ) {
    return "U4 scalar agreement";
  }
  return undefined;
}

export function utf8PrefixViolation(input: Uint8Array): string | undefined {
  if (input.length < 5) return undefined;
  const prefix = input.subarray(0, input.length - 1);
  const stableBound = prefix.length - 4;
  const full = decodeUtf8Oracle(input).filter((unit) => unit.start <= stableBound);
  const partial = decodeUtf8Oracle(prefix).filter((unit) => unit.start <= stableBound);
  if (full.length !== partial.length) return "U2 prefix stability";
  for (let index = 0; index < full.length; index++) {
    const left = full[index];
    const right = partial[index];
    if (
      left?.start !== right?.start ||
      left?.end !== right?.end ||
      left?.valid !== right?.valid ||
      left?.value !== right?.value
    )
      return "U2 prefix stability";
  }
  return undefined;
}

export function utf8Row(input: Uint8Array): string {
  const units = decodeUtf8Oracle(input);
  const tokens =
    units.length === 0
      ? "U:-"
      : `U:${units.map((unit) => `${String(unit.start)}-${String(unit.end)}:${unit.valid ? "S" : "I"}:${unit.value.toString(16).toUpperCase()}`).join(",")}`;
  const invalid = units.filter((unit) => !unit.valid).length;
  const bom = input.length >= 3 && input[0] === 0xef && input[1] === 0xbb && input[2] === 0xbf;
  return row([encodeBytes(input), tokens, `N:${String(invalid)}`, `M:${bom ? "1" : "0"}`]);
}

export function spanPredicates(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
): readonly boolean[] {
  const a = new Set(Array.from({ length: aEnd - aStart }, (_, index) => aStart + index));
  const b = new Set(Array.from({ length: bEnd - bStart }, (_, index) => bStart + index));
  const subset = (inner: ReadonlySet<number>, outer: ReadonlySet<number>): boolean =>
    [...inner].every((cell) => outer.has(cell));
  const overlap = [...a].some((cell) => b.has(cell));
  const contains = b.size === 0 ? aStart <= bStart && bStart <= aEnd : subset(b, a);
  const equal = aStart === bStart && aEnd === bEnd;
  return [contains, contains && !equal, overlap, overlap && !subset(a, b) && !subset(b, a)];
}

export function lineStartsOracle(input: Uint8Array): readonly number[] {
  const starts = [0];
  for (let index = 0; index < input.length; index++) {
    if (input[index] === 0x0d && input[index + 1] === 0x0a) {
      starts.push(index + 2);
      index++;
    } else if (input[index] === 0x0d || input[index] === 0x0a) {
      starts.push(index + 1);
    }
  }
  return starts;
}

export function lineIndexOracle(starts: readonly number[], offset: number): number {
  let line = 0;
  while (line + 1 < starts.length && (starts[line + 1] ?? 0) <= offset) line++;
  return line;
}

export function topologyBoundaries(
  input: Uint8Array,
): readonly (readonly [number, number, number])[] {
  const units = decodeUtf8Oracle(input);
  const boundaries: [number, number, number][] = [[0, 0, 0]];
  let utf16 = 0;
  for (let index = 0; index < units.length; index++) {
    const unit = units[index];
    if (unit === undefined) continue;
    utf16 += unit.valid && unit.value > 0xffff ? 2 : 1;
    boundaries.push([unit.end, utf16, index + 1]);
  }
  return boundaries;
}

export function sha256(input: Uint8Array): string {
  return createHash("sha256").update(input).digest("hex");
}

export function atomBoundaries(input: Uint8Array): readonly number[] {
  return [0, ...decodeUtf8Oracle(input).map((unit) => unit.end)];
}
