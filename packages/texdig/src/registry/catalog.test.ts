import { describe, expect, it } from "vitest";
import { RegistryCatalog } from "./catalog.js";
import { CURATED_RECORDS } from "./records/curated/kernel.js";
import { HARVESTED_RECORDS } from "./records/harvested/index.js";
import type { AssertionStatus, RegistryAssertion, RegistrySubject } from "./types.js";

function record(name: string, provider: string): RegistryAssertion {
  const found = [...CURATED_RECORDS, ...HARVESTED_RECORDS].find(
    (item) => item.subject.name === name && item.provider.id === provider,
  );
  if (found === undefined) throw new Error(`missing test record ${provider}/${name}`);
  return found;
}
const command = (name: string): RegistrySubject => ({ kind: "command", name, escapeToken: "\\" });

describe("registry catalog", () => {
  it.each<AssertionStatus>(["verified", "parent-asserted", "disputed", "deferred"])(
    "retains assertion status %s independently of selection status",
    (status) => {
      const assertion: RegistryAssertion = { ...record("center", "kernel:latex2e"), status };
      const result = new RegistryCatalog([assertion]).select(assertion.subject, [
        assertion.provider.id,
      ]);
      expect(result.assertions[0]?.status).toBe(status);
    },
  );
  it("requires explicit providers and retains both conflicting provider assertions", () => {
    const records = [
      record("definecolor", "kernel:latex2e"),
      record("definecolor", "package:xcolor"),
    ];
    const catalog = new RegistryCatalog(records);
    expect(catalog.select(command("definecolor"), []).status).toBe("unknown");
    expect(catalog.select(command("definecolor"), ["package:xcolor"]).status).toBe("single");
    const both = catalog.select(command("definecolor"), ["kernel:latex2e", "package:xcolor"]);
    expect(both.assertions).toHaveLength(2);
    expect(both.status).toBe("conflict");
    expect(both.conflicts.some((conflict) => conflict.facet.endsWith(":signature"))).toBe(true);
    expect(
      new RegistryCatalog([...records].reverse()).select(command("definecolor"), [
        "package:xcolor",
        "kernel:latex2e",
      ]),
    ).toEqual(both);
  });

  it("makes defensive immutable copies of input and selection results", () => {
    const input = structuredClone(record("center", "kernel:latex2e"));
    const catalog = new RegistryCatalog([input]);
    Object.defineProperty(input.provider, "name", { value: "tampered" });
    expect(catalog.providers[0]?.name).toBe("latex2e");
    const selected = catalog.select({ kind: "environment", name: "center" }, ["kernel:latex2e"]);
    expect(Object.isFrozen(selected.assertions[0]?.facets)).toBe(true);
    const facet = selected.assertions[0]?.facets[0];
    if (facet === undefined) throw new Error("missing selected facet");
    expect(Reflect.set(facet, "spelling", "broken")).toBe(false);
    expect(() => new RegistryCatalog([input, input])).toThrow("duplicate assertion identity");
  });

  it("retains a synthetic competing multicol assertion regardless of insertion order", () => {
    const inherited = record("multicols", "package:multicol");
    const competing: RegistryAssertion = {
      ...inherited,
      id: "synthetic:multicol:competing-signature",
      facets: [{ role: "signature", spelling: "m", pattern: [{ code: "m", modifiers: "" }] }],
      provenance: {
        ...inherited.provenance,
        authority: {
          ...inherited.provenance.authority,
          kind: "synthetic",
          repository: "urn:synthetic",
        },
      },
    };
    const selected = new RegistryCatalog([inherited, competing]).select(inherited.subject, [
      inherited.provider.id,
    ]);
    expect(selected.status).toBe("conflict");
    expect(selected.assertions).toHaveLength(2);
    expect(
      new RegistryCatalog([competing, inherited]).select(inherited.subject, [
        inherited.provider.id,
      ]),
    ).toEqual(selected);
  });

  it("does not equate registry presence, conditional records, or missing providers with support", () => {
    const catalog = new RegistryCatalog(HARVESTED_RECORDS);
    const result = catalog.select(command("lstinline"), ["package:listings"]);
    expect(result.effectiveAssertions[0]?.facets).toContainEqual({
      role: "argument-language",
      language: "bounded-strategy",
      strategy: "listings-inline",
      availability: "unimplemented",
    });
    expect(
      result.effectiveAssertions[0]?.facets.some((facet) => facet.role === "target-capability"),
    ).toBe(false);
    expect(catalog.select(command("path"), ["package:tikz"]).assertions[0]?.applicability).toBe(
      "tikz-body",
    );
    const missing = catalog.select(command("definecolor"), ["package:xcolor", "package:missing"]);
    expect(missing.status).toBe("unknown");
    expect(missing.unknownProviderIds).toEqual(["package:missing"]);
  });

  it("preserves class ownership and the inherited abstract dispute with explicit house precedence", () => {
    const catalog = new RegistryCatalog([...HARVESTED_RECORDS, ...CURATED_RECORDS]);
    const selected = catalog.select(command("abstract"), ["kernel:latex2e"]);
    expect(selected.status).toBe("conflict");
    expect(selected.assertions).toHaveLength(2);
    expect(selected.shadowedAssertions).toHaveLength(1);
    expect(selected.effectiveAssertions[0]?.status).toBe("disputed");
    const subject: RegistrySubject = { kind: "environment", name: "abstract" };
    expect(catalog.select(subject, ["class:article"]).status).toBe("single");
    expect(catalog.select(subject, ["class:book"]).status).toBe("unknown");
    expect(catalog.select({ kind: "environment", name: "quote" }, ["kernel:latex2e"]).status).toBe(
      "unknown",
    );
    expect(catalog.select({ kind: "environment", name: "quote" }, ["class:book"]).status).toBe(
      "single",
    );
  });

  it("returns compatible assertions without treating absent named-argument metadata as disagreement", () => {
    const one = record("center", "kernel:latex2e");
    const two: RegistryAssertion = {
      ...one,
      id: "synthetic-compatible",
      provider: { id: "package:synthetic", name: "synthetic", kind: "package" },
      facets: [{ role: "signature", spelling: " ", pattern: [], namedArguments: [] }],
    };
    const result = new RegistryCatalog([one, two]).select(one.subject, [
      one.provider.id,
      two.provider.id,
    ]);
    expect(result.status).toBe("compatible");
    expect(result.assertions).toHaveLength(2);
  });
});
