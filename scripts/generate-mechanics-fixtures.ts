import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

interface FixtureDefinition {
  readonly name: string;
  readonly bytes: Uint8Array;
}

const FIXTURE_ROOT = resolve(import.meta.dirname, "../fixtures/mechanics/mini_article");
const encoder = new TextEncoder();

function concatenate(...parts: readonly Uint8Array[]): Uint8Array {
  const size = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

const fixtures: readonly FixtureDefinition[] = Object.freeze([
  Object.freeze({
    name: "lf.tex",
    bytes: encoder.encode(
      "\\documentclass{article}\n% mechanics checkpoint\n\\begin{document}\nHello {world}.\n\\end{document}\n",
    ),
  }),
  Object.freeze({
    name: "crlf.tex",
    bytes: encoder.encode(
      "\\documentclass{article}\r\n% mechanics checkpoint\r\n\\begin{document}\r\nHello {world}.\r\n\\end{document}\r\n",
    ),
  }),
  Object.freeze({ name: "unicode.tex", bytes: encoder.encode("Résumé — π = \\alpha{β}\n") }),
  Object.freeze({
    name: "malformed-byte.tex",
    bytes: concatenate(encoder.encode("before "), Uint8Array.of(0xff), encoder.encode(" after\n")),
  }),
  Object.freeze({ name: "empty.tex", bytes: new Uint8Array() }),
  Object.freeze({ name: "all-node.tex", bytes: encoder.encode("\\alpha{β} text\t\n") }),
  Object.freeze({ name: "all-residue.tex", bytes: Uint8Array.of(0x80, 0xff, 0xfe) }),
]);

await mkdir(FIXTURE_ROOT, { recursive: true });
for (const fixture of fixtures) {
  await writeFile(resolve(FIXTURE_ROOT, fixture.name), fixture.bytes);
}
