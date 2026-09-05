import { describe, expect, it } from "vitest";
import { parseLatex, realizeLatex } from "../latex/index.js";
import { RegistryCatalog, HARVESTED_RECORDS, type RegistryAssertion } from "../registry/index.js";
import { SourceSnapshot, byteSpan } from "../source/index.js";
import {
  bindLatex,
  normalizeArgumentPattern,
  type InvocationBinding,
  type BindingOptions,
} from "./index.js";

function record(signature: string, extra: Partial<RegistryAssertion> = {}): RegistryAssertion {
  return {
    id: "fixture",
    provider: { id: "package:fixture", kind: "package", name: "fixture" },
    subject: { kind: "command", name: "probe", escapeToken: "\\" },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      { role: "signature", spelling: signature, pattern: normalizeArgumentPattern(signature) },
      { role: "argument-language", language: "argspec" },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "synthetic",
        repository: "urn:fixture",
        revision: "1",
        license: "MIT",
        path: "binding.test.ts",
        inputDigest: "synthetic",
      },
      location: { byteStart: 0, byteEnd: 1, line: 1, utf16Column: 1 },
    },
    ...extra,
  };
}
function run(
  input: string | Uint8Array,
  signature: string,
  extra: Partial<RegistryAssertion> = {},
  options: BindingOptions = { providerIds: ["package:fixture"] },
): InvocationBinding {
  const snapshot = new SourceSnapshot(
    typeof input === "string" ? new TextEncoder().encode(input) : input,
    { sourceId: "binding-fixture", revision: 1 },
  );
  const parse = parseLatex(snapshot);
  const tree = JSON.stringify(parse.tree);
  const ledger = JSON.stringify(parse.ledger);
  const result = bindLatex(parse, new RegistryCatalog([record(signature, extra)]), options);
  expect(JSON.stringify(parse.tree)).toBe(tree);
  expect(JSON.stringify(parse.ledger)).toBe(ledger);
  expect(realizeLatex(parse)).toEqual(snapshot.copyBytes());
  const invocation = result.invocations.find((v) => v.invocation.name === "probe");
  if (invocation === undefined) throw new Error("fixture command not discovered");
  return invocation;
}
function contents(result: InvocationBinding): readonly unknown[] {
  return result.arguments.map((arg) =>
    arg.kind === "source"
      ? new TextDecoder().decode(result.invocation.snapshot.copyBytes(arg.contentSpan))
      : arg.kind === "boolean"
        ? arg.value
        : arg.kind === "default"
          ? { default: arg.value.spelling }
          : arg.kind,
  );
}

