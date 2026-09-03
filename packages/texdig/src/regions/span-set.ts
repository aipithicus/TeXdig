/**
 * Snapshot-bound normalized byte coverage.
 *
 * SpanSet deliberately forgets occurrence identity, duplicate inputs, and
 * original boundaries. Its public basis is always a SourceSnapshot; the free
 * length-based interval kernel remains private implementation machinery.
 */

import { byteSpan, type ByteOffset, type ByteSpan } from "../source/span.js";
import type { SourceSlice } from "../source/slice.js";
import { SourceSnapshot } from "../source/snapshot.js";

interface Interval {
  readonly start: number;
  readonly end: number;
}

function interval(start: number, end: number): Interval {
  return Object.freeze({ start, end });
}

function validateLength(length: number): void {
  if (!Number.isSafeInteger(length) || length < 0) {
    throw new RangeError("interval-kernel length must be a non-negative safe integer");
  }
}

function validateInterval(length: number, candidate: Interval): void {
  if (
    !Number.isSafeInteger(candidate.start) ||
    !Number.isSafeInteger(candidate.end) ||
    candidate.start < 0 ||
    candidate.end < candidate.start ||
    candidate.end > length
  ) {
    throw new RangeError(
      `interval [${String(candidate.start)}, ${String(candidate.end)}) exceeds kernel length ${String(length)}`,
    );
  }
}

function normalize(length: number, candidates: Iterable<Interval>): readonly Interval[] {
  const ordered: Interval[] = [];
  for (const candidate of candidates) {
    validateInterval(length, candidate);
    if (candidate.start !== candidate.end) {
      ordered.push(interval(candidate.start, candidate.end));
    }
  }
  ordered.sort((left, right) => left.start - right.start || left.end - right.end);
  const first = ordered[0];
  if (first === undefined) return Object.freeze([]);

  const result: Interval[] = [];
  let currentStart = first.start;
  let currentEnd = first.end;
  for (let index = 1; index < ordered.length; index++) {
    const next = ordered[index];
    if (next === undefined) throw new RangeError("missing interval during normalization");
    if (next.start <= currentEnd) {
      currentEnd = Math.max(currentEnd, next.end);
    } else {
      result.push(interval(currentStart, currentEnd));
      currentStart = next.start;
      currentEnd = next.end;
    }
  }
  result.push(interval(currentStart, currentEnd));
  return Object.freeze(result);
}

function appendNormalized(target: Interval[], candidate: Interval): void {
  const previous = target.at(-1);
  if (previous === undefined || candidate.start > previous.end) {
    target.push(candidate);
  } else if (candidate.end > previous.end) {
    target[target.length - 1] = interval(previous.start, candidate.end);
  }
}

/** Free interval algebra used only behind the snapshot-bound public value. */
class IntervalKernel {
  public readonly length: number;
  public readonly count: number;
  public readonly coverage: number;
  readonly #intervals: readonly Interval[];

  private constructor(length: number, intervals: readonly Interval[]) {
    this.length = length;
    this.count = intervals.length;
    this.coverage = intervals.reduce((total, item) => total + item.end - item.start, 0);
    this.#intervals = intervals;
    Object.freeze(this);
  }

  public static empty(length: number): IntervalKernel {
    validateLength(length);
    return new IntervalKernel(length, Object.freeze([]));
  }

  public static whole(length: number): IntervalKernel {
    validateLength(length);
    return length === 0
      ? IntervalKernel.empty(length)
      : new IntervalKernel(length, Object.freeze([interval(0, length)]));
  }

  public static from(length: number, candidates: Iterable<Interval>): IntervalKernel {
    validateLength(length);
    return new IntervalKernel(length, normalize(length, candidates));
  }

  public at(index: number): Interval {
    if (!Number.isSafeInteger(index) || index < 0 || index >= this.count) {
      throw new RangeError(`interval index outside kernel: ${String(index)}`);
    }
    const item = this.#intervals[index];
    if (item === undefined) throw new RangeError("missing interval-kernel member");
    return item;
  }

