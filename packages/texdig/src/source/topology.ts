/**
 * Atom, line, and derived-coordinate topology for one source snapshot.
 *
 * The topology decorates the snapshot's cached UTF-8 units; it never decodes
 * the bytes again. Under the Phase 2 `atoms` convention, every well-formed
 * scalar and every preserved invalid byte is one atom. The latter occupies one
 * UTF-16 code unit, matching the surrogate-escape correspondence adopted in
 * D29. Only exact atom boundaries convert between coordinate spaces.
 */

import {
  atomOffset,
  atomSpan,
  byteOffset,
  byteSpan,
  utf16Offset,
  utf16Span,
  type AtomOffset,
  type AtomSpan,
  type ByteOffset,
  type ByteSpan,
  type Utf16Offset,
  type Utf16Span,
} from "./span.js";
import { snapshotUtf8Units, type SourceSnapshot } from "./snapshot.js";
import type { Utf8Units } from "./utf8.js";

/** One scalar or preserved invalid byte in the total source tiling. */
export interface SourceAtom {
  readonly span: ByteSpan;
  /** Scalar value when valid, otherwise the preserved raw byte. */
  readonly value: number;
  readonly valid: boolean;
  readonly lineIndex: number;
}

/** A half-open interval over convention-free line indices. */
export interface LineRange {
  readonly start: number;
  readonly end: number;
  readonly count: number;
}

/** A maximal consecutive atom range agreeing on one caller-supplied key. */
export interface AtomRun<K> {
  readonly span: ByteSpan;
  readonly key: K;
  readonly atomCount: number;
}

interface TopologyState {
  readonly byteStarts: Readonly<Uint32Array>;
  readonly utf16Starts: Readonly<Uint32Array>;
}

interface BuiltTopology {
  readonly atoms: readonly SourceAtom[];
  readonly lineStarts: readonly ByteOffset[];
  readonly utf16Starts: Readonly<Uint32Array>;
}

const TOPOLOGIES = new WeakMap<SourceSnapshot, SourceTopology>();
const STATES = new WeakMap<SourceTopology, TopologyState>();

function stateFor(topology: SourceTopology): TopologyState {
  const state = STATES.get(topology);
  if (state === undefined) {
    throw new TypeError("SourceTopology method called with an invalid receiver");
  }
  return state;
}

function assertAtomsConvention(convention: string): asserts convention is "atoms" {
  if (convention !== "atoms") {
    throw new RangeError(`coordinate convention is not implemented: ${convention}`);
  }
}

function assertCoordinate(value: number, maximum: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0 || value > maximum) {
    throw new RangeError(
      `${name} must be a safe integer in [0, ${String(maximum)}], received ${String(value)}`,
    );
  }
}

function exactBoundaryIndex(boundaries: ArrayLike<number>, value: number): number {
  let low = 0;
  let high = boundaries.length;
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    const candidate = boundaries[middle] ?? 0;
    if (candidate < value) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  return low < boundaries.length && boundaries[low] === value ? low : -1;
}

function byteBoundaryIndex(topology: SourceTopology, offset: ByteOffset): number {
  assertCoordinate(offset, topology.byteLength, "byte offset");
  const index = exactBoundaryIndex(stateFor(topology).byteStarts, offset);
  if (index < 0) {
    throw new RangeError(
      `byte offset ${String(offset)} falls inside a valid multi-byte UTF-8 unit`,
    );
  }
  return index;
}

function utf16BoundaryIndex(topology: SourceTopology, offset: Utf16Offset<"atoms">): number {
  assertCoordinate(offset, topology.utf16Length, "UTF-16 offset");
  const index = exactBoundaryIndex(stateFor(topology).utf16Starts, offset);
  if (index < 0) {
    throw new RangeError(
      `UTF-16 offset ${String(offset)} falls inside a supplementary scalar's surrogate pair`,
    );
  }
  return index;
}

function atomBoundaryIndex(topology: SourceTopology, offset: AtomOffset<"atoms">): number {
  assertCoordinate(offset, topology.atomCount, "atom offset");
  return offset;
}

function utf16Width(units: Utf8Units, index: number): number {
  return units.valid[index] === 1 && (units.values[index] ?? 0) > 0xffff ? 2 : 1;
}

function isLineBreak(units: Utf8Units, index: number): boolean {
  if (units.valid[index] !== 1) {
    return false;
  }
  const value = units.values[index] ?? 0;
  if (value === 0x0a) {
    return true;
  }
  if (value !== 0x0d) {
    return false;
  }
  return !(units.valid[index + 1] === 1 && units.values[index + 1] === 0x0a);
}

