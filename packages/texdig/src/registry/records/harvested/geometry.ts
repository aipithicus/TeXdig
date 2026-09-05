/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:geometry", kind: "package", name: "geometry" };
const authority: Authority = {
  inputDigest: "8710bf9959009bd424c9acea7ec0879dd0cca4b8505033d31ed6ee652f209e5d",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/geometry/provides.ts",
  repository: "https://github.com/siefkenj/unified-latex.git",
  revision: "3c1350edbc8f13ccfbbd5d96919391fefa4d268d",
};
export const RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "break-around", role: "serialization-hint", value: true },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0b30c1e646e08c00d7fd9d39b6c462af27705ba27edc61315c7d3a392335182c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "geometry" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 243, byteStart: 140, line: 7, utf16Column: 5 },
      },
      authority,
    },
  },
]);
