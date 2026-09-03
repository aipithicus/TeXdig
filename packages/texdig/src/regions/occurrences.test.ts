import { describe, expect, it } from "vitest";

import {
  occurrenceContainingOracle,
  occurrenceIntersectionOracle,
  type OracleOccurrence,
} from "../../../../scripts/conformance/occurrence-oracle.js";
import { byteOffset, byteSpan } from "../source/span.js";
import { SourceSlice } from "../source/slice.js";
import { SourceSnapshot } from "../source/snapshot.js";
import { OccurrenceBatchBuilder, type OccurrenceBatch } from "./occurrences.js";

function snapshot(
  bytes: readonly number[],
  sourceId = "occurrences.tex",
  revision = 1,
): SourceSnapshot {
  return new SourceSnapshot(Uint8Array.from(bytes), { sourceId, revision });
}

function ordinals(records: ReturnType<OccurrenceBatch["ordered"]>): readonly number[] {
  return records.map((record) => record.ordinal);
}

function populatedBatch(source: SourceSnapshot): OccurrenceBatch {
  const builder = new OccurrenceBatchBuilder(source);
  builder.add({
    snapshot: source,
    span: byteSpan(1, 4),
    kind: "token",
    producer: { id: "lexer", version: "1" },
    ruleId: "scan-a",
  });
  builder.add({
    snapshot: source,
    span: byteSpan(1, 4),
    kind: "token",
    producer: { id: "lexer", version: "1" },
    priority: 3,
    ruleId: "scan-a",
  });
  builder.add({
    snapshot: source,
    span: byteSpan(0, 6),
    kind: "delimiter",
    producer: { id: "parser", version: "2" },
    priority: 1,
  });
  builder.add({
    snapshot: source,
    span: byteSpan(3, 6),
    kind: "comment",
    producer: { id: "lexer", version: "1" },
    priority: -2,
    ruleId: "scan-b",
  });
  return builder.freeze();
}

