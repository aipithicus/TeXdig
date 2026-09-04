import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { SourceSnapshot } from "../source/index.js";
import {
  MiniArticleStrictError,
  MiniArticleTimeoutError,
  parseMiniArticle,
  realizeMiniArticle,
  type MiniArticleParseResult,
} from "./mini-article.js";

const FIXTURE_ROOT = new URL("../../../../fixtures/mechanics/mini_article/", import.meta.url);
const FIXTURES = Object.freeze([
  "lf.tex",
  "crlf.tex",
  "unicode.tex",
  "malformed-byte.tex",
  "empty.tex",
  "all-node.tex",
  "all-residue.tex",
]);

async function fixture(
  name: string,
): Promise<{ bytes: Uint8Array; result: MiniArticleParseResult }> {
  const bytes = new Uint8Array(await readFile(fileURLToPath(new URL(name, FIXTURE_ROOT))));
  const snapshot = new SourceSnapshot(bytes, { sourceId: `fixtures/${name}`, revision: 0 });
  return { bytes, result: parseMiniArticle(snapshot) };
}

function assertBalanced(result: MiniArticleParseResult): void {
  let cursor = 0;
  for (const entry of result.ledger) {
    expect(entry.span.start).toBe(cursor);
    expect(entry.span.end).toBeGreaterThan(entry.span.start);
    cursor = entry.span.end;
  }
  expect(cursor).toBe(result.snapshot.byteLength);
}

function tokenText(result: MiniArticleParseResult, index: number): string {
  const token = result.tokens[index];
  if (token === undefined) throw new Error(`missing token ${String(index)}`);
  return new TextDecoder().decode(result.snapshot.copyBytes(token.span));
}

