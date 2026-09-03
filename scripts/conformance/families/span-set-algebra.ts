import { CANON, GENERATOR, SCHEMA, digestHeader, digestRows, serializeFixture } from "../format.ts";
import { XorShift32 } from "../prng.ts";
import { spanSetOracleRow, type OracleInterval, type OracleWindow } from "../span-set-oracle.ts";
import type { GeneratedFamily } from "./types.ts";

export const SPAN_SET_SEED = 0x5e7a_2026;
export const SPAN_SET_CASE_COUNT = 500;

interface NamedSpanSetCase {
  readonly length: number;
  readonly left: readonly OracleInterval[];
  readonly right: readonly OracleInterval[];
  readonly window: OracleWindow;
}

function interval(start: number, end: number): OracleInterval {
  return Object.freeze({ start, end });
}

const NAMED_CASES: readonly NamedSpanSetCase[] = Object.freeze([
  Object.freeze({
    length: 0,
    left: Object.freeze([]),
    right: Object.freeze([]),
    window: interval(0, 0),
  }),
  Object.freeze({
    length: 8,
    left: Object.freeze([
      interval(4, 6),
      interval(1, 3),
      interval(3, 4),
      interval(2, 5),
      interval(0, 1),
      interval(6, 8),
      interval(1, 3),
      interval(7, 7),
    ]),
    right: Object.freeze([]),
    window: interval(0, 8),
  }),
  Object.freeze({
    length: 10,
    left: Object.freeze([interval(7, 9), interval(1, 5)]),
    right: Object.freeze([interval(3, 8)]),
    window: interval(2, 9),
  }),
  Object.freeze({
    length: 5,
    left: Object.freeze([interval(0, 2), interval(2, 5)]),
    right: Object.freeze([interval(0, 5), interval(3, 3)]),
    window: interval(1, 4),
  }),
  Object.freeze({
    length: 7,
    left: Object.freeze([interval(4, 6), interval(2, 3)]),
    right: Object.freeze([interval(0, 0), interval(6, 7)]),
    window: interval(1, 7),
  }),
]);

function randomIntervals(
  random: XorShift32,
  length: number,
  count: number,
): readonly OracleInterval[] {
  const result: OracleInterval[] = [];
  for (let index = 0; index < count; index++) {
    const first = random.next() % (length + 1);
    const second = random.next() % (length + 1);
    result.push(interval(Math.min(first, second), Math.max(first, second)));
  }
  return result;
}

export function* namedSpanSetRows(): Generator<string> {
  for (const named of NAMED_CASES) {
    yield spanSetOracleRow(named.length, named.left, named.right, named.window);
  }
}

export function* spanSetRows(): Generator<string> {
  const random = new XorShift32(SPAN_SET_SEED);
  for (let caseIndex = 0; caseIndex < SPAN_SET_CASE_COUNT; caseIndex++) {
    const length = random.next() % 17;
    const left = randomIntervals(random, length, random.next() % 9);
    const right = randomIntervals(random, length, random.next() % 9);
    const first = random.next() % (length + 1);
    const second = random.next() % (length + 1);
    const window = interval(Math.min(first, second), Math.max(first, second));
    yield spanSetOracleRow(length, left, right, window);
  }
}

export function buildSpanSetAlgebra(): GeneratedFamily {
  const digest = digestRows(spanSetRows());
  return {
    path: "span-set/algebra.txt",
    content: serializeFixture({
      headers: [
        ["family", "span-set/algebra"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["seed", `0x${SPAN_SET_SEED.toString(16).toUpperCase()}`],
        [
          "rule",
          "500 cases; length=next()%17; leftCount=next()%9 then two boundary draws per left span; rightCount=next()%9 then two boundary draws per right span; final two boundary draws form the slice window; each pair is sorted and may be empty",
        ],
        ["laws", "B1 B2 B3 B4 B5 B6"],
        [
          "digest",
          digestHeader({
            algorithm: "sha256",
            value: digest.value,
            canon: CANON,
            count: digest.count,
            tier: "default",
          }),
        ],
      ],
      rows: namedSpanSetRows(),
    }),
  };
}