describe("OccurrenceBatch construction", () => {
  it("freezes copied, interned columns without losing discovery identity", () => {
    const source = snapshot([0x41, 0x42, 0x43, 0x44, 0x45, 0x46]);
    const compatible = snapshot(
      [0x41, 0x42, 0x43, 0x44, 0x45, 0x46],
      source.sourceId,
      source.revision,
    );
    const producer = { id: "lexer", version: "1" };
    const builder = new OccurrenceBatchBuilder(source);

    expect(
      builder.add({
        snapshot: compatible,
        span: byteSpan(1, 4),
        kind: "token",
        producer,
        ruleId: "scan-a",
      }),
    ).toBe(0);
    expect(
      builder.add({
        snapshot: source,
        span: byteSpan(1, 4),
        kind: "token",
        producer: { id: "lexer", version: "1" },
        priority: 3,
        ruleId: "scan-a",
      }),
    ).toBe(1);
    expect(
      builder.add({
        snapshot: source,
        span: byteSpan(0, 6),
        kind: "delimiter",
        producer: { id: "parser", version: "2" },
        priority: 1,
      }),
    ).toBe(2);
    producer.id = "mutated-after-add";

    const batch = builder.freeze();
    expect(builder.freeze()).toBe(batch);
    expect(builder.count).toBe(3);
    expect(builder.isFrozen).toBe(true);
    expect(batch.snapshot).toBe(source);
    expect(batch.count).toBe(3);
    expect([...batch].map((record) => record.ordinal)).toEqual([0, 1, 2]);
    expect(batch.at(0)).toMatchObject({
      ordinal: 0,
      snapshot: source,
      span: byteSpan(1, 4),
      kind: "token",
      producer: { id: "lexer", version: "1" },
      priority: 0,
      ruleId: "scan-a",
    });
    expect(batch.at(1).span).toEqual(batch.at(0).span);
    expect(batch.kindTable).toEqual(["token", "delimiter"]);
    expect(batch.producerTable).toEqual([
      { id: "lexer", version: "1" },
      { id: "parser", version: "2" },
    ]);
    expect(batch.ruleIdTable).toEqual(["scan-a"]);
    expect(batch.at(0).producer).toBe(batch.at(1).producer);
    expect(batch.at(0).producer).not.toBe(producer);
    expect("ruleId" in batch.at(2)).toBe(false);
    expect(Object.isFrozen(batch)).toBe(true);
    expect(Object.isFrozen(batch.kindTable)).toBe(true);
    expect(Object.isFrozen(batch.producerTable)).toBe(true);
    expect(Object.isFrozen(batch.at(0))).toBe(true);
    expect(Object.isFrozen(batch.at(0).producer)).toBe(true);
    expect(() =>
      builder.add({
        snapshot: source,
        span: byteSpan(4, 5),
        kind: "late",
        producer: { id: "lexer", version: "1" },
      }),
    ).toThrow(/already been frozen/);
  });

  it("orders by geometry and descending priority without changing ordinals", () => {
    const batch = populatedBatch(snapshot([0, 1, 2, 3, 4, 5]));

    expect(ordinals(batch.ordered("geometry"))).toEqual([2, 0, 1, 3]);
    expect(ordinals(batch.ordered("priority-then-geometry"))).toEqual([1, 2, 0, 3]);
    expect([...batch].map((record) => record.ordinal)).toEqual([0, 1, 2, 3]);
  });

  it("rejects invalid claims transactionally at the builder boundary", () => {
    const source = snapshot([0, 1, 2, 3]);
    const builder = new OccurrenceBatchBuilder(source);
    const base = {
      snapshot: source,
      span: byteSpan(0, 1),
      kind: "token",
      producer: { id: "lexer", version: "1" },
    };

    expect(() => builder.add({ ...base, span: byteSpan(1, 1) })).toThrow(/must not be empty/);
    expect(() => builder.add({ ...base, span: byteSpan(3, 5) })).toThrow(/exceeds/);
    expect(() =>
      builder.add({ ...base, snapshot: snapshot([0, 1, 2, 3], source.sourceId, 2) }),
    ).toThrow(/incompatible/);
    expect(() => builder.add({ ...base, kind: "   " })).toThrow(/kind/);
    expect(() => builder.add({ ...base, producer: { id: "", version: "1" } })).toThrow(
      /producer id/,
    );
    expect(() => builder.add({ ...base, producer: { id: "lexer", version: " " } })).toThrow(
      /producer version/,
    );
    expect(() => builder.add({ ...base, ruleId: "" })).toThrow(/rule id/);
    expect(() => builder.add({ ...base, priority: 1.5 })).toThrow(/signed 32-bit/);
    expect(() => builder.add({ ...base, priority: 0x8000_0000 })).toThrow(/signed 32-bit/);
    expect(() => builder.add({ ...base, priority: -0x8000_0001 })).toThrow(/signed 32-bit/);
    expect(builder.count).toBe(0);

    const empty = builder.freeze();
    expect(empty.count).toBe(0);
    expect(empty.kindTable).toEqual([]);
    expect(empty.producerTable).toEqual([]);
    expect(empty.ruleIdTable).toEqual([]);
    expect(() => empty.at(-1)).toThrow(/ordinal/);
    expect(() => empty.at(0)).toThrow(/ordinal/);
  });
});

describe("OccurrenceBatch lookup", () => {
  it("matches brute force for every query, including empty spans and EOF", () => {
    const source = snapshot([0, 1, 2, 3, 4, 5]);
    const batch = populatedBatch(source);
    const claims: readonly OracleOccurrence[] = [...batch].map((record) => ({
      start: record.span.start,
      end: record.span.end,
      kind: record.kind,
      producer: record.producer,
      priority: record.priority,
      ...(record.ruleId === undefined ? {} : { ruleId: record.ruleId }),
    }));

    for (let start = 0; start <= source.byteLength; start++) {
      for (let end = start; end <= source.byteLength; end++) {
        const query = byteSpan(start, end);
        expect(ordinals(batch.lookup.findIntersecting(query, "geometry"))).toEqual(
          occurrenceIntersectionOracle(claims, start, end, "geometry"),
        );
        expect(ordinals(batch.lookup.findIntersecting(query, "priority-then-geometry"))).toEqual(
          occurrenceIntersectionOracle(claims, start, end, "priority-then-geometry"),
        );
      }
    }
    for (let position = 0; position <= source.byteLength; position++) {
      expect(ordinals(batch.lookup.findContaining(byteOffset(position), "geometry"))).toEqual(
        occurrenceContainingOracle(claims, position, "geometry"),
      );
      expect(
        ordinals(batch.lookup.findContaining(byteOffset(position), "priority-then-geometry")),
      ).toEqual(occurrenceContainingOracle(claims, position, "priority-then-geometry"));
    }
    expect(batch.lookup.batch).toBe(batch);
    expect(Object.isFrozen(batch.ordered())).toBe(true);
    expect(Object.isFrozen(batch.lookup.findIntersecting(byteSpan(0, 1)))).toBe(true);
    expect(batch.lookup.findIntersecting(byteSpan(3, 3))).toEqual([]);
    expect(batch.lookup.findContaining(byteOffset(source.byteLength))).toEqual([]);
    expect(() => batch.lookup.findIntersecting(byteSpan(0, source.byteLength + 1))).toThrow(
      RangeError,
    );
  });
});

