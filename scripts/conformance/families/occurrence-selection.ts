import { CANON, GENERATOR, SCHEMA, digestHeader, digestRows, serializeFixture } from "../format.ts";
import { type OracleOccurrence, type OracleProducerStamp } from "../occurrence-oracle.ts";
import { XorShift32 } from "../prng.ts";
import { selectionOracleRow } from "../selection-oracle.ts";
import type { GeneratedFamily } from "./types.ts";

export const SELECTION_SEED = 0x5e1e_2026;
export const SELECTION_CASE_COUNT = 500;

const KINDS: readonly string[] = Object.freeze(["token", "delimiter", "comment", "residue"]);
const LEXER_1: OracleProducerStamp = Object.freeze({ id: "lexer", version: "1" });
const PARSER_2: OracleProducerStamp = Object.freeze({ id: "parser", version: "2" });
const LEXER_2: OracleProducerStamp = Object.freeze({ id: "lexer", version: "2" });
const PRODUCERS: readonly OracleProducerStamp[] = Object.freeze([LEXER_1, PARSER_2, LEXER_2]);
const RULE_IDS: readonly (string | undefined)[] = Object.freeze([undefined, "scan-a", "scan-b"]);

interface NamedSelectionCase {
  readonly input: Uint8Array;
  readonly claims: readonly OracleOccurrence[];
  readonly left: readonly number[];
  readonly right: readonly number[];
}

function claim(
  start: number,
  end: number,
  kind: string,
  producer: OracleProducerStamp,
  priority: number,
  ruleId?: string,
): OracleOccurrence {
  const required: Omit<OracleOccurrence, "ruleId"> = {
    start,
    end,
    kind,
    producer,
    priority,
  };
  return ruleId === undefined ? required : { ...required, ruleId };
}

function tailClaims(count: number): readonly OracleOccurrence[] {
  return Object.freeze(
    Array.from({ length: count }, (_, ordinal) =>
      claim(0, 1, ordinal % 2 === 0 ? "token" : "alternate", LEXER_1, (ordinal % 5) - 2),
    ),
  );
}

const NAMED_CASES: readonly NamedSelectionCase[] = Object.freeze([
  Object.freeze({
    input: new Uint8Array(),
    claims: Object.freeze([]),
    left: Object.freeze([]),
    right: Object.freeze([]),
  }),
  Object.freeze({
    input: Uint8Array.of(0x41),
    claims: Object.freeze([claim(0, 1, "token", LEXER_1, 0)]),
    left: Object.freeze([0, 0]),
    right: Object.freeze([]),
  }),
  Object.freeze({
    input: Uint8Array.of(0x41, 0x42, 0x43, 0x44),
    claims: Object.freeze([
      claim(1, 3, "token", LEXER_1, 0, "scan-a"),
      claim(1, 3, "delimiter", PARSER_2, 2, "scan-a"),
      claim(0, 4, "token", LEXER_2, 1),
      claim(2, 4, "comment", LEXER_1, -1, "scan-b"),
    ]),
    left: Object.freeze([3, 1, 1, 0]),
    right: Object.freeze([2, 1]),
  }),
  Object.freeze({
    input: Uint8Array.of(0x00),
    claims: tailClaims(65),
    left: Object.freeze([64, 32, 0, 64]),
    right: Object.freeze([1, 31, 63]),
  }),
  Object.freeze({
    input: Uint8Array.of(0, 0, 0, 0, 0, 0, 0, 0),
    claims: Object.freeze([
      claim(0, 2, "token", LEXER_1, 3),
      claim(2, 4, "token", LEXER_1, -2),
      claim(3, 6, "alternate", PARSER_2, 4),
      claim(7, 8, "residue", LEXER_2, 0),
      claim(0, 2, "duplicate", PARSER_2, -1),
    ]),
    left: Object.freeze([4, 2, 0]),
    right: Object.freeze([3, 1]),
  }),
]);

function randomClaim(random: XorShift32, inputLength: number): OracleOccurrence {
  const start = random.next() % inputLength;
  const end = start + 1 + (random.next() % (inputLength - start));
  const kind = KINDS[random.next() % KINDS.length];
  const producer = PRODUCERS[random.next() % PRODUCERS.length];
  const priority = (random.next() % 9) - 4;
  const ruleId = RULE_IDS[random.next() % RULE_IDS.length];
  if (kind === undefined || producer === undefined) {
    throw new RangeError("selection generator selected outside a vocabulary");
  }
  return claim(start, end, kind, producer, priority, ruleId);
}

function randomOrdinals(random: XorShift32, ordinalCount: number): readonly number[] {
  const pickCount = random.next() % (ordinalCount * 2 + 1);
  const ordinals: number[] = [];
  for (let index = 0; index < pickCount; index++) {
    ordinals.push(random.next() % ordinalCount);
  }
  return ordinals;
}

export function* namedSelectionRows(): Generator<string> {
  for (const named of NAMED_CASES) {
    yield selectionOracleRow(named.input, named.claims, named.left, named.right);
  }
}

export function* selectionRows(): Generator<string> {
  const random = new XorShift32(SELECTION_SEED);
  for (let caseIndex = 0; caseIndex < SELECTION_CASE_COUNT; caseIndex++) {
    const input = new Uint8Array(1 + (random.next() % 12));
    for (let index = 0; index < input.length; index++) input[index] = random.next() % 256;
    const claimCount = random.next() % 70;
    const claims = Array.from({ length: claimCount }, () => randomClaim(random, input.length));
    const left = randomOrdinals(random, claimCount);
    const right = randomOrdinals(random, claimCount);
    yield selectionOracleRow(input, claims, left, right);
  }
}

export function buildOccurrenceSelection(): GeneratedFamily {
  const digest = digestRows(selectionRows());
  return {
    path: "occurrence/selection.txt",
    content: serializeFixture({
      headers: [
        ["family", "occurrence/selection"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["seed", `0x${SELECTION_SEED.toString(16).toUpperCase()}`],
        [
          "rule",
          "500 cases; length=1+next()%12 then length byte draws; claimCount=next()%70 then six occurrence draws per claim; each side draws pickCount=next()%(2*claimCount+1) then pickCount ordinals as next()%claimCount; zero claims therefore draw two zero pick counts and no ordinals",
        ],
        ["laws", "SEL1 SEL2 SEL3 SEL4 SEL5 SEL6"],
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
      rows: namedSelectionRows(),
    }),
  };
}
