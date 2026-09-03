import { describe, expect, it } from "vitest";

import { atomOffset, byteOffset, byteSpan, utf16Span, type ByteSpan } from "../source/span.js";
import { SourceSlice } from "../source/slice.js";
import { SourceSnapshot } from "../source/snapshot.js";
import { SpanSet } from "./span-set.js";

function snapshot(
  input: readonly number[],
  sourceId = "span-set.tex",
  revision = 1,
  declaredEncoding?: string,
): SourceSnapshot {
  const required = { sourceId, revision };
  return declaredEncoding === undefined
    ? new SourceSnapshot(Uint8Array.from(input), required)
    : new SourceSnapshot(Uint8Array.from(input), { ...required, declaredEncoding });
}

function spans(set: SpanSet): readonly ByteSpan[] {
  return [...set];
}

function expectSet(set: SpanSet, expected: readonly ByteSpan[]): void {
  expect(spans(set)).toEqual(expected);
  expect(set.count).toBe(expected.length);
}

function bitmap(set: SpanSet, length: number): readonly boolean[] {
  return Array.from({ length }, (_, offset) => set.contains(byteOffset(offset)));
}

function fromMask(source: SourceSnapshot, mask: number, length: number): SpanSet {
  const cells: ByteSpan[] = [];
  for (let offset = 0; offset < length; offset++) {
    if ((mask & (1 << offset)) !== 0) cells.push(byteSpan(offset, offset + 1));
  }
  return SpanSet.from(source, cells);
}

