/**
 * Strict-stack pairing over exact occurrence selections.
 *
 * Pairing is one deterministic run for one caller-defined delimiter family.
 * It preserves occurrence ordinals and typed residue; only pairedRegions()
 * deliberately forgets delimiter identity into normalized envelope coverage.
 */

import { byteOffset, byteSpan, type ByteOffset, type ByteSpan } from "../source/span.js";
import { type OccurrenceRecord, type ProducerStamp } from "./occurrences.js";
import { OccurrenceSelection } from "./selection.js";
import { SpanSet } from "./span-set.js";

/** Caller-owned policy definition for one delimiter-family pairing run. */
export interface PairingPolicyDefinition {
  readonly name: string;
  readonly producer: ProducerStamp;
  readonly compatible: (opener: OccurrenceRecord, closer: OccurrenceRecord) => boolean;
  readonly expectedName: (opener: OccurrenceRecord) => string;
  readonly foundName: (closer: OccurrenceRecord) => string;
}

/** Names retained when a close does not match the popped stack top. */
export interface PairingMismatchNames {
  readonly expected: string;
  readonly found: string;
}

/** One accepted opener/closer edge, addressed on the exact input batches. */
export interface PairingMatch {
  readonly kind: "match";
  readonly openOrdinal: number;
  readonly closeOrdinal: number;
}

/** A close consumed an incompatible top opener; no lower search occurred. */
export interface PairingMismatchResidue {
  readonly kind: "mismatch";
  readonly openOrdinal: number;
  readonly closeOrdinal: number;
  readonly expected: string;
  readonly found: string;
}

/** A close on an empty stack remains consuming residue on the byte ledger. */
export interface PairingDanglingCloseResidue {
  readonly kind: "dangling-close";
  readonly closeOrdinal: number;
  readonly span: ByteSpan;
}

/** A final stack opener records missing-close evidence at the EOF boundary. */
export interface PairingUnclosedOpenResidue {
  readonly kind: "unclosed-open";
  readonly openOrdinal: number;
  readonly position: ByteOffset;
}

/** Every recoverable strict-pairing outcome that is not a match. */
export type PairingResidue =
  PairingMismatchResidue | PairingDanglingCloseResidue | PairingUnclosedOpenResidue;

/** Typed faults plus exact-batch ordinal projections for downstream consumers. */
export interface PairingFaults {
  readonly residue: readonly PairingResidue[];
  readonly mismatches: readonly PairingMismatchResidue[];
  readonly danglingCloses: readonly PairingDanglingCloseResidue[];
  readonly unclosedOpens: readonly PairingUnclosedOpenResidue[];
  readonly mismatchedOpens: OccurrenceSelection;
  readonly mismatchedCloses: OccurrenceSelection;
  readonly openResidue: OccurrenceSelection;
  readonly closeResidue: OccurrenceSelection;
  readonly isEmpty: boolean;
}

/** Complete immutable result of one delimiter-family strict-stack run. */
export interface PairingResult {
  readonly opens: OccurrenceSelection;
  readonly closes: OccurrenceSelection;
  readonly policy: PairingPolicy;
  readonly matches: readonly PairingMatch[];
  readonly matchedOpens: OccurrenceSelection;
  readonly matchedCloses: OccurrenceSelection;
  readonly faults: PairingFaults;
  pairedRegions(): SpanSet;
}

interface PairingToken {
  readonly role: "open" | "close";
  readonly record: OccurrenceRecord;
}

