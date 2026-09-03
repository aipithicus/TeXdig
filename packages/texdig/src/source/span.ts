/**
 * Branded coordinates and the span algebra of the TeXdig substrate.
 *
 * The canonical coordinate is the byte offset into a source snapshot. Two derived
 * offset spaces, UTF-16 code units and atom indices, exist only under a named
 * convention (decision D29). Every offset carries its coordinate space as a
 * type-level brand, and derived offsets also carry their convention, so values
 * from different spaces or conventions cannot meet in one operation. Conversion
 * between spaces is an explicit call on a snapshot's topology, never a cast.
 *
 * Spans are half-open `[start, end)` intervals over one offset type. The
 * predicates are defined exactly as Doccer's `TextSpan` defines them, so the
 * shared conformance fixtures assert parity rather than similarity.
 */

declare const SPACE: unique symbol;
declare const CONVENTION: unique symbol;

/**
 * The closed set of derived-coordinate conventions (D29). Adding a member is a
 * ruling with a census column, never an extension point.
 *
 * - `atoms`: one unit per well-formed scalar and one per preserved invalid byte;
 *   the BOM is a unit. Total and injective at atom boundaries. Parity with
 *   Doccer atoms and with PEP 383 surrogate-escape strings.
 * - `textDecoderDefault`: one unit per maximal ill-formed subpart; BOM stripped.
 *   Parity with `new TextDecoder().decode(bytes)`. Lands with its first consumer.
 * - `textDecoderIgnoreBom`: as above with the BOM kept as one unit.
 */
export type Convention = "atoms" | "textDecoderDefault" | "textDecoderIgnoreBom";

export const CONVENTIONS: readonly Convention[] = Object.freeze<Convention[]>([
  "atoms",
  "textDecoderDefault",
  "textDecoderIgnoreBom",
]);

/** Offset into the stored source bytes: the canonical coordinate. */
export type ByteOffset = number & { readonly [SPACE]: "byte" };

/** Offset in UTF-16 code units under a named convention. */
export type Utf16Offset<C extends Convention = Convention> = number & {
  readonly [SPACE]: "utf16";
  readonly [CONVENTION]: C;
};

/**
 * Index of an atom under a named convention. Under `atoms` this counts one per
 * well-formed scalar or preserved invalid byte; under the `TextDecoder`
 * conventions it counts the scalars of the replacement string.
 */
export type AtomOffset<C extends Convention = Convention> = number & {
  readonly [SPACE]: "atom";
  readonly [CONVENTION]: C;
};

export type Offset = ByteOffset | Utf16Offset | AtomOffset;

/** A half-open interval `[start, end)` over one offset type. A frozen plain value. */
export interface Span<O extends Offset> {
  readonly start: O;
  readonly end: O;
}

export type ByteSpan = Span<ByteOffset>;
export type Utf16Span<C extends Convention = Convention> = Span<Utf16Offset<C>>;
export type AtomSpan<C extends Convention = Convention> = Span<AtomOffset<C>>;

function assertOffsetValue(value: number, what: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${what} must be a non-negative safe integer, received ${String(value)}`);
  }
}

function assertConvention(convention: string): asserts convention is Convention {
  if (!CONVENTIONS.some((known) => known === convention)) {
    throw new RangeError(`unknown coordinate convention: ${convention}`);
  }
}

/** Validates and brands a byte offset. */
export function byteOffset(value: number): ByteOffset {
  assertOffsetValue(value, "byte offset");
  return value as ByteOffset;
}

/** Validates and brands a UTF-16 offset under `convention`. */
export function utf16Offset<C extends Convention>(value: number, convention: C): Utf16Offset<C> {
  assertConvention(convention);
  assertOffsetValue(value, "UTF-16 offset");
  return value as Utf16Offset<C>;
}

/** Validates and brands an atom index under `convention`. */
export function atomOffset<C extends Convention>(value: number, convention: C): AtomOffset<C> {
  assertConvention(convention);
  assertOffsetValue(value, "atom offset");
  return value as AtomOffset<C>;
}

/**
 * Builds a span from two offsets of the same space. Offsets are trusted because
 * they were validated when branded; the only invariant checked here is `end >= start`.
 */
export function span<O extends Offset>(start: O, end: O): Span<O> {
  if (end < start) {
    throw new RangeError(
      `span end must not precede its start, received [${String(start)}, ${String(end)})`,
    );
  }
  return Object.freeze({ start, end });
}

export function byteSpan(start: number, end: number): ByteSpan {
  return span(byteOffset(start), byteOffset(end));
}

export function utf16Span<C extends Convention>(
  start: number,
  end: number,
  convention: C,
): Utf16Span<C> {
  return span(utf16Offset(start, convention), utf16Offset(end, convention));
}

export function atomSpan<C extends Convention>(
  start: number,
  end: number,
  convention: C,
): AtomSpan<C> {
  return span(atomOffset(start, convention), atomOffset(end, convention));
}

/**
 * Index of `value` in a sorted boundary column, or `-1` when `value` is not an
 * exact boundary. Shared by the snapshot and the topology so both reject an
 * interior position the same way.
 */
export function exactBoundaryIndex(boundaries: ArrayLike<number>, value: number): number {
  let low = 0;
  let high = boundaries.length;
  while (low < high) {
    const middle = low + Math.floor((high - low) / 2);
    if ((boundaries[middle] ?? 0) < value) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  return low < boundaries.length && boundaries[low] === value ? low : -1;
}

export function isEmpty(s: Span<Offset>): boolean {
  return s.start === s.end;
}

export function spanLength(s: Span<Offset>): number {
  return s.end - s.start;
}

export function spanEquals<O extends Offset>(a: Span<O>, b: Span<O>): boolean {
  return a.start === b.start && a.end === b.end;
}

/** Doccer `Contains(int offset)`: half-open membership. */
export function containsOffset<O extends Offset>(s: Span<O>, offset: O): boolean {
  return s.start <= offset && offset < s.end;
}

/**
 * Doccer `Contains(TextSpan other)`: `outer.start <= inner.start && inner.end <= outer.end`.
 * Admits equal spans and an empty `inner` sitting on either boundary of `outer`.
 */
export function containsSpan<O extends Offset>(outer: Span<O>, inner: Span<O>): boolean {
  return outer.start <= inner.start && inner.end <= outer.end;
}

/** Doccer `ProperlyContains`: contained and not equal. Neither endpoint has to be strict. */
export function properlyContains<O extends Offset>(outer: Span<O>, inner: Span<O>): boolean {
  return containsSpan(outer, inner) && !spanEquals(outer, inner);
}

/** Doccer `Intersects`: both non-empty and sharing at least one unit of material. */
export function intersects<O extends Offset>(a: Span<O>, b: Span<O>): boolean {
  return !isEmpty(a) && !isEmpty(b) && a.start < b.end && b.start < a.end;
}

/** Doccer `Crosses`: partial overlap in which neither span contains the other. */
export function crosses<O extends Offset>(a: Span<O>, b: Span<O>): boolean {
  return (
    (a.start < b.start && b.start < a.end && a.end < b.end) ||
    (b.start < a.start && a.start < b.end && b.end < a.end)
  );
}
