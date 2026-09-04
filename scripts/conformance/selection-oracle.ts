import { inputFields, row } from "./format.ts";
import {
  occurrenceOrderOracle,
  type OracleOccurrence,
  type OracleOccurrenceOrder,
} from "./occurrence-oracle.ts";
import { bitmapIntervals, spanSetBitmap } from "./span-set-oracle.ts";

const MIN_INT32 = -0x8000_0000;
const MAX_INT32 = 0x7fff_ffff;
const OCCURRENCE_TOKEN = /^[A-Za-z0-9][A-Za-z0-9._+-]*$/;

function assertToken(value: string, name: string): void {
  if (!OCCURRENCE_TOKEN.test(value)) {
    throw new SyntaxError(`invalid ${name} fixture token: ${value}`);
  }
}

function validateClaim(inputLength: number, claim: OracleOccurrence): void {
  if (
    !Number.isSafeInteger(claim.start) ||
    !Number.isSafeInteger(claim.end) ||
    claim.start < 0 ||
    claim.end <= claim.start ||
    claim.end > inputLength ||
    !Number.isSafeInteger(claim.priority) ||
    claim.priority < MIN_INT32 ||
    claim.priority > MAX_INT32
  ) {
    throw new RangeError("invalid selection-oracle occurrence claim");
  }
  assertToken(claim.kind, "kind");
  assertToken(claim.producer.id, "producer id");
  assertToken(claim.producer.version, "producer version");
  if (claim.ruleId !== undefined) assertToken(claim.ruleId, "rule id");
}

function claimToken(claim: OracleOccurrence): string {
  return `${String(claim.start)}-${String(claim.end)}/${claim.kind}/${claim.producer.id}@${claim.producer.version}/${String(claim.priority)}/${claim.ruleId ?? "-"}`;
}

export function selectionBitmap(
  ordinalCount: number,
  ordinals: readonly number[],
): readonly boolean[] {
  if (!Number.isSafeInteger(ordinalCount) || ordinalCount < 0) {
    throw new RangeError("invalid selection-oracle length");
  }
  const bitmap = Array.from({ length: ordinalCount }, () => false);
  for (const ordinal of ordinals) {
    if (!Number.isSafeInteger(ordinal) || ordinal < 0 || ordinal >= ordinalCount) {
      throw new RangeError("invalid selection-oracle ordinal");
    }
    bitmap[ordinal] = true;
  }
  return bitmap;
}

function selectedOrdinals(bitmap: readonly boolean[]): readonly number[] {
  const ordinals: number[] = [];
  for (let ordinal = 0; ordinal < bitmap.length; ordinal++) {
    if (bitmap[ordinal] === true) ordinals.push(ordinal);
  }
  return ordinals;
}

function combine(
  left: readonly boolean[],
  right: readonly boolean[],
  operation: "union" | "intersect" | "subtract",
): readonly boolean[] {
  if (left.length !== right.length) throw new RangeError("selection-oracle lengths differ");
  return left.map((leftValue, ordinal) => {
    const rightValue = right[ordinal] ?? false;
    if (operation === "union") return leftValue || rightValue;
    if (operation === "intersect") return leftValue && rightValue;
    return leftValue && !rightValue;
  });
}

function ordinalField(prefix: string, ordinals: readonly number[]): string {
  return `${prefix}:${ordinals.length === 0 ? "-" : ordinals.join(".")}`;
}

function membership(bitmap: readonly boolean[]): string {
  return bitmap.length === 0 ? "-" : bitmap.map((value) => (value ? "1" : "0")).join("");
}

function equalBitmaps(left: readonly boolean[], right: readonly boolean[]): boolean {
  return left.length === right.length && left.every((value, ordinal) => value === right[ordinal]);
}

function selectedRecordOrder(
  claims: readonly OracleOccurrence[],
  selected: readonly boolean[],
  order: OracleOccurrenceOrder,
): readonly number[] {
  return occurrenceOrderOracle(claims, order).filter((ordinal) => selected[ordinal] === true);
}

function coverageField(
  inputLength: number,
  claims: readonly OracleOccurrence[],
  selected: readonly boolean[],
): string {
  const intervals = claims
    .filter((_, ordinal) => selected[ordinal] === true)
    .map((claim) => ({ start: claim.start, end: claim.end }));
  const coverage = bitmapIntervals(spanSetBitmap(inputLength, intervals));
  const value =
    coverage.length === 0
      ? "-"
      : coverage.map((item) => `[${String(item.start)},${String(item.end)})`).join(",");
  return `V:${value}`;
}

export function selectionOracleRow(
  input: Uint8Array,
  claims: readonly OracleOccurrence[],
  leftRaw: readonly number[],
  rightRaw: readonly number[],
): string {
  for (const claim of claims) validateClaim(input.length, claim);
  const left = selectionBitmap(claims.length, leftRaw);
  const right = selectionBitmap(claims.length, rightRaw);
  const predicate = claims.map((claim) => claim.priority >= 0);
  const union = combine(left, right, "union");
  const intersection = combine(left, right, "intersect");
  const subtraction = combine(left, right, "subtract");
  const complement = left.map((value) => !value);
  const claimField = claims.length === 0 ? "C:-" : `C:${claims.map(claimToken).join(",")}`;
  return row([
    ...inputFields(input),
    claimField,
    ordinalField("A", leftRaw),
    ordinalField("B", rightRaw),
    ordinalField("N", selectedOrdinals(left)),
    ordinalField("M", selectedOrdinals(right)),
    ordinalField("F", selectedOrdinals(predicate)),
    ordinalField("U", selectedOrdinals(union)),
    ordinalField("I", selectedOrdinals(intersection)),
    ordinalField("S", selectedOrdinals(subtraction)),
    ordinalField("X", selectedOrdinals(complement)),
    `K:${String(selectedOrdinals(left).length)}`,
    `P:${membership(left)}`,
    ordinalField("G", selectedRecordOrder(claims, left, "geometry")),
    ordinalField("Y", selectedRecordOrder(claims, left, "priority-then-geometry")),
    coverageField(input.length, claims, left),
    `Q:${equalBitmaps(left, right) ? "1" : "0"}`,
  ]);
}
