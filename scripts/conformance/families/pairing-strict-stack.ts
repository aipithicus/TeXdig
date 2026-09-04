import { CANON, GENERATOR, SCHEMA, digestHeader, digestRows, serializeFixture } from "../format.ts";
import { pairingOracleRow, type OraclePairingSymbol } from "../pairing-oracle.ts";
import type { GeneratedFamily } from "./types.ts";

export const PAIRING_CASE_COUNT = 5_461;

const SYMBOLS: readonly OraclePairingSymbol[] = Object.freeze(["OA", "OB", "CA", "CB"]);

function word(...symbols: OraclePairingSymbol[]): readonly OraclePairingSymbol[] {
  return Object.freeze(symbols);
}

const NAMED_WORDS: readonly (readonly OraclePairingSymbol[])[] = Object.freeze([
  word(),
  word("OA", "CA"),
  word("OA", "OB", "CB", "CA"),
  word("OA", "OB", "CA", "CA"),
  word("CA", "OA", "OB"),
  word("OA", "CA", "OB", "CB"),
]);

export function* namedPairingRows(): Generator<string> {
  for (const word of NAMED_WORDS) yield pairingOracleRow(word);
}

export function* pairingRows(): Generator<string> {
  for (let length = 0; length <= 6; length++) {
    const count = SYMBOLS.length ** length;
    for (let encoded = 0; encoded < count; encoded++) {
      let remaining = encoded;
      const word: OraclePairingSymbol[] = [];
      for (let position = 0; position < length; position++) {
        const symbol = SYMBOLS[remaining % SYMBOLS.length];
        if (symbol === undefined) throw new RangeError("pairing generator selected no symbol");
        word.push(symbol);
        remaining = Math.floor(remaining / SYMBOLS.length);
      }
      yield pairingOracleRow(word);
    }
  }
}

export function buildPairingStrictStack(): GeneratedFamily {
  const digest = digestRows(pairingRows());
  if (digest.count !== PAIRING_CASE_COUNT) {
    throw new Error(`pairing census count changed: ${String(digest.count)}`);
  }
  return {
    path: "pairing/strict-stack.txt",
    content: serializeFixture({
      headers: [
        ["family", "pairing/strict-stack"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        [
          "rule",
          "all words of length zero through six over OA,OB,CA,CB in that order; base-4 codes ascend and position zero receives the least-significant digit; each token occupies [2*position,2*position+1); separate compatible open and close batches discover their selected tokens from right to left, with ordinals local to each role",
        ],
        ["laws", "PAIR1 PAIR2 PAIR3 PAIR4 PAIR5 PAIR6"],
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
      rows: namedPairingRows(),
    }),
  };
}
