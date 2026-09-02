import { describe, expect, it } from "vitest";

import { byteSpan } from "./span.js";
import { SourceSnapshot, type SourceSnapshotOptions, snapshotUtf8Units } from "./snapshot.js";

function bytes(...values: number[]): Uint8Array {
  return Uint8Array.from(values);
}

function snapshot(
  input: Uint8Array,
  overrides: Partial<SourceSnapshotOptions> = {},
): SourceSnapshot {
  const sourceId = overrides.sourceId ?? "main.tex";
  const revision = overrides.revision ?? 0;
  return overrides.declaredEncoding === undefined
    ? new SourceSnapshot(input, { sourceId, revision })
    : new SourceSnapshot(input, {
        sourceId,
        revision,
        declaredEncoding: overrides.declaredEncoding,
      });
}

describe("SourceSnapshot identity", () => {
  it("uses canonical SHA-256 vectors and exposes a frozen serializable identity", () => {
    const empty = snapshot(bytes());
    const abc = snapshot(bytes(0x61, 0x62, 0x63), { sourceId: "chapters/a.tex", revision: 7 });

    expect(empty.contentHash).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
    expect(abc.contentHash).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
    expect(abc.identity).toEqual({
      sourceId: "chapters/a.tex",
      contentHash: abc.contentHash,
      revision: 7,
    });
    expect(JSON.parse(JSON.stringify(abc.identity))).toEqual(abc.identity);
    expect(Object.isFrozen(abc.identity)).toBe(true);
    expect(Object.isFrozen(abc)).toBe(true);
    expect(abc.extent).toEqual(byteSpan(0, 3));
  });

  it("changes the fingerprint for every single-byte mutation in a carrier", () => {
    const input = Uint8Array.from({ length: 32 }, (_, index) => index);
    const original = snapshot(input);
    const collisions: number[] = [];

    for (let index = 0; index < input.length; index++) {
      const changed = input.slice();
      changed[index] = (changed[index] ?? 0) ^ 0xff;
      if (snapshot(changed).contentHash === original.contentHash) {
        collisions.push(index);
      }
    }

    expect(collisions).toEqual([]);
  });

  it("requires the complete identity triple for compatibility", () => {
    const input = bytes(0x41, 0x0a);
    const left = snapshot(input, { sourceId: "a.tex", revision: 4, declaredEncoding: "utf8" });
    const same = snapshot(input, { sourceId: "a.tex", revision: 4, declaredEncoding: "ansinew" });
    const otherSource = snapshot(input, { sourceId: "b.tex", revision: 4 });
    const otherRevision = snapshot(input, { sourceId: "a.tex", revision: 5 });
    const otherBytes = snapshot(bytes(0x42, 0x0a), { sourceId: "a.tex", revision: 4 });

    expect(left.isCompatibleWith(left)).toBe(true);
    expect(left.isCompatibleWith(same)).toBe(true);
    expect(left.isCompatibleWith(otherSource)).toBe(false);
    expect(left.isCompatibleWith(otherRevision)).toBe(false);
    expect(left.isCompatibleWith(otherBytes)).toBe(false);
    expect(left.isCompatibleWith(null)).toBe(false);
    expect(() => {
      left.ensureCompatibleWith(same);
    }).not.toThrow();
    expect(() => {
      left.ensureCompatibleWith(otherSource);
    }).toThrow(/incompatible/);
    expect(() => {
      left.ensureCompatibleWith(otherRevision);
    }).toThrow(/incompatible/);
    expect(() => {
      left.ensureCompatibleWith(otherBytes);
    }).toThrow(/incompatible/);
    expect(() => {
      left.ensureCompatibleWith(undefined);
    }).toThrow(TypeError);
  });

  it("rejects invalid identity metadata", () => {
    for (const sourceId of ["", "  "]) {
      expect(() => snapshot(bytes(), { sourceId })).toThrow(TypeError);
    }
    for (const revision of [-1, 0.5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 53]) {
      expect(() => snapshot(bytes(), { revision })).toThrow(RangeError);
    }
    expect(() => snapshot(bytes(), { declaredEncoding: " " })).toThrow(TypeError);
  });
});

