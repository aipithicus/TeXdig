import { describe, expect, it } from "vitest";

import {
  atomOffset,
  byteOffset,
  byteSpan,
  utf16Span,
  type ByteOffset,
  type ByteSpan,
} from "./span.js";
import { SourceSlice } from "./slice.js";
import { SourceSnapshot, type SourceSnapshotOptions } from "./snapshot.js";
import { SourceTopology } from "./topology.js";

function bytes(...values: number[]): Uint8Array {
  return Uint8Array.from(values);
}

function snapshot(
  input: Uint8Array,
  overrides: Partial<SourceSnapshotOptions> = {},
): SourceSnapshot {
  const sourceId = overrides.sourceId ?? "root.tex";
  const revision = overrides.revision ?? 3;
  return overrides.declaredEncoding === undefined
    ? new SourceSnapshot(input, { sourceId, revision })
    : new SourceSnapshot(input, {
        sourceId,
        revision,
        declaredEncoding: overrides.declaredEncoding,
      });
}

describe("SourceSlice construction", () => {
  it("mints a distinct deterministic child snapshot over shared owned bytes", () => {
    const backing = bytes(0xff, 0x41, 0xc3, 0xa9, 0x0a, 0xf0, 0x9f, 0x98, 0x80, 0x42, 0xee);
    const parent = snapshot(backing.subarray(1, 10), { declaredEncoding: "utf-8" });
    const slice = SourceSlice.create(parent, byteSpan(1, 8));
    const again = SourceSlice.create(parent, byteSpan(1, 8));

    expect(slice.parent).toBe(parent);
    expect(slice.window).toEqual(byteSpan(1, 8));
    expect(slice.child.sourceId).toBe("root.tex#1-8");
    expect(slice.child.revision).toBe(3);
    expect(slice.child.byteLength).toBe(7);
    expect(slice.child.copyBytes()).toEqual(bytes(0xc3, 0xa9, 0x0a, 0xf0, 0x9f, 0x98, 0x80));
    expect(slice.child.decoding.declaredEncoding).toBe("utf-8");
    expect(parent.isCompatibleWith(slice.child)).toBe(false);
    expect(slice.child.isCompatibleWith(again.child)).toBe(true);
    expect(slice.child).not.toBe(again.child);

    const independentlyOwned = snapshot(slice.child.copyBytes(), {
      sourceId: slice.child.sourceId,
      revision: slice.child.revision,
      declaredEncoding: "utf-8",
    });
    expect(slice.child.isCompatibleWith(independentlyOwned)).toBe(true);

    backing.fill(0);
    expect(slice.child.copyBytes()).toEqual(bytes(0xc3, 0xa9, 0x0a, 0xf0, 0x9f, 0x98, 0x80));
    const returned = slice.child.copyBytes();
    returned.fill(0);
    expect(slice.child.copyBytes()).toEqual(bytes(0xc3, 0xa9, 0x0a, 0xf0, 0x9f, 0x98, 0x80));

    const topology = SourceTopology.of(slice.child);
    expect(
      topology.atoms.map((atom) => [atom.span, atom.value, atom.valid, atom.lineIndex]),
    ).toEqual([
      [byteSpan(0, 2), 0xe9, true, 0],
      [byteSpan(2, 3), 0x0a, true, 0],
      [byteSpan(3, 7), 0x1f600, true, 1],
    ]);
    expect(topology.lineStarts).toEqual([0, 3]);
    expect(Object.isFrozen(slice)).toBe(true);
    expect(Object.isFrozen(slice.window)).toBe(true);
  });

  it("accepts empty and invalid-byte windows but rejects a split valid scalar", () => {
    const parent = snapshot(bytes(0x41, 0xc3, 0xa9, 0x80, 0x42));

    expect(SourceSlice.create(parent, byteSpan(1, 1)).child.copyBytes()).toEqual(bytes());
    expect(SourceSlice.create(parent, byteSpan(3, 3)).child.copyBytes()).toEqual(bytes());
    const invalidByte = SourceSlice.create(parent, byteSpan(3, 4)).child;
    expect(invalidByte.copyBytes()).toEqual(bytes(0x80));
    expect(invalidByte.decoding.invalidUtf8ByteOffsets).toEqual([0]);
    expect(() => SourceSlice.create(parent, byteSpan(2, 2))).toThrow(/inside/);
    expect(() => SourceSlice.create(parent, byteSpan(1, 2))).toThrow(/inside/);
    expect(() => SourceSlice.create(parent, byteSpan(2, 3))).toThrow(/inside/);
    expect(() => SourceSlice.create(parent, byteSpan(0, 6))).toThrow(RangeError);

    const whole = SourceSlice.create(parent, parent.extent);
    expect(whole.child.copyBytes()).toEqual(parent.copyBytes());
    expect(whole.child.isCompatibleWith(parent)).toBe(false);
  });
});