describe("SpanSet construction", () => {
  it("drops empties and normalizes unsorted duplicate, nested, overlapping, and adjacent spans", () => {
    const source = snapshot([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const input = [
      byteSpan(7, 8),
      byteSpan(1, 3),
      byteSpan(3, 5),
      byteSpan(2, 4),
      byteSpan(7, 9),
      byteSpan(1, 3),
      byteSpan(5, 5),
      byteSpan(10, 10),
    ];
    const set = SpanSet.from(source, input);
    input.splice(0, input.length, byteSpan(0, 10));

    expect(set.snapshot).toBe(source);
    expectSet(set, [byteSpan(1, 5), byteSpan(7, 9)]);
    expect(set.coverage).toBe(6);
    expect(set.at(0)).toEqual(byteSpan(1, 5));
    expect(() => set.at(-1)).toThrow(/index/);
    expect(() => set.at(2)).toThrow(/index/);
    expect(Object.isFrozen(set)).toBe(true);
    expect(Object.isFrozen(set.at(0))).toBe(true);
  });

  it("defines empty and whole coverage for empty and nonempty snapshots", () => {
    const zero = snapshot([]);
    const source = snapshot([0, 1, 2, 3]);

    expectSet(SpanSet.empty(zero), []);
    expectSet(SpanSet.whole(zero), []);
    expect(SpanSet.whole(zero).coverage).toBe(0);
    expectSet(SpanSet.empty(source), []);
    expectSet(SpanSet.whole(source), [byteSpan(0, 4)]);
    expect(SpanSet.empty(source).complement().equals(SpanSet.whole(source))).toBe(true);
    expect(SpanSet.whole(source).complement().equals(SpanSet.empty(source))).toBe(true);
  });

  it("validates every input span against the snapshot while admitting empty spans", () => {
    const source = snapshot([0, 1, 2, 3]);

    expectSet(SpanSet.from(source, [byteSpan(0, 0), byteSpan(4, 4)]), []);
    expect(() => SpanSet.from(source, [byteSpan(0, 5)])).toThrow(/exceeds/);
    expect(() => byteSpan(3, 2)).toThrow(/precede/);

    if (Date.now() < 0) {
      // @ts-expect-error derived-coordinate spans cannot enter byte coverage
      SpanSet.from(source, [utf16Span(0, 1, "atoms")]);
      // @ts-expect-error derived-coordinate offsets cannot query byte coverage
      SpanSet.whole(source).contains(atomOffset(0, "atoms"));
    }
  });
});

describe("SpanSet algebra", () => {
  it("implements union, intersection, subtraction, and whole-snapshot complement", () => {
    const source = snapshot([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const left = SpanSet.from(source, [byteSpan(1, 5), byteSpan(7, 9)]);
    const right = SpanSet.from(source, [byteSpan(3, 8)]);

    expectSet(left.union(right), [byteSpan(1, 9)]);
    expectSet(left.intersect(right), [byteSpan(3, 5), byteSpan(7, 8)]);
    expectSet(left.subtract(right), [byteSpan(1, 3), byteSpan(8, 9)]);
    expectSet(right.subtract(left), [byteSpan(5, 7)]);
    expectSet(left.complement(), [byteSpan(0, 1), byteSpan(5, 7), byteSpan(9, 10)]);
    expect(left.union(left.complement()).equals(SpanSet.whole(source))).toBe(true);
    expect(left.intersect(left.complement()).equals(SpanSet.empty(source))).toBe(true);
    expect(left.complement().complement().equals(left)).toBe(true);
    expect(left.subtract(left).equals(SpanSet.empty(source))).toBe(true);
  });

  it("uses half-open point containment and returns false outside the basis extent", () => {
    const source = snapshot([0, 1, 2, 3, 4]);
    const set = SpanSet.from(source, [byteSpan(1, 3)]);

    expect(set.contains(byteOffset(0))).toBe(false);
    expect(set.contains(byteOffset(1))).toBe(true);
    expect(set.contains(byteOffset(2))).toBe(true);
    expect(set.contains(byteOffset(3))).toBe(false);
    expect(set.contains(byteOffset(source.byteLength))).toBe(false);
    expect(set.contains(byteOffset(source.byteLength + 100))).toBe(false);
  });

  it("compares compatible normalized values and rejects incompatible binary operands", () => {
    const bytes = [0, 1, 2, 3, 4];
    const source = snapshot(bytes, "same.tex", 4, "utf-8");
    const compatible = snapshot(bytes, "same.tex", 4, "latin1");
    const left = SpanSet.from(source, [byteSpan(1, 2), byteSpan(2, 4)]);
    const equivalent = SpanSet.from(compatible, [byteSpan(1, 4), byteSpan(3, 3)]);

    expect(left.equals(equivalent)).toBe(true);
    expect(left.union(equivalent).equals(left)).toBe(true);
    expect(left.equals(null)).toBe(false);
    expect(left.equals(undefined)).toBe(false);

    const foreignSets = [
      SpanSet.from(snapshot(bytes, "other.tex", 4), [byteSpan(1, 4)]),
      SpanSet.from(snapshot(bytes, "same.tex", 5), [byteSpan(1, 4)]),
      SpanSet.from(snapshot([0, 1, 9, 3, 4], "same.tex", 4), [byteSpan(1, 4)]),
    ];
    for (const foreign of foreignSets) {
      expect(left.equals(foreign)).toBe(false);
      expect(() => left.union(foreign)).toThrow(/incompatible/);
      expect(() => left.intersect(foreign)).toThrow(/incompatible/);
      expect(() => left.subtract(foreign)).toThrow(/incompatible/);
    }
  });

  it("matches every pair of five-cell bitmaps", () => {
    const length = 5;
    const source = snapshot([0, 1, 2, 3, 4]);
    const limit = 1 << length;
    for (let leftMask = 0; leftMask < limit; leftMask++) {
      const left = fromMask(source, leftMask, length);
      expect(left.coverage).toBe(bitmap(left, length).filter(Boolean).length);
      expect(bitmap(left.complement(), length)).toEqual(
        bitmap(left, length).map((value) => !value),
      );
      for (let rightMask = 0; rightMask < limit; rightMask++) {
        const right = fromMask(source, rightMask, length);
        const leftBits = bitmap(left, length);
        const rightBits = bitmap(right, length);
        expect(bitmap(left.union(right), length)).toEqual(
          leftBits.map((value, index) => value || (rightBits[index] ?? false)),
        );
        expect(bitmap(left.intersect(right), length)).toEqual(
          leftBits.map((value, index) => value && (rightBits[index] ?? false)),
        );
        expect(bitmap(left.subtract(right), length)).toEqual(
          leftBits.map((value, index) => value && !(rightBits[index] ?? false)),
        );
      }
    }
  });
});

describe("SpanSet rebasing", () => {
  it("maps normalized coverage to a parent and back without changing material", () => {
    const parent = snapshot([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const slice = SourceSlice.create(parent, byteSpan(2, 8));
    const childSet = SpanSet.from(slice.child, [byteSpan(3, 6), byteSpan(0, 2)]);

    const parentSet = childSet.toParent(slice);
    expectSet(parentSet, [byteSpan(2, 4), byteSpan(5, 8)]);
    expect(parentSet.snapshot).toBe(parent);
    expect(parentSet.toChild(slice).equals(childSet)).toBe(true);
    expect(
      SpanSet.whole(slice.child)
        .toParent(slice)
        .equals(SpanSet.from(parent, [slice.window])),
    ).toBe(true);
  });

  it("rejects outside material until the caller intersects with the window", () => {
    const parent = snapshot([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const slice = SourceSlice.create(parent, byteSpan(2, 8));
    const unscoped = SpanSet.from(parent, [byteSpan(1, 3), byteSpan(7, 9)]);

    expect(() => unscoped.toChild(slice)).toThrow(/intersect with the window/);
    const scoped = unscoped.intersect(SpanSet.from(parent, [slice.window]));
    const child = scoped.toChild(slice);
    expectSet(child, [byteSpan(0, 1), byteSpan(5, 6)]);
    expect(child.toParent(slice).equals(scoped)).toBe(true);
    expectSet(SpanSet.empty(parent).toChild(slice), []);
  });

  it("requires the slice basis and composes through nested slices", () => {
    const root = snapshot([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const outer = SourceSlice.create(root, byteSpan(1, 9));
    const inner = SourceSlice.create(outer.child, byteSpan(2, 6));
    const local = SpanSet.from(inner.child, [byteSpan(0, 1), byteSpan(2, 4)]);

    const rebased = local.toParent(inner).toParent(outer);
    expectSet(rebased, [byteSpan(3, 4), byteSpan(5, 7)]);
    expect(rebased.toChild(outer).toChild(inner).equals(local)).toBe(true);

    const unrelated = SourceSlice.create(snapshot([0, 1, 2, 3], "other.tex"), byteSpan(0, 4));
    expect(() => local.toParent(unrelated)).toThrow(/incompatible/);
    expect(() => SpanSet.whole(root).toChild(unrelated)).toThrow(/incompatible/);
  });
});