function buildTopology(snapshot: SourceSnapshot): BuiltTopology {
  const units = snapshotUtf8Units(snapshot);
  const atoms: SourceAtom[] = [];
  const lineStarts: ByteOffset[] = [byteOffset(0)];
  const utf16Starts = new Uint32Array(units.count + 1);
  let lineIndex = 0;
  let utf16Position = 0;

  for (let index = 0; index < units.count; index++) {
    const start = units.starts[index] ?? 0;
    const end = units.starts[index + 1] ?? 0;
    utf16Starts[index] = utf16Position;
    atoms.push(
      Object.freeze({
        span: byteSpan(start, end),
        value: units.values[index] ?? 0,
        valid: units.valid[index] === 1,
        lineIndex,
      }),
    );
    utf16Position += utf16Width(units, index);

    if (isLineBreak(units, index)) {
      lineStarts.push(byteOffset(end));
      lineIndex++;
    }
  }
  utf16Starts[units.count] = utf16Position;

  return {
    atoms: Object.freeze(atoms),
    lineStarts: Object.freeze(lineStarts),
    utf16Starts,
  };
}

function lineRange(start: number, end: number): LineRange {
  return Object.freeze({ start, end, count: end - start });
}

/**
 * Topology of one immutable source basis. Use `SourceTopology.of(snapshot)` so
 * each snapshot object is decorated once and later callers reuse the result.
 */
export class SourceTopology {
  public readonly snapshot: SourceSnapshot;
  public readonly byteLength: number;
  public readonly atomCount: number;
  public readonly utf16Length: Utf16Offset<"atoms">;
  public readonly lineCount: number;
  public readonly atoms: readonly SourceAtom[];
  public readonly lineStarts: readonly ByteOffset[];

  private constructor(snapshot: SourceSnapshot) {
    const units = snapshotUtf8Units(snapshot);
    const built = buildTopology(snapshot);

    this.snapshot = snapshot;
    this.byteLength = snapshot.byteLength;
    this.atomCount = units.count;
    this.utf16Length = utf16Offset(built.utf16Starts[units.count] ?? 0, "atoms");
    this.lineCount = built.lineStarts.length;
    this.atoms = built.atoms;
    this.lineStarts = built.lineStarts;

    STATES.set(this, {
      byteStarts: units.starts,
      utf16Starts: built.utf16Starts,
    });
    Object.freeze(this);
  }

  /** Returns the one cached topology for this snapshot object. */
  public static of(snapshot: SourceSnapshot): SourceTopology {
    const existing = TOPOLOGIES.get(snapshot);
    if (existing !== undefined) {
      return existing;
    }
    const created = new SourceTopology(snapshot);
    TOPOLOGIES.set(snapshot, created);
    return created;
  }

  /** Validates that an in-range byte offset lies on an atom boundary. */
  public validateByteOffset(offset: ByteOffset): void {
    byteBoundaryIndex(this, offset);
  }

  /** Validates byte geometry and both atom boundaries. */
  public validateByteSpan(span: ByteSpan, allowEmpty = true): void {
    this.snapshot.validateSpan(span, allowEmpty);
    byteBoundaryIndex(this, span.start);
    byteBoundaryIndex(this, span.end);
  }

  /** Finds the line containing an in-range byte position, including EOF. */
  public getLineIndex(offset: ByteOffset): number {
    assertCoordinate(offset, this.byteLength, "byte offset");

    let low = 0;
    let high = this.lineStarts.length;
    while (low < high) {
      const middle = low + Math.floor((high - low) / 2);
      if ((this.lineStarts[middle] ?? 0) <= offset) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }
    return low - 1;
  }

  /** Returns a line's byte extent, including any CR, LF, or CRLF terminator. */
  public getLineExtent(lineIndex: number): ByteSpan {
    if (!Number.isSafeInteger(lineIndex) || lineIndex < 0 || lineIndex >= this.lineCount) {
      throw new RangeError(
        `line index must be a safe integer in [0, ${String(this.lineCount)}), received ${String(lineIndex)}`,
      );
    }
    const start = this.lineStarts[lineIndex] ?? byteOffset(0);
    const end = this.lineStarts[lineIndex + 1] ?? byteOffset(this.byteLength);
    return byteSpan(start, end);
  }

  /**
   * Projects a byte span onto the lines it intersects. An empty span projects
   * to the one line containing its position, including the trailing EOF line.
   */
  public project(span: ByteSpan): LineRange {
    this.snapshot.validateSpan(span);
    const first = this.getLineIndex(span.start);
    if (span.start === span.end) {
      return lineRange(first, first + 1);
    }
    const last = this.getLineIndex(byteOffset(span.end - 1));
    return lineRange(first, last + 1);
  }

