import { GENERATOR, SCHEMA, serializeFixture } from "../format.ts";
import { utf8Row } from "../oracles.ts";
import type { GeneratedFamily } from "./types.ts";

export const UTF8_NAMED_INPUTS: readonly Uint8Array[] = Object.freeze([
  new Uint8Array(),
  Uint8Array.of(0x41),
  Uint8Array.of(0xc3, 0xa9),
  Uint8Array.of(0xf0, 0x9f, 0x98, 0x80),
  Uint8Array.of(0x80),
  Uint8Array.of(0xe9, 0x41),
  Uint8Array.of(0xe2, 0x82, 0x41),
  Uint8Array.of(0xe2, 0x82),
  Uint8Array.of(0xc0, 0x80),
  Uint8Array.of(0xed, 0xa0, 0x80),
  Uint8Array.of(0xf4, 0x90, 0x80, 0x80),
  Uint8Array.of(0xf0, 0x9f, 0x98, 0x80),
  Uint8Array.of(0xef, 0xbb, 0xbf),
  Uint8Array.of(0xef, 0xbf, 0xbd),
]);

export function buildUtf8Named(): GeneratedFamily {
  return {
    path: "utf8/named.txt",
    content: serializeFixture({
      headers: [
        ["family", "utf8/named"],
        ["schema", SCHEMA],
        ["generator", GENERATOR],
        ["convention", "atoms"],
        ["laws", "U1 U3 U4"],
      ],
      rows: UTF8_NAMED_INPUTS.map(utf8Row),
    }),
  };
}
