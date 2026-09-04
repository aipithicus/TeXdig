import { describe, expect, it } from "vitest";

import { byteOffset, byteSpan } from "../source/span.js";
import { SourceSnapshot } from "../source/snapshot.js";
import {
  OccurrenceBatchBuilder,
  type OccurrenceBatch,
  type OccurrenceClaim,
  type ProducerStamp,
} from "./occurrences.js";
import { PairingPolicy, pairOccurrences } from "./pairing.js";
import { OccurrenceSelection } from "./selection.js";

const TOKEN_PRODUCER = Object.freeze({ id: "lexer", version: "1" });
const POLICY_PRODUCER = Object.freeze({ id: "pairing-test", version: "1" });

interface TokenDefinition {
  readonly start: number;
  readonly end: number;
  readonly role: "open" | "close";
  readonly key: string;
}

function snapshot(
  length: number,
  sourceId = "pairing.tex",
  revision = 1,
  declaredEncoding?: string,
): SourceSnapshot {
  const required = { sourceId, revision };
  return declaredEncoding === undefined
    ? new SourceSnapshot(new Uint8Array(length), required)
    : new SourceSnapshot(new Uint8Array(length), { ...required, declaredEncoding });
}

function tokenBatch(
  source: SourceSnapshot,
  definitions: readonly TokenDefinition[],
): OccurrenceBatch {
  const builder = new OccurrenceBatchBuilder(source);
  for (const definition of definitions) {
    const claim: OccurrenceClaim = {
      snapshot: source,
      span: byteSpan(definition.start, definition.end),
      kind: definition.role,
      producer: TOKEN_PRODUCER,
      priority: 0,
      ruleId: definition.key,
    };
    builder.add(claim);
  }
  return builder.freeze();
}

function roles(basis: OccurrenceBatch): {
  readonly opens: OccurrenceSelection;
  readonly closes: OccurrenceSelection;
} {
  return {
    opens: OccurrenceSelection.fromPredicate(basis, (record) => record.kind === "open"),
    closes: OccurrenceSelection.fromPredicate(basis, (record) => record.kind === "close"),
  };
}

function keyPolicy(producer: ProducerStamp = POLICY_PRODUCER): PairingPolicy {
  return new PairingPolicy({
    name: "rule-id-equality",
    producer,
    compatible: (opener, closer) => opener.ruleId === closer.ruleId,
    expectedName: (opener) => opener.ruleId ?? opener.kind,
    foundName: (closer) => closer.ruleId ?? closer.kind,
  });
}

describe("strict-stack pairing", () => {
  it("retains exact empty inputs and policy provenance", () => {
    const source = snapshot(0);
    const basis = tokenBatch(source, []);
    const opens = OccurrenceSelection.none(basis);
    const closes = OccurrenceSelection.none(basis);
    const policy = keyPolicy();
    const result = pairOccurrences(opens, closes, policy);

    expect(result.opens).toBe(opens);
    expect(result.closes).toBe(closes);
    expect(result.policy).toBe(policy);
    expect(result.matches).toEqual([]);
    expect(result.faults.residue).toEqual([]);
    expect(result.faults.isEmpty).toBe(true);
    expect(result.matchedOpens.isEmpty).toBe(true);
    expect(result.matchedCloses.isEmpty).toBe(true);
    expect(result.pairedRegions().count).toBe(0);
    expect(result.pairedRegions().snapshot).toBe(source);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.faults)).toBe(true);
  });

  it("matches nested and sequential delimiters in close-event order", () => {
    const source = snapshot(12);
    const basis = tokenBatch(source, [
      { start: 0, end: 1, role: "open", key: "A" },
      { start: 2, end: 3, role: "open", key: "B" },
      { start: 4, end: 5, role: "close", key: "B" },
      { start: 6, end: 7, role: "close", key: "A" },
      { start: 8, end: 9, role: "open", key: "A" },
      { start: 10, end: 11, role: "close", key: "A" },
    ]);
    const { opens, closes } = roles(basis);
    const result = pairOccurrences(opens, closes, keyPolicy());

    expect(result.matches).toEqual([
      { kind: "match", openOrdinal: 1, closeOrdinal: 2 },
      { kind: "match", openOrdinal: 0, closeOrdinal: 3 },
      { kind: "match", openOrdinal: 4, closeOrdinal: 5 },
    ]);
    expect([...result.matchedOpens]).toEqual([0, 1, 4]);
    expect([...result.matchedCloses]).toEqual([2, 3, 5]);
    expect(result.faults.isEmpty).toBe(true);
    expect([...result.pairedRegions()]).toEqual([byteSpan(0, 7), byteSpan(8, 11)]);
  });

  it("records top-only mismatch, dangling close, and inner-first EOF residue", () => {
    const source = snapshot(12);
    const basis = tokenBatch(source, [
      { start: 0, end: 1, role: "close", key: "A" },
      { start: 2, end: 3, role: "open", key: "A" },
      { start: 4, end: 5, role: "open", key: "B" },
      { start: 6, end: 7, role: "close", key: "A" },
      { start: 8, end: 9, role: "close", key: "A" },
      { start: 10, end: 11, role: "open", key: "C" },
    ]);
    const { opens, closes } = roles(basis);
    let comparisons = 0;
    const policy = new PairingPolicy({
      name: "counted-rule-id",
      producer: POLICY_PRODUCER,
      compatible: (opener, closer) => {
        comparisons++;
        return opener.ruleId === closer.ruleId;
      },
      expectedName: (opener) => opener.ruleId ?? opener.kind,
      foundName: (closer) => closer.ruleId ?? closer.kind,
    });
    const result = pairOccurrences(opens, closes, policy);

    expect(comparisons).toBe(2);
    expect(result.matches).toEqual([{ kind: "match", openOrdinal: 1, closeOrdinal: 4 }]);
    expect(result.faults.mismatches).toEqual([
      {
        kind: "mismatch",
        openOrdinal: 2,
        closeOrdinal: 3,
        expected: "B",
        found: "A",
      },
    ]);
    expect(result.faults.danglingCloses).toEqual([
      { kind: "dangling-close", closeOrdinal: 0, span: byteSpan(0, 1) },
    ]);
    expect(result.faults.unclosedOpens).toEqual([
      { kind: "unclosed-open", openOrdinal: 5, position: byteOffset(12) },
    ]);
    expect(result.faults.residue.map((item) => item.kind)).toEqual([
      "dangling-close",
      "mismatch",
      "unclosed-open",
    ]);
    expect([...result.faults.mismatchedOpens]).toEqual([2]);
    expect([...result.faults.mismatchedCloses]).toEqual([3]);
    expect([...result.faults.openResidue]).toEqual([2, 5]);
    expect([...result.faults.closeResidue]).toEqual([0, 3]);
    expect([...result.pairedRegions()]).toEqual([byteSpan(2, 9)]);
  });

  it("keeps separate compatible occurrence bases and their local ordinals", () => {
    const openSource = snapshot(8, "same.tex", 4, "utf-8");
    const closeSource = snapshot(8, "same.tex", 4, "latin1");
    const openBatch = tokenBatch(openSource, [
      { start: 0, end: 1, role: "open", key: "A" },
      { start: 4, end: 5, role: "open", key: "B" },
    ]);
    const closeBatch = tokenBatch(closeSource, [
      { start: 2, end: 3, role: "close", key: "A" },
      { start: 6, end: 7, role: "close", key: "B" },
    ]);
    const opens = OccurrenceSelection.all(openBatch);
    const closes = OccurrenceSelection.all(closeBatch);
    const result = pairOccurrences(opens, closes, keyPolicy());

    expect(result.opens.batch).toBe(openBatch);
    expect(result.closes.batch).toBe(closeBatch);
    expect(result.matches).toEqual([
      { kind: "match", openOrdinal: 0, closeOrdinal: 0 },
      { kind: "match", openOrdinal: 1, closeOrdinal: 1 },
    ]);
    expect(result.pairedRegions().snapshot).toBe(openSource);
    expect([...result.pairedRegions()]).toEqual([byteSpan(0, 3), byteSpan(4, 7)]);
  });
});

