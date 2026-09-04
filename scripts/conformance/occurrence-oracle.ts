import { inputFields, row } from "./format.ts";

export interface OracleProducerStamp {
  readonly id: string;
  readonly version: string;
}

export interface OracleOccurrence {
  readonly start: number;
  readonly end: number;
  readonly kind: string;
  readonly producer: OracleProducerStamp;
  readonly priority: number;
  readonly ruleId?: string;
}

export type OracleOccurrenceOrder = "geometry" | "priority-then-geometry";

const MAX_INT32 = 0x7fff_ffff;
const MIN_INT32 = -0x8000_0000;
const OCCURRENCE_TOKEN = /^[A-Za-z0-9][A-Za-z0-9._+-]*$/;

/** Independently translate occurrence geometry while preserving discovery metadata. */
export function occurrenceRebaseOracle(
  claims: readonly OracleOccurrence[],
  delta: number,
): readonly OracleOccurrence[] {
  if (!Number.isSafeInteger(delta) || delta < 0) {
    throw new RangeError("invalid occurrence rebase delta");
  }
  return claims.map((claim) => {
    const required: Omit<OracleOccurrence, "ruleId"> = {
      start: claim.start + delta,
      end: claim.end + delta,
      kind: claim.kind,
      producer: claim.producer,
      priority: claim.priority,
    };
    return Object.freeze(
      claim.ruleId === undefined ? required : { ...required, ruleId: claim.ruleId },
    );
  });
}

function assertOccurrenceToken(value: string, name: string): void {
  if (!OCCURRENCE_TOKEN.test(value)) {
    throw new SyntaxError(`invalid ${name} fixture token: ${value}`);
  }
}

function compareOracleOccurrences(
  claims: readonly OracleOccurrence[],
  left: number,
  right: number,
  order: OracleOccurrenceOrder,
): number {
  const leftClaim = claims[left];
  const rightClaim = claims[right];
  if (leftClaim === undefined || rightClaim === undefined) {
    throw new RangeError("occurrence oracle received an invalid ordinal");
  }
  if (order === "priority-then-geometry" && leftClaim.priority !== rightClaim.priority) {
    return leftClaim.priority > rightClaim.priority ? -1 : 1;
  }
  if (leftClaim.start !== rightClaim.start) return leftClaim.start - rightClaim.start;
  if (leftClaim.end !== rightClaim.end) return rightClaim.end - leftClaim.end;
  return left - right;
}

export function occurrenceOrderOracle(
  claims: readonly OracleOccurrence[],
  order: OracleOccurrenceOrder,
): readonly number[] {
  return Array.from({ length: claims.length }, (_, ordinal) => ordinal).sort((left, right) =>
    compareOracleOccurrences(claims, left, right, order),
  );
}

export function occurrenceIntersectionOracle(
  claims: readonly OracleOccurrence[],
  start: number,
  end: number,
  order: OracleOccurrenceOrder,
): readonly number[] {
  if (start === end) return [];
  return occurrenceOrderOracle(claims, order).filter((ordinal) => {
    const claim = claims[ordinal];
    return claim !== undefined && claim.start < end && start < claim.end;
  });
}

export function occurrenceContainingOracle(
  claims: readonly OracleOccurrence[],
  position: number,
  order: OracleOccurrenceOrder,
): readonly number[] {
  return occurrenceOrderOracle(claims, order).filter((ordinal) => {
    const claim = claims[ordinal];
    return claim !== undefined && claim.start <= position && position < claim.end;
  });
}

function firstStrings(values: readonly (string | undefined)[]): readonly string[] {
  const seen = new Set<string>();
  const table: string[] = [];
  for (const value of values) {
    if (value !== undefined && !seen.has(value)) {
      seen.add(value);
      table.push(value);
    }
  }
  return table;
}

