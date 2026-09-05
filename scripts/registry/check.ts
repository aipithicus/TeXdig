import { readdir } from "node:fs/promises";
import { join } from "node:path";
import ts from "typescript";
import {
  CURATED_RECORDS,
  HARVESTED_RECORDS,
  RegistryCatalog,
} from "../../packages/texdig/dist/registry/index.js";
import { registryValueKey } from "../../packages/texdig/src/registry/catalog.ts";
import { CURATED_SOURCE } from "./curated-authorities.ts";
import { emitRecords, HARVEST_DIRECTORY } from "./emit-records.ts";
import { VALID_SOURCE } from "./fixtures/cases.ts";
import {
  compareByteSets,
  compareGeneration,
  generationBytes,
  withRegistryScratch,
  WORKSPACE_ROOT,
  writeGeneration,
} from "./generate.ts";
import {
  normalizeRecords,
  validateFamilyInventory,
  type NormalizedFamily,
} from "./normalize-records.ts";
import { familyCounts, sha256 } from "./receipt.ts";
import { RECEIPT } from "./receipts/parent-records.ts";
import { SOURCE_FAMILIES, SOURCE_ID, SOURCE_INPUTS, type SourceFamily } from "./source-manifest.ts";

export function syntheticFamily(text: string = VALID_SOURCE): SourceFamily {
  return {
    family: "listings",
    provider: { id: "package:listings", kind: "package", name: "listings" },
    path: "synthetic/provides.ts",
    sha256: sha256(text),
    tables: ["macros", "environments"],
  };
}

export function syntheticHarvest(text: string = VALID_SOURCE): NormalizedFamily {
  const family = syntheticFamily(text);
  return normalizeRecords(
    family,
    text,
    {
      kind: "synthetic",
      repository: "urn:texdig:synthetic",
      revision: "1",
      license: "MIT",
      path: family.path,
      inputDigest: family.sha256,
    },
    [family.provider],
  );
}

export async function checkRegistry(): Promise<void> {
  if (
    RECEIPT.revision !== SOURCE_ID.commit ||
    RECEIPT.repository !== SOURCE_ID.repository ||
    RECEIPT.license !== SOURCE_ID.license ||
    RECEIPT.generator.typescript !== ts.version
  )
    throw new Error("receipt source/compiler identity mismatch");
  if (
    registryValueKey(
      [...SOURCE_INPUTS].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0)),
    ) !== registryValueKey(RECEIPT.inputs)
  )
    throw new Error("receipt input manifest mismatch");
  const expectedFiles = [...SOURCE_FAMILIES.map((family) => `${family.family}.ts`), "index.ts"];
  validateFamilyInventory(expectedFiles, await readdir(join(WORKSPACE_ROOT, HARVEST_DIRECTORY)));
  const families: NormalizedFamily[] = [];
  for (const family of SOURCE_FAMILIES) {
    const assertions = HARVESTED_RECORDS.filter(
      (assertion) => assertion.provenance.authority.path === family.path,
    );
    if (assertions.length === 0) throw new Error(`missing harvested family: ${family.family}`);
    for (const assertion of assertions) {
      const authority = assertion.provenance.authority;
      if (
        registryValueKey(assertion.provider) !== registryValueKey(family.provider) ||
        authority.revision !== SOURCE_ID.commit ||
        authority.repository !== SOURCE_ID.repository ||
        authority.license !== SOURCE_ID.license ||
        authority.inputDigest !== family.sha256 ||
        authority.kind !== "parent-source" ||
        assertion.provenance.custody !== "harvested"
      )
        throw new Error(`invalid harvested custody: ${assertion.id}`);
    }
    const normalized = {
      family: family.family,
      assertions,
      diagnostics: RECEIPT.diagnostics.filter((item) => item.path === family.path),
    };
    if (
      registryValueKey(familyCounts(normalized)) !==
      registryValueKey(RECEIPT.families.find((item) => item.family === family.family))
    )
      throw new Error(`receipt counts mismatch: ${family.family}`);
    families.push(normalized);
  }
  if (
    families.reduce((count, family) => count + family.assertions.length, 0) !==
    HARVESTED_RECORDS.length
  )
    throw new Error("harvested record outside source manifest");
  for (const assertion of CURATED_RECORDS) {
    const authority = assertion.provenance.authority;
    const input = CURATED_SOURCE.inputs.find((item) => item.path === authority.path);
    if (
      authority.repository !== CURATED_SOURCE.repository ||
      authority.revision !== CURATED_SOURCE.revision ||
      input?.sha256 !== authority.inputDigest ||
      input.license !== authority.license ||
      assertion.provenance.custody !== "curated"
    )
      throw new Error(`invalid curated custody: ${assertion.id}`);
  }
  new RegistryCatalog([...HARVESTED_RECORDS, ...CURATED_RECORDS]);
  await compareGeneration(WORKSPACE_ROOT, await generationBytes(families));
  await withRegistryScratch(async (first) =>
    withRegistryScratch(async (second) => {
      const left = await emitRecords([syntheticHarvest()]);
      const sample = syntheticHarvest();
      const right = await emitRecords([
        { ...sample, assertions: [...sample.assertions].reverse() },
      ]);
      await writeGeneration(first, left);
      await writeGeneration(second, right);
      compareByteSets(left, right);
      await compareGeneration(first, right);
      await compareGeneration(second, left);
    }),
  );
}
