import { describe, expect, it } from "vitest";

import {
  lineIndexOracle as oracleLineIndex,
  lineStartsOracle as oracleLineStarts,
} from "../../../../scripts/conformance/oracles.ts";
import {
  atomOffset,
  atomSpan,
  byteOffset,
  byteSpan,
  utf16Offset,
  utf16Span,
  type AtomSpan,
  type Utf16Span,
} from "./span.js";
import { SourceSnapshot, snapshotUtf8Units } from "./snapshot.js";
import { SourceTopology, type SourceAtom } from "./topology.js";

function bytes(...values: number[]): Uint8Array {
  return Uint8Array.from(values);
}

function snapshot(input: Uint8Array): SourceSnapshot {
  return new SourceSnapshot(input, { sourceId: "topology.tex", revision: 0 });
}

function atomTuple(atom: SourceAtom): [number, number, number, boolean, number] {
  return [atom.span.start, atom.span.end, atom.value, atom.valid, atom.lineIndex];
}

function sameNumbers(left: readonly number[], right: readonly number[]): boolean {
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

describe("SourceTopology atoms", () => {
  it("decorates the snapshot's cached units and caches one frozen topology", () => {
    const input = bytes(
      0xef,
      0xbb,
      0xbf,
      0x41,
      0xf0,
      0x9f,
      0x98,
      0x80,
      0xe2,
      0x82,
      0x0d,
      0x0a,
      0x42,
    );
    const source = snapshot(input);
    const topology = SourceTopology.of(source);

    expect(SourceTopology.of(source)).toBe(topology);
    expect(SourceTopology.of(snapshot(input))).not.toBe(topology);
    expect(topology.snapshot).toBe(source);
    expect(topology.byteLength).toBe(13);
    expect(topology.atomCount).toBe(8);
    expect(topology.utf16Length).toBe(9);
    expect(topology.lineStarts).toEqual([0, 12]);
    expect(topology.listAtoms().map(atomTuple)).toEqual([
      [0, 3, 0xfeff, true, 0],
      [3, 4, 0x41, true, 0],
      [4, 8, 0x1f600, true, 0],
      [8, 9, 0xe2, false, 0],
      [9, 10, 0x82, false, 0],
      [10, 11, 0x0d, true, 0],
      [11, 12, 0x0a, true, 0],
      [12, 13, 0x42, true, 1],
    ]);

    expect(Object.isFrozen(topology)).toBe(true);
    expect(Object.isFrozen(topology.listAtoms())).toBe(true);
    expect(Object.isFrozen(topology.lineStarts)).toBe(true);
    expect(
      topology.listAtoms().every((atom) => Object.isFrozen(atom) && Object.isFrozen(atom.span)),
    ).toBe(true);
  });

  it("materializes atoms by ordinal on demand and rejects bad ordinals", () => {
    const topology = SourceTopology.of(snapshot(bytes(0x41, 0xc3, 0xa9, 0x0a, 0x80)));

    expect(topology.atomAt(1)).toEqual({
      span: byteSpan(1, 3),
      value: 0xe9,
      valid: true,
      lineIndex: 0,
    });
    expect(topology.atomAt(3)).toEqual({
      span: byteSpan(4, 5),
      value: 0x80,
      valid: false,
      lineIndex: 1,
    });
    expect(Object.isFrozen(topology.atomAt(0))).toBe(true);
    expect(topology.listAtoms().map(atomTuple)).toEqual(
      [0, 1, 2, 3].map((index) => atomTuple(topology.atomAt(index))),
    );
    expect(() => topology.atomAt(4)).toThrow(RangeError);
    expect(() => topology.atomAt(-1)).toThrow(RangeError);
    expect(() => topology.atomAt(0.5)).toThrow(RangeError);
  });

  it("does not synthesize replacement scalars for malformed bytes", () => {
    const topology = SourceTopology.of(snapshot(bytes(0xef, 0xbf, 0xbd, 0x80, 0xff)));

    expect(topology.listAtoms().map((atom) => [atom.value, atom.valid])).toEqual([
      [0xfffd, true],
      [0x80, false],
      [0xff, false],
    ]);
  });
});

function firstLineViolation(input: Uint8Array): string | undefined {
  const topology = SourceTopology.of(snapshot(input));
  const starts = oracleLineStarts(input);
  if (!sameNumbers(topology.lineStarts, starts)) {
    return `line starts: got ${String(topology.lineStarts)}, expected ${String(starts)}`;
  }

  for (let line = 0; line < starts.length; line++) {
    const expectedStart = starts[line] ?? 0;
    const expectedEnd = starts[line + 1] ?? input.length;
    const extent = topology.getLineExtent(line);
    if (extent.start !== expectedStart || extent.end !== expectedEnd) {
      return `line ${String(line)} extent [${String(extent.start)}, ${String(extent.end)}) != [${String(expectedStart)}, ${String(expectedEnd)})`;
    }
  }

  for (let offset = 0; offset <= input.length; offset++) {
    const expected = oracleLineIndex(starts, offset);
    if (topology.getLineIndex(byteOffset(offset)) !== expected) {
      return `line index at ${String(offset)} != ${String(expected)}`;
    }
    // ASCII inputs: every offset is an atom boundary and every unit has width one.
    const position = topology.lineColumn(byteOffset(offset), "atoms");
    const expectedColumn = offset - (starts[expected] ?? 0);
    if (
      position.lineIndex !== expected ||
      position.byteColumn !== expectedColumn ||
      position.atomColumn !== expectedColumn ||
      position.utf16Column !== expectedColumn
    ) {
      return `line/column at ${String(offset)} != line ${String(expected)} column ${String(expectedColumn)}`;
    }
  }

  for (let start = 0; start <= input.length; start++) {
    for (let end = start; end <= input.length; end++) {
      const expectedStart = oracleLineIndex(starts, start);
      const expectedLast = start === end ? expectedStart : oracleLineIndex(starts, end - 1);
      const projected = topology.project(byteSpan(start, end));
      if (
        projected.start !== expectedStart ||
        projected.end !== expectedLast + 1 ||
        projected.count !== expectedLast + 1 - expectedStart
      ) {
        return `projection [${String(start)}, ${String(end)}) was [${String(projected.start)}, ${String(projected.end)})`;
      }
    }
  }
  return undefined;
}

const LINE_PIECES: readonly (readonly number[])[] = [[0x41], [0x0d], [0x0a], [0x0d, 0x0a]];

function visitLineMixes(
  maximumPieces: number,
  visit: (input: Uint8Array) => string | undefined,
): string | undefined {
  const current: number[] = [];

  function walk(depth: number): string | undefined {
    const violation = visit(Uint8Array.from(current));
    if (violation !== undefined || depth === maximumPieces) {
      return violation;
    }
    for (const piece of LINE_PIECES) {
      const originalLength = current.length;
      current.push(...piece);
      const nested = walk(depth + 1);
      current.length = originalLength;
      if (nested !== undefined) {
        return nested;
      }
    }
    return undefined;
  }

  return walk(0);
}

describe("SourceTopology TeX lines", () => {
  it("represents empty input and the EOF line after a trailing terminator", () => {
    const empty = SourceTopology.of(snapshot(bytes()));
    expect(empty.lineStarts).toEqual([0]);
    expect(empty.getLineExtent(0)).toEqual(byteSpan(0, 0));
    expect(empty.project(byteSpan(0, 0))).toEqual({ start: 0, end: 1, count: 1 });

    const trailing = SourceTopology.of(snapshot(bytes(0x41, 0x0d, 0x0a)));
    expect(trailing.lineStarts).toEqual([0, 3]);
    expect(trailing.getLineExtent(0)).toEqual(byteSpan(0, 3));
    expect(trailing.getLineExtent(1)).toEqual(byteSpan(3, 3));
    expect(trailing.project(byteSpan(0, 3))).toEqual({ start: 0, end: 1, count: 1 });
    expect(trailing.project(byteSpan(3, 3))).toEqual({ start: 1, end: 2, count: 1 });
  });

  it("treats NEL, LS, PS, and invalid bytes as ordinary line material", () => {
    const input = bytes(0xc2, 0x85, 0xe2, 0x80, 0xa8, 0xe2, 0x80, 0xa9, 0x80, 0x0a);
    const topology = SourceTopology.of(snapshot(input));

    expect(topology.lineStarts).toEqual([0, 10]);
    expect(
      topology
        .listAtoms()
        .slice(0, 4)
        .map((atom) => atom.lineIndex),
    ).toEqual([0, 0, 0, 0]);
    expect(topology.getLineExtent(0)).toEqual(byteSpan(0, 10));
    expect(topology.getLineExtent(1)).toEqual(byteSpan(10, 10));
  });

  it("matches a byte-level oracle over every CR, LF, and CRLF mix to length five", () => {
    const violation = visitLineMixes(5, (input) => firstLineViolation(input));
    expect(violation).toBeUndefined();
  });

  it("states line and column in bytes, atoms, and UTF-16 units", () => {
    // A, é, LF, U+1F600, B
    const topology = SourceTopology.of(
      snapshot(bytes(0x41, 0xc3, 0xa9, 0x0a, 0xf0, 0x9f, 0x98, 0x80, 0x42)),
    );

    expect(topology.lineColumn(byteOffset(0), "atoms")).toEqual({
      lineIndex: 0,
      byteColumn: 0,
      atomColumn: 0,
      utf16Column: 0,
    });
    expect(topology.lineColumn(byteOffset(3), "atoms")).toEqual({
      lineIndex: 0,
      byteColumn: 3,
      atomColumn: 2,
      utf16Column: 2,
    });
    expect(topology.lineColumn(byteOffset(4), "atoms")).toEqual({
      lineIndex: 1,
      byteColumn: 0,
      atomColumn: 0,
      utf16Column: 0,
    });
    expect(topology.lineColumn(byteOffset(8), "atoms")).toEqual({
      lineIndex: 1,
      byteColumn: 4,
      atomColumn: 1,
      utf16Column: 2,
    });
    expect(topology.lineColumn(byteOffset(9), "atoms")).toEqual({
      lineIndex: 1,
      byteColumn: 5,
      atomColumn: 2,
      utf16Column: 3,
    });
    expect(Object.isFrozen(topology.lineColumn(byteOffset(9), "atoms"))).toBe(true);
    expect(() => topology.lineColumn(byteOffset(2), "atoms")).toThrow(/inside/);
    expect(() => topology.lineColumn(byteOffset(10), "atoms")).toThrow(RangeError);
  });

  it("rejects invalid line and span geometry", () => {
    const topology = SourceTopology.of(snapshot(bytes(0x41)));
    expect(() => topology.getLineIndex(byteOffset(2))).toThrow(RangeError);
    expect(() => topology.getLineExtent(-1)).toThrow(RangeError);
    expect(() => topology.getLineExtent(1)).toThrow(RangeError);
    expect(() => topology.project(byteSpan(0, 2))).toThrow(RangeError);
  });
});

function conversionViolation(input: Uint8Array): string | undefined {
  const source = snapshot(input);
  const units = snapshotUtf8Units(source);
  const topology = SourceTopology.of(source);
  const boundaryBytes: number[] = [];
  const boundaryUtf16: number[] = [];
  let expectedUtf16 = 0;

  for (let index = 0; index <= units.count; index++) {
    const byte = units.starts[index] ?? 0;
    const bytePosition = byteOffset(byte);
    const atomPosition = atomOffset(index, "atoms");
    const utf16Position = utf16Offset(expectedUtf16, "atoms");
    boundaryBytes.push(byte);
    boundaryUtf16.push(expectedUtf16);

    if (
      topology.byteToAtom(bytePosition, "atoms") !== index ||
      topology.atomToByte(atomPosition, "atoms") !== byte ||
      topology.byteToUtf16(bytePosition, "atoms") !== expectedUtf16 ||
      topology.utf16ToByte(utf16Position, "atoms") !== byte ||
      topology.atomToUtf16(atomPosition, "atoms") !== expectedUtf16 ||
      topology.utf16ToAtom(utf16Position, "atoms") !== index
    ) {
      return `boundary ${String(index)} does not round-trip`;
    }

    if (index === units.count) {
      break;
    }

    const end = units.starts[index + 1] ?? byte;
    for (let interior = byte + 1; interior < end; interior++) {
      const position = byteOffset(interior);
      if (
        !throwsRangeError(() => {
          topology.validateByteOffset(position);
        }) ||
        !throwsRangeError(() => topology.byteToAtom(position, "atoms")) ||
        !throwsRangeError(() => topology.byteToUtf16(position, "atoms")) ||
        !throwsRangeError(() => topology.lineColumn(position, "atoms"))
      ) {
        return `interior byte ${String(interior)} was accepted`;
      }
    }

    const width = units.valid[index] === 1 && (units.values[index] ?? 0) > 0xffff ? 2 : 1;
    if (width === 2) {
      const interior = utf16Offset(expectedUtf16 + 1, "atoms");
      if (
        !throwsRangeError(() => topology.utf16ToByte(interior, "atoms")) ||
        !throwsRangeError(() => topology.utf16ToAtom(interior, "atoms"))
      ) {
        return `interior UTF-16 offset ${String(interior)} was accepted`;
      }
    }
    expectedUtf16 += width;
  }

  if (topology.utf16Length !== expectedUtf16 || topology.atomCount !== units.count) {
    return "derived lengths disagree with the cached units";
  }

  // Line and column at every boundary, from the oracle line starts and the
  // widths accumulated above rather than from the topology's own conversions.
  const starts = oracleLineStarts(input);
  for (let index = 0; index < boundaryBytes.length; index++) {
    const byte = boundaryBytes[index] ?? 0;
    const line = oracleLineIndex(starts, byte);
    const lineStart = starts[line] ?? 0;
    const startIndex = boundaryBytes.indexOf(lineStart);
    if (startIndex < 0) {
      return `line start ${String(lineStart)} is not a unit boundary`;
    }
    const position = topology.lineColumn(byteOffset(byte), "atoms");
    if (
      position.lineIndex !== line ||
      position.byteColumn !== byte - lineStart ||
      position.atomColumn !== index - startIndex ||
      position.utf16Column !== (boundaryUtf16[index] ?? 0) - (boundaryUtf16[startIndex] ?? 0)
    ) {
      return `line/column at byte ${String(byte)} disagrees with the oracle`;
    }
  }
  return undefined;
}

function seededConversionCensus(): string | undefined {
  let state = 0x5eed_29c0;
  function random(): number {
    state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
    return state;
  }

  for (let caseIndex = 0; caseIndex < 1_000; caseIndex++) {
    const input = new Uint8Array(random() % 25);
    for (let index = 0; index < input.length; index++) {
      input[index] = random() & 0xff;
    }
    const violation = conversionViolation(input);
    if (violation !== undefined) {
      return `case ${String(caseIndex)} (${Array.from(input).join(" ")}): ${violation}`;
    }
  }
  return undefined;
}

describe("SourceTopology atoms coordinate conversions", () => {
  it("maps every pairwise offset and span conversion at exact atom boundaries", () => {
    const topology = SourceTopology.of(
      snapshot(bytes(0x41, 0xc3, 0xa9, 0xf0, 0x9f, 0x98, 0x80, 0xe2, 0x82)),
    );
    const byteStarts = [0, 1, 3, 7, 8, 9];
    const utf16Starts = [0, 1, 2, 4, 5, 6];

    for (let start = 0; start < byteStarts.length; start++) {
      for (let end = start; end < byteStarts.length; end++) {
        const byteCoordinates = byteSpan(byteStarts[start] ?? 0, byteStarts[end] ?? 0);
        const atomCoordinates = atomSpan(start, end, "atoms");
        const utf16Coordinates = utf16Span(utf16Starts[start] ?? 0, utf16Starts[end] ?? 0, "atoms");

        expect(topology.byteSpanToAtom(byteCoordinates, "atoms")).toEqual(atomCoordinates);
        expect(topology.atomSpanToByte(atomCoordinates, "atoms")).toEqual(byteCoordinates);
        expect(topology.byteSpanToUtf16(byteCoordinates, "atoms")).toEqual(utf16Coordinates);
        expect(topology.utf16SpanToByte(utf16Coordinates, "atoms")).toEqual(byteCoordinates);
        expect(topology.atomSpanToUtf16(atomCoordinates, "atoms")).toEqual(utf16Coordinates);
        expect(topology.utf16SpanToAtom(utf16Coordinates, "atoms")).toEqual(atomCoordinates);
      }
    }
  });

  it("rejects coordinates inside scalars and conventions not implemented in Phase 2", () => {
    const topology = SourceTopology.of(snapshot(bytes(0xc3, 0xa9, 0xf0, 0x9f, 0x98, 0x80)));

    for (const interior of [1, 3, 4, 5]) {
      expect(() => {
        topology.validateByteOffset(byteOffset(interior));
      }).toThrow(/inside/);
      expect(() => topology.byteToAtom(byteOffset(interior), "atoms")).toThrow(/inside/);
    }
    expect(() => {
      topology.validateByteSpan(byteSpan(0, 1));
    }).toThrow(/inside/);
    expect(() => topology.utf16ToByte(utf16Offset(2, "atoms"), "atoms")).toThrow(/surrogate/);
    expect(() => topology.utf16ToAtom(utf16Offset(2, "atoms"), "atoms")).toThrow(/surrogate/);
    expect(() => topology.atomToByte(atomOffset(3, "atoms"), "atoms")).toThrow(RangeError);
    expect(() => topology.byteToAtom(byteOffset(7), "atoms")).toThrow(RangeError);
    const unimplemented = "textDecoderDefault" as string as "atoms";
    expect(() => topology.byteToAtom(byteOffset(0), unimplemented)).toThrow(/not implemented/);
    expect(() => topology.lineColumn(byteOffset(0), unimplemented)).toThrow(/not implemented/);

    if (Date.now() < 0) {
      // @ts-expect-error every conversion call must name its convention
      topology.byteToAtom(byteOffset(0));
      // @ts-expect-error line/column also names its convention
      topology.lineColumn(byteOffset(0));
      // @ts-expect-error TextDecoder conventions do not execute in Phase 2
      topology.byteToAtom(byteOffset(0), "textDecoderDefault");
      const decoderAtoms = atomSpan(0, 1, "textDecoderDefault");
      // @ts-expect-error an atoms conversion cannot consume another convention's span
      topology.atomSpanToByte(decoderAtoms, "atoms");
      const decoderUtf16 = utf16Span(0, 1, "textDecoderIgnoreBom");
      // @ts-expect-error an atoms conversion cannot consume another convention's UTF-16 span
      topology.utf16SpanToAtom(decoderUtf16, "atoms");
    }
  });

  it("satisfies the boundary, inverse, and line/column laws over a seeded malformed-byte census", () => {
    expect(seededConversionCensus()).toBeUndefined();
  });

  it("preserves exact convention brands on converted spans", () => {
    const topology = SourceTopology.of(snapshot(bytes(0x41)));
    const atoms: AtomSpan<"atoms"> = topology.byteSpanToAtom(byteSpan(0, 1), "atoms");
    const utf16: Utf16Span<"atoms"> = topology.atomSpanToUtf16(atoms, "atoms");

    expect(atoms).toEqual(atomSpan(0, 1, "atoms"));
    expect(utf16).toEqual(utf16Span(0, 1, "atoms"));
  });
});

describe("SourceTopology keyed runs", () => {
  it("emits frozen maximal runs, evaluating the key once per atom", () => {
    const topology = SourceTopology.of(snapshot(bytes(0x41, 0x42, 0x0a, 0x80, 0x43)));
    let calls = 0;
    const runs = topology.emitRuns((atom) => {
      calls++;
      return atom.valid;
    });

    expect(calls).toBe(topology.atomCount);
    expect(runs).toEqual([
      { span: byteSpan(0, 3), key: true, atomCount: 3 },
      { span: byteSpan(3, 4), key: false, atomCount: 1 },
      { span: byteSpan(4, 5), key: true, atomCount: 1 },
    ]);
    expect(Object.isFrozen(runs)).toBe(true);
    expect(runs.every((run) => Object.isFrozen(run) && Object.isFrozen(run.span))).toBe(true);
    expect(runs.reduce((count, run) => count + run.atomCount, 0)).toBe(topology.atomCount);
  });

  it("accepts a custom key equality and keeps empty final lines run-free", () => {
    const letters = SourceTopology.of(snapshot(bytes(0x61, 0x41, 0x62, 0x42)));
    const folded = letters.emitRuns(
      (atom) => String.fromCodePoint(atom.value),
      (left, right) => left.toLowerCase() === right.toLowerCase(),
    );
    expect(folded).toEqual([
      { span: byteSpan(0, 2), key: "a", atomCount: 2 },
      { span: byteSpan(2, 4), key: "b", atomCount: 2 },
    ]);

    const lines = SourceTopology.of(snapshot(bytes(0x61, 0x0a, 0x62, 0x0a)));
    expect(lines.lineStarts).toEqual([0, 2, 4]);
    expect(lines.emitRuns((atom) => atom.lineIndex)).toEqual([
      { span: byteSpan(0, 2), key: 0, atomCount: 2 },
      { span: byteSpan(2, 4), key: 1, atomCount: 2 },
    ]);

    const emptyRuns = SourceTopology.of(snapshot(bytes())).emitRuns((atom) => atom.valid);
    expect(emptyRuns).toEqual([]);
    expect(Object.isFrozen(emptyRuns)).toBe(true);
  });
});
