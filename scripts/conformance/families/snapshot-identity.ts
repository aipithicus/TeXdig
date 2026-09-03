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
import { sha256 } from "../oracles.ts";
import type { GeneratedFamily } from "./types.ts";

const VECTORS: readonly Uint8Array[] = Object.freeze([
  new Uint8Array(),
  Uint8Array.from([0x61, 0x62, 0x63]),
  Uint8Array.of(0x00),
  Uint8Array.of(0xff),
  new TextEncoder().encode("TeXdig"),
]);

function vectorRow(input: Uint8Array): string {
  return row([...inputFields(input), `V:${sha256(input)}`]);
}

function compatibilityRows(): readonly string[] {
  const left = Uint8Array.of(0x41, 0x0a);
  const cases: readonly (readonly [Uint8Array, string, string, number, boolean])[] = [
    [left, "latin1", "a.tex", 4, true],
    [left, "utf-8", "b.tex", 4, false],
    [left, "utf-8", "a.tex", 5, false],
    [Uint8Array.of(0x42, 0x0a), "utf-8", "a.tex", 4, false],
  ];
  return cases.map(([right, rightEncoding, sourceId, revision, compatible]) =>
    row([
      ...inputFields(left),
      "A:a.tex/4",
      `R:${encodeBytes(right)}|${rightEncoding}|${sourceId}|${String(revision)}`,
      `K:${compatible ? "1" : "0"}`,
    ]),
  );
}

export function* mutationRows(): Generator<string> {
  const original = Uint8Array.from({ length: 32 }, (_, index) => index);
  const originalHash = sha256(original);
  for (let index = 0; index < original.length; index++) {
    const changed = original.slice();
    changed[index] = (changed[index] ?? 0) ^ 0xff;
    yield row([
      ...inputFields(original),
      `M:${String(index)}`,
      `C:${sha256(changed) === originalHash ? "0" : "1"}`,
    ]);
  }
}

export function buildSnapshotIdentity(): GeneratedFamily {
  const digest = digestRows(mutationRows());
  return {
    path: "snapshot/identity.txt",
    content: serializeFixture({
      headers: [
        ["family", "snapshot/identity"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["rule", "single-byte xor-FF mutation at each position of the carrier 00 through 1F"],
        ["laws", "S1 S2"],
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
      rows: [...VECTORS.map(vectorRow), ...compatibilityRows()],
    }),
  };
}
