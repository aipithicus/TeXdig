import { CANON, GENERATOR, SCHEMA, digestHeader, digestRows, serializeFixture } from "../format.ts";
import { CLASS_REPRESENTATIVES, utf8Row } from "../oracles.ts";
import { XorShift32 } from "../prng.ts";
import type { GeneratedFamily } from "./types.ts";

export const UTF8_RANDOM_SEED = 0x9e37_79b9;

export function* randomUtf8Rows(): Generator<string> {
  const random = new XorShift32(UTF8_RANDOM_SEED);
  for (let caseIndex = 0; caseIndex < 5_000; caseIndex++) {
    const input = new Uint8Array(5 + (random.next() % 12));
    for (let index = 0; index < input.length; index++) {
      input[index] =
        caseIndex % 2 === 0
          ? (CLASS_REPRESENTATIVES[random.next() % CLASS_REPRESENTATIVES.length] ?? 0)
          : random.next() % 256;
    }
    yield utf8Row(input);
  }
}

export function buildUtf8Random(): GeneratedFamily {
  const digest = digestRows(randomUtf8Rows());
  return {
    path: "utf8/random.txt",
    content: serializeFixture({
      headers: [
        ["family", "utf8/random"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["convention", "atoms"],
        ["seed", `0x${UTF8_RANDOM_SEED.toString(16).toUpperCase()}`],
        [
          "rule",
          "5000 sequences; length is 5 + next()%12; even cases choose each byte from the class representatives, odd cases use next()%256",
        ],
        ["laws", "U1 U2 U3 U4"],
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
    }),
  };
}
