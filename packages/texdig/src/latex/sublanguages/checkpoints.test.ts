import { describe, expect, it } from "vitest";

import { byteSpan } from "../../source/span.js";
import { SourceSnapshot } from "../../source/snapshot.js";
import {
  SublanguageStrictError,
  SublanguageTimeoutError,
  parseAlignment,
  parseArgspec,
  parseBibtex,
  parseGlue,
  parsePgfkeys,
  parseTabular,
  parseTikz,
  parseXcolor,
  realizeSublanguage,
  type SublanguageNode,
  type SublanguageValue,
} from "./checkpoints.js";

function source(text: string, sourceId = "checkpoint.tex"): SourceSnapshot {
  return new SourceSnapshot(new TextEncoder().encode(text), { sourceId, revision: 1 });
}

function isNode(value: SublanguageValue): value is SublanguageNode {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "kind" in value &&
    typeof value.kind === "string" &&
    "span" in value &&
    typeof value.span === "object" &&
    value.span !== null
  );
}

function descendantNodes(value: SublanguageValue): readonly SublanguageNode[] {
  if (isNode(value)) {
    return [value, ...Object.values(value.fields).flatMap(descendantNodes)];
  }
  if (Array.isArray(value)) {
    return value.flatMap(descendantNodes);
  }
  if (typeof value === "object" && value !== null) {
    return Object.values(value).flatMap(descendantNodes);
  }
  return [];
}

function nodeKinds(root: SublanguageNode | null): readonly string[] {
  return root === null ? [] : descendantNodes(root).map((node) => node.kind);
}

function textOf(snapshot: SourceSnapshot, node: SublanguageNode): string {
  return new TextDecoder().decode(snapshot.copyBytes(node.span));
}