  /** Emits maximal consecutive atom runs agreeing under `sameKey`. */
  public emitRuns<K>(
    breakKey: (atom: SourceAtom) => K,
    sameKey: (left: K, right: K) => boolean = Object.is,
  ): readonly AtomRun<K>[] {
    if (typeof breakKey !== "function") {
      throw new TypeError("breakKey must be a function");
    }
    if (typeof sameKey !== "function") {
      throw new TypeError("sameKey must be a function");
    }
    const firstAtom = this.atoms[0];
    if (firstAtom === undefined) {
      return Object.freeze([]);
    }

    const runs: AtomRun<K>[] = [];
    let currentKey = breakKey(firstAtom);
    let start = firstAtom.span.start;
    let end = firstAtom.span.end;
    let atomCount = 1;

    for (let index = 1; index < this.atoms.length; index++) {
      const atom = this.atoms[index];
      if (atom === undefined) {
        throw new RangeError(`missing atom at index ${String(index)}`);
      }
      const key = breakKey(atom);
      if (sameKey(key, currentKey)) {
        end = atom.span.end;
        atomCount++;
        continue;
      }

      runs.push(Object.freeze({ span: byteSpan(start, end), key: currentKey, atomCount }));
      currentKey = key;
      start = atom.span.start;
      end = atom.span.end;
      atomCount = 1;
    }

    runs.push(Object.freeze({ span: byteSpan(start, end), key: currentKey, atomCount }));
    return Object.freeze(runs);
  }

  public byteToAtom(offset: ByteOffset, convention: "atoms"): AtomOffset<"atoms"> {
    assertAtomsConvention(convention);
    return atomOffset(byteBoundaryIndex(this, offset), convention);
  }

  public atomToByte(offset: AtomOffset<"atoms">, convention: "atoms"): ByteOffset {
    assertAtomsConvention(convention);
    const index = atomBoundaryIndex(this, offset);
    return byteOffset(stateFor(this).byteStarts[index] ?? 0);
  }

  public byteToUtf16(offset: ByteOffset, convention: "atoms"): Utf16Offset<"atoms"> {
    assertAtomsConvention(convention);
    const index = byteBoundaryIndex(this, offset);
    return utf16Offset(stateFor(this).utf16Starts[index] ?? 0, convention);
  }

  public utf16ToByte(offset: Utf16Offset<"atoms">, convention: "atoms"): ByteOffset {
    assertAtomsConvention(convention);
    const index = utf16BoundaryIndex(this, offset);
    return byteOffset(stateFor(this).byteStarts[index] ?? 0);
  }

  public atomToUtf16(offset: AtomOffset<"atoms">, convention: "atoms"): Utf16Offset<"atoms"> {
    assertAtomsConvention(convention);
    const index = atomBoundaryIndex(this, offset);
    return utf16Offset(stateFor(this).utf16Starts[index] ?? 0, convention);
  }

  public utf16ToAtom(offset: Utf16Offset<"atoms">, convention: "atoms"): AtomOffset<"atoms"> {
    assertAtomsConvention(convention);
    return atomOffset(utf16BoundaryIndex(this, offset), convention);
  }

  public byteSpanToAtom(span: ByteSpan, convention: "atoms"): AtomSpan<"atoms"> {
    this.validateByteSpan(span);
    return atomSpan(
      this.byteToAtom(span.start, convention),
      this.byteToAtom(span.end, convention),
      convention,
    );
  }

  public atomSpanToByte(span: AtomSpan<"atoms">, convention: "atoms"): ByteSpan {
    return byteSpan(this.atomToByte(span.start, convention), this.atomToByte(span.end, convention));
  }

  public byteSpanToUtf16(span: ByteSpan, convention: "atoms"): Utf16Span<"atoms"> {
    this.validateByteSpan(span);
    return utf16Span(
      this.byteToUtf16(span.start, convention),
      this.byteToUtf16(span.end, convention),
      convention,
    );
  }

  public utf16SpanToByte(span: Utf16Span<"atoms">, convention: "atoms"): ByteSpan {
    return byteSpan(
      this.utf16ToByte(span.start, convention),
      this.utf16ToByte(span.end, convention),
    );
  }

  public atomSpanToUtf16(span: AtomSpan<"atoms">, convention: "atoms"): Utf16Span<"atoms"> {
    return utf16Span(
      this.atomToUtf16(span.start, convention),
      this.atomToUtf16(span.end, convention),
      convention,
    );
  }

  public utf16SpanToAtom(span: Utf16Span<"atoms">, convention: "atoms"): AtomSpan<"atoms"> {
    return atomSpan(
      this.utf16ToAtom(span.start, convention),
      this.utf16ToAtom(span.end, convention),
      convention,
    );
  }
}
