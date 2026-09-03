import { inputFields, row } from "./format.ts";

export interface OracleInterval {
  readonly start: number;
  readonly end: number;
}

export interface OracleWindow {
  readonly start: number;
  readonly end: number;
}

function validateInterval(length: number, candidate: OracleInterval): void {
  if (
    !Number.isSafeInteger(candidate.start) ||
    !Number.isSafeInteger(candidate.end) ||
    candidate.start < 0 ||
    candidate.end < candidate.start ||
    candidate.end > length
  ) {
    throw new RangeError("invalid span-set oracle interval");
  }
}

export function spanSetBitmap(
  length: number,
  candidates: readonly OracleInterval[],
): readonly boolean[] {
  if (!Number.isSafeInteger(length) || length < 0) {
    throw new RangeError("invalid span-set oracle length");
  }
  const bitmap = Array.from({ length }, () => false);
  for (const candidate of candidates) {
    validateInterval(length, candidate);
    for (let offset = candidate.start; offset < candidate.end; offset++) bitmap[offset] = true;
  }
  return bitmap;
}

export function bitmapIntervals(bitmap: readonly boolean[]): readonly OracleInterval[] {
  const result: OracleInterval[] = [];
  let start: number | undefined;
  for (let offset = 0; offset <= bitmap.length; offset++) {
    const covered = bitmap[offset] ?? false;
    if (covered && start === undefined) start = offset;
    else if (!covered && start !== undefined) {
      result.push(Object.freeze({ start, end: offset }));
      start = undefined;
    }
  }
  return result;
}

function combine(
  left: readonly boolean[],
  right: readonly boolean[],
  operation: "union" | "intersect" | "subtract",
): readonly boolean[] {
  if (left.length !== right.length) throw new RangeError("span-set oracle lengths differ");
  return left.map((leftValue, index) => {
    const rightValue = right[index] ?? false;
    if (operation === "union") return leftValue || rightValue;
    if (operation === "intersect") return leftValue && rightValue;
    return leftValue && !rightValue;
  });
}

function intervalList(prefix: string, intervals: readonly OracleInterval[]): string {
  const value =
    intervals.length === 0
      ? "-"
      : intervals.map((item) => `[${String(item.start)},${String(item.end)})`).join(",");
  return `${prefix}:${value}`;
}

function membership(bitmap: readonly boolean[]): string {
  return bitmap.length === 0 ? "-" : bitmap.map((value) => (value ? "1" : "0")).join("");
}

function equalBitmaps(left: readonly boolean[], right: readonly boolean[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export function spanSetOracleRow(
  length: number,
  leftRaw: readonly OracleInterval[],
  rightRaw: readonly OracleInterval[],
  window: OracleWindow,
): string {
  validateInterval(length, window);
  const left = spanSetBitmap(length, leftRaw);
  const right = spanSetBitmap(length, rightRaw);
  const union = combine(left, right, "union");
  const intersection = combine(left, right, "intersect");
  const subtraction = combine(left, right, "subtract");
  const complement = left.map((value) => !value);
  const scoped = left.map(
    (value, offset) => value && window.start <= offset && offset < window.end,
  );
  const rebased = bitmapIntervals(scoped.slice(window.start, window.end));
  const inside = left.every(
    (value, offset) => !value || (window.start <= offset && offset < window.end),
  );
  return row([
    ...inputFields(new Uint8Array(length)),
    intervalList("A", leftRaw),
    intervalList("B", rightRaw),
    intervalList("N", bitmapIntervals(left)),
    intervalList("M", bitmapIntervals(right)),
    intervalList("U", bitmapIntervals(union)),
    intervalList("I", bitmapIntervals(intersection)),
    intervalList("S", bitmapIntervals(subtraction)),
    intervalList("C", bitmapIntervals(complement)),
    `V:${String(left.filter(Boolean).length)}`,
    `P:${membership(left)}`,
    `Q:${equalBitmaps(left, right) ? "1" : "0"}`,
    `W:[${String(window.start)},${String(window.end)})`,
    intervalList("R", rebased),
    `O:${inside ? "1" : "0"}`,
  ]);
}