function assertNonblank(value: unknown, name: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${name} must not be empty or whitespace`);
  }
}

function copyProducer(producer: unknown): ProducerStamp {
  if (producer === null || typeof producer !== "object") {
    throw new TypeError("pairing policy producer must be a structured stamp");
  }
  const id = "id" in producer ? producer.id : undefined;
  const version = "version" in producer ? producer.version : undefined;
  assertNonblank(id, "pairing policy producer id");
  assertNonblank(version, "pairing policy producer version");
  return Object.freeze({ id, version });
}

/** Stable policy identity, lineage, compatibility, and mismatch vocabulary. */
export class PairingPolicy {
  public readonly name: string;
  public readonly producer: ProducerStamp;
  readonly #compatible: (opener: OccurrenceRecord, closer: OccurrenceRecord) => boolean;
  readonly #expectedName: (opener: OccurrenceRecord) => string;
  readonly #foundName: (closer: OccurrenceRecord) => string;

  public constructor(definition: PairingPolicyDefinition) {
    assertNonblank(definition.name, "pairing policy name");
    if (
      typeof definition.compatible !== "function" ||
      typeof definition.expectedName !== "function" ||
      typeof definition.foundName !== "function"
    ) {
      throw new TypeError("pairing policy requires compatibility and name functions");
    }
    this.name = definition.name;
    this.producer = copyProducer(definition.producer);
    this.#compatible = definition.compatible;
    this.#expectedName = definition.expectedName;
    this.#foundName = definition.foundName;
    Object.freeze(this);
  }

  public isCompatible(opener: OccurrenceRecord, closer: OccurrenceRecord): boolean {
    const result = this.#compatible(opener, closer);
    if (typeof result !== "boolean") {
      throw new TypeError("pairing compatibility predicate must return a boolean");
    }
    return result;
  }

  public describeMismatch(
    opener: OccurrenceRecord,
    closer: OccurrenceRecord,
  ): PairingMismatchNames {
    const expected = this.#expectedName(opener);
    const found = this.#foundName(closer);
    assertNonblank(expected, "pairing expected name");
    assertNonblank(found, "pairing found name");
    return Object.freeze({ expected, found });
  }
}

function compareTokens(left: PairingToken, right: PairingToken): number {
  const start = left.record.span.start - right.record.span.start;
  if (start !== 0) return start;
  const end = right.record.span.end - left.record.span.end;
  if (end !== 0) return end;
  if (left.role !== right.role) return left.role === "close" ? -1 : 1;
  return left.record.ordinal - right.record.ordinal;
}

function pairingTokens(
  opens: OccurrenceSelection,
  closes: OccurrenceSelection,
): readonly PairingToken[] {
  const tokens: PairingToken[] = [];
  for (const ordinal of opens) {
    tokens.push(Object.freeze({ role: "open", record: opens.batch.at(ordinal) }));
  }
  for (const ordinal of closes) {
    tokens.push(Object.freeze({ role: "close", record: closes.batch.at(ordinal) }));
  }
  tokens.sort(compareTokens);
  for (let index = 1; index < tokens.length; index++) {
    const previous = tokens[index - 1];
    const current = tokens[index];
    if (previous === undefined || current === undefined) {
      throw new Error("pairing token order contains a missing member");
    }
    if (previous.record.span.end > current.record.span.start) {
      throw new Error(
        "selected pairing tokens overlap; strict stack order requires one non-overlapping token stream",
      );
    }
  }
  return Object.freeze(tokens);
}

function ensureInputs(
  opens: OccurrenceSelection,
  closes: OccurrenceSelection,
  policy: PairingPolicy,
): void {
  if (!(opens instanceof OccurrenceSelection) || !(closes instanceof OccurrenceSelection)) {
    throw new TypeError("pairing requires exact occurrence selections");
  }
  if (!(policy instanceof PairingPolicy)) {
    throw new TypeError("pairing requires a pairing policy");
  }
  opens.batch.snapshot.ensureCompatibleWith(closes.batch.snapshot);
  if (opens.batch === closes.batch && !opens.intersect(closes).isEmpty) {
    throw new Error("one occurrence cannot belong to both open and close pairing roles");
  }
}

class FrozenPairingFaults implements PairingFaults {
  public readonly residue: readonly PairingResidue[];
  public readonly mismatches: readonly PairingMismatchResidue[];
  public readonly danglingCloses: readonly PairingDanglingCloseResidue[];
  public readonly unclosedOpens: readonly PairingUnclosedOpenResidue[];
  public readonly mismatchedOpens: OccurrenceSelection;
  public readonly mismatchedCloses: OccurrenceSelection;
  public readonly openResidue: OccurrenceSelection;
  public readonly closeResidue: OccurrenceSelection;
  public readonly isEmpty: boolean;

  public constructor(
    opens: OccurrenceSelection,
    closes: OccurrenceSelection,
    residue: readonly PairingResidue[],
    mismatches: readonly PairingMismatchResidue[],
    danglingCloses: readonly PairingDanglingCloseResidue[],
    unclosedOpens: readonly PairingUnclosedOpenResidue[],
  ) {
    this.residue = Object.freeze([...residue]);
    this.mismatches = Object.freeze([...mismatches]);
    this.danglingCloses = Object.freeze([...danglingCloses]);
    this.unclosedOpens = Object.freeze([...unclosedOpens]);
    this.mismatchedOpens = OccurrenceSelection.from(
      opens.batch,
      mismatches.map((item) => item.openOrdinal),
    );
    this.mismatchedCloses = OccurrenceSelection.from(
      closes.batch,
      mismatches.map((item) => item.closeOrdinal),
    );
    const unclosedSelection = OccurrenceSelection.from(
      opens.batch,
      unclosedOpens.map((item) => item.openOrdinal),
    );
    const danglingSelection = OccurrenceSelection.from(
      closes.batch,
      danglingCloses.map((item) => item.closeOrdinal),
    );
    this.openResidue = this.mismatchedOpens.union(unclosedSelection);
    this.closeResidue = this.mismatchedCloses.union(danglingSelection);
    this.isEmpty = residue.length === 0;
    Object.freeze(this);
  }
}

class FrozenPairingResult implements PairingResult {
  public readonly opens: OccurrenceSelection;
  public readonly closes: OccurrenceSelection;
  public readonly policy: PairingPolicy;
  public readonly matches: readonly PairingMatch[];
  public readonly matchedOpens: OccurrenceSelection;
  public readonly matchedCloses: OccurrenceSelection;
  public readonly faults: PairingFaults;

  public constructor(
    opens: OccurrenceSelection,
    closes: OccurrenceSelection,
    policy: PairingPolicy,
    matches: readonly PairingMatch[],
    faults: PairingFaults,
  ) {
    this.opens = opens;
    this.closes = closes;
    this.policy = policy;
    this.matches = Object.freeze([...matches]);
    this.matchedOpens = OccurrenceSelection.from(
      opens.batch,
      matches.map((item) => item.openOrdinal),
    );
    this.matchedCloses = OccurrenceSelection.from(
      closes.batch,
      matches.map((item) => item.closeOrdinal),
    );
    this.faults = faults;
    Object.freeze(this);
  }

  public pairedRegions(): SpanSet {
    return SpanSet.from(
      this.opens.batch.snapshot,
      this.matches.map((match) => {
        const opener = this.opens.batch.at(match.openOrdinal);
        const closer = this.closes.batch.at(match.closeOrdinal);
        return byteSpan(opener.span.start, closer.span.end);
      }),
    );
  }
}

/** Pair one open and close selection with a top-only strict stack. */
export function pairOccurrences(
  opens: OccurrenceSelection,
  closes: OccurrenceSelection,
  policy: PairingPolicy,
): PairingResult {
  ensureInputs(opens, closes, policy);
  const tokens = pairingTokens(opens, closes);
  const stack: OccurrenceRecord[] = [];
  const matches: PairingMatch[] = [];
  const residue: PairingResidue[] = [];
  const mismatches: PairingMismatchResidue[] = [];
  const danglingCloses: PairingDanglingCloseResidue[] = [];
  const unclosedOpens: PairingUnclosedOpenResidue[] = [];

  for (const token of tokens) {
    if (token.role === "open") {
      stack.push(token.record);
      continue;
    }
    const opener = stack.pop();
    if (opener === undefined) {
      const dangling: PairingDanglingCloseResidue = Object.freeze({
        kind: "dangling-close",
        closeOrdinal: token.record.ordinal,
        span: byteSpan(token.record.span.start, token.record.span.end),
      });
      danglingCloses.push(dangling);
      residue.push(dangling);
      continue;
    }
    if (policy.isCompatible(opener, token.record)) {
      matches.push(
        Object.freeze({
          kind: "match",
          openOrdinal: opener.ordinal,
          closeOrdinal: token.record.ordinal,
        }),
      );
    } else {
      const names = policy.describeMismatch(opener, token.record);
      const mismatch: PairingMismatchResidue = Object.freeze({
        kind: "mismatch",
        openOrdinal: opener.ordinal,
        closeOrdinal: token.record.ordinal,
        expected: names.expected,
        found: names.found,
      });
      mismatches.push(mismatch);
      residue.push(mismatch);
    }
  }

  const eof = byteOffset(opens.batch.snapshot.byteLength);
  while (stack.length > 0) {
    const opener = stack.pop();
    if (opener === undefined) throw new Error("pairing stack lost an opener");
    const unclosed: PairingUnclosedOpenResidue = Object.freeze({
      kind: "unclosed-open",
      openOrdinal: opener.ordinal,
      position: eof,
    });
    unclosedOpens.push(unclosed);
    residue.push(unclosed);
  }

  const faults = new FrozenPairingFaults(
    opens,
    closes,
    residue,
    mismatches,
    danglingCloses,
    unclosedOpens,
  );
  return new FrozenPairingResult(opens, closes, policy, matches, faults);
}