  public union(other: IntervalKernel): IntervalKernel {
    this.ensureSameLength(other);
    const result: Interval[] = [];
    let left = 0;
    let right = 0;
    while (left < this.count || right < other.count) {
      const fromLeft = left < this.count ? this.at(left) : undefined;
      const fromRight = right < other.count ? other.at(right) : undefined;
      if (
        fromRight === undefined ||
        (fromLeft !== undefined &&
          (fromLeft.start < fromRight.start ||
            (fromLeft.start === fromRight.start && fromLeft.end <= fromRight.end)))
      ) {
        if (fromLeft === undefined) throw new RangeError("missing left union interval");
        appendNormalized(result, fromLeft);
        left++;
      } else {
        appendNormalized(result, fromRight);
        right++;
      }
    }
    return new IntervalKernel(this.length, Object.freeze(result));
  }

  public intersect(other: IntervalKernel): IntervalKernel {
    this.ensureSameLength(other);
    const result: Interval[] = [];
    let left = 0;
    let right = 0;
    while (left < this.count && right < other.count) {
      const leftInterval = this.at(left);
      const rightInterval = other.at(right);
      const start = Math.max(leftInterval.start, rightInterval.start);
      const end = Math.min(leftInterval.end, rightInterval.end);
      if (start < end) result.push(interval(start, end));
      if (leftInterval.end < rightInterval.end) left++;
      else right++;
    }
    return new IntervalKernel(this.length, Object.freeze(result));
  }

  public subtract(other: IntervalKernel): IntervalKernel {
    this.ensureSameLength(other);
    const result: Interval[] = [];
    let right = 0;
    for (let left = 0; left < this.count; left++) {
      const source = this.at(left);
      let cursor = source.start;
      while (right < other.count && other.at(right).end <= cursor) right++;
      let scan = right;
      while (scan < other.count) {
        const cut = other.at(scan);
        if (cut.start >= source.end) break;
        if (cut.start > cursor) result.push(interval(cursor, Math.min(cut.start, source.end)));
        cursor = Math.max(cursor, cut.end);
        if (cursor >= source.end) break;
        scan++;
      }
      if (cursor < source.end) result.push(interval(cursor, source.end));
    }
    return new IntervalKernel(this.length, Object.freeze(result));
  }

  public complement(): IntervalKernel {
    const result: Interval[] = [];
    let cursor = 0;
    for (let index = 0; index < this.count; index++) {
      const member = this.at(index);
      if (cursor < member.start) result.push(interval(cursor, member.start));
      cursor = member.end;
    }
    if (cursor < this.length) result.push(interval(cursor, this.length));
    return new IntervalKernel(this.length, Object.freeze(result));
  }

  public contains(offset: number): boolean {
    if (!Number.isSafeInteger(offset) || offset < 0 || offset >= this.length) return false;
    let low = 0;
    let high = this.count - 1;
    while (low <= high) {
      const middle = low + Math.floor((high - low) / 2);
      const member = this.at(middle);
      if (offset < member.start) high = middle - 1;
      else if (offset >= member.end) low = middle + 1;
      else return true;
    }
    return false;
  }

  public equals(other: IntervalKernel): boolean {
    if (this.length !== other.length || this.count !== other.count) return false;
    for (let index = 0; index < this.count; index++) {
      const left = this.at(index);
      const right = other.at(index);
      if (left.start !== right.start || left.end !== right.end) return false;
    }
    return true;
  }

  private ensureSameLength(other: IntervalKernel): void {
    if (this.length !== other.length) {
      throw new RangeError(
        `interval-kernel lengths differ: ${String(this.length)} and ${String(other.length)}`,
      );
    }
  }
}

