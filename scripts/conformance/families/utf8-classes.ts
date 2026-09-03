import { CANON, GENERATOR, SCHEMA, digestHeader, digestRows, serializeFixture } from "../format.ts";
import { CLASS_REPRESENTATIVES, utf8Row } from "../oracles.ts";
import type { GeneratedFamily } from "./types.ts";

export function classInputCount(length: number): number {
  if (!Number.isSafeInteger(length) || length < 1 || length > 5)
    throw new RangeError("class length must be 1..5");
  return CLASS_REPRESENTATIVES.length ** length;
}

export const UTF8_CLASS_DEEP_COUNT = classInputCount(5);

export interface ClassInputRange {
  readonly startCode: number;
  readonly endCode: number;
}

export function classInputRange(
  length: number,
  shardIndex: number,
  shardCount: number,
): ClassInputRange {
  const total = classInputCount(length);
  if (!Number.isSafeInteger(shardCount) || shardCount < 1 || shardCount > total)
    throw new RangeError("class shard count is out of range");
  if (!Number.isSafeInteger(shardIndex) || shardIndex < 0 || shardIndex >= shardCount)
    throw new RangeError("class shard index is out of range");
  return {
    startCode: Math.floor((total * shardIndex) / shardCount),
    endCode: Math.floor((total * (shardIndex + 1)) / shardCount),
  };
}

export function* classInputs(
  length: number,
  startCode = 0,
  endCode = classInputCount(length),
): Generator<Uint8Array> {
  const total = classInputCount(length);
  if (
    !Number.isSafeInteger(startCode) ||
    !Number.isSafeInteger(endCode) ||
    startCode < 0 ||
    endCode < startCode ||
    endCode > total
  )
    throw new RangeError(`class code range must be within 0..${String(total)}`);
  const base = CLASS_REPRESENTATIVES.length;
  const input = new Uint8Array(length);
  for (let code = startCode; code < endCode; code++) {
    let rest = code;
    for (let position = 0; position < length; position++) {
      input[position] = CLASS_REPRESENTATIVES[rest % base] ?? 0;
      rest = Math.floor(rest / base);
    }
    yield input;
  }
}

export function* classRows(length: number): Generator<string> {
  for (const input of classInputs(length)) yield utf8Row(input);
}

export function buildUtf8Classes(includeDeep = true): GeneratedFamily {
  const headers: [string, string][] = [
    ["family", "utf8/classes"],
    ["schema", SCHEMA],
    ["generator", GENERATOR],
    ["convention", "atoms"],
    [
      "rule",
      "cartesian products of the 24 class representatives in least-significant-position-first order; lengths 1 through 5",
    ],
    ["laws", "U1 U2 U3 U4"],
    [
      "classes",
      "ASCII=00-7F continuation-1=80-8F continuation-2=90-9F continuation-3=A0-BF never-valid-1=C0-C1 lead-2=C2-DF lead-e0=E0 lead-3a=E1-EC lead-ed=ED lead-3b=EE-EF lead-f0=F0 lead-4=F1-F3 lead-f4=F4 never-valid-2=F5-FF",
    ],
    ["representatives", "00 7F 80 8F 90 9F A0 BF C0 C1 C2 DF E0 E1 EC ED EE EF F0 F1 F3 F4 F5 FF"],
  ];
  const maximumLength = includeDeep ? 5 : 4;
  for (let length = 1; length <= maximumLength; length++) {
    const digest = digestRows(classRows(length));
    headers.push([
      "digest",
      digestHeader({
        algorithm: "sha256",
        value: digest.value,
        canon: CANON,
        count: digest.count,
        tier: length === 5 ? "deep" : "default",
      }),
    ]);
  }
  return {
    path: "utf8/classes.txt",
    content: serializeFixture({
      headers,
      comments: [
        "Explicit illustration: all length-one rows. Digest lines are ordered by lengths 1, 2, 3, 4, 5.",
      ],
      rows: classRows(1),
    }),
  };
}
