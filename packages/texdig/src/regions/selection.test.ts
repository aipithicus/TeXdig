import { describe, expect, it } from "vitest";

import { byteSpan } from "../source/span.js";
import { SourceSnapshot } from "../source/snapshot.js";
import {
  OccurrenceBatchBuilder,
  type OccurrenceBatch,
  type OccurrenceClaim,
} from "./occurrences.js";
import { OccurrenceSelection } from "./selection.js";

const PRODUCER = Object.freeze({ id: "selection-test", version: "1" });

interface ClaimDefinition {
  readonly start: number;
  readonly end: number;
  readonly priority: number;
  readonly kind?: string;
}

function snapshot(length: number): SourceSnapshot {
  return new SourceSnapshot(new Uint8Array(length), {
    sourceId: "selection.tex",
    revision: 1,
  });
}

function batch(source: SourceSnapshot, definitions: readonly ClaimDefinition[]): OccurrenceBatch {
  const builder = new OccurrenceBatchBuilder(source);
  for (const definition of definitions) {
    const claim: OccurrenceClaim = {
      snapshot: source,
      span: byteSpan(definition.start, definition.end),
      kind: definition.kind ?? "token",
      producer: PRODUCER,
      priority: definition.priority,
    };
    builder.add(claim);
  }
  return builder.freeze();
}

function ordinalBatch(count: number): OccurrenceBatch {
  const source = snapshot(Math.max(1, count));
  return batch(
    source,
    Array.from({ length: count }, (_, ordinal) => ({
      start: ordinal,
      end: ordinal + 1,
      priority: ordinal % 5,
    })),
  );
}

function fromMask(basis: OccurrenceBatch, mask: number): OccurrenceSelection {
  const ordinals: number[] = [];
  for (let ordinal = 0; ordinal < basis.count; ordinal++) {
    if ((mask & (1 << ordinal)) !== 0) ordinals.push(ordinal);
  }
  return OccurrenceSelection.from(basis, ordinals);
}

function bits(selection: OccurrenceSelection): readonly boolean[] {
  return Array.from({ length: selection.batch.count }, (_, ordinal) => selection.contains(ordinal));
}

describe("OccurrenceSelection construction", () => {
  it("constructs none, all, ordinal, and predicate selections on one exact batch", () => {
    const basis = ordinalBatch(5);
    const input = [4, 1, 1, 3];
    const selected = OccurrenceSelection.from(basis, input);
    input.splice(0, input.length, 0, 2);

    expect([...OccurrenceSelection.none(basis)]).toEqual([]);
    expect(OccurrenceSelection.none(basis).isEmpty).toBe(true);
    expect([...OccurrenceSelection.all(basis)]).toEqual([0, 1, 2, 3, 4]);
    expect([...selected]).toEqual([1, 3, 4]);
    expect(selected.count).toBe(3);
    expect(selected.isEmpty).toBe(false);
    expect(selected.contains(1)).toBe(true);
    expect(selected.contains(2)).toBe(false);
    expect([...OccurrenceSelection.fromPredicate(basis, (record) => record.priority >= 3)]).toEqual(
      [3, 4],
    );
    expect(Object.isFrozen(selected)).toBe(true);
  });

  it("rejects every ordinal outside the exact batch extent", () => {
    const basis = ordinalBatch(3);

    expect(() => OccurrenceSelection.from(basis, [-1])).toThrow(/ordinal/);
    expect(() => OccurrenceSelection.from(basis, [3])).toThrow(/ordinal/);
    expect(() => OccurrenceSelection.from(basis, [0.5])).toThrow(/ordinal/);
    expect(() => OccurrenceSelection.none(basis).contains(-1)).toThrow(/ordinal/);
    expect(() => OccurrenceSelection.none(basis).contains(3)).toThrow(/ordinal/);
  });

  it("masks complement tail bits across both 32-bit and 64-bit boundaries", () => {
    const basis = ordinalBatch(65);
    const selected = OccurrenceSelection.from(basis, [0, 31, 32, 63, 64]);
    const complement = selected.complement();

    expect(complement.count).toBe(60);
    expect([...complement]).toHaveLength(60);
    expect([...complement].at(-1)).toBe(62);
    expect(complement.complement().equals(selected)).toBe(true);
    expect(OccurrenceSelection.all(basis).count).toBe(65);
    expect([...OccurrenceSelection.all(basis)].at(-1)).toBe(64);
  });
});