/** Canonical byte coverage bound to one compatible source-snapshot identity. */
export class SpanSet implements Iterable<ByteSpan> {
  public readonly snapshot: SourceSnapshot;
  readonly #kernel: IntervalKernel;

  private constructor(snapshot: SourceSnapshot, kernel: IntervalKernel) {
    this.snapshot = snapshot;
    this.#kernel = kernel;
    Object.freeze(this);
  }

  public static empty(snapshot: SourceSnapshot): SpanSet {
    SpanSet.validateSnapshot(snapshot);
    return new SpanSet(snapshot, IntervalKernel.empty(snapshot.byteLength));
  }

  public static whole(snapshot: SourceSnapshot): SpanSet {
    SpanSet.validateSnapshot(snapshot);
    return new SpanSet(snapshot, IntervalKernel.whole(snapshot.byteLength));
  }

  public static from(snapshot: SourceSnapshot, spans: Iterable<ByteSpan>): SpanSet {
    SpanSet.validateSnapshot(snapshot);
    const intervals: Interval[] = [];
    for (const span of spans) {
      snapshot.validateSpan(span);
      intervals.push(interval(span.start, span.end));
    }
    return new SpanSet(snapshot, IntervalKernel.from(snapshot.byteLength, intervals));
  }

  public get count(): number {
    return this.#kernel.count;
  }

  public get coverage(): number {
    return this.#kernel.coverage;
  }

  public at(index: number): ByteSpan {
    const member = this.#kernel.at(index);
    return byteSpan(member.start, member.end);
  }

  public *[Symbol.iterator](): IterableIterator<ByteSpan> {
    for (let index = 0; index < this.count; index++) yield this.at(index);
  }

  public union(other: SpanSet): SpanSet {
    this.ensureCompatible(other);
    return new SpanSet(this.snapshot, this.#kernel.union(other.#kernel));
  }

  public intersect(other: SpanSet): SpanSet {
    this.ensureCompatible(other);
    return new SpanSet(this.snapshot, this.#kernel.intersect(other.#kernel));
  }

  public subtract(other: SpanSet): SpanSet {
    this.ensureCompatible(other);
    return new SpanSet(this.snapshot, this.#kernel.subtract(other.#kernel));
  }

  public complement(): SpanSet {
    return new SpanSet(this.snapshot, this.#kernel.complement());
  }

  public contains(offset: ByteOffset): boolean {
    return this.#kernel.contains(offset);
  }

  public equals(other: SpanSet | null | undefined): boolean {
    return (
      other instanceof SpanSet &&
      this.snapshot.isCompatibleWith(other.snapshot) &&
      this.#kernel.equals(other.#kernel)
    );
  }

  public toParent(slice: SourceSlice): SpanSet {
    slice.child.ensureCompatibleWith(this.snapshot);
    return SpanSet.from(
      slice.parent,
      Array.from(this, (member) =>
        byteSpan(slice.window.start + member.start, slice.window.start + member.end),
      ),
    );
  }

  public toChild(slice: SourceSlice): SpanSet {
    slice.parent.ensureCompatibleWith(this.snapshot);
    const mapped: ByteSpan[] = [];
    for (const member of this) {
      if (member.start < slice.window.start || member.end > slice.window.end) {
        throw new RangeError(
          `span-set member [${String(member.start)}, ${String(member.end)}) lies outside slice window [${String(slice.window.start)}, ${String(slice.window.end)}); intersect with the window before rebasing down`,
        );
      }
      mapped.push(byteSpan(member.start - slice.window.start, member.end - slice.window.start));
    }
    return SpanSet.from(slice.child, mapped);
  }

  private ensureCompatible(other: SpanSet): void {
    this.snapshot.ensureCompatibleWith(other.snapshot);
  }

  private static validateSnapshot(snapshot: SourceSnapshot): void {
    if (!(snapshot instanceof SourceSnapshot)) {
      throw new TypeError("SpanSet requires a source snapshot");
    }
  }
}