describe("pairing contract boundaries", () => {
  it("rejects shared roles, overlapping tokens, and incompatible snapshots", () => {
    const source = snapshot(6);
    const sharedBatch = tokenBatch(source, [{ start: 0, end: 1, role: "open", key: "A" }]);
    const shared = OccurrenceSelection.all(sharedBatch);
    expect(() => pairOccurrences(shared, shared, keyPolicy())).toThrow(/both open and close/);

    const overlapBatch = tokenBatch(source, [
      { start: 0, end: 3, role: "open", key: "A" },
      { start: 2, end: 4, role: "close", key: "A" },
    ]);
    const overlapRoles = roles(overlapBatch);
    expect(() => pairOccurrences(overlapRoles.opens, overlapRoles.closes, keyPolicy())).toThrow(
      /overlap/,
    );

    const openBatch = tokenBatch(source, [{ start: 0, end: 1, role: "open", key: "A" }]);
    const foreignBatch = tokenBatch(snapshot(6, "foreign.tex"), [
      { start: 2, end: 3, role: "close", key: "A" },
    ]);
    expect(() =>
      pairOccurrences(
        OccurrenceSelection.all(openBatch),
        OccurrenceSelection.all(foreignBatch),
        keyPolicy(),
      ),
    ).toThrow(/incompatible/);
  });

  it("copies policy lineage and rejects invalid names at their boundary", () => {
    const producer = { id: "pairing-policy", version: "1" };
    const policy = keyPolicy(producer);
    producer.id = "mutated";

    expect(policy.producer).toEqual({ id: "pairing-policy", version: "1" });
    expect(Object.isFrozen(policy)).toBe(true);
    expect(Object.isFrozen(policy.producer)).toBe(true);
    expect(
      () =>
        new PairingPolicy({
          name: " ",
          producer: POLICY_PRODUCER,
          compatible: () => true,
          expectedName: () => "A",
          foundName: () => "A",
        }),
    ).toThrow(/name/);
    expect(() => keyPolicy({ id: "", version: "1" })).toThrow(/producer id/);

    const source = snapshot(4);
    const basis = tokenBatch(source, [
      { start: 0, end: 1, role: "open", key: "A" },
      { start: 2, end: 3, role: "close", key: "B" },
    ]);
    const roleSelections = roles(basis);
    const unnamed = new PairingPolicy({
      name: "bad-mismatch-name",
      producer: POLICY_PRODUCER,
      compatible: () => false,
      expectedName: () => "",
      foundName: () => "B",
    });
    expect(() => pairOccurrences(roleSelections.opens, roleSelections.closes, unnamed)).toThrow(
      /expected name/,
    );
  });
});
