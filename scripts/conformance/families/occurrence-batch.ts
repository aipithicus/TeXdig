import { CANON, GENERATOR, SCHEMA, digestHeader, digestRows, serializeFixture } from "../format.ts";
import {
  occurrenceOracleRow,
  type OracleOccurrence,
  type OracleProducerStamp,
} from "../occurrence-oracle.ts";
import { XorShift32 } from "../prng.ts";
import type { GeneratedFamily } from "./types.ts";

export const OCCURRENCE_SEED = 0x0cc0_2026;
export const OCCURRENCE_CASE_COUNT = 500;

const KINDS: readonly string[] = Object.freeze(["token", "delimiter", "comment", "residue"]);
const LEXER_1: OracleProducerStamp = Object.freeze({ id: "lexer", version: "1" });
const PARSER_2: OracleProducerStamp = Object.freeze({ id: "parser", version: "2" });
const LEXER_2: OracleProducerStamp = Object.freeze({ id: "lexer", version: "2" });
const PRODUCERS: readonly OracleProducerStamp[] = Object.freeze([LEXER_1, PARSER_2, LEXER_2]);
const RULE_IDS: readonly (string | undefined)[] = Object.freeze([undefined, "scan-a", "scan-b"]);

interface NamedOccurrenceCase {
  readonly input: Uint8Array;
  readonly claims: readonly OracleOccurrence[];
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

const NAMED_CASES: readonly NamedOccurrenceCase[] = Object.freeze([
  Object.freeze({ input: new Uint8Array(), claims: Object.freeze([]) }),
  Object.freeze({
    input: Uint8Array.of(0x41),
    claims: Object.freeze([claim(0, 1, "token", LEXER_1, 0)]),
  }),
  Object.freeze({
    input: Uint8Array.of(0x41, 0x42, 0x43, 0x44),
    claims: Object.freeze([
      claim(1, 3, "token", LEXER_1, 0, "scan-a"),
      claim(1, 3, "token", LEXER_1, 2, "scan-a"),
      claim(0, 4, "delimiter", PARSER_2, 1),
      claim(2, 4, "comment", LEXER_1, -1, "scan-b"),
    ]),
  }),
  Object.freeze({
    input: Uint8Array.of(0x30, 0x31, 0x32, 0x33, 0x34),
    claims: Object.freeze([
      claim(0, 1, "residue", LEXER_1, -2),
      claim(1, 5, "token", LEXER_2, -2, "scan-b"),
      claim(1, 2, "residue", LEXER_1, -2, "scan-a"),
      claim(3, 5, "token", PARSER_2, 3, "scan-b"),
    ]),
  }),
]);

export function* namedOccurrenceRows(): Generator<string> {
  for (const named of NAMED_CASES) yield occurrenceOracleRow(named.input, named.claims);
}

export function* occurrenceRows(): Generator<string> {
  const random = new XorShift32(OCCURRENCE_SEED);
  for (let caseIndex = 0; caseIndex < OCCURRENCE_CASE_COUNT; caseIndex++) {
    const input = new Uint8Array(1 + (random.next() % 12));
    for (let index = 0; index < input.length; index++) input[index] = random.next() % 256;
    const claims: OracleOccurrence[] = [];
    const claimCount = random.next() % 13;
    for (let ordinal = 0; ordinal < claimCount; ordinal++) {
      const start = random.next() % input.length;
      const end = start + 1 + (random.next() % (input.length - start));
      const kind = KINDS[random.next() % KINDS.length];
      const producer = PRODUCERS[random.next() % PRODUCERS.length];
      const priority = (random.next() % 9) - 4;
      const ruleId = RULE_IDS[random.next() % RULE_IDS.length];
      if (kind === undefined || producer === undefined) {
        throw new RangeError("occurrence generator selected outside a vocabulary");
      }
      claims.push(claim(start, end, kind, producer, priority, ruleId));
    }
    yield occurrenceOracleRow(input, claims);
  }
}

export function buildOccurrenceBatch(): GeneratedFamily {
  const digest = digestRows(occurrenceRows());
  return {
    path: "occurrence/batch.txt",
    content: serializeFixture({
      headers: [
        ["family", "occurrence/batch"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["seed", `0x${OCCURRENCE_SEED.toString(16).toUpperCase()}`],
        [
          "rule",
          "500 cases; length=1+next()%12; bytes=next()%256; claimCount=next()%13; per claim start=next()%length, end=start+1+next()%(length-start), kind=next()%4, producer=next()%3, priority=next()%9-4, rule=next()%3; rebasing wraps each input as the inner child of ASCII prefixes 41 then 42 and suffix 43",
        ],
        ["laws", "O1 O2 O3 O4 O5 O6"],
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
      rows: namedOccurrenceRows(),
    }),
  };
}