describe("SourceSlice rebasing", () => {
  it("obeys both inverse laws for offsets and spans, including empty endpoints", () => {
    const parent = snapshot(bytes(0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38));
    const slice = SourceSlice.create(parent, byteSpan(2, 7));

    for (let child = 0; child <= slice.child.byteLength; child++) {
      const childOffset = byteOffset(child);
      expect(slice.toChild(slice.toParent(childOffset))).toBe(childOffset);
    }
    for (let parentOffset = slice.window.start; parentOffset <= slice.window.end; parentOffset++) {
      const offset = byteOffset(parentOffset);
      expect(slice.toParent(slice.toChild(offset))).toBe(offset);
    }

    for (let start = 0; start <= slice.child.byteLength; start++) {
      for (let end = start; end <= slice.child.byteLength; end++) {
        const childSpan = byteSpan(start, end);
        const parentSpan = slice.toParent(childSpan);
        expect(parentSpan).toEqual(byteSpan(start + 2, end + 2));
        expect(slice.toChild(parentSpan)).toEqual(childSpan);
        expect(Object.isFrozen(parentSpan)).toBe(true);
      }
    }

    const parentOffset: ByteOffset = slice.toParent(byteOffset(0));
    const childSpan: ByteSpan = slice.toChild(byteSpan(2, 7));
    expect(parentOffset).toBe(2);
    expect(childSpan).toEqual(byteSpan(0, 5));

    if (Date.now() < 0) {
      // @ts-expect-error atom offsets cannot enter byte-coordinate rebasing
      slice.toParent(atomOffset(0, "atoms"));
      // @ts-expect-error UTF-16 spans cannot enter byte-coordinate rebasing
      slice.toChild(utf16Span(0, 1, "atoms"));
    }
  });

  it("rejects downward geometry outside the window with an intersection instruction", () => {
    const parent = snapshot(bytes(0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38));
    const slice = SourceSlice.create(parent, byteSpan(2, 7));

    expect(() => slice.toChild(byteOffset(1))).toThrow(/outside slice window/);
    expect(() => slice.toChild(byteOffset(8))).toThrow(/outside slice window/);
    expect(() => slice.toChild(byteSpan(1, 3))).toThrow(/intersect with the window/);
    expect(() => slice.toChild(byteSpan(6, 8))).toThrow(/intersect with the window/);
    expect(() => slice.toChild(byteSpan(1, 8))).toThrow(/intersect with the window/);
    expect(() => slice.toParent(byteOffset(6))).toThrow(RangeError);
    expect(() => slice.toParent(byteSpan(0, 6))).toThrow(RangeError);
  });

  it("requires mapped spans to retain valid scalar boundaries", () => {
    const parent = snapshot(bytes(0x41, 0xc3, 0xa9, 0x42));
    const slice = SourceSlice.create(parent, byteSpan(1, 4));

    expect(() => slice.toParent(byteSpan(1, 3))).toThrow(/inside/);
    expect(() => slice.toChild(byteSpan(2, 4))).toThrow(/inside/);
    expect(slice.toParent(byteOffset(1))).toBe(2);
    expect(slice.toChild(byteOffset(2))).toBe(1);
  });

  it("composes through nested slices", () => {
    const root = snapshot(bytes(0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39));
    const outer = SourceSlice.create(root, byteSpan(2, 9));
    const inner = SourceSlice.create(outer.child, byteSpan(1, 5));
    const direct = SourceSlice.create(root, byteSpan(3, 7));

    for (let offset = 0; offset <= inner.child.byteLength; offset++) {
      const local = byteOffset(offset);
      expect(outer.toParent(inner.toParent(local))).toBe(direct.toParent(local));
    }
    for (let start = 0; start <= inner.child.byteLength; start++) {
      for (let end = start; end <= inner.child.byteLength; end++) {
        const local = byteSpan(start, end);
        expect(outer.toParent(inner.toParent(local))).toEqual(direct.toParent(local));
      }
    }
    expect(inner.child.copyBytes()).toEqual(direct.child.copyBytes());
  });
});

