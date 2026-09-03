/**
 * Snapshot-bound, overlap-preserving occurrence batches.
 *
 * An occurrence is a source fact with exact byte geometry, a kind, and a
 * structured producer stamp. Builders validate and copy every field when it is
 * added, then freeze into private columnar storage. Discovery ordinal is stable
 * identity within one batch; ordering and coverage are explicit projections.
 */

import {
  byteOffset,
  byteSpan,
  containsOffset,
  intersects,
  type ByteOffset,
  type ByteSpan,
} from "../source/span.js";
import type { SourceSlice } from "../source/slice.js";
import { SourceSnapshot } from "../source/snapshot.js";

const MAX_INT32 = 0x7fff_ffff;

/** Stable producer identity carried by every knowledge-bearing occurrence. */
export interface ProducerStamp {
  readonly id: string;
  readonly version: string;
}

/** One occurrence offered to a snapshot-bound builder. */
export interface OccurrenceClaim {
  readonly snapshot: SourceSnapshot;
  readonly span: ByteSpan;
  readonly kind: string;
  readonly producer: ProducerStamp;
  readonly priority?: number;
  readonly ruleId?: string;
}

/** One materialized row of a frozen occurrence batch. */
export interface OccurrenceRecord {
  readonly ordinal: number;
  readonly snapshot: SourceSnapshot;
  readonly span: ByteSpan;
  readonly kind: string;
  readonly producer: ProducerStamp;
  readonly priority: number;
  readonly ruleId?: string;
}

/** Named total orders shared by full-batch and lookup projections. */
export type OccurrenceOrder = "geometry" | "priority-then-geometry";

/** Sorted lookup over one exact frozen batch. */
export interface OccurrenceLookup {
  readonly batch: OccurrenceBatch;
  findIntersecting(query: ByteSpan, order?: OccurrenceOrder): readonly OccurrenceRecord[];
  findContaining(position: ByteOffset, order?: OccurrenceOrder): readonly OccurrenceRecord[];
}

/** Frozen columnar collection, bound to one snapshot and addressed by ordinal. */
export interface OccurrenceBatch extends Iterable<OccurrenceRecord> {
  readonly snapshot: SourceSnapshot;
  readonly count: number;
  /** Distinct values in first-appearance order. */
  readonly kindTable: readonly string[];
  /** Distinct structured stamps in first-appearance order. */
  readonly producerTable: readonly ProducerStamp[];
  /** Distinct non-null rule ids in first-appearance order. */
  readonly ruleIdTable: readonly string[];
  readonly lookup: OccurrenceLookup;
  at(ordinal: number): OccurrenceRecord;
  ordered(order?: OccurrenceOrder): readonly OccurrenceRecord[];
  toParent(slice: SourceSlice): OccurrenceBatch;
  toChild(slice: SourceSlice): OccurrenceBatch;
}

interface ValidatedClaim {
  readonly start: number;
  readonly end: number;
  readonly kind: string;
  readonly producer: ProducerStamp;
  readonly priority: number;
  readonly ruleId: string | undefined;
}

interface InternedStrings {
  readonly ids: Int32Array;
  readonly table: readonly string[];
}

interface InternedProducers {
  readonly ids: Int32Array;
  readonly table: readonly ProducerStamp[];
}