describe("OccurrenceSelection algebra", () => {
  it("matches every pair of five-ordinal Boolean arrays", () => {
    const basis = ordinalBatch(5);
    const limit = 1 << basis.count;
    for (let leftMask = 0; leftMask < limit; leftMask++) {
      const left = fromMask(basis, leftMask);
      const leftBits = bits(left);
      expect(bits(left.complement())).toEqual(leftBits.map((value) => !value));
      expect(left.complement().complement().equals(left)).toBe(true);
      for (let rightMask = 0; rightMask < limit; rightMask++) {
        const right = fromMask(basis, rightMask);
        const rightBits = bits(right);
        expect(bits(left.union(right))).toEqual(
          leftBits.map((value, ordinal) => value || (rightBits[ordinal] ?? false)),
        );
        expect(bits(left.intersect(right))).toEqual(
          leftBits.map((value, ordinal) => value && (rightBits[ordinal] ?? false)),
        );
        expect(bits(left.subtract(right))).toEqual(
          leftBits.map((value, ordinal) => value && !(rightBits[ordinal] ?? false)),
        );
      }
    }
  });

  it("requires the exact frozen batch object even for value-identical batches", () => {
    const source = snapshot(4);
    const definitions = [
      { start: 0, end: 2, priority: 0 },
      { start: 2, end: 4, priority: 1 },
    ];
    const leftBasis = batch(source, definitions);
    const rightBasis = batch(source, definitions);
    const left = OccurrenceSelection.from(leftBasis, [0]);
    const equivalent = OccurrenceSelection.from(rightBasis, [0]);

    expect(leftBasis).not.toBe(rightBasis);
    expect(left.equals(equivalent)).toBe(false);
    expect(() => left.union(equivalent)).toThrow(/different frozen-batch bases/);
    expect(() => left.intersect(equivalent)).toThrow(/different frozen-batch bases/);
    expect(() => left.subtract(equivalent)).toThrow(/different frozen-batch bases/);
    expect(left.coverage().equals(equivalent.coverage())).toBe(true);
    expect(left.equals(null)).toBe(false);
    expect(left.equals(undefined)).toBe(false);
  });
});

describe("OccurrenceSelection projections", () => {
  it("projects selected records in either batch order without changing ordinals", () => {
    const source = snapshot(4);
    const basis = batch(source, [
      { start: 2, end: 4, priority: 0 },
      { start: 0, end: 4, priority: 3 },
      { start: 2, end: 4, priority: 5 },
      { start: 1, end: 2, priority: -1 },
    ]);
    const selected = OccurrenceSelection.from(basis, [3, 0, 1]);
    const geometry = selected.records("geometry");
    const priority = selected.records("priority-then-geometry");

    expect(geometry.map((record) => record.ordinal)).toEqual([1, 3, 0]);
    expect(priority.map((record) => record.ordinal)).toEqual([1, 0, 3]);
    expect(Object.isFrozen(geometry)).toBe(true);
    expect(Object.isFrozen(priority)).toBe(true);
  });

  it("drops duplicate identity and overlap only through coverage", () => {
    const source = snapshot(8);
    const basis = batch(source, [
      { start: 1, end: 4, priority: 0, kind: "token" },
      { start: 1, end: 4, priority: 7, kind: "alternate" },
      { start: 3, end: 6, priority: 1, kind: "overlap" },
      { start: 7, end: 8, priority: 0, kind: "tail" },
    ]);
    const selected = OccurrenceSelection.from(basis, [0, 1, 2]);
    const coverage = selected.coverage();

    expect([...selected]).toEqual([0, 1, 2]);
    expect(selected.count).toBe(3);
    expect([...coverage]).toEqual([byteSpan(1, 6)]);
    expect(coverage.coverage).toBe(5);
    expect(coverage.snapshot).toBe(source);
  });
});