function sameSpan(left: ByteSpan, right: ByteSpan): boolean {
  return left.start === right.start && left.end === right.end;
}

function sliceLawViolation(input: Uint8Array, random: () => number): string | undefined {
  const parent = snapshot(input);
  const topology = SourceTopology.of(parent);
  const boundaries = [0, ...topology.atoms.map((atom) => atom.span.end)];
  const startIndex = random() % boundaries.length;
  const endIndex = startIndex + (random() % (boundaries.length - startIndex));
  const windowStart = boundaries[startIndex] ?? 0;
  const windowEnd = boundaries[endIndex] ?? windowStart;
  const slice = SourceSlice.create(parent, byteSpan(windowStart, windowEnd));
  const childBoundaries = boundaries
    .slice(startIndex, endIndex + 1)
    .map((value) => value - windowStart);

  if (!sameNumbers(slice.child.copyBytes(), input.slice(windowStart, windowEnd))) {
    return "child bytes differ from the selected parent window";
  }

  for (const childBoundary of childBoundaries) {
    const childOffset = byteOffset(childBoundary);
    const parentOffset = byteOffset(windowStart + childBoundary);
    if (
      slice.toParent(childOffset) !== parentOffset ||
      slice.toChild(parentOffset) !== childOffset ||
      slice.toChild(slice.toParent(childOffset)) !== childOffset
    ) {
      return `offset ${String(childBoundary)} failed an inverse law`;
    }
  }

  for (let start = 0; start < childBoundaries.length; start++) {
    for (let end = start; end < childBoundaries.length; end++) {
      const childSpan = byteSpan(childBoundaries[start] ?? 0, childBoundaries[end] ?? 0);
      const expectedParent = byteSpan(windowStart + childSpan.start, windowStart + childSpan.end);
      const actualParent = slice.toParent(childSpan);
      if (
        !sameSpan(actualParent, expectedParent) ||
        !sameSpan(slice.toChild(actualParent), childSpan)
      ) {
        return `span [${String(childSpan.start)}, ${String(childSpan.end)}) failed an inverse law`;
      }
    }
  }

  if (windowStart > 0 && !throwsRangeError(() => slice.toChild(byteOffset(windowStart - 1)))) {
    return "offset before the window was accepted";
  }
  if (
    windowEnd < input.length &&
    !throwsRangeError(() => slice.toChild(byteOffset(windowEnd + 1)))
  ) {
    return "offset after the window was accepted";
  }
  return undefined;
}

function sameNumbers(left: Uint8Array, right: Uint8Array): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function throwsRangeError(operation: () => unknown): boolean {
  try {
    operation();
    return false;
  } catch (error: unknown) {
    return error instanceof RangeError;
  }
}

describe("SourceSlice seeded laws", () => {
  it("preserves bytes and both inverse laws over malformed-byte windows", () => {
    let state = 0x51_ce_2026;
    function random(): number {
      state = (Math.imul(state, 1_103_515_245) + 12_345) >>> 0;
      return state;
    }

    let violation: string | undefined;
    for (let caseIndex = 0; caseIndex < 500 && violation === undefined; caseIndex++) {
      const input = new Uint8Array(random() % 25);
      for (let index = 0; index < input.length; index++) {
        input[index] = random() & 0xff;
      }
      const problem = sliceLawViolation(input, random);
      if (problem !== undefined) {
        violation = `case ${String(caseIndex)} (${Array.from(input).join(" ")}): ${problem}`;
      }
    }

    expect(violation).toBeUndefined();
  });
});