describe("source-backed argument binding", () => {
  it.each([
    { input: "\\probe abc", spec: "m m", expected: ["a", "b"] },
    { input: "λ\\probe 😀β", spec: "m m", expected: ["😀", "β"] },
    { input: "\\probe{a{b}c}x", spec: "m m", expected: ["a{b}c", "x"] },
    { input: "\\probe\\inner{value}", spec: "m m", expected: ["\\inner", "value"] },
    { input: "\\probe*\\marker{x}", spec: "s t\\marker m", expected: [true, true, "x"] },
    { input: "\\probe{x}", spec: "s o m", expected: [false, "absent", "x"] },
    { input: "\\probe[x[y]{z}]{a}", spec: "o m", expected: ["x[y]{z}", "a"] },
    { input: "\\probe<a<b>c>{d}", spec: "d<>m", expected: ["a<b>c", "d"] },
    { input: "\\probe{one}two", spec: "d{}m", expected: ["one", "t"] },
    { input: "\\probe(one)", spec: "r()", expected: ["one"] },
    { input: "\\probe{x}", spec: "O{{default}}m", expected: [{ default: "{{default}}" }, "x"] },
    { input: "\\probe{x}", spec: "D<>{fallback}m", expected: [{ default: "{fallback}" }, "x"] },
    { input: "\\probe abcENDtail", spec: "u{END}", expected: ["abc"] },
    { input: "\\probe{aENDb}ENDtail", spec: "u{END}", expected: ["aENDb"] },
    { input: "\\probe_{lower}^{upper}", spec: "e{^_}", expected: ["upper", "lower"] },
    {
      input: "\\probe^{upper}",
      spec: "E{^_}{{UP}{DOWN}}",
      expected: ["upper", { default: "{DOWN}" }],
    },
    { input: "\\probe", spec: "E{^_}{{UP}}", expected: [{ default: "{UP}" }, "absent"] },
    { input: "\\probe%comment\r\n{a}", spec: "m", expected: ["a"] },
  ])("binds $spec over $input", ({ input, spec, expected }) => {
    const result = run(input, spec);
    expect(result.status).toBe("resolved");
    expect(contents(result)).toEqual(expected);
    expect(result.hull).toBeDefined();
    expect(result.arguments.every((arg) => Object.isFrozen(arg))).toBe(true);
  });

  it("keeps lexical candidates wider than the licensed hull and retains trivia", () => {
    const result = run("\\probe % note\n{one} {two}", "m");
    expect(result.invocation.candidates.items.map((t) => t.kind)).toContain("comment");
    expect(result.hull?.end).toBeLessThan(result.invocation.candidates.span.end);
    const argument = result.arguments[0];
    expect(argument?.kind === "source" ? argument.contentSpan : undefined).toEqual(
      byteSpan(15, 18),
    );
  });

  it("respects ! after mandatory arguments while control-word whitespace is ignored", () => {
    expect(contents(run("\\probe{x} [opt]", "m!o"))).toEqual(["x", "absent"]);
    expect(contents(run("\\probe{x} [opt]", "mo"))).toEqual(["x", "opt"]);
    expect(contents(run("\\probe [opt]", "!o"))).toEqual(["opt"]);
    expect(contents(run("\\probe [opt]{x}", "!om"))).toEqual(["opt", "x"]);
    expect(contents(run("\\probe\\inner [opt]", "m!o"))).toEqual(["\\inner", "opt"]);
    expect(contents(run("\\probe\\@ [opt]", "m!o"))).toEqual(["\\@", "absent"]);
  });

  it("does not erase + or treat paragraph tokens as ordinary whitespace", () => {
    expect(run("\\probe{a\n\nb}", "m").diagnostics.map((d) => d.code)).toContain(
      "paragraph-not-allowed",
    );
    expect(run("\\probe{a\n\nb}", "+m").status).toBe("resolved");
    expect(run("\\probe\n\ntext", "m").status).toBe("conflict");
    expect(contents(run("\\probe\\par", "+m"))).toEqual(["\\par"]);
  });

  it.each([
    { input: "\\probe", spec: "m", code: "missing-argument" },
    { input: "\\probe[unclosed", spec: "o", code: "unclosed-delimiter" },
    { input: "\\probe(no-close", spec: "r()", code: "unclosed-delimiter" },
    { input: "\\probe{unused}", spec: "R(){recover}", code: "missing-argument" },
    { input: "\\probe aEN", spec: "u{END}", code: "unclosed-delimiter" },
    { input: "\\probe body", spec: "b", code: "unsupported-argument-form" },
    { input: "\\probe|raw|", spec: "v|", code: "unsupported-argument-form" },
  ])("retains $code without licensing a hull", ({ input, spec, code }) => {
    const result = run(input, spec);
    expect(result.status).not.toBe("resolved");
    expect(result.hull).toBeUndefined();
    expect(result.diagnostics.map((d) => d.code)).toContain(code);
  });

  it("retains commands inside recovered groups and refuses malformed-byte candidates", () => {
    const recovered = run("{\\probe{x}", "m");
    expect(recovered.invocation.scopeStatus).toBe("recovered");
    expect(recovered.status).toBe("unknown");
    const bad = run(new Uint8Array([...new TextEncoder().encode("\\probe"), 255]), "o");
    expect(bad.status).toBe("unknown");
    expect(bad.hull).toBeUndefined();
  });

  it("requires explicit authority and preserves provider/version/applicability uncertainty", () => {
    expect(run("\\probe{x}", "m", {}, { providerIds: [] }).status).toBe("unknown");
    expect(run("\\probe{x}", "m", { status: "disputed" }).status).toBe("conflict");
    expect(run("\\probe{x}", "m", { applicability: "tikz-body" }).status).toBe("unknown");
    expect(
      run(
        "\\probe{x}",
        "m",
        { applicability: "tikz-body" },
        { providerIds: ["package:fixture"], applicability: ["tikz-body"] },
      ).status,
    ).toBe("resolved");
    const provider: RegistryAssertion["provider"] = {
      id: "package:fixture",
      kind: "package",
      name: "fixture",
      versionCondition: { kind: "since-date", date: "2020-10-01" },
    };
    expect(run("\\probe{x}", "m", { provider }).status).toBe("unknown");
    expect(
      run(
        "\\probe{x}",
        "m",
        { provider },
        {
          providerIds: ["package:fixture"],
          providerVersions: [{ providerId: "package:fixture", date: "2024-01-01" }],
        },
      ).status,
    ).toBe("resolved");
  });

  it("does not turn parent status or unavailable callback presence into verified support", () => {
    const parent = run("\\probe{x}", "m", { status: "parent-asserted" });
    expect(parent.status).toBe("resolved");
    expect(parent.assumptions.some((a) => a.kind === "parent-assertion")).toBe(true);
    const snapshot = new SourceSnapshot(new TextEncoder().encode("\\lstinline|raw|"), {
      sourceId: "hostile",
      revision: 0,
    });
    const result = bindLatex(parseLatex(snapshot), new RegistryCatalog(HARVESTED_RECORDS), {
      providerIds: ["package:listings"],
    });
    expect(result.invocations[0]?.hull).toBeUndefined();
    expect(result.invocations[0]?.diagnostics.some((d) => d.code === "unavailable-strategy")).toBe(
      true,
    );
  });

  it("keeps both conflicting providers and is independent of catalog insertion order", () => {
    const one = record("m");
    const two = record("mm", {
      id: "other",
      provider: { id: "package:other", kind: "package", name: "other" },
    });
    const parse = parseLatex(
      new SourceSnapshot(new TextEncoder().encode("\\probe ab"), {
        sourceId: "collision",
        revision: 0,
      }),
    );
    const options = { providerIds: [one.provider.id, two.provider.id] };
    const forward = bindLatex(parse, new RegistryCatalog([one, two]), options);
    const reversed = bindLatex(parse, new RegistryCatalog([two, one]), options);
    expect(forward).toEqual(reversed);
    expect(forward.invocations[0]?.status).toBe("conflict");
    expect(forward.invocations[0]?.selection.assertions).toHaveLength(2);
    expect(forward.invocations[0]?.arguments).toEqual([]);
  });
});
