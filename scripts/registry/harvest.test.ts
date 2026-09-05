import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { RegistryCatalog } from "../../packages/texdig/src/registry/catalog.ts";
import { normalizeArgspec } from "./normalize-argspec.ts";
import { readParentRecords } from "./read-parent-records.ts";
import { normalizeRecords, validateFamilyInventory, HarvestError } from "./normalize-records.ts";
import { syntheticFamily, syntheticHarvest, checkRegistry } from "./check.ts";
import { emitRecords } from "./emit-records.ts";
import {
  compareByteSets,
  compareGeneration,
  withRegistryScratch,
  writeGeneration,
  WORKSPACE_ROOT,
} from "./generate.ts";
import { DUPLICATE_SOURCE, HOSTILE_SOURCE } from "./fixtures/cases.ts";

describe("static registry harvest integrity", () => {
  it("preserves the literal parent positional variants in the differential fixture", async () => {
    const text = await readFile(
      new URL("../../fixtures/differential/registry/beamer-arguments.tsv", import.meta.url),
      "utf8",
    );
    for (const row of text.trim().split(/\r?\n/u).slice(1)) {
      const [name, spelling, count] = row.split("\t");
      if (name === undefined || spelling === undefined || count === undefined)
        throw new Error("incomplete differential row");
      const pattern = normalizeArgspec(spelling);
      expect(pattern, name).toHaveLength(Number(count));
      expect(
        pattern.some(
          (argument) =>
            "open" in argument && argument.open.spelling === "{" && argument.close.spelling === "}",
        ),
        name,
      ).toBe(true);
    }
  });
  it("preserves unsupported capability status and does not infer capability for an absent signature", () => {
    const rows = syntheticHarvest().assertions;
    expect(rows.find((item) => item.subject.name === "denied")?.facets).toContainEqual({
      role: "target-capability",
      target: "synthetic-renderer",
      version: "1",
      status: "unsupported",
    });
    expect(rows.find((item) => item.subject.name === "absent")?.facets).toEqual([
      { role: "argument-language", language: "unknown", reason: "signature-not-declared" },
    ]);
  });

  it.each(["supported", "unsupported", "partial", "unknown"])(
    "preserves explicit capability status %s",
    (status) => {
      const text = `export const macros = { item: { targetCapability: { target: "test", version: "1", status: "${status}" } } }; export const environments = {};`;
      expect(syntheticHarvest(text).assertions[0]?.facets).toContainEqual({
        role: "target-capability",
        target: "test",
        version: "1",
        status,
      });
    },
  );

  it("requires an explicit complete capability status", () => {
    expect(() =>
      syntheticHarvest(
        'export const macros = { item: { targetCapability: { target: "test", version: "1" } } }; export const environments = {};',
      ),
    ).toThrow("requires exactly");
  });

  it("keeps duplicate keys and both byte locations until exact adjudication", () => {
    const family = syntheticFamily(DUPLICATE_SOURCE);
    const source = readParentRecords(family.path, DUPLICATE_SOURCE);
    const duplicate = source.diagnostics.find((item) => item.code === "duplicate-key");
    expect(duplicate?.related).toHaveLength(1);
    expect(() => syntheticHarvest(DUPLICATE_SOURCE)).toThrow(HarvestError);
    if (duplicate === undefined) throw new Error("missing duplicate diagnostic");
    const byteStarts = [
      ...(duplicate.related ?? []).map((location) => location.byteStart),
      duplicate.location.byteStart,
    ];
    const result = normalizeRecords(
      family,
      DUPLICATE_SOURCE,
      {
        kind: "synthetic",
        repository: "urn:synthetic",
        revision: "1",
        license: "MIT",
        path: family.path,
        inputDigest: family.sha256,
      },
      [family.provider],
      [{ field: duplicate.field, byteStarts, disposition: "retain-disputed" }],
    );
    expect(result.assertions).toHaveLength(2);
    expect(result.assertions.map((item) => item.status)).toEqual(["disputed", "disputed"]);
    expect(new Set(result.assertions.map((item) => item.id)).size).toBe(2);
    expect(
      new RegistryCatalog(result.assertions).select(
        { kind: "command", name: "textbullet", escapeToken: "\\" },
        [family.provider.id],
      ).status,
    ).toBe("conflict");
    expect(result.diagnostics).toContainEqual(duplicate);
  });

  it.each(["graphicxs", "inputencx"])("rejects advice targeting nonexistent %s", (name) => {
    expect(() =>
      syntheticHarvest(
        `export const macros = { obsolete: { replacementProvider: "package:${name}" } }; export const environments = {};`,
      ),
    ).toThrow("not a known package");
  });

  it("detects omitted, unexpected, and duplicated manifest families", () => {
    expect(() => {
      validateFamilyInventory(["kernel", "tabularx"], ["kernel"]);
    }).toThrow("inventory mismatch");
    expect(() => {
      validateFamilyInventory(["kernel"], ["kernel", "extra"]);
    }).toThrow("inventory mismatch");
    expect(() => {
      validateFamilyInventory(["kernel"], ["kernel", "kernel"]);
    }).toThrow("inventory mismatch");
  });

  it("separates mixed facets and keeps callbacks as unavailable symbols", async () => {
    const result = syntheticHarvest();
    const mixed = result.assertions.find((item) => item.subject.name === "mixed");
    expect(mixed?.facets.map((facet) => facet.role).sort()).toEqual([
      "argument-language",
      "classification",
      "content-processing",
      "serialization-hint",
      "signature",
    ]);
    expect(result.assertions.find((item) => item.subject.name === "custom")?.facets).toEqual([
      {
        role: "argument-language",
        language: "bounded-strategy",
        strategy: "listings-inline",
        availability: "unimplemented",
      },
    ]);
    const bytes = [...(await emitRecords([result])).values()].join("\n");
    expect(bytes).not.toContain("argumentParser:");
    expect(result.diagnostics.some((item) => item.code === "symbolic-callback")).toBe(true);
  });

  it("retains unsupported expressions without executing input, losing known entries, or inventing signatures", () => {
    const result = syntheticHarvest(HOSTILE_SOURCE);
    expect(result.assertions.map((item) => item.subject.name)).toEqual([
      "safe",
      "computed",
      "invoked",
      "callback",
    ]);
    expect(result.assertions.filter((item) => item.status === "deferred")).toHaveLength(3);
    expect(
      result.diagnostics.filter((item) => item.code === "unsupported-expression").length,
    ).toBeGreaterThanOrEqual(5);
    for (const item of result.diagnostics)
      expect(item.location.byteEnd).toBeGreaterThan(item.location.byteStart);
    expect(
      readParentRecords("invalid.ts", "export const macros = { x: ").diagnostics.some(
        (item) => item.code === "invalid-shape",
      ),
    ).toBe(true);
  });

  it("preserves structured defaults, delimiter tokens, modifiers and until sequences", () => {
    const result = normalizeArgspec("+m !O{{a}\\macro}d{}mu{END}v|");
    expect(result.map((item) => item.code)).toEqual(["m", "O", "d", "m", "u", "v"]);
    expect(result[1]).toMatchObject({
      modifiers: "!",
      defaultValue: {
        kind: "group",
        spelling: "{{a}\\macro}",
        children: [
          { kind: "group", spelling: "{a}", children: [{ kind: "token", spelling: "a" }] },
          { kind: "token", spelling: "\\macro" },
        ],
      },
    });
    expect(result[2]).toMatchObject({
      open: { kind: "token", spelling: "{" },
      close: { kind: "token", spelling: "}" },
    });
  });

  it("emits byte-identically for source/provider order permutations and detects tampering", async () => {
    const family = syntheticHarvest();
    const left = await emitRecords([family]);
    const right = await emitRecords([{ ...family, assertions: [...family.assertions].reverse() }]);
    expect(() => {
      compareByteSets(left, right);
    }).not.toThrow();
    await withRegistryScratch(async (owned) => {
      await writeGeneration(owned, left);
      await compareGeneration(owned, right);
      const path = left.keys().next().value;
      if (path === undefined) throw new Error("missing emitted output");
      await writeFile(join(owned, path), "tampered");
      await expect(compareGeneration(owned, right)).rejects.toThrow("output differs");
    });
  });

  it("cleans only its operation-owned scratch child on failure", async () => {
    await withRegistryScratch(async (sibling) => {
      const marker = join(sibling, "keep.txt");
      await writeFile(marker, "keep");
      let owned = "";
      await expect(
        withRegistryScratch((path) => {
          owned = path;
          return Promise.reject(new Error("synthetic failure"));
        }),
      ).rejects.toThrow("synthetic failure");
      expect(await readFile(marker, "utf8")).toBe("keep");
      await expect(readdir(owned)).rejects.toThrow();
    });
    expect((await readdir(join(WORKSPACE_ROOT, "temp"))).includes("README.md")).toBe(true);
  });

  it("checks committed custody and receipt consistency without an upstream checkout", async () => {
    await checkRegistry();
  });
});
