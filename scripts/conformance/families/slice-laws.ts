import {
  CANON,
  GENERATOR,
  SCHEMA,
  digestHeader,
  digestRows,
  encodeBytes,
  inputFields,
  row,
  serializeFixture,
} from "../format.ts";
import { atomBoundaries } from "../oracles.ts";
import { XorShift32 } from "../prng.ts";
import type { GeneratedFamily } from "./types.ts";

export const SLICE_SEED = 0x51ce_2026;

export function* sliceRows(): Generator<string> {
  const random = new XorShift32(SLICE_SEED);
  for (let caseIndex = 0; caseIndex < 500; caseIndex++) {
    const input = new Uint8Array(random.next() % 25);
    for (let index = 0; index < input.length; index++) input[index] = random.next() % 256;
    const boundaries = atomBoundaries(input);
    const startIndex = random.next() % boundaries.length;
    const endIndex = startIndex + (random.next() % (boundaries.length - startIndex));
    const start = boundaries[startIndex] ?? 0;
    const end = boundaries[endIndex] ?? start;
    const innerStartIndex = startIndex + (random.next() % (endIndex - startIndex + 1));
    const innerEndIndex = innerStartIndex + (random.next() % (endIndex - innerStartIndex + 1));
    const innerStart = boundaries[innerStartIndex] ?? start;
    const innerEnd = boundaries[innerEndIndex] ?? innerStart;
    yield row([
      ...inputFields(input),
      `W:[${String(start)},${String(end)})`,
      `C:${encodeBytes(input.slice(start, end))}`,
      `N:[${String(innerStart - start)},${String(innerEnd - start)})>[${String(innerStart)},${String(innerEnd)})`,
      `O:${start > 0 || end < input.length ? "1" : "0"}`,
    ]);
  }
}

export function buildSliceLaws(): GeneratedFamily {
  const digest = digestRows(sliceRows());
  return {
    path: "slice/laws.txt",
    content: serializeFixture({
      headers: [
        ["family", "slice/laws"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["convention", "atoms"],
        ["seed", `0x${SLICE_SEED.toString(16).toUpperCase()}`],
        [
          "rule",
          "500 inputs; length next()%25; bytes next()%256; atom-bounded outer and nested windows chosen by subsequent outputs",
        ],
        ["laws", "L1 L2 L3"],
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