describe("OccurrenceBatch rebasing", () => {
  it("preserves records and ordinals while rebasing up and down", () => {
    const parent = snapshot([0, 1, 2, 3, 4, 5, 6, 7]);
    const slice = SourceSlice.create(parent, byteSpan(2, 7));
    const builder = new OccurrenceBatchBuilder(slice.child);
    builder.add({
      snapshot: slice.child,
      span: byteSpan(0, 2),
      kind: "left",
      producer: { id: "lexer", version: "1" },
      priority: 2,
      ruleId: "scan-a",
    });
    builder.add({
      snapshot: slice.child,
      span: byteSpan(2, 5),
      kind: "right",
      producer: { id: "parser", version: "2" },
      priority: -1,
    });
    const childBatch = builder.freeze();

    const parentBatch = childBatch.toParent(slice);
    expect(parentBatch.snapshot).toBe(parent);
    expect([...parentBatch].map((record) => record.span)).toEqual([byteSpan(2, 4), byteSpan(4, 7)]);
    expect([...parentBatch].map((record) => record.ordinal)).toEqual([0, 1]);
    expect(parentBatch.kindTable).toEqual(childBatch.kindTable);
    expect(parentBatch.producerTable).toEqual(childBatch.producerTable);
    expect(parentBatch.ruleIdTable).toEqual(childBatch.ruleIdTable);

    const roundTrip = parentBatch.toChild(slice);
    expect([...roundTrip]).toEqual([...childBatch]);
    expect(roundTrip.snapshot).toBe(slice.child);

    const unrelatedParent = snapshot([0, 1, 2, 3, 4, 5, 6, 7], "other.tex");
    const unrelatedSlice = SourceSlice.create(unrelatedParent, byteSpan(2, 7));
    expect(() => childBatch.toParent(unrelatedSlice)).toThrow(/incompatible/);
    expect(() => parentBatch.toChild(unrelatedSlice)).toThrow(/incompatible/);
  });

  it("rejects every outside or crossing member when rebasing down", () => {
    const parent = snapshot([0, 1, 2, 3, 4, 5, 6, 7]);
    const slice = SourceSlice.create(parent, byteSpan(2, 7));
    for (const span of [byteSpan(1, 3), byteSpan(6, 8), byteSpan(0, 2), byteSpan(7, 8)]) {
      const builder = new OccurrenceBatchBuilder(parent);
      builder.add({
        snapshot: parent,
        span,
        kind: "outside",
        producer: { id: "lexer", version: "1" },
      });
      expect(() => builder.freeze().toChild(slice)).toThrow(/outside slice window/);
    }
  });

  it("composes through nested slices", () => {
    const root = snapshot([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const outer = SourceSlice.create(root, byteSpan(1, 8));
    const inner = SourceSlice.create(outer.child, byteSpan(2, 5));
    const builder = new OccurrenceBatchBuilder(inner.child);
    builder.add({
      snapshot: inner.child,
      span: byteSpan(0, 1),
      kind: "left",
      producer: { id: "lexer", version: "1" },
    });
    builder.add({
      snapshot: inner.child,
      span: byteSpan(1, 3),
      kind: "right",
      producer: { id: "parser", version: "2" },
    });

    const rebased = builder.freeze().toParent(inner).toParent(outer);
    expect([...rebased].map((record) => record.span)).toEqual([byteSpan(3, 4), byteSpan(4, 6)]);
    expect([...rebased].map((record) => record.ordinal)).toEqual([0, 1]);
  });
});
