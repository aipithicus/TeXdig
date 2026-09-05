import { createHash } from "node:crypto";
import { formatTypeScript } from "./emit-records.ts";
import { registryValueKey } from "../../packages/texdig/src/registry/catalog.ts";
import type { HarvestDiagnostic } from "./read-parent-records.ts";
import type { NormalizedFamily } from "./normalize-records.ts";
import type { SourceInput } from "./source-manifest.ts";

export interface HarvestReceipt {
  readonly format: "texdig-registry/1";
  readonly generator: { readonly version: "1"; readonly typescript: string };
  readonly repository: string;
  readonly revision: string;
  readonly license: string;
  readonly inputs: readonly SourceInput[];
  readonly outputs: readonly { readonly path: string; readonly sha256: string }[];
  readonly families: readonly {
    readonly family: string;
    readonly records: number;
    readonly signatures: number;
    readonly facets: Readonly<Record<string, number>>;
    readonly statuses: Readonly<Record<string, number>>;
  }[];
  readonly diagnostics: readonly HarvestDiagnostic[];
}
export function sha256(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}
export function familyCounts(family: NormalizedFamily): HarvestReceipt["families"][number] {
  const facets: Record<string, number> = {};
  const statuses: Record<string, number> = {};
  for (const assertion of family.assertions) {
    statuses[assertion.status] = (statuses[assertion.status] ?? 0) + 1;
    for (const facet of assertion.facets) facets[facet.role] = (facets[facet.role] ?? 0) + 1;
  }
  return {
    family: family.family,
    records: family.assertions.length,
    signatures: facets.signature ?? 0,
    facets,
    statuses,
  };
}
export async function emitReceipt(receipt: HarvestReceipt): Promise<string> {
  return formatTypeScript(
    `/** GENERATED FILE. DO NOT EDIT. This receipt is outside the packed engine. */\nimport type { HarvestReceipt } from "../receipt.ts";\nexport const RECEIPT: HarvestReceipt = ${registryValueKey(receipt)};\n`,
  );
}