describe("mini_article mechanics checkpoint", () => {
  it("balances and realizes every byte-exact fixture", async () => {
    for (const name of FIXTURES) {
      const { bytes, result } = await fixture(name);
      assertBalanced(result);
      expect(realizeMiniArticle(result)).toEqual(bytes);
      expect(Object.isFrozen(result)).toBe(true);
      expect(Object.isFrozen(result.tree)).toBe(true);
      expect(Object.isFrozen(result.ledger)).toBe(true);
    }
  });

  it("preserves LF, CRLF, Unicode, malformed bytes, and empty input as distinct facts", async () => {
    const lf = await fixture("lf.tex");
    const crlf = await fixture("crlf.tex");
    const unicode = await fixture("unicode.tex");
    const malformed = await fixture("malformed-byte.tex");
    const empty = await fixture("empty.tex");

    expect(lf.result.snapshot.decoding.lineEndings.style).toBe("lf");
    expect(crlf.result.snapshot.decoding.lineEndings.style).toBe("crlf");
    expect(realizeMiniArticle(unicode.result)).toEqual(unicode.bytes);
    expect(malformed.result.residue.map((item) => item.kind)).toEqual(["invalid-utf8-byte"]);
    expect(empty.result.ledger).toEqual([]);
    expect(empty.result.tree.children).toEqual([]);
  });

  it("supports the all-node and all-residue endpoints", async () => {
    const allNode = await fixture("all-node.tex");
    const allResidue = await fixture("all-residue.tex");

    expect(allNode.result.residue).toEqual([]);
    expect(allNode.result.ledger.every((entry) => entry.kind !== "residue")).toBe(true);
    expect(allResidue.result.tokens).toEqual([]);
    expect(allResidue.result.trivia).toEqual([]);
    expect(allResidue.result.residue.map((item) => item.kind)).toEqual([
      "invalid-utf8-byte",
      "invalid-utf8-byte",
      "invalid-utf8-byte",
    ]);
    expect(allResidue.result.ledger.every((entry) => entry.kind === "residue")).toBe(true);
  });

  it("keeps unmatched group delimiters as typed residue in source order", () => {
    const bytes = new TextEncoder().encode("a}b{c");
    const snapshot = new SourceSnapshot(bytes, { sourceId: "unmatched.tex", revision: 0 });
    const result = parseMiniArticle(snapshot);

    expect(result.residue.map((item) => item.kind)).toEqual([
      "unexpected-group-close",
      "unclosed-group-open",
    ]);
    expect(result.diagnostics.map((item) => item.code)).toEqual(
      result.residue.map((item) => item.kind),
    );
    assertBalanced(result);
    expect(realizeMiniArticle(result)).toEqual(bytes);
  });

  it("exposes explicit generated start rules", async () => {
    const { result } = await fixture("all-node.tex");
    const fragment = parseMiniArticle(result.snapshot, { startRule: "fragment" });

    expect(result.startRule).toBe("document");
    expect(fragment.startRule).toBe("fragment");
    expect(fragment.tree.kind).toBe("fragment");
    expect(realizeMiniArticle(fragment)).toEqual(realizeMiniArticle(result));
  });

  it("makes strict rejection and timeout structured and inspectable", async () => {
    const { result } = await fixture("all-residue.tex");

    expect(() => parseMiniArticle(result.snapshot, { strict: true })).toThrow(
      MiniArticleStrictError,
    );
    try {
      parseMiniArticle(result.snapshot, { strict: true });
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(MiniArticleStrictError);
      if (error instanceof MiniArticleStrictError) {
        expect(error.result.residue).toHaveLength(3);
      }
    }

    expect(() => parseMiniArticle(result.snapshot, { timeoutMs: 0 })).toThrow(
      MiniArticleTimeoutError,
    );
    expect(() => parseMiniArticle(result.snapshot, { timeoutMs: -1 })).toThrow(RangeError);
  });

  it("exposes the F7 name, star, script-marker, and paragraph choices as tokens", () => {
    const text =
      "\\foo@bar \\makeatletter\\foo@bar\\makeatother \\ExplSyntaxOn\\foo_bar:n\\ExplSyntaxOff \\section*{x^y_z}\\par";
    const snapshot = new SourceSnapshot(new TextEncoder().encode(text), {
      sourceId: "f7.tex",
      revision: 0,
    });
    const result = parseMiniArticle(snapshot);
    const tokens = result.tokens.map((token, index) => ({
      kind: token.kind,
      text: tokenText(result, index),
    }));

    expect(tokens).toContainEqual({ kind: "control-word", text: "\\foo" });
    expect(tokens).toContainEqual({ kind: "text", text: "@bar" });
    expect(tokens).toContainEqual({ kind: "control-word", text: "\\foo@bar" });
    expect(tokens).toContainEqual({ kind: "control-word", text: "\\foo_bar:n" });
    expect(tokens).toContainEqual({ kind: "star", text: "*" });
    expect(tokens).toContainEqual({ kind: "superscript-marker", text: "^" });
    expect(tokens).toContainEqual({ kind: "subscript-marker", text: "_" });
    expect(tokens).toContainEqual({ kind: "paragraph", text: "\\par" });
    expect(result.residue).toEqual([]);
    assertBalanced(result);
  });

  it("uses lexical-state runs to protect verbatim bodies and surface uncertainty", () => {
    const closedText = "a\\begin{verbatim}{x}%\\foo\\end{verbatim}b";
    const closedSnapshot = new SourceSnapshot(new TextEncoder().encode(closedText), {
      sourceId: "verbatim.tex",
      revision: 0,
    });
    const closed = parseMiniArticle(closedSnapshot);
    const verbatim = closed.tokens.findIndex((token) => token.kind === "verbatim");

    expect(verbatim).toBeGreaterThanOrEqual(0);
    expect(tokenText(closed, verbatim)).toBe("{x}%\\foo");
    expect(closed.trivia.every((item) => item.kind !== "comment")).toBe(true);
    expect(closed.residue).toEqual([]);
    assertBalanced(closed);

    const openText = "a\\verb|unclosed";
    const openSnapshot = new SourceSnapshot(new TextEncoder().encode(openText), {
      sourceId: "unclosed-verbatim.tex",
      revision: 0,
    });
    const open = parseMiniArticle(openSnapshot);
    expect(open.residue.map((item) => item.kind)).toEqual(["unknown-lexical-state"]);
    expect(open.lexicalStates.branches).toHaveLength(1);
    expect(() => parseMiniArticle(openSnapshot, { strict: true })).toThrow(MiniArticleStrictError);
    assertBalanced(open);
  });
});