function assertNonblank(value: unknown, name: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${name} must not be empty or whitespace`);
  }
}

function copyProducer(producer: unknown): ProducerStamp {
  if (producer === null || typeof producer !== "object") {
    throw new TypeError("occurrence producer must be a structured stamp");
  }
  const id = "id" in producer ? producer.id : undefined;
  const version = "version" in producer ? producer.version : undefined;
  assertNonblank(id, "occurrence producer id");
  assertNonblank(version, "occurrence producer version");
  return Object.freeze({ id, version });
}

function checkedPriority(priority: unknown): number {
  const value = priority ?? 0;
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < -0x8000_0000 ||
    value > MAX_INT32
  ) {
    const received = typeof value === "number" ? String(value) : typeof value;
    throw new RangeError(
      `occurrence priority must be a signed 32-bit integer, received ${received}`,
    );
  }
  return value;
}

function validateClaim(snapshot: SourceSnapshot, claim: OccurrenceClaim): ValidatedClaim {
  if (!(claim.snapshot instanceof SourceSnapshot)) {
    throw new TypeError("occurrence claim must name a source snapshot");
  }
  snapshot.ensureCompatibleWith(claim.snapshot);
  snapshot.validateSpan(claim.span, false);
  if (claim.span.start > MAX_INT32 || claim.span.end > MAX_INT32) {
    throw new RangeError("occurrence span exceeds the signed 32-bit column range");
  }
  assertNonblank(claim.kind, "occurrence kind");
  if (claim.ruleId !== undefined) assertNonblank(claim.ruleId, "occurrence rule id");
  return {
    start: claim.span.start,
    end: claim.span.end,
    kind: claim.kind,
    producer: copyProducer(claim.producer),
    priority: checkedPriority(claim.priority),
    ruleId: claim.ruleId,
  };
}

function internStrings(values: readonly (string | undefined)[]): InternedStrings {
  const ids = new Int32Array(values.length);
  const table: string[] = [];
  const known = new Map<string, number>();
  for (let ordinal = 0; ordinal < values.length; ordinal++) {
    const value = values[ordinal];
    if (value === undefined) {
      ids[ordinal] = -1;
      continue;
    }
    let id = known.get(value);
    if (id === undefined) {
      id = table.length;
      known.set(value, id);
      table.push(value);
    }
    ids[ordinal] = id;
  }
  return { ids, table: Object.freeze(table) };
}

function internProducers(values: readonly ProducerStamp[]): InternedProducers {
  const ids = new Int32Array(values.length);
  const table: ProducerStamp[] = [];
  const known = new Map<string, Map<string, number>>();
  for (let ordinal = 0; ordinal < values.length; ordinal++) {
    const value = values[ordinal];
    if (value === undefined) throw new TypeError("missing validated producer stamp");
    let versions = known.get(value.id);
    if (versions === undefined) {
      versions = new Map<string, number>();
      known.set(value.id, versions);
    }
    let id = versions.get(value.version);
    if (id === undefined) {
      id = table.length;
      versions.set(value.version, id);
      table.push(value);
    }
    ids[ordinal] = id;
  }
  return { ids, table: Object.freeze(table) };
}

function validateOrder(order: unknown): asserts order is OccurrenceOrder {
  if (order !== "geometry" && order !== "priority-then-geometry") {
    throw new RangeError(`unknown occurrence order: ${String(order)}`);
  }
}

function compareGeometry(batch: FrozenOccurrenceBatch, left: number, right: number): number {
  const start = batch.startAt(left) - batch.startAt(right);
  if (start !== 0) return start;
  const end = batch.endAt(right) - batch.endAt(left);
  return end !== 0 ? end : left - right;
}

function compareOrdinals(
  batch: FrozenOccurrenceBatch,
  left: number,
  right: number,
  order: OccurrenceOrder,
): number {
  if (order === "priority-then-geometry") {
    const leftPriority = batch.priorityAt(left);
    const rightPriority = batch.priorityAt(right);
    if (leftPriority !== rightPriority) return leftPriority > rightPriority ? -1 : 1;
  }
  return compareGeometry(batch, left, right);
}

function sortedOrdinals(batch: FrozenOccurrenceBatch, order: OccurrenceOrder): Int32Array {
  const ordinals = Array.from({ length: batch.count }, (_, ordinal) => ordinal);
  ordinals.sort((left, right) => compareOrdinals(batch, left, right, order));
  return Int32Array.from(ordinals);
}

class FrozenOccurrenceBatch implements OccurrenceBatch {
  public readonly snapshot: SourceSnapshot;
  public readonly count: number;
  public readonly kindTable: readonly string[];
  public readonly producerTable: readonly ProducerStamp[];
  public readonly ruleIdTable: readonly string[];
  public readonly lookup: OccurrenceLookup;

  readonly #starts: Int32Array;
  readonly #ends: Int32Array;
  readonly #kindIds: Int32Array;
  readonly #producerIds: Int32Array;
  readonly #priorities: Int32Array;
  readonly #ruleIdIds: Int32Array;
  readonly #geometryOrder: Int32Array;
  readonly #priorityOrder: Int32Array;

  public constructor(snapshot: SourceSnapshot, claims: readonly ValidatedClaim[]) {
    this.snapshot = snapshot;
    this.count = claims.length;
    this.#starts = Int32Array.from(claims, (claim) => claim.start);
    this.#ends = Int32Array.from(claims, (claim) => claim.end);
    this.#priorities = Int32Array.from(claims, (claim) => claim.priority);
    const kinds = internStrings(claims.map((claim) => claim.kind));
    const producers = internProducers(claims.map((claim) => claim.producer));
    const ruleIds = internStrings(claims.map((claim) => claim.ruleId));
    this.#kindIds = kinds.ids;
    this.#producerIds = producers.ids;
    this.#ruleIdIds = ruleIds.ids;
    this.kindTable = kinds.table;
    this.producerTable = producers.table;
    this.ruleIdTable = ruleIds.table;
    this.#geometryOrder = sortedOrdinals(this, "geometry");
    this.#priorityOrder = sortedOrdinals(this, "priority-then-geometry");
    this.lookup = new FrozenOccurrenceLookup(this);
    Object.freeze(this);
  }

  public startAt(ordinal: number): number {
    const value = this.#starts[ordinal];
    if (value === undefined) throw new RangeError("missing occurrence start column value");
    return value;
  }

  public endAt(ordinal: number): number {
    const value = this.#ends[ordinal];
    if (value === undefined) throw new RangeError("missing occurrence end column value");
    return value;
  }

  public priorityAt(ordinal: number): number {
    const value = this.#priorities[ordinal];
    if (value === undefined) throw new RangeError("missing occurrence priority column value");
    return value;
  }

  public geometryOrdinalAt(index: number): number {
    const ordinal = this.#geometryOrder[index];
    if (ordinal === undefined) throw new RangeError("missing occurrence geometry-order value");
    return ordinal;
  }

  public at(ordinal: number): OccurrenceRecord {
    if (!Number.isSafeInteger(ordinal) || ordinal < 0 || ordinal >= this.count) {
      throw new RangeError(`occurrence ordinal outside batch: ${String(ordinal)}`);
    }
    const kindId = this.#kindIds[ordinal] ?? -1;
    const producerId = this.#producerIds[ordinal] ?? -1;
    const ruleIdId = this.#ruleIdIds[ordinal] ?? -1;
    const kind = this.kindTable[kindId];
    const producer = this.producerTable[producerId];
    if (kind === undefined || producer === undefined) {
      throw new TypeError("occurrence batch contains an invalid interned column id");
    }
    const common: Omit<OccurrenceRecord, "ruleId"> = {
      ordinal,
      snapshot: this.snapshot,
      span: byteSpan(this.startAt(ordinal), this.endAt(ordinal)),
      kind,
      producer,
      priority: this.priorityAt(ordinal),
    };
    const ruleId = ruleIdId < 0 ? undefined : this.ruleIdTable[ruleIdId];
    if (ruleIdId >= 0 && ruleId === undefined) {
      throw new TypeError("occurrence batch contains an invalid interned rule id");
    }
    return ruleId === undefined ? Object.freeze(common) : Object.freeze({ ...common, ruleId });
  }

  public ordered(order: OccurrenceOrder = "geometry"): readonly OccurrenceRecord[] {
    validateOrder(order);
    const ordinals = order === "geometry" ? this.#geometryOrder : this.#priorityOrder;
    return Object.freeze(Array.from(ordinals, (ordinal) => this.at(ordinal)));
  }

  public *[Symbol.iterator](): IterableIterator<OccurrenceRecord> {
    for (let ordinal = 0; ordinal < this.count; ordinal++) yield this.at(ordinal);
  }

  public toParent(slice: SourceSlice): OccurrenceBatch {
    slice.child.ensureCompatibleWith(this.snapshot);
    const builder = new OccurrenceBatchBuilder(slice.parent);
    for (const occurrence of this) {
      builder.add({
        snapshot: slice.parent,
        span: byteSpan(
          slice.toParent(byteOffset(occurrence.span.start)),
          slice.toParent(byteOffset(occurrence.span.end)),
        ),
        kind: occurrence.kind,
        producer: occurrence.producer,
        priority: occurrence.priority,
        ...(occurrence.ruleId === undefined ? {} : { ruleId: occurrence.ruleId }),
      });
    }
    return builder.freeze();
  }

  public toChild(slice: SourceSlice): OccurrenceBatch {
    slice.parent.ensureCompatibleWith(this.snapshot);
    const mapped = Array.from(this, (occurrence): OccurrenceClaim => ({
      snapshot: slice.child,
      span: byteSpan(
        slice.toChild(byteOffset(occurrence.span.start)),
        slice.toChild(byteOffset(occurrence.span.end)),
      ),
      kind: occurrence.kind,
      producer: occurrence.producer,
      priority: occurrence.priority,
      ...(occurrence.ruleId === undefined ? {} : { ruleId: occurrence.ruleId }),
    }));
    const builder = new OccurrenceBatchBuilder(slice.child);
    for (const occurrence of mapped) builder.add(occurrence);
    return builder.freeze();
  }
}

class FrozenOccurrenceLookup implements OccurrenceLookup {
  public readonly batch: OccurrenceBatch;
  readonly #frozenBatch: FrozenOccurrenceBatch;

  public constructor(batch: FrozenOccurrenceBatch) {
    this.batch = batch;
    this.#frozenBatch = batch;
    Object.freeze(this);
  }

  public findIntersecting(
    query: ByteSpan,
    order: OccurrenceOrder = "geometry",
  ): readonly OccurrenceRecord[] {
    validateOrder(order);
    this.batch.snapshot.validateSpan(query);
    const found: number[] = [];
    for (let index = 0; index < this.batch.count; index++) {
      const ordinal = this.#frozenBatch.geometryOrdinalAt(index);
      const candidate = byteSpan(
        this.#frozenBatch.startAt(ordinal),
        this.#frozenBatch.endAt(ordinal),
      );
      if (candidate.start >= query.end) break;
      if (intersects(candidate, query)) found.push(ordinal);
    }
    if (order === "priority-then-geometry") {
      found.sort((left, right) => compareOrdinals(this.#frozenBatch, left, right, order));
    }
    return Object.freeze(found.map((ordinal) => this.#frozenBatch.at(ordinal)));
  }

  public findContaining(
    position: ByteOffset,
    order: OccurrenceOrder = "geometry",
  ): readonly OccurrenceRecord[] {
    validateOrder(order);
    if (
      !Number.isSafeInteger(position) ||
      position < 0 ||
      position > this.batch.snapshot.byteLength
    ) {
      throw new RangeError(`occurrence lookup position outside snapshot: ${String(position)}`);
    }
    const found: number[] = [];
    for (let index = 0; index < this.batch.count; index++) {
      const ordinal = this.#frozenBatch.geometryOrdinalAt(index);
      const candidate = byteSpan(
        this.#frozenBatch.startAt(ordinal),
        this.#frozenBatch.endAt(ordinal),
      );
      if (candidate.start > position) break;
      if (containsOffset(candidate, position)) found.push(ordinal);
    }
    if (order === "priority-then-geometry") {
      found.sort((left, right) => compareOrdinals(this.#frozenBatch, left, right, order));
    }
    return Object.freeze(found.map((ordinal) => this.#frozenBatch.at(ordinal)));
  }
}

/** Append-only collector which freezes idempotently into one columnar batch. */
export class OccurrenceBatchBuilder {
  public readonly snapshot: SourceSnapshot;
  readonly #claims: ValidatedClaim[] = [];
  #frozen: OccurrenceBatch | undefined;

  public constructor(snapshot: SourceSnapshot) {
    if (!(snapshot instanceof SourceSnapshot)) {
      throw new TypeError("OccurrenceBatchBuilder requires a source snapshot");
    }
    this.snapshot = snapshot;
  }

  public get count(): number {
    return this.#claims.length;
  }

  public get isFrozen(): boolean {
    return this.#frozen !== undefined;
  }

  public add(claim: OccurrenceClaim): number {
    if (this.#frozen !== undefined) {
      throw new Error("the occurrence batch builder has already been frozen");
    }
    const validated = validateClaim(this.snapshot, claim);
    const ordinal = this.#claims.length;
    this.#claims.push(validated);
    return ordinal;
  }

  public freeze(): OccurrenceBatch {
    this.#frozen ??= new FrozenOccurrenceBatch(this.snapshot, this.#claims);
    return this.#frozen;
  }
}