function firstProducers(values: readonly OracleProducerStamp[]): readonly OracleProducerStamp[] {
  const seen = new Map<string, Set<string>>();
  const table: OracleProducerStamp[] = [];
  for (const producer of values) {
    let versions = seen.get(producer.id);
    if (versions === undefined) {
      versions = new Set<string>();
      seen.set(producer.id, versions);
    }
    if (!versions.has(producer.version)) {
      versions.add(producer.version);
      table.push(producer);
    }
  }
  return table;
}

function ordinalList(ordinals: readonly number[]): string {
  return ordinals.length === 0 ? "-" : ordinals.join(".");
}

function occurrenceClaimToken(claim: OracleOccurrence): string {
  assertOccurrenceToken(claim.kind, "kind");
  assertOccurrenceToken(claim.producer.id, "producer id");
  assertOccurrenceToken(claim.producer.version, "producer version");
  if (claim.ruleId !== undefined) assertOccurrenceToken(claim.ruleId, "rule id");
  return `${String(claim.start)}-${String(claim.end)}/${claim.kind}/${claim.producer.id}@${claim.producer.version}/${String(claim.priority)}/${claim.ruleId ?? "-"}`;
}

function querySignatures(inputLength: number, claims: readonly OracleOccurrence[]): string {
  const signatures: string[] = [];
  for (let start = 0; start <= inputLength; start++) {
    for (let end = start; end <= inputLength; end++) {
      signatures.push(
        `${ordinalList(occurrenceIntersectionOracle(claims, start, end, "geometry"))}/${ordinalList(occurrenceIntersectionOracle(claims, start, end, "priority-then-geometry"))}`,
      );
    }
  }
  return signatures.join(",");
}

function positionSignatures(inputLength: number, claims: readonly OracleOccurrence[]): string {
  const signatures: string[] = [];
  for (let position = 0; position <= inputLength; position++) {
    signatures.push(
      `${ordinalList(occurrenceContainingOracle(claims, position, "geometry"))}/${ordinalList(occurrenceContainingOracle(claims, position, "priority-then-geometry"))}`,
    );
  }
  return signatures.join(",");
}

export function occurrenceOracleRow(
  input: Uint8Array,
  claims: readonly OracleOccurrence[],
): string {
  for (const claim of claims) {
    if (
      !Number.isSafeInteger(claim.start) ||
      !Number.isSafeInteger(claim.end) ||
      claim.start < 0 ||
      claim.end <= claim.start ||
      claim.end > input.length ||
      !Number.isSafeInteger(claim.priority) ||
      claim.priority < MIN_INT32 ||
      claim.priority > MAX_INT32
    ) {
      throw new RangeError("invalid occurrence oracle claim");
    }
  }
  const kinds = firstStrings(claims.map((claim) => claim.kind));
  const producers = firstProducers(claims.map((claim) => claim.producer));
  const ruleIds = firstStrings(claims.map((claim) => claim.ruleId));
  for (const value of kinds) assertOccurrenceToken(value, "kind");
  for (const producer of producers) {
    assertOccurrenceToken(producer.id, "producer id");
    assertOccurrenceToken(producer.version, "producer version");
  }
  for (const value of ruleIds) assertOccurrenceToken(value, "rule id");
  const claimsToken = claims.length === 0 ? "-" : claims.map(occurrenceClaimToken).join(",");
  const producersToken = producers.map((producer) => `${producer.id}@${producer.version}`);
  return row([
    ...inputFields(input),
    `C:${claimsToken}`,
    `K:${kinds.length === 0 ? "-" : kinds.join(",")}`,
    `D:${producersToken.length === 0 ? "-" : producersToken.join(",")}`,
    `R:${ruleIds.length === 0 ? "-" : ruleIds.join(",")}`,
    `G:${ordinalList(occurrenceOrderOracle(claims, "geometry"))}`,
    `Y:${ordinalList(occurrenceOrderOracle(claims, "priority-then-geometry"))}`,
    `X:${querySignatures(input.length, claims)}`,
    `P:${positionSignatures(input.length, claims)}`,
  ]);
}
