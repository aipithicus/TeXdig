import {
  CANON,
  GENERATOR,
  SCHEMA,
  digestHeader,
  digestRows,
  encodeBytes,
  row,
  serializeFixture,
} from "../format.ts";
import { topologyBoundaries } from "../oracles.ts";
import { XorShift32 } from "../prng.ts";
import type { GeneratedFamily } from "./types.ts";

export const CONVERSION_SEED = 0xc016_2026;
export const CONVERSION_NAMED: readonly Uint8Array[] = Object.freeze([
  new Uint8Array(),
  Uint8Array.of(0x41, 0xc3, 0xa9, 0x0a, 0xf0, 0x9f, 0x98, 0x80, 0x80),
  Uint8Array.of(0xe2, 0x82, 0x41),
  Uint8Array.of(0xef, 0xbb, 0xbf, 0xef, 0xbf, 0xbd),
]);

export function conversionRow(input: Uint8Array): string {
  const boundaries = topologyBoundaries(input).map(
    ([byte, utf16, atom]) => `${String(byte)}/${String(utf16)}/${String(atom)}`,
  );
  return row([encodeBytes(input), `B:${boundaries.join(",")}`]);
}

export function* randomConversionRows(): Generator<string> {
  const random = new XorShift32(CONVERSION_SEED);
  for (let caseIndex = 0; caseIndex < 1_000; caseIndex++) {
    const input = new Uint8Array(random.next() % 33);
    for (let index = 0; index < input.length; index++) input[index] = random.next() % 256;
    yield conversionRow(input);
  }
}

export function buildTopologyConversions(): GeneratedFamily {
  const digest = digestRows(randomConversionRows());
  return {
    path: "topology/conversions.txt",
    content: serializeFixture({
      headers: [
        ["family", "topology/conversions"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["convention", "atoms"],
        ["seed", `0x${CONVERSION_SEED.toString(16).toUpperCase()}`],
        ["rule", "1000 inputs; length next()%33; each byte next()%256"],
        ["laws", "C1 C2"],
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
      rows: CONVERSION_NAMED.map(conversionRow),
    }),
  };
}
