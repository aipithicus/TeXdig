/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:tabularx", kind: "package", name: "tabularx" };
const authority: Authority = {
  inputDigest: "566d5dad57dc8e23eb1234c35775258e6771c34c702b1b937ec4d598be349574",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/tabularx/provides.ts",
  repository: "https://github.com/siefkenj/unified-latex.git",
  revision: "3c1350edbc8f13ccfbbd5d96919391fefa4d268d",
};
export const RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m o m",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4ac2517fce486c96f4d3e2bf988458f2d01deaaec462de138c86a40ff30acc54",
      status: "parent-asserted",
      subject: { kind: "environment", name: "tabularx" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 256, byteStart: 188, line: 9, utf16Column: 5 },
      },
      authority,
    },
  },
]);
