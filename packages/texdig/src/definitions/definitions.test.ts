import { describe, expect, it } from "vitest";
import { parseLatex, realizeLatex } from "../latex/index.js";
import { CURATED_RECORDS, HARVESTED_RECORDS, RegistryCatalog } from "../registry/index.js";
import { SourceSnapshot } from "../source/index.js";
import {
  analyzeDefinitions,
  type DefinitionAnalysis,
  type DefinitionOptions,
  type OrderedSourceUnit,
} from "./index.js";

const catalog = new RegistryCatalog([...CURATED_RECORDS, ...HARVESTED_RECORDS]);
function unit(
  text: string,
  id = "main",
  role: OrderedSourceUnit["role"] = "entrypoint",
): OrderedSourceUnit {
  return {
    id,
    role,
    parse: parseLatex(
      new SourceSnapshot(new TextEncoder().encode(text), { sourceId: id, revision: 0 }),
    ),
  };
}
function run(text: string, options: DefinitionOptions = {}): DefinitionAnalysis {
  const source = unit(text);
  const before = JSON.stringify(source.parse.tree);
  const result = analyzeDefinitions([source], catalog, {
    providerVersions: [{ providerId: "kernel:latex2e", date: "2026-01-01" }],
    ...options,
  });
  expect(JSON.stringify(source.parse.tree)).toBe(before);
  expect(realizeLatex(source.parse)).toEqual(source.parse.snapshot.copyBytes());
  return result;
}
const undefinedNames = (...names: string[]): DefinitionOptions => ({
  knownUndefined: names.map((name) => ({ kind: "command", name, escapeToken: "\\" })),
});
function calls(result: DefinitionAnalysis, name: string) {
  return result.invocations.filter(
    (i) => i.context === "source" && i.binding.invocation.name === name,
  );
}
function contents(result: DefinitionAnalysis, name: string): readonly unknown[] {
  return calls(result, name).map((call) =>
    call.binding.arguments.map((arg) =>
      arg.kind === "source"
        ? new TextDecoder().decode(call.binding.invocation.snapshot.copyBytes(arg.contentSpan))
        : arg.kind,
    ),
  );
}