describe("bounded LaTeX sublanguage checkpoints", () => {
  it("retains argspec modifiers, delimiters, defaults, and until forms", () => {
    const snapshot = source("+m !O{default} d<> u{END} v|");
    const result = parseArgspec(snapshot);
    const nodes = result.value === null ? [] : descendantNodes(result.value);
    const arguments_ = nodes.filter((node) => node.kind === "argument");

    expect(result.residue).toEqual([]);
    expect(arguments_).toHaveLength(5);
    expect(arguments_[0]?.fields.modifiers).toBe("+");
    expect(arguments_[1]?.fields.modifiers).toBe("!");
    expect(realizeSublanguage(result)).toEqual(snapshot.copyBytes());
  });

  it("locates alignment row and column separators without splitting groups", () => {
    const snapshot = source("a&{b&c}\\\\d%tail");
    const result = parseAlignment(snapshot);
    const nodes = result.value === null ? [] : descendantNodes(result.value);
    const columns = nodes.filter((node) => node.kind === "column-separator");
    const rows = nodes.filter((node) => node.kind === "row-separator");

    expect(result.residue).toEqual([]);
    expect(columns.map((node) => textOf(snapshot, node))).toEqual(["&"]);
    expect(rows.map((node) => textOf(snapshot, node))).toEqual(["\\\\"]);
  });

  it("parses signed glue and rejects an unsupported unit as typed residue", () => {
    const valid = parseGlue(source("-1.5pt plus 2fil minus .25em"));
    const unsupportedSnapshot = source("1qu");
    const unsupported = parseGlue(unsupportedSnapshot);

    expect(nodeKinds(valid.value)).toEqual(["glue", "dimension", "dimension", "dimension"]);
    expect(valid.residue).toEqual([]);
    expect(unsupported.value).toBeNull();
    expect(unsupported.residue.map((item) => item.kind)).toEqual(["unsupported-syntax"]);
    expect(() => parseGlue(unsupportedSnapshot, { strict: true })).toThrow(SublanguageStrictError);
  });

  it("recognizes tabular decorators, repetition, parbox, and base alignments", () => {
    const snapshot = source("|>{\\bfseries}l*{2}{cr}p{2cm}");
    const result = parseTabular(snapshot);

    expect(result.residue).toEqual([]);
    expect(nodeKinds(result.value)).toEqual([
      "tabular-spec",
      "vertical-divider",
      "decorator",
      "alignment",
      "repetition",
      "parbox",
    ]);
  });

  it("keeps xcolor mix, postfix, function, and weighted expression structure", () => {
    const mixed = parseXcolor(source("red!40!blue!!++>shade,-2"));
    const weighted = parseXcolor(source("rgb,1:red,1;blue,2"));

    expect(mixed.residue).toEqual([]);
    expect(nodeKinds(mixed.value)).toContain("mix");
    expect(nodeKinds(mixed.value)).toContain("postfix-series");
    expect(nodeKinds(mixed.value)).toContain("function");
    expect(weighted.residue).toEqual([]);
    expect(nodeKinds(weighted.value).filter((kind) => kind === "weighted-color")).toHaveLength(2);
  });

  it("preserves pgfkeys ordering, duplicate keys, comments, and separators", () => {
    const snapshot = source("a=1,a=2,% note\nb={(x,y)}");
    const result = parsePgfkeys(snapshot);
    const kinds = nodeKinds(result.value);

    expect(result.residue).toEqual([]);
    expect(kinds.filter((kind) => kind === "comma")).toHaveLength(2);
    expect(kinds.filter((kind) => kind === "equals")).toHaveLength(3);
    expect(kinds).toContain("comment");
  });

  it("keeps TikZ path operations and explicit raw fallback independently of a printer", () => {
    const snapshot = source("(0,0)--(1,1) node[draw]{x};");
    const result = parseTikz(snapshot);
    const kinds = nodeKinds(result.value);

    expect(result.residue).toEqual([]);
    expect(kinds.filter((kind) => kind === "coordinate")).toHaveLength(2);
    expect(kinds).toContain("line-operation");
    expect(kinds).toContain("options");
    expect(kinds).toContain("raw");
  });

  it("parses BibTeX declarations, entries, concatenation, Unicode values, and raw material", () => {
    const snapshot = source(
      'preface\n@string{jn = "J. Test"}\n@article{k, title={λ}, year=2026 # suffix}\n',
      "references.bib",
    );
    const result = parseBibtex(snapshot);
    const kinds = nodeKinds(result.value);

    expect(result.residue).toEqual([]);
    expect(kinds).toContain("string-entry");
    expect(kinds).toContain("entry");
    expect(kinds).toContain("concat");
    expect(kinds).toContain("raw");
    expect(realizeSublanguage(result)).toEqual(snapshot.copyBytes());
  });

  it("maps a bounded frame back to parent byte offsets, including Unicode", () => {
    const snapshot = source("λPREred!25!bluePOST");
    const start = new TextEncoder().encode("λPRE").length;
    const end = start + "red!25!blue".length;
    const result = parseXcolor(snapshot, { span: byteSpan(start, end) });

    expect(result.span).toEqual(byteSpan(start, end));
    expect(result.value?.span).toEqual(result.span);
    expect(new TextDecoder().decode(realizeSublanguage(result))).toBe("red!25!blue");
  });

  it("surfaces invalid UTF-8 and deterministic timeout controls", () => {
    const snapshot = new SourceSnapshot(Uint8Array.from([0x31, 0x70, 0x74, 0xff]), {
      sourceId: "invalid-glue.tex",
      revision: 1,
    });
    const invalid = parseGlue(snapshot);

    expect(invalid.residue).toEqual([
      { kind: "invalid-utf8-input", span: byteSpan(3, 4), byte: 0xff },
    ]);
    expect(() => parseGlue(source("1pt"), { timeoutMs: 0 })).toThrow(SublanguageTimeoutError);
    expect(() => parseGlue(source("1pt"), { timeoutMs: -1 })).toThrow(RangeError);
  });
});
