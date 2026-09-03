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
import { lineIndexOracle, lineStartsOracle } from "../oracles.ts";
import type { GeneratedFamily } from "./types.ts";

const PIECES: readonly Uint8Array[] = [
  Uint8Array.of(0x41),
  Uint8Array.of(0x0d),
  Uint8Array.of(0x0a),
  Uint8Array.of(0x0d, 0x0a),
];

export function* lineRows(maximumPieces: number, exactPieces = false): Generator<string> {
  const current: number[] = [];
  function* walk(depth: number): Generator<string> {
    if (!exactPieces || depth === maximumPieces) {
      const input = Uint8Array.from(current);
      const starts = lineStartsOracle(input);
      const indexes = Array.from({ length: input.length + 1 }, (_, offset) =>
        lineIndexOracle(starts, offset),
      );
      const positions = indexes.map((line, offset) => {
        const column = offset - (starts[line] ?? 0);
        return `${String(line)}/${String(column)}/${String(column)}/${String(column)}`;
      });
      yield row([
        encodeBytes(input),
        `L:${starts.join(",")}`,
        `I:${indexes.join(",")}`,
        `P:${positions.join(",")}`,
      ]);
    }
    if (depth === maximumPieces) return;
    for (const piece of PIECES) {
      const originalLength = current.length;
      current.push(...piece);
      yield* walk(depth + 1);
      current.length = originalLength;
    }
  }
  yield* walk(0);
}

export function buildTopologyLines(): GeneratedFamily {
  const digest = digestRows(lineRows(5, true));
  return {
    path: "topology/lines.txt",
    content: serializeFixture({
      headers: [
        ["family", "topology/lines"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["convention", "atoms"],
        [
          "rule",
          "preorder mixes of pieces A, CR, LF, CRLF; explicit through four pieces; digest covers exactly five pieces",
        ],
        ["laws", "T1 T2 T3 T4 T5"],
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
      rows: lineRows(4),
    }),
  };
}