describe("scoped activation and document definitions", () => {
  it("activates literal summons only after their source occurrence and within their source scope", () => {
    const result = run(
      String.raw`\textcolor{red}{before}{\usepackage{xcolor}\textcolor{red}{inside}}\textcolor{red}{after}`,
    );
    const statuses = calls(result, "textcolor").map((c) => c.binding.status);
    expect(statuses).toEqual(["unknown", "resolved", "unknown"]);
    expect(result.activations[0]?.header.license?.kind).toBe("registry");
  });
  it("does not treat requested versions as installed versions or activate computed names", () => {
    const result = run(
      String.raw`\usepackage{\which}\usepackage{xparse}[2024/01/01]\NewDocumentCommand\foo{m}{#1}`,
      { providerVersions: [] },
    );
    expect(result.activations[0]?.diagnostics.some((d) => d.code === "dynamic-provider-name")).toBe(
      true,
    );
    expect(
      result.definitions.find((d) => d.invocation.name === "NewDocumentCommand")?.disposition,
    ).toBe("indeterminate");
  });
  it("retains unsupported summons and still activates independently known names", () => {
    const result = run(String.raw`\usepackage{xcolor,unknownpackage}\textcolor{red}{x}`);
    expect(
      result.activations.some((a) => a.diagnostics.some((d) => d.code === "unknown-provider")),
    ).toBe(true);
    expect(calls(result, "textcolor")[0]?.binding.status).toBe("resolved");
  });
  it("distinguishes missing precondition knowledge from an undefined command", () => {
    const result = run(String.raw`\newcommand\foo[1]{#1}\foo{x}`);
    expect(result.definitions[0]?.precondition).toEqual({
      required: "undefined",
      observed: "unknown",
    });
    expect(result.definitions[0]?.disposition).toBe("indeterminate");
    expect(calls(result, "foo")[0]?.binding.hull).toBeUndefined();
  });
  it("implements new, renew and provide without overwriting on rejected or skipped declarations", () => {
    const result = run(
      String.raw`\newcommand\foo[1]{first:#1}\providecommand\foo[2]{ignored}\newcommand\foo{bad}\foo{x}\renewcommand\foo[2]{#1#2}\foo{x}{y}`,
      undefinedNames("foo"),
    );
    expect(
      result.definitions.filter((d) => d.role === "declaration").map((d) => d.disposition),
    ).toEqual(["installed", "skipped", "rejected", "installed"]);
    expect(contents(result, "foo")).toEqual([["x"], ["x", "y"]]);
  });
  it("preserves classic optional defaults and their actual source provenance", () => {
    const result = run(
      String.raw`\newcommand\foo[2][default]{#1#2}\foo{x}\foo[]{y}`,
      undefinedNames("foo"),
    );
    expect(contents(result, "foo")).toEqual([
      ["default", "x"],
      ["", "y"],
    ]);
    const fallback = result.definitions[0]?.defaults[0]?.location;
    expect(
      fallback === undefined
        ? undefined
        : new TextDecoder().decode(fallback.snapshot.copyBytes(fallback.span)),
    ).toBe("default");
  });
  it("uses classic rather than nested xparse brackets for classic invocations", () => {
    const result = run(String.raw`\newcommand\foo[1][z]{#1}\foo[a[b]c]`, undefinedNames("foo"));
    expect(contents(result, "foo")).toEqual([["a[b"]]);
  });
  it("implements classic star shortness and rejects malformed counts and names", () => {
    const short = run("\\newcommand*\\foo[1]{#1}\\foo{a\n\nb}", undefinedNames("foo"));
    expect(calls(short, "foo")[0]?.binding.status).toBe("conflict");
    expect(
      run(String.raw`\newcommand\foo[10]{body}`, undefinedNames("foo")).definitions[0]?.disposition,
    ).toBe("indeterminate");
    expect(
      run(String.raw`\newcommand{\foo@bar}{body}`, undefinedNames("foo@bar")).definitions[0]
        ?.subject,
    ).toBeUndefined();
    expect(
      run(String.raw`\newcommand{\csname x\endcsname}{body}`).definitions[0]?.subject,
    ).toBeUndefined();
  });
  it("uses group-local definitions and global definitions across group exits", () => {
    const result = run(
      String.raw`\def\foo#1{outer}{\def\foo#1#2{inner}\foo{x}{y}}\foo{x}{\gdef\foo#1#2{global}}\foo{x}{y}`,
    );
    expect(contents(result, "foo")).toEqual([["x", "y"], ["x"], ["x", "y"]]);
    expect(calls(result, "foo").map((c) => c.binding.license?.kind)).toEqual([
      "definition",
      "definition",
      "definition",
    ]);
  });
  it("preserves primitive prefixes and complete multi-token parameter delimiters", () => {
    const result = run(String.raw`\def\foo<#1END#2>{#1#2}\foo<aEND{b}>`);
    expect(contents(result, "foo")).toEqual([["a", "b"]]);
    expect(run(String.raw`\def\foo<#1>{#1}\foo[x]`).invocations.at(-1)?.binding.status).toBe(
      "conflict",
    );
  });
  it("does not silently execute expanded-definition variants or malformed parameter sequences", () => {
    const result = run(String.raw`\edef\foo#1{#1}\xdef\bar{body}\def\bad#2{oops}`);
    expect(result.definitions.slice(0, 2).map((d) => d.expansion)).toEqual([
      "unsupported",
      "unsupported",
    ]);
    expect(result.definitions.find((d) => d.subject?.name === "bad")?.disposition).toBe(
      "indeterminate",
    );
  });
  it("captures alias meaning at assignment time and preserves the original body site", () => {
    const result = run(
      String.raw`\def\foo#1{old:#1}\let\alias=\foo\def\foo#1#2{new}\alias{x}\foo{x}{y}`,
    );
    expect(contents(result, "alias")).toEqual([["x"]]);
    expect(contents(result, "foo")).toEqual([["x", "y"]]);
    const alias = result.definitions.find((d) => d.subject?.name === "alias");
    expect(alias?.aliasOf).toBe(result.definitions[0]?.id);
    expect(alias?.body).toBe(result.definitions[0]?.body);
    expect(run(String.raw`\let\alias=\unknown`).definitions[0]?.disposition).toBe("indeterminate");
  });
  it("binds document-command signatures and retains unknown grammar input", () => {
    const result = run(
      String.raw`\DeclareDocumentCommand\foo{O{d}m}{#1#2}\foo[a[b]c]{x}\DeclareDocumentCommand\bar{>{\TrimSpaces}m}{#1}`,
    );
    expect(contents(result, "foo")).toEqual([["a[b]c", "x"]]);
    expect(result.definitions.find((d) => d.subject?.name === "bar")?.disposition).toBe(
      "indeterminate",
    );
  });
  it("discovers both classic and document environment forms with explicit bodies", () => {
    const result = run(
      String.raw`\newenvironment{boxy}[1]{open:#1}{close}\DeclareDocumentEnvironment{ other }{m+b}{#1#2}{end}`,
      { knownUndefined: [{ kind: "environment", name: "boxy" }] },
    );
    const declarations = result.definitions.filter((d) => d.role === "declaration");
    expect(declarations.map((d) => d.subject?.name)).toEqual(["boxy", "other"]);
    expect(declarations.every((d) => d.body !== undefined && d.endBody !== undefined)).toBe(true);
    expect(declarations[1]?.pattern?.map((p) => p.code)).toEqual(["m", "b"]);
  });
  it("retains nested declarations as deferred source occurrences instead of installing them", () => {
    const result = run(
      String.raw`\def\container{\gdef\leak{wrong}}\leak\textbf{\gdef\alsoleak{wrong}}\alsoleak`,
    );
    expect(
      result.definitions
        .filter((d) => ["leak", "alsoleak"].includes(d.subject?.name ?? ""))
        .map((d) => d.disposition),
    ).toEqual(["deferred", "deferred"]);
    expect(calls(result, "leak")[0]?.binding.status).toBe("unknown");
    expect(calls(result, "alsoleak")[0]?.binding.status).toBe("unknown");
  });
  it("does not install conditional or unknown lexical-state declarations", () => {
    expect(
      run(String.raw`\ifdefined\x\def\foo{a}\else\def\foo{b}\fi`)
        .definitions.filter((d) => d.role === "declaration")
        .every((d) => d.disposition === "indeterminate"),
    ).toBe(true);
    expect(run(String.raw`{\def\foo{x}`).definitions[0]?.disposition).toBe("indeterminate");
  });
  it("keeps theorem, paired-delimiter, math-operator and custom declaration candidates located", () => {
    const result = run(
      String.raw`\newtheorem{thm}{Theorem}\DeclareMathOperator{\op}{op}\DeclarePairedDelimiter{\abs}{|}{|}\newcustomtheorem{foo}{Foo}\newpage`,
    );
    expect(result.definitions.map((d) => d.invocation.name)).toEqual([
      "newtheorem",
      "DeclareMathOperator",
      "DeclarePairedDelimiter",
      "newcustomtheorem",
    ]);
    expect(result.definitions.every((d) => d.status === "unknown")).toBe(true);
    expect(result.definitions[0]?.role).toBe("declaration");
    expect(result.definitions[1]?.role).toBe("unclassified");
  });
  it("respects caller source order and document-shipped authority without changing registry knowledge", () => {
    const sources = [
      unit(String.raw`\def\textbf#1#2{#1#2}`, "class", "shipped-class"),
      unit(String.raw`\textbf{x}{y}`),
    ];
    const before = catalog.assertions;
    const result = analyzeDefinitions(sources, catalog);
    expect(contents(result, "textbf")).toEqual([["x", "y"]]);
    expect(catalog.assertions).toBe(before);
    expect(
      calls(result, "textbf")[0]?.binding.selection.effectiveAssertions.length,
    ).toBeGreaterThan(0);
    expect(calls(result, "textbf")[0]?.binding.license?.kind).toBe("definition");
    const reversed = analyzeDefinitions([...sources].reverse(), catalog);
    expect(calls(reversed, "textbf")[0]?.binding.arguments).toHaveLength(1);
  });
  it("uses licensed global/long prefixes and does not infer a redefined prefix's meaning", () => {
    const result = run("{\\global\\long\\def\\foo#1{#1}}\\foo{a\n\nb}");
    expect(calls(result, "foo")[0]?.binding.status).toBe("resolved");
    expect(result.definitions[0]?.scope.global).toBe(true);
    const redefined = run(String.raw`\def\global{}{\global\def\foo{x}}\foo`);
    expect(calls(redefined, "foo")[0]?.binding.status).toBe("unknown");
  });
  it("keeps unavailable constructors classified only with their selected package authority", () => {
    const result = run(
      String.raw`\usepackage{amsopn,mathtools}\DeclareMathOperator{\op}{op}\DeclarePairedDelimiterX{\abs}[1]{|}{|}{#1}`,
    );
    expect(result.definitions.map((d) => d.role)).toEqual(["declaration", "declaration"]);
    expect(result.definitions.map((d) => d.subject?.name)).toEqual(["op", "abs"]);
    expect(result.definitions.every((d) => d.expansion === "unsupported")).toBe(true);
    expect(result.invocations.filter((i) => i.role === "declaration")).toHaveLength(2);
  });
  it("does not execute bodies whose declaration version is unresolved", () => {
    const result = run(String.raw`\NewDocumentCommand\foo{m}{\gdef\leak{x}}\leak`, {
      providerVersions: [],
    });
    expect(result.definitions.find((d) => d.subject?.name === "leak")?.disposition).toBe(
      "deferred",
    );
    expect(calls(result, "leak")[0]?.binding.status).toBe("unknown");
  });
  it("rejects reserved classic names and preserves invalid replacement parameters as diagnostics", () => {
    expect(
      run(String.raw`\newcommand\endfoo{x}`, undefinedNames("endfoo")).definitions[0]?.disposition,
    ).toBe("rejected");
    expect(run(String.raw`\def\foo#1{#2}`).definitions[0]?.disposition).toBe("indeterminate");
    expect(
      run(String.raw`\newenvironment{foo}[1]{#1}{#1}`, {
        knownUndefined: [{ kind: "environment", name: "foo" }],
      }).definitions[0]?.disposition,
    ).toBe("indeterminate");
    const source = unit(String.raw`\def\foo{`);
    expect(analyzeDefinitions([source], catalog).definitions[0]?.status).toBe("unknown");
  });
});
