import { format } from "prettier";
import {
  compareRegistryText,
  registryValueKey,
} from "../../packages/texdig/src/registry/catalog.ts";
import type { NormalizedFamily } from "./normalize-records.ts";

export const HARVEST_DIRECTORY = "packages/texdig/src/registry/records/harvested";
export const RECEIPT_PATH = "scripts/registry/receipts/parent-records.ts";

export async function formatTypeScript(text: string): Promise<string> {
  return format(text, { parser: "typescript", printWidth: 100, endOfLine: "lf" });
}

/** Formatting is deterministic and every emitted value is a data literal. */
export async function emitRecords(
  families: readonly NormalizedFamily[],
): Promise<ReadonlyMap<string, string>> {
  const outputs = new Map<string, string>();
  const sorted = [...families].sort((a, b) => compareRegistryText(a.family, b.family));
  for (const family of sorted) {
    const assertions = [...family.assertions].sort((a, b) => compareRegistryText(a.id, b.id));
    const first = assertions[0];
    if (first === undefined) throw new Error(`empty harvested family: ${family.family}`);
    const records = assertions.map((assertion) => {
      const { provenance } = assertion;
      const rest = {
        id: assertion.id,
        subject: assertion.subject,
        status: assertion.status,
        applicability: assertion.applicability,
        facets: assertion.facets,
      };
      const location = {
        custody: provenance.custody,
        location: provenance.location,
        ...(provenance.note === undefined ? {} : { note: provenance.note }),
      };
      return `{...${registryValueKey(rest)}, provider, provenance: {...${registryValueKey(location)}, authority}}`;
    });
    outputs.set(
      `${HARVEST_DIRECTORY}/${family.family}.ts`,
      await formatTypeScript(
        [
          "/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */",
          'import { immutableRegistryValue } from "../../catalog.js";',
          'import type { Authority, Provider, RegistryAssertion } from "../../types.js";',
          `const provider: Provider = ${registryValueKey(first.provider)};`,
          `const authority: Authority = ${registryValueKey(first.provenance.authority)};`,
          `export const RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([${records.join(",\n")}]);`,
        ].join("\n"),
      ),
    );
  }
  outputs.set(
    `${HARVEST_DIRECTORY}/index.ts`,
    await formatTypeScript(
      [
        "/** GENERATED FILE. DO NOT EDIT. Every explicit manifest family is included. */",
        'import type { RegistryAssertion } from "../../types.js";',
        ...sorted.map(
          (family, i) => `import { RECORDS as records${String(i)} } from "./${family.family}.js";`,
        ),
        `export const HARVESTED_RECORDS: readonly RegistryAssertion[] = Object.freeze([${sorted.map((_, i) => `...records${String(i)}`).join(",")}]);`,
      ].join("\n"),
    ),
  );
  return outputs;
}
