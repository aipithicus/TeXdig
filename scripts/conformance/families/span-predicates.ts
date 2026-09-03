import { GENERATOR, SCHEMA, inputFields, row, serializeFixture } from "../format.ts";
import { spanPredicates } from "../oracles.ts";
import type { GeneratedFamily } from "./types.ts";

export function* spanRows(): Generator<string> {
  const input = inputFields(Uint8Array.of(0, 0, 0, 0, 0));
  for (let aStart = 0; aStart < 6; aStart++) {
    for (let aEnd = aStart; aEnd < 6; aEnd++) {
      for (let bStart = 0; bStart < 6; bStart++) {
        for (let bEnd = bStart; bEnd < 6; bEnd++) {
          const values = spanPredicates(aStart, aEnd, bStart, bEnd).map((value) =>
            value ? "1" : "0",
          );
          yield row([
            ...input,
            `A:[${String(aStart)},${String(aEnd)})`,
            `B:[${String(bStart)},${String(bEnd)})`,
            `C:${values[0] ?? "0"}`,
            `Q:${values[1] ?? "0"}`,
            `I:${values[2] ?? "0"}`,
            `X:${values[3] ?? "0"}`,
          ]);
        }
      }
    }
  }
}

export function buildSpanPredicates(): GeneratedFamily {
  return {
    path: "span/predicates.txt",
    content: serializeFixture({
      headers: [
        ["family", "span/predicates"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        [
          "rule",
          "all ordered pairs of half-open spans over boundaries 0 through 5, start-major then end-major",
        ],
        ["laws", "P1 P2 P3 P4"],
      ],
      rows: spanRows(),
    }),
  };
}