describe("SourceSnapshot byte ownership", () => {
  it("is unaffected by mutation of the input or returned copies", () => {
    const backing = bytes(0xff, 0x61, 0x62, 0x63, 0xee);
    const input = backing.subarray(1, 4);
    const source = snapshot(input);
    const hash = source.contentHash;

    backing[2] = 0x7a;
    expect(source.copyBytes()).toEqual(bytes(0x61, 0x62, 0x63));
    expect(source.contentHash).toBe(hash);

    const returned = source.copyBytes();
    returned[0] = 0x7a;
    expect(source.copyBytes()).toEqual(bytes(0x61, 0x62, 0x63));
    expect(source.copyBytes(byteSpan(1, 3))).toEqual(bytes(0x62, 0x63));
  });

  it("validates spans at the snapshot boundary", () => {
    const source = snapshot(bytes(0x61, 0x62, 0x63));

    expect(() => {
      source.validateSpan(byteSpan(3, 3));
    }).not.toThrow();
    expect(() => {
      source.validateSpan(byteSpan(3, 3), false);
    }).toThrow(/must not be empty/);
    expect(() => {
      source.validateSpan(byteSpan(2, 4));
    }).toThrow(RangeError);
    expect(() => source.copyBytes(byteSpan(2, 4))).toThrow(RangeError);
  });
});

describe("SourceSnapshot decoding facts", () => {
  it("records declarations without applying them", () => {
    const source = snapshot(bytes(0x80), { declaredEncoding: "ansinew" });

    expect(source.decoding.declaredEncoding).toBe("ansinew");
    expect(source.decoding.detectedEncoding).toBe("unknown");
    expect(source.decoding.invalidUtf8ByteOffsets).toEqual([0]);
    expect(source.copyBytes()).toEqual(bytes(0x80));
  });

  it("distinguishes a UTF-8 BOM, compatible bytes, and unknown encoding", () => {
    expect(snapshot(bytes()).decoding.detectedEncoding).toBe("utf-8-compatible");
    expect(snapshot(bytes(0x41, 0xc3, 0xa9)).decoding.detectedEncoding).toBe("utf-8-compatible");
    expect(snapshot(bytes(0x80)).decoding.detectedEncoding).toBe("unknown");

    const bom = snapshot(bytes(0xef, 0xbb, 0xbf, 0x80));
    expect(bom.decoding.hasBom).toBe(true);
    expect(bom.decoding.detectedEncoding).toBe("utf-8-bom");
    expect(bom.decoding.invalidUtf8ByteOffsets).toEqual([3]);
    expect(bom.copyBytes()).toEqual(bytes(0xef, 0xbb, 0xbf, 0x80));
  });

  it("records invalid-byte positions from the cached decoder result", () => {
    const source = snapshot(bytes(0x41, 0xe2, 0x82, 0x42, 0x80));

    expect(source.decoding.invalidUtf8ByteOffsets).toEqual([1, 2, 4]);
    expect(snapshotUtf8Units(source).invalidCount).toBe(3);
    expect(Object.isFrozen(source.decoding.invalidUtf8ByteOffsets)).toBe(true);
    expect(Object.isFrozen(source.decoding)).toBe(true);
  });

  it("counts TeX line endings without treating Unicode separators as terminators", () => {
    const mixed = snapshot(bytes(0x41, 0x0d, 0x0a, 0x42, 0x0d, 0x43, 0x0a));
    expect(mixed.decoding.lineEndings).toEqual({
      style: "mixed",
      lfCount: 1,
      crlfCount: 1,
      crCount: 1,
    });

    const cases = [
      [bytes(), { style: "none", lfCount: 0, crlfCount: 0, crCount: 0 }],
      [bytes(0x0a, 0x0a), { style: "lf", lfCount: 2, crlfCount: 0, crCount: 0 }],
      [bytes(0x0d, 0x0a), { style: "crlf", lfCount: 0, crlfCount: 1, crCount: 0 }],
      [bytes(0x0d, 0x0d), { style: "cr", lfCount: 0, crlfCount: 0, crCount: 2 }],
      [
        bytes(0xc2, 0x85, 0xe2, 0x80, 0xa8, 0xe2, 0x80, 0xa9),
        { style: "none", lfCount: 0, crlfCount: 0, crCount: 0 },
      ],
    ] as const;

    for (const [input, expected] of cases) {
      const facts = snapshot(input).decoding.lineEndings;
      expect(facts).toEqual(expected);
      expect(Object.isFrozen(facts)).toBe(true);
    }
  });
});
