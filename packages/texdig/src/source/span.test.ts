import { describe, expect, it } from "vitest";

import {
  CONVENTIONS,
  type ByteSpan,
  type Convention,
  type Utf16Span,
  atomOffset,
  atomSpan,
  byteOffset,
  byteSpan,
  containsOffset,
  containsSpan,
  crosses,
  intersects,
  isEmpty,
  properlyContains,
  span,
  spanEquals,
  spanLength,
  utf16Offset,
  utf16Span,
} from "./span.js";

/**
 * Independent oracle: the set of unit cells `[k, k + 1)` a span covers. Cell sets
 * decide intersection and crossing for every span, and containment for every
 * non-empty inner span. Containment of an empty inner span is a boundary fact
 * with no cell reading, so it is stated separately from Doccer's definition.
 */
function cells(s: ByteSpan): Set<number> {
  const out = new Set<number>();
  for (let k = s.start; k < s.end; k++) {
    out.add(k);
  }
  return out;
}

function isSubset(inner: Set<number>, outer: Set<number>): boolean {
  for (const k of inner) {
    if (!outer.has(k)) {
      return false;
    }
  }
  return true;
}

function overlaps(a: Set<number>, b: Set<number>): boolean {
  for (const k of a) {
    if (b.has(k)) {
      return true;
    }
  }
  return false;
}

const BOUNDARIES = 6;

/** Every span over boundaries `0..BOUNDARIES - 1`, empties included. */
function carrier(): ByteSpan[] {
  const spans: ByteSpan[] = [];
  for (let start = 0; start < BOUNDARIES; start++) {
    for (let end = start; end < BOUNDARIES; end++) {
      spans.push(byteSpan(start, end));
    }
  }
  return spans;
}

describe("offset and span factories", () => {
  it("brand valid offsets and reject everything else", () => {
    expect(byteOffset(0)).toBe(0);
    expect(byteOffset(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    for (const bad of [-1, 0.5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 53]) {
      expect(() => byteOffset(bad)).toThrow(RangeError);
      expect(() => utf16Offset(bad, "atoms")).toThrow(RangeError);
      expect(() => atomOffset(bad, "atoms")).toThrow(RangeError);
    }
  });

  it("reject conventions outside the closed set at runtime", () => {
    const bogus = "utf8-lossy" as string;
    expect(() => utf16Offset(0, bogus as Convention)).toThrow(RangeError);
    expect(() => atomSpan(0, 1, bogus as Convention)).toThrow(RangeError);
    for (const convention of CONVENTIONS) {
      expect(utf16Offset(3, convention)).toBe(3);
    }
  });

  it("build frozen spans and reject end before start", () => {
    const s = byteSpan(2, 5);
    expect(Object.isFrozen(s)).toBe(true);
    expect(s.start).toBe(2);
    expect(s.end).toBe(5);
    expect(() => span(byteOffset(3), byteOffset(2))).toThrow(RangeError);
    expect(() => utf16Span(3, 2, "atoms")).toThrow(RangeError);
    expect(spanLength(byteSpan(4, 4))).toBe(0);
    expect(isEmpty(byteSpan(4, 4))).toBe(true);
    expect(isEmpty(byteSpan(4, 5))).toBe(false);
  });

  it("keep coordinate spaces and conventions apart at the type level", () => {
    const bytes = byteSpan(0, 4);
    const inAtoms = utf16Span(0, 4, "atoms");
    const inDecoder = utf16Span(0, 4, "textDecoderDefault");

    // @ts-expect-error a UTF-16 offset cannot be tested against a byte span
    expect(containsOffset(bytes, utf16Offset(1, "atoms"))).toBe(true);
    // @ts-expect-error spans under different conventions cannot be compared
    expect(intersects(inAtoms, inDecoder)).toBe(true);
    // @ts-expect-error a byte span is not a UTF-16 span
    const misfiled: Utf16Span<"atoms"> = bytes;
    expect(misfiled).toBe(bytes);
    // @ts-expect-error an atom offset does not brand a UTF-16 span
    expect(spanEquals(inAtoms, span(atomOffset(0, "atoms"), atomOffset(4, "atoms")))).toBe(true);
  });
});

describe("span predicates against the cell oracle", () => {
  const spans = carrier();

  it("containsOffset is half-open membership", () => {
    for (const s of spans) {
      const covered = cells(s);
      for (let k = 0; k < BOUNDARIES; k++) {
        expect(containsOffset(s, byteOffset(k))).toBe(covered.has(k));
      }
    }
  });

  it("intersects and crosses agree with the cell sets on every pair", () => {
    for (const a of spans) {
      const ca = cells(a);
      for (const b of spans) {
        const cb = cells(b);
        const overlap = overlaps(ca, cb);
        expect(intersects(a, b)).toBe(overlap);
        expect(crosses(a, b)).toBe(overlap && !isSubset(cb, ca) && !isSubset(ca, cb));
        expect(intersects(a, b)).toBe(intersects(b, a));
        expect(crosses(a, b)).toBe(crosses(b, a));
      }
    }
  });

  it("containsSpan is cell inclusion for non-empty inners and a boundary fact for empties", () => {
    for (const outer of spans) {
      const co = cells(outer);
      for (const inner of spans) {
        const expected = isEmpty(inner)
          ? outer.start <= inner.start && inner.start <= outer.end
          : isSubset(cells(inner), co);
        expect(containsSpan(outer, inner)).toBe(expected);
        expect(properlyContains(outer, inner)).toBe(expected && !spanEquals(outer, inner));
      }
    }
  });

  it("matches the Doccer TextSpan corner cases", () => {
    const outer = byteSpan(2, 6);
    expect(containsSpan(outer, byteSpan(2, 6))).toBe(true);
    expect(properlyContains(outer, byteSpan(2, 6))).toBe(false);
    expect(properlyContains(outer, byteSpan(2, 5))).toBe(true);
    expect(properlyContains(outer, byteSpan(3, 6))).toBe(true);
    expect(containsSpan(outer, byteSpan(2, 2))).toBe(true);
    expect(containsSpan(outer, byteSpan(6, 6))).toBe(true);
    expect(containsSpan(outer, byteSpan(7, 7))).toBe(false);
    expect(containsSpan(byteSpan(4, 4), byteSpan(4, 4))).toBe(true);
    expect(intersects(byteSpan(4, 4), byteSpan(4, 4))).toBe(false);
    expect(intersects(byteSpan(0, 2), byteSpan(2, 4))).toBe(false);
    expect(crosses(byteSpan(0, 2), byteSpan(2, 4))).toBe(false);
    expect(crosses(byteSpan(0, 3), byteSpan(2, 5))).toBe(true);
    expect(crosses(byteSpan(0, 5), byteSpan(2, 3))).toBe(false);
  });
});
