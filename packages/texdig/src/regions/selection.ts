/**
 * Immutable occurrence-ordinal selections.
 *
 * Ordinals are meaningful only within one exact frozen OccurrenceBatch, so
 * selection algebra uses batch reference identity rather than snapshot
 * compatibility. The named coverage projection is the one operation that
 * deliberately forgets occurrence identity and overlap multiplicity.
 */

import {
  type OccurrenceBatch,
  type OccurrenceOrder,
  type OccurrenceRecord,
} from "./occurrences.js";
import { SpanSet } from "./span-set.js";

const WORD_SHIFT = 5;
const WORD_BITS = 1 << WORD_SHIFT;
const WORD_MASK = WORD_BITS - 1;

type BitOperation = "union" | "intersect" | "subtract";

function wordCount(ordinalCount: number): number {
  return Math.ceil(ordinalCount / WORD_BITS);
}

function validateOrdinal(batch: OccurrenceBatch, ordinal: number): void {
  if (!Number.isSafeInteger(ordinal) || ordinal < 0 || ordinal >= batch.count) {
    throw new RangeError(`occurrence ordinal outside selection batch: ${String(ordinal)}`);
  }
}

function bitFor(ordinal: number): number {
  return 1 << (ordinal & WORD_MASK);
}

function wordIndexFor(ordinal: number): number {
  return Math.floor(ordinal / WORD_BITS);
}

function population(word: number): number {
  let remaining = word >>> 0;
  let count = 0;
  while (remaining !== 0) {
    remaining = (remaining & (remaining - 1)) >>> 0;
    count++;
  }
  return count;
}

function maskUnusedTail(words: Uint32Array, ordinalCount: number): void {
  const used = ordinalCount & WORD_MASK;
  if (words.length === 0 || used === 0) return;
  const last = words.length - 1;
  words[last] = (words[last] ?? 0) & (0xffff_ffff >>> (WORD_BITS - used));
}

/** An immutable ordinal set bound to one exact frozen occurrence batch. */
export class OccurrenceSelection implements Iterable<number> {
  public readonly batch: OccurrenceBatch;
  public readonly count: number;
  readonly #words: Uint32Array;

  private constructor(batch: OccurrenceBatch, words: Uint32Array, count: number) {
    this.batch = batch;
    this.#words = words;
    this.count = count;
    Object.freeze(this);
  }

  public static none(batch: OccurrenceBatch): OccurrenceSelection {
    return new OccurrenceSelection(batch, new Uint32Array(wordCount(batch.count)), 0);
  }

  public static all(batch: OccurrenceBatch): OccurrenceSelection {
    const words = new Uint32Array(wordCount(batch.count));
    words.fill(0xffff_ffff);
    maskUnusedTail(words, batch.count);
    return new OccurrenceSelection(batch, words, batch.count);
  }

  public static from(batch: OccurrenceBatch, ordinals: Iterable<number>): OccurrenceSelection {
    const words = new Uint32Array(wordCount(batch.count));
    let count = 0;
    for (const ordinal of ordinals) {
      validateOrdinal(batch, ordinal);
      const wordIndex = wordIndexFor(ordinal);
      const bit = bitFor(ordinal);
      const word = words[wordIndex] ?? 0;
      if ((word & bit) === 0) {
        words[wordIndex] = word | bit;
        count++;
      }
    }
    return new OccurrenceSelection(batch, words, count);
  }

  public static fromPredicate(
    batch: OccurrenceBatch,
    predicate: (record: OccurrenceRecord) => boolean,
  ): OccurrenceSelection {
    if (typeof predicate !== "function") {
      throw new TypeError("occurrence selection predicate must be a function");
    }
    const words = new Uint32Array(wordCount(batch.count));
    let count = 0;
    for (let ordinal = 0; ordinal < batch.count; ordinal++) {
      if (predicate(batch.at(ordinal))) {
        const wordIndex = wordIndexFor(ordinal);
        words[wordIndex] = (words[wordIndex] ?? 0) | bitFor(ordinal);
        count++;
      }
    }
    return new OccurrenceSelection(batch, words, count);
  }

  public get isEmpty(): boolean {
    return this.count === 0;
  }

  public contains(ordinal: number): boolean {
    validateOrdinal(this.batch, ordinal);
    return this.hasUnchecked(ordinal);
  }

  public union(other: OccurrenceSelection): OccurrenceSelection {
    return this.combine(other, "union");
  }

  public intersect(other: OccurrenceSelection): OccurrenceSelection {
    return this.combine(other, "intersect");
  }

  public subtract(other: OccurrenceSelection): OccurrenceSelection {
    return this.combine(other, "subtract");
  }

  public complement(): OccurrenceSelection {
    const words = new Uint32Array(this.#words.length);
    for (let index = 0; index < words.length; index++) {
      words[index] = ~(this.#words[index] ?? 0);
    }
    maskUnusedTail(words, this.batch.count);
    return new OccurrenceSelection(this.batch, words, this.batch.count - this.count);
  }

  public records(order: OccurrenceOrder = "geometry"): readonly OccurrenceRecord[] {
    return Object.freeze(
      this.batch.ordered(order).filter((record) => this.hasUnchecked(record.ordinal)),
    );
  }

  /** Project selected spans to normalized coverage, discarding occurrence identity. */
  public coverage(): SpanSet {
    return SpanSet.from(
      this.batch.snapshot,
      Array.from(this, (ordinal) => this.batch.at(ordinal).span),
    );
  }

  public equals(other: OccurrenceSelection | null | undefined): boolean {
    if (this === other) return true;
    if (!(other instanceof OccurrenceSelection)) return false;
    if (this.batch !== other.batch || this.count !== other.count) return false;
    for (let index = 0; index < this.#words.length; index++) {
      if (this.#words[index] !== other.#words[index]) return false;
    }
    return true;
  }

  public *[Symbol.iterator](): IterableIterator<number> {
    for (let ordinal = 0; ordinal < this.batch.count; ordinal++) {
      if (this.hasUnchecked(ordinal)) yield ordinal;
    }
  }

  private hasUnchecked(ordinal: number): boolean {
    return ((this.#words[wordIndexFor(ordinal)] ?? 0) & bitFor(ordinal)) !== 0;
  }

  private combine(other: OccurrenceSelection, operation: BitOperation): OccurrenceSelection {
    this.ensureSameBatch(other);
    const words = new Uint32Array(this.#words.length);
    let count = 0;
    for (let index = 0; index < words.length; index++) {
      const left = this.#words[index] ?? 0;
      const right = other.#words[index] ?? 0;
      let result: number;
      if (operation === "union") result = left | right;
      else if (operation === "intersect") result = left & right;
      else result = left & ~right;
      words[index] = result;
      count += population(result);
    }
    return new OccurrenceSelection(this.batch, words, count);
  }

  private ensureSameBatch(other: OccurrenceSelection): void {
    if (!(other instanceof OccurrenceSelection)) {
      throw new TypeError("selection algebra requires another occurrence selection");
    }
    if (this.batch !== other.batch) {
      throw new Error(
        "occurrence selections have different frozen-batch bases; batch-local ordinals cannot be mixed",
      );
    }
  }
}
