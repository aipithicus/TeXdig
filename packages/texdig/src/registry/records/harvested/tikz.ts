/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:tikz", kind: "package", name: "tikz" };
const authority: Authority = {
  inputDigest: "b629d91ada14c1419a0b0648c86a22f070b6bcb50673a55bf25f7822ae6a7fa9",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/tikz/provides.ts",
  repository: "https://github.com/siefkenj/unified-latex.git",
  revision: "3c1350edbc8f13ccfbbd5d96919391fefa4d268d",
};
export const RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "tikz",
          target: "body",
        },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "01336f56a3e0cdeca6c81c53ff7557ff6e106863ec3b2ae505cda5e487c7215c",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pgflowlevelscope" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2218, byteStart: 2067, line: 64, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "01933817a49e6a060516b8fdd8e3f0b7dc9102b557c173b77a28bbb542ab9cda",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpatharc" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10745, byteStart: 10711, line: 267, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "01c0774e46d62329d137baa42620a4490e65964b7ee92e18e197fc0397fc0e28",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdftypeof" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13561, byteStart: 13529, line: 332, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "024b1bcf46b364b83d155f76ae6a2a37f8d1cddd0dd66de3034df31e1faf22b9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathqlineto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5049, byteStart: 5013, line: 141, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "045d1d4034a65dfe960c52dae740a99394f0672d509f96fed6c08b22e2feddde",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetlinewidth" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9391, byteStart: 9356, line: 236, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "04d4eb23d951a189dbd66640b740e538879338b19b863b50c85ecb70e6710595",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfviewboxscope" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6838, byteStart: 6795, line: 178, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "055cf65618b93147443bfdef47371072e8e86307430a9681371ace0bfd6b7ba9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetshortenstart" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9811, byteStart: 9773, line: 246, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "06b543960f37b5b88129309573a1ab83044a96ab4aced467b2d563f4d4b252d9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathqcircle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5140, byteStart: 5106, line: 143, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0724610a5ef53e57ead91dca888979c12b2c89421bdac2db27db7b6c693f951c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathrectanglecorners" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11082, byteStart: 11037, line: 274, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0b924cce9a21ce230012b7a7a06f5b6c1265ac9e3fc5741a51c2066a9a0dc7c3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpositionnodelater" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7747, byteStart: 7707, line: 198, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0bdbac0ebc7317784eba329dec5e110e18da96566cfab4391b38b3b02aca3e7d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointarcaxesattime" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12090, byteStart: 12039, line: 298, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0cc25fb6a9f0e3c822cb7ddfd7173ce8906ca55bf5bf70c0e916bc3ebd7a8873",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclaremetadecoration" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10289, byteStart: 10241, line: 257, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0cf77d57fbc2a41113d1b3fa8f78f4399acb7b5b2081d2e63b66382c4a368d45",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "anchorborder" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8200, byteStart: 8168, line: 209, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0e09e0815d8ba28d7fe978e89a49bca1139edc6760a146115e69898533cc25a2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformcm" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6163, byteStart: 6121, line: 164, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0ef25a838e7f73597a58d42737867a242d8c2feb619aa5c5d0a03c784a7b7b4e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "node" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 14678, byteStart: 14574, line: 368, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "102f9ab3af2bae92714e52a9632542e4408bdc2723bc24f9b49f5d34b8a20018",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathcurvebetweentime" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10638, byteStart: 10585, line: 265, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "10902d8dec98d8daa98fe22d691fcefa84701897b670401e07b7244a649231d6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformrotate" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6065, byteStart: 6027, line: 162, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "118b112742d6a5d752bea8a524cf5e6c7eb22b8e2b6a04fb1068ae80c6bfd1f4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetbaseline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12700, byteStart: 12666, line: 311, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "12123d2b22adafbf33017f734699759140804432f7ec8c344f6686a61a17862a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetblendmode" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4522, byteStart: 4487, line: 129, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "121b0be894e6885c033701b943798c333eebba865071bf64bbeef443430e7a4a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointpolar" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11443, byteStart: 11406, line: 283, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "123e69794c9c432c96c12d1e12bbb11debb15d2df348145ebfad59cd0baf92e9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetcolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9551, byteStart: 9520, line: 240, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "166ad10090ea9287d7d908ab36da0ff7f22e0842f64f91ecca03ea6aee5f4803",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointspherical" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11769, byteStart: 11728, line: 291, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "1729b8036f6a6e28bbe7eaf685c5c757729a05309db2da2084b27adaf2368b5e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "state" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9998, byteStart: 9969, line: 251, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1886e4f70d06e528267876a8a5dcf4db2142f37bc4e893043bd510e9ece18f79",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "useasboundingbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 14568, byteStart: 14452, line: 364, utf16Column: 5 },
      },
      authority,
    },
  },
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
      id: "19da903bbcc7b3a157724ab960c3d821406a11471ff29d542ccf6e63f0d18297",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "tikzstyle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 689, byteStart: 585, line: 18, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          namedArguments: ["animation", "options", "command"],
          pattern: [
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o o m",
        },
        {
          availability: "unimplemented",
          language: "bounded-strategy",
          role: "argument-language",
          strategy: "tikz-command",
        },
        { property: "break-around", role: "serialization-hint", value: true },
      ],
      id: "1a34a6ed4fc3f28a4a3789b68009df0b7ef878f34ed3b9a583501406c5d4bbaf",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "scoped" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 15134, byteStart: 14911, line: 380, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1a912c3d125cba4a025ade8ef40ce7a7d874ff16dc484740c645db4d105acf6e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetshortenend" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9853, byteStart: 9817, line: 247, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1b37fd9de4d179188d40be666dc6fada71955ff590012f91f6980e253ef84051",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointpolarxy" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11596, byteStart: 11559, line: 287, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1b78503d0409da767ba7015a031e1ecd358efa7e987537fbb0e861c1fd412c4c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowssettipend" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8563, byteStart: 8525, line: 218, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1bad19289308ddf3338426bd6db1e62d08ef53c813687747a2a49b299908ec50",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfidrefprevuse" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13024, byteStart: 12987, line: 318, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1c998a2247259bdabbb98cd06b58cec48ea9da1717ac44b100b0244deed309d0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointdiff" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11889, byteStart: 11855, line: 294, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1df90ce22c8dcbfcc684c915bb595a66a4c4e67bc4e544713e09ae45731fc42a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathcircle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10987, byteStart: 10952, line: 272, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1ed078e8e2a6db85fc44e7ae169a6bd9cbe756ad47ded12a9baae22303be005b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "behindbackgroundpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8326, byteStart: 8286, line: 212, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1f119b064a77a6f8bcba2288212357aa570c042db74b1164388928cac9498aba",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclarepatternformonly" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5501, byteStart: 5446, line: 150, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1f34e922d4ed0f5ea783a2556528a464538532e15248155595c9ee2fe08c5abd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "shade" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 14336, byteStart: 14231, line: 356, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1fc330a11bb795d743a6f713b5b9d82f90359d8194e5a775548797bae5ccb8b9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgflowlevelobj" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6700, byteStart: 6664, line: 175, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "20a960ad0002ce3752e1f3e11368966e43e8c6483aaa2f7697db1aceb088cb8b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetdash" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9471, byteStart: 9439, line: 238, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2102b8b70ce2e3567d1739902c3bc8748f72978c884a54a32f51d99d29742f44",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclareradialshading" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4055, byteStart: 4006, line: 119, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "233a37e53f2a4f83422a2d8d561e5b13f61523669f22f43469efe858dd6e4513",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usepgflibrary" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 951, byteStart: 883, line: 27, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "245cf97efd326f2e8c3c9e0d7da58fd530696051b43a24f39cc4e6bcc459b248",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7291, byteStart: 7250, line: 187, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "27fe395ef07e554d5a4c1de31ca63552fb060a0682ea00ef852db63ba8b66a54",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetmatrixrowsep" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7425, byteStart: 7387, line: 190, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m",
        },
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
      id: "28287162b2b32938292677dbb8d8416ed3c1f7f8bd9263c58781b1439f173581",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotstabletypeset" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1186, byteStart: 1069, line: 32, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2dde10fd708b8e94968dcefeb662301ef8da91d01838277a8da6db275f616faa",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclarepatterninherentlycolored" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5571, byteStart: 5507, line: 151, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2fed91f458f7e8b85d795cb5722d8c38e27d932f1375080b6c6e551c066f28d0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointtransformed" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6621, byteStart: 6582, line: 173, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "331abb6788efbc5c8699d3c5e68bc6053efa53a1e6fb86d896115b300515d777",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformyshift" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5802, byteStart: 5764, line: 156, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "338359b12083494d674eb221549e3968cbe38a282e0c65756ec02eab13b027fb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetfillcolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9894, byteStart: 9859, line: 248, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3726ae921cf3866a15529dccf341dd746960dc24a66d06ad3e4ffbd9302e0e84",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdecoratepath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10041, byteStart: 10004, line: 252, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "38592efcd4dc2ef202060bb7ce2acece96e0fbc10314175f90131854750f5fc7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfidrefnextuse" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12981, byteStart: 12944, line: 317, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "392ae8eedf521226ac09c5c2c8dfcb46490a91660e4508e969b008dbc7895ab5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetinnerstrokecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9645, byteStart: 9603, line: 242, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "39c365ec4c884786ea8c8b986f8d0b264cd290a2287fc9f115e75e8766a5ff9b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclarefading" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4566, byteStart: 4528, line: 130, utf16Column: 5 },
      },
      authority,
    },
  },
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
      id: "3a65216efea097f2c82d196cff8ea92402d45cf7d0dfd6b85ee7ec449e2a0790",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfkeys" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 468, byteStart: 366, line: 10, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3d67a4f0dbbe828dd973c22b7cf857fb0a42f6f398c5f664b56c49e48867cc60",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "clip" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 14446, byteStart: 14342, line: 360, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3dc824b5029a514c262afd2cf6abda2427e725417cca316b0a426bb2d287fca8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetstrokecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9514, byteStart: 9477, line: 239, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3ddfc7f738e65fb5c82c8929b22f72c4dba4f71e953fd3a2c52b7bec45cbbc66",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfcurvilineardistancetotime" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7107, byteStart: 7059, line: 183, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3f2488c54a93b9cee96b082d6748c2fffec4d4ea2051166c9ca50199b58f0a20",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathsine" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11204, byteStart: 11173, line: 277, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3f6041a9381867e912786831e36c2c54d75dab5e8d02c08c3f7ed30a86ac87bd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftext" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12868, byteStart: 12804, line: 314, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3fb794a4a65e9edc1cf4b54b815bb176c2f078ecbf1e9fbec6980ec695cd1149",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfwarning" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13668, byteStart: 13638, line: 335, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "45776156fe795b4bd5338755df00d41e64a0106fdf8ad6f22cbfe3c1f7ac19df",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfqpointxyz" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4923, byteStart: 4887, line: 138, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "463087d3caab3c76f82d7877022dfda9f3354d0cfed4995eebcd03931f2ece94",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclaremask" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5440, byteStart: 5367, line: 149, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "47e80fca723cc1d3d6595e7c16e2766f2b3db96d655ea45a3806be7348eca139",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointborderrectangle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12194, byteStart: 12149, line: 300, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4d2609da4e61e5f840b69532af49a7e19a20b89d44e2ed6d9282eaa71392c03f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsettransformentries" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6576, byteStart: 6524, line: 172, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4ea73c80e55cb812bc63b470f31471dc895510875423250b3aee623b58bae566",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfnoderename" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7701, byteStart: 7666, line: 197, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4f01498e1eb46dd39f28e16f5a6bd3472c1faaad6c79f9f3613cff03dbca6fab",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "deferredanchor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8162, byteStart: 8126, line: 208, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "50c6a19d94b4b5ac04c1133bd2060cd7e38a7dac534679646b43136aaf795932",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformshift" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5714, byteStart: 5677, line: 154, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "50fea3f3e8caa429cc2b7f083289c9039261bd6cc65c869a33a74ca17372c79e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowsaddtolengthscalelist" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9085, byteStart: 9036, line: 229, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "514b65b3e429a9945903642c667d4249d72f2efae6f3c6838dc69205813addaf",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfifidreferenced" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13148, byteStart: 13107, line: 321, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5218a7cc492c118deca7b8602070b4f9d24a2720f99a962dc8034863ba07419c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfanimateattribute" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4768, byteStart: 4727, line: 134, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5258248486b111bd7489f91d42582cdc777e924c426e343a738947173e88e29c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointcurvilinearbezierorthogonal" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7170, byteStart: 7113, line: 184, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["animation", "options", "command"],
          pattern: [
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o o m",
        },
        {
          availability: "unimplemented",
          language: "bounded-strategy",
          role: "argument-language",
          strategy: "tikz-command",
        },
      ],
      id: "5283cd33008cfb0ab62a7b4ddf90463dac5a2b6d039553f4a6b0a066744b544c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "tikz" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1361, byteStart: 1192, line: 36, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: " o m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "53160b6e384737d1300f2d14e2d38c5e1b511b2fcbb8dacdc11bc6e8a50db61b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathgrid" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11124, byteStart: 11088, line: 275, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "53e86e85feb75391bd64192386ab04f4404b7090745044134bc979906bc6221a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointcurvilinearbezierpolar" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7228, byteStart: 7176, line: 185, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5422cfe0b1de5a89e384dc608860e13a8204c9f95036bd57d4fb30fa4e553470",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "path" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13778, byteStart: 13674, line: 336, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5455776136a4d9175389000c1abf3cb15723106e03dce013c6acf424321fd36d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathcosine" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11243, byteStart: 11210, line: 278, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "547bb443638f0afabcc9dd218031b2edab42b829fdedbecba9a01a5247e8c57c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfintersectionofpaths" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12415, byteStart: 12371, line: 304, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "55459b1bfd1bb3df240fd4e6ee689527e9ca10e7e366d252ae214a90a35f95b8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetfillpattern" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5616, byteStart: 5577, line: 152, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "556e910299075f1fdbd16fb522a7f275ded0d8c3c2d2c2d13e67ff0f67acf160",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowsupperhullpoint" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8851, byteStart: 8806, line: 224, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "55aeeadedf553e7254b049ce3dbc2b2774ea3a864848975df4cbd8e954d6c8d7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclarefunctionalshading" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4118, byteStart: 4061, line: 120, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5699ea241eb428acd8c0294cfadfcf24cf509917e6768c86bbd13a18da889c26",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfshadecolortogray" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4258, byteStart: 4217, line: 123, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "56b34de5698b5cf27b7bb9fe98a843ac3d5ad6902975aeca5e0c55fd794cb08c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "beginpgfgraphicnamed" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3307, byteStart: 3267, line: 103, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "56b613dd31bf42391d3a08382ab8a04a696760dd54e83566d38ac11ee357d85d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfrev" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13488, byteStart: 13459, line: 330, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "56f4b84dc8e631065f2774b628dc88dfa0879b41f3e9107693e345da0e615e61",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfmetadecoration" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10332, byteStart: 10295, line: 258, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "578804ae600d44eff2cc1c6393a350eda1968ed1f00d8ae92ebc721dc38bed33",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclarearrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8519, byteStart: 8484, line: 217, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "596f3b8752561e8cdc31444ca4d69e26badc808c9946d3d1ddef50e77939f53e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotstreamspecial" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3488, byteStart: 3448, line: 107, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "59cf7863ce091b6e922830b5b34ba61a1d3dcad1b3191d2f90c81cba96d19e4d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetyvec" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11553, byteStart: 11523, line: 286, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "59e0e039d28f357440f55f2a58e9737e8522947091d026bfb8637fff21a293bd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetxvec" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11517, byteStart: 11487, line: 285, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "59e106e2c0fd1204043b6abcda460db751c01abca0c9cf8eef7c534cb171c763",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformarcaxesattime" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6378, byteStart: 6323, line: 168, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5b4340918182a696e60f08e17107739e3073b8671bdc4c33532076b2ddce286e",
      status: "parent-asserted",
      subject: { kind: "environment", name: "behindforegroundpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2676, byteStart: 2568, line: 79, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5b8e3ae293d266b7baccf5337fbb4b1e9510322ecf1502e3c0acef29c89070ba",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pgfmetadecoration" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2787, byteStart: 2682, line: 83, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5ce2a4d4e8bc9fbf399a40a3853cbed1fda87a3ed0f79ca228f3ba86fcba3342",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointxy" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11481, byteStart: 11449, line: 284, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5ea59da5d3053a1ad076bfc8c9d8c5895d2576d2fa3e25af997be1b085b4ea0a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointshapeborder" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7928, byteStart: 7887, line: 202, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5f512d2db51942f553fc49320988521e413d4720421891168eb8d914b5f2fda4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "graph" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 14905, byteStart: 14800, line: 376, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5fc0359590b9d63c04c090c5bdf2c580b3bf6dd6ac53d1d865e78118f588af8b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgf@process" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12626, byteStart: 12593, line: 309, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "tikz",
          target: "body",
        },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5fcd607f1bf858a94c98306100c43966278bbe3c1eba2e43a69fba0e9e744afe",
      status: "parent-asserted",
      subject: { kind: "environment", name: "axis" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1745, byteStart: 1587, line: 49, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "607aeb26776c6bd70f7e2f4b6909311af61cf70a97553b4c8bddb259a50432a7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfresource" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13453, byteStart: 13419, line: 329, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "609f6e4b6d202a553b312d99b1d1c2f0ea6042a623d3f2ff94f689703fbe59fd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointxyz" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11637, byteStart: 11602, line: 288, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "611bd051e4989862ee52b3655c9525a948b7a68b2586ce18b08806ec184414dc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fill" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13998, byteStart: 13894, line: 344, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "61c42322dfd8d59a8d814339622c84d6a500fcee3b355d9581690dbe8d1bbef9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "filldraw" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 14112, byteStart: 14004, line: 348, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6388f810cbcfa30c3cae097d5df2376dd6ea69c48590c23af35ac6534ca3b857",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfmatrixnextcell" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7381, byteStart: 7344, line: 189, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "667eee436ed9ece7bcccbeac190cee5d5d4e7473042d1a8c4bb1eca1a0c7acf3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformlineattime" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6260, byteStart: 6214, line: 166, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "671a0b5d450b530f9f13d3592f9013255e5119d0bfa697365fd620879db60b6c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfvocab" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13598, byteStart: 13567, line: 333, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6845c5294754c09f3cc90178ecce41664d9e91fd0c0eef95fdf96348522c12df",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usepgfmodule" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 877, byteStart: 810, line: 26, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "68e5c8cf9850ba381a45eb2d1f3a4cf7dd48147499613f591d6f2f17e8db168b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfaliasid" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13062, byteStart: 13030, line: 319, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "68ffdc00525637139f006504c115ba72e74e46b8e98bde64830a29cf94bb6977",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowssetbackend" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8608, byteStart: 8569, line: 219, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "695282fff8aae853832ecfa691582a04543288e4ccb226152459c279673f70b4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfonlayer" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3899, byteStart: 3869, line: 116, utf16Column: 5 },
      },
      authority,
    },
  },
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
      id: "69903c8ddd1a9af473dcbe5adacdbca464aaf33a40ed89249cd9266798f922f8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotsset" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1063, byteStart: 957, line: 28, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6b43b1e608fc46295c042b9eff74b6577f342adbfd3873428d97093cb833c76a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformscale" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5845, byteStart: 5808, line: 157, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6cb2027a353bc405fa4a58e10c719605ef268d896cac7a56a73d418207110b81",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "foregroundpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8280, byteStart: 8246, line: 211, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6cbba5ed2f8e6a3bd1d65a9ff3b61624b79024458e4379177801be2642d79420",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfmatrixendrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7466, byteStart: 7431, line: 191, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "70fad64504635a2b8a7de97b76d6af2dcad72be27d797b3666fc99a68b2b159b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpositionnodenow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7791, byteStart: 7753, line: 199, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "714dbd0fbcc355584620d8714a1747da6356a74da3973b6c9daa31dec49baeb7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointscale" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11849, byteStart: 11814, line: 293, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "71d2233af05b0e3bd3dbce529d1fdcbffb3ff4e2fc5d13f6c28cb38204ba41ab",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclareplothandler" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3749, byteStart: 3704, line: 113, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "743457e45aed6ed12a3e2debb0859cd9a4d3eeaac5b7ae003acad1922d526d71",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgf@protocolsizes" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11334, byteStart: 11293, line: 280, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "743a7a62678b36bce82f835811da2645924cd2df91b47024b2640c46634d8a5f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointnormalised" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11933, byteStart: 11895, line: 295, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "748e7e41ee1349da6240a877c410f79f1655868894e967dcd3264bfd40657f04",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowssetlineend" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8653, byteStart: 8614, line: 220, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "749d275afc726eb20942808a7d79471c29ab5cdebfc9339b1b96330df893e734",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetfading" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4606, byteStart: 4572, line: 131, utf16Column: 5 },
      },
      authority,
    },
  },
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
      id: "770dff09a4bd54bbee1e945533404b893e60aba2fbed31b9886fabaa5d8ddc5d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "tikzoption" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 579, byteStart: 474, line: 14, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "77691db33b85b8d03331cfcdf025cad58d5301bc99ea5b3c5ed7838442fcc877",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsettransform" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6460, byteStart: 6425, line: 170, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7862ac46db5ae6fbd5350695aeb52923e2c2b41c0f5d33f24b4fd156958b5a40",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointintersectionofcircles" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12365, byteStart: 12308, line: 303, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "78cc4e403365b6bcab32f80d0203a04ec45310a5558c2590b5b37ccf38196a27",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclareshape" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7971, byteStart: 7934, line: 203, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7a07093a8bf0cad4873971d4017c0b89d48a0f49b49f22392afc701d40a46134",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathquadraticcurveto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10579, byteStart: 10534, line: 264, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7a225b0737616bed069ad03520b57a4a4ca021eb147d580e64418294716d753e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdecoratecurrentpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10172, byteStart: 10130, line: 255, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7ae7fb30754b7ad1861f55e15553783a2e0f5b9481a0a8b23b76d790a577b981",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpoint" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11400, byteStart: 11370, line: 282, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7aea493656ecf889d263139e4f052a0c557e89e225a925f89f6afa398fcb709c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointintersectionsolution" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12469, byteStart: 12421, line: 305, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7b358370faea4f18ec2a4203f1812d8b2eda538655fbbc7057a5d7131f467308",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpatharctoprecomputed" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10902, byteStart: 10845, line: 270, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7d5261bad72e2f3ef6a0cd5dbcb9c6b866141fd2c8345bcdb22b41c88d00540f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetarrows" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9767, byteStart: 9735, line: 245, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7e17251042ae206c06dbcf215ad5dfb99c36ce90e4f77e52540931ca77e1d070",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "beforeforegroundpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8418, byteStart: 8378, line: 214, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7e5ebdc87b3051a27b14a429e360e672a6f74d186b0b35790ea6841ff249f297",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformtriangle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6115, byteStart: 6071, line: 163, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7ea471a3f311ea58920a77ff998ca4fe1b4dd710ab77cc3b59c0a8b9350fbfc5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfgaliasid" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13101, byteStart: 13068, line: 320, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7ebc541c50b550621a8f2cc58ba1fda515aa3b23c6ceb23778c80288482a5b14",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetmatrixcolumnsep" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7338, byteStart: 7297, line: 188, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "80d6bfa5c148f0597d515111f69e8eba81338da5d53935835e129664a0d9b03e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformxscale" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5889, byteStart: 5851, line: 158, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "848e379c5e20dea7a0292693cf7d3dfbacece45046fa20e7e60b3113da562190",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetmiterlimit" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9433, byteStart: 9397, line: 237, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "86509a3bd0a660b0b986b19ed0497a7b147cc817aebc6d010a90d8a854625bb7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetcurvilinearbeziercurve" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7053, byteStart: 6999, line: 182, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "87956eb9b69ee2eaa24aa71420084c08d11ab878717c6a3fff533f65ea9534b9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfqpointxy" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4881, byteStart: 4848, line: 137, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "88d6ac99c87918fa124afa827d7fce49c8129f4563a555d7a7185948b3e6d144",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetfadingforcurrentpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4660, byteStart: 4612, line: 132, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8bac4f31ab7c1eb0602c0a83d35bca967d3254de0af15ed411872331d97be09e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpatharcaxes" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10791, byteStart: 10751, line: 268, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8ea01cbd9659faa81102581958e5407d70f5f105e7d217e15197e3525b7a84fc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfuseshading" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4297, byteStart: 4264, line: 124, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9059a591d6842100b0c475fe0b6e426826fd2ddffa3b471f87d2a95659290621",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointborderellipse" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12243, byteStart: 12200, line: 301, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "909a3a10fb241d72496aa0c4c9d1dbd122910d6918ce2c817d0c5244265db19d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "startpgfonlayer" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3940, byteStart: 3905, line: 117, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "90ac6b7f84e95268cdac77b063579f1b007b36ada34cfc961b17c5aba6ca5059",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfusepath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9350, byteStart: 9320, line: 235, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "90d435ad07d2746c034276555fc0e89c2bda630253e47e88cd16d90e94f5cb53",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pattern" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 14225, byteStart: 14118, line: 352, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9149038710cbc245229441272556be7aac68ddeacbed415f6efb84114e5259b0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathcurvebetweentimecontinue" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10705, byteStart: 10644, line: 266, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9163f0a61c72005054f0097f5188fd288f3fac272d65d1b88615289caa1a5015",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetstrokeopacity" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4438, byteStart: 4399, line: 127, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "922aacd18a79220575b6a3a376ea59b237183a9bc211712244394b231f047bea",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformyscale" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5933, byteStart: 5895, line: 159, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9256b970e6f96911f3b0d46b7f4e0c04706ab4cb67db8be1a73eccef2e4d39cc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfuseid" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12902, byteStart: 12874, line: 315, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m ",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "92de8493e98c87323bc1085690462bb7851dd957ef96b6d94bf01f79b8c43c67",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclarehorizontalshading" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4000, byteStart: 3946, line: 118, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "940c7f0d0075cc940c6aa6ab46295363ff1cdee3a579483a47148a420b8a813b",
      status: "parent-asserted",
      subject: {
        escapeToken: "\\",
        kind: "command",
        name: "pgfsetdecorationsegmenttransformation",
      },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10235, byteStart: 10178, line: 256, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "94d2f2fa19464e6c0b177c9d4a53ed241e51711cf1e7a3aaf46e959833ab70ba",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgferror" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13632, byteStart: 13604, line: 334, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "951ddb39a97f54d9c1c28ac385dcf0c1094a489c1b9556c3bf799e6c278c8ffb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotstreampoint" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3391, byteStart: 3353, line: 105, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9712173618ab53dccbf124f43e96ed3bb25df1c979b6c0d4351e4ab92b63ee65",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfabout" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13185, byteStart: 13154, line: 322, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "973129ee9e95495ac5ee3c98f51225567ab871cfedd141d807d4ef30de7045d0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfshadecolortorgb" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4164, byteStart: 4124, line: 121, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9735d06b6d4f7d11dda5f2faf8760af08d25c4010a04c20b2fad3fce7194959a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "draw" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13888, byteStart: 13784, line: 340, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "985f061e3a9bf3ea6b32bfd5f6466cfb4f931796b44d98cd780261ccb80cbeb1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfqpointscale" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4965, byteStart: 4929, line: 139, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "99255daa63a23197e28a27fb05c6d67fe5c19afe16548d59253f4ff9b54d393d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgflowlevelscope" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6742, byteStart: 6706, line: 176, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9966c5363bd07cbcbe48c9abcacb80c753b4343be08e83e2be50ba2b63d908fb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfcoordinate" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7620, byteStart: 7585, line: 195, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9976a8742fef2c216d7a8f083c34c22e6333c913ad60f4bbd84502b3d89ae8d7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathellipse" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10946, byteStart: 10908, line: 271, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9a94529c2014d9da29fcbbff05a43f7ff27e138da79652fce1f369d092a88b02",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetlayers" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3863, byteStart: 3796, line: 115, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9aba3902c376af5a8858cd5edc1a2cdbf789929560b4ec304100cd1ee3141074",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfqbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5173, byteStart: 5146, line: 144, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9c454a85225fc710f422f3bc954ae17500da5701b17c255036501ca37d716953",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetinnerlinewidth" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9597, byteStart: 9557, line: 241, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9c5a60daa80707d2766edc845e4fc65700b505beeb55954f4777cd66c07f4161",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfextractx" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12508, byteStart: 12475, line: 306, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9d66cacb82514cfe685f522f740646feac6606b8f292199fb59c142ebec07652",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclarelayer" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3790, byteStart: 3755, line: 114, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9f1695935f1023e8fe6b9ea190326d52c75440d571e8ced2995332d5e60bd1dc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfprefix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13338, byteStart: 13306, line: 326, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a18acf9947280cab080c8cf559c7b107071a8d4507ba4e191cde1bbd6fa78e01",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsnapshot" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4805, byteStart: 4774, line: 135, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a1e30e3680a87d3a1d3a28c414465a143c3593053e06df95f790d5f409ae4b78",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointcurveattime" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12143, byteStart: 12096, line: 299, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a5222e1152c7bd54c9fc6922f0946744fe15199d2d37022e902e70c4c0a9b029",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotxyzfile" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3567, byteStart: 3533, line: 109, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a52f683cc9376a27e7404c409e9718234d582195c2a62a73e96ca11ac4ea6d1d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "savedmacro" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8086, byteStart: 8054, line: 206, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a58bd59ad7fb18301df94c04845868f6f84574f841dd2769e5d54ed5c440ed5b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "startpgfviewboxscope" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6892, byteStart: 6844, line: 179, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a5da750403b6ee0ee4492fab499c79c922edf00f2d2c51c77df3ef9d46c210c0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformarrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6208, byteStart: 6169, line: 165, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a95dacfc62487d2f2f87f4dd3fba7020555c2f96fb8c6fcbae4f318c6e7babf8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfsrc" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13523, byteStart: 13494, line: 331, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a968234cd67abbf8409e1deb4991bf4ae899bcf65c230371025d39b24ac03fbc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetarrowsend" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9729, byteStart: 9694, line: 244, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "aa010836f77889cff24db420b176cbdf08c3eab5ce68384d039683de155a65d9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowslengthdependent" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9302, byteStart: 9252, line: 233, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "aa0f82d20256c1843aab13c7547e6305dbe39a7f82a02fd9b12eff52992f50e9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformcurveattime" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6317, byteStart: 6266, line: 167, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "aab9fc706c92da2a3830342e638dff29c67e025e4010048fc13cc4ff31f61c4b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfqpoint" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4842, byteStart: 4811, line: 136, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "acffb777f1bc73c181ca01ef6306364e4c6f7faa31d48c99db80b86a6b8657fd",
      status: "parent-asserted",
      subject: { kind: "environment", name: "colormixin" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2858, byteStart: 2793, line: 87, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "af44aa21dcc5bcb669aba226deac26f19279d7574f0d1d893f290e42e3e20479",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetzvec" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11673, byteStart: 11643, line: 289, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b2ba46920a4cf30ba733547c1de26eb689f993c541030695b5cf6f609db10e79",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfuseimage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5290, byteStart: 5259, line: 147, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b3dc4e6fb0ced9ad1ba16cadb083540e747b996ad21cdc311d85f233e3c08eab",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdeclaredecoration" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9963, byteStart: 9919, line: 250, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b4b09edeffcb337ea09c74b7b9ed8c2a546adab080e828b220172877a18720f1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "startpgfmetadecoration" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10380, byteStart: 10338, line: 259, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b4c63e526a5869d53b1ba35a28821f34d61ad9e0310b9b772e464a97af83b66d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfdatatype" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13264, byteStart: 13230, line: 324, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b55540df5b7a9d7efd8563fe1c6f15f290111bfc76449933531f1233f156fa1e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetcornersarced" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11287, byteStart: 11249, line: 279, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b5ba9a4de03d5a909cc8411ae140ca61ac36bc8acd6b7e0ae944987bfb946475",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfgetlastxy" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12587, byteStart: 12553, line: 308, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b6aeced87e60f26812a89cf145c94c8d66a6dba72ce26ca23bd6a3accda119eb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowsaddtooptions" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8979, byteStart: 8938, line: 227, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ba05f6c4d909df3fa2ae4d3aad326c4f34877ff0d0515ba9dd7223f51b302068",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfgettransform" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6419, byteStart: 6384, line: 169, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bc89531346751d781e6d2829ca13595b877c0308df09645689dcd83578e24014",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowssave" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8890, byteStart: 8857, line: 225, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bd64b13d2c24b15fc97527ac5cd1adc6c44fe54c17d4f6e4f1f147af85e76c80",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowsaddtowidthscalelist" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9139, byteStart: 9091, line: 230, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bda2a8cce6fe7b41198b92146ea79130f1cbac181cd0d54b9d5bacf6a8a88904",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "startpgflowlevelscope" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6789, byteStart: 6748, line: 177, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bdea833bc9f6b84d94c42bae4a5056eca6e38e52d9cffe37f711f60d441db029",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfusetype" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12938, byteStart: 12908, line: 316, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "be3b9c43aa5725089b001bce4e61694ce3bd63036d97a674122c93e7d808f056",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformxshift" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5758, byteStart: 5720, line: 155, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bfe77c8873b7de0e44f8a8a3f1929e2438b0db9df4e66fa5c68b877ac71935a6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowssetvisualbackend" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8704, byteStart: 8659, line: 221, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c04a57a56b612b244cb2809900d96f65c3fc8b9435ff493f602d5ccb02ceea4c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "beforebackgroundpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8372, byteStart: 8332, line: 213, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c37e9a290ed8be71eda5e32352d8bdbed0b0dc17289097417bbb5b42f44093cb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathparabola" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11167, byteStart: 11130, line: 276, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c3f1e0274f80c3f20c7d81e10a77811035a092b71ce30ee4ea3b7dce09ad1319",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathmoveto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10445, byteStart: 10412, line: 261, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c87c1caa411d006852d0c0468bae10d4501c0b76057d25ae053153cca14c8114",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointlineatdistance" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12033, byteStart: 11987, line: 297, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c8b70dc741dcfb22345996e675a2ac6653130fd890224aa9ba839379fe1c1f88",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfdecoration" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10124, byteStart: 10091, line: 254, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ca55eabbe6313c7fbdd0bdec5fdb5cccaf6703d39ff6f57725b0ffc9506ef684",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrealjobname" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3347, byteStart: 3313, line: 104, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "cbf272eaa1301a4501c6ba7c61fb960583f266b8f74b4c03c1e584e5acbfd518",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointadd" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11808, byteStart: 11775, line: 292, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ccddb82c80780a09cb45e2e6ac5cf8773856c73e17f8eaa98eb895df3cb921fd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfhref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13300, byteStart: 13270, line: 325, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ccdfac7f2a74aeef72f597d059ba6a2e7dba9a194336bd42e7b867c77b0624f1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplothandlerrecord" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3698, byteStart: 3658, line: 112, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "cd05b43c10aca50575b5cf9b827850acab0bd73e90ec43fc2c6b3feb76cf6cce",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformyslant" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6021, byteStart: 5983, line: 161, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "mmm",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "cd6df908c704f29cfa61794a322da0b108a098b8d214d556f0726eaadd92c64e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotfunction" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3610, byteStart: 3573, line: 110, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "cf8b9bf268c3e667cfd43644929a4642d024ea76ac5e121eff544c85aee7a9d5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointanchor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7881, byteStart: 7845, line: 201, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d0ffdea16284f583108bf3db2aca7af1c90fa6d76d5d0af0b7cc18ba62b1a95d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotgnuplot" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3652, byteStart: 3616, line: 111, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d351ca852d3bff7a4d06226c87a0fc19b8b39dd06219d21cf9fb10131ad3f784",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "startpgfdecoration" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10085, byteStart: 10047, line: 253, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d363a6656ca8779f0edf89f464d4b6dccdc88a322fa88a57d695623dde14be94",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfshadecolortocmyk" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4211, byteStart: 4170, line: 122, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d4464160a95341859d7b7628cac33c3aa0ead8c7865ead0f3f657890f4c707c2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformxslant" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5977, byteStart: 5939, line: 160, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d52cbe3cb79196e1610d7da424faf2f7ec650c96ddbdb0751a7f9184ce7b15b5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathqcurveto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5100, byteStart: 5055, line: 142, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d628de5e092bfa94fc9da9245340da2515f952a4fc0d3ae0b4e5119e2a24cc58",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointcylindrical" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11722, byteStart: 11679, line: 290, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d7cf0cc3911053df4b7dc8f25fa6899723d41a4046c04a85a7ba9456b57aff5c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointtransformednonlinear" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6993, byteStart: 6945, line: 181, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "da126482f0dedb63f2faf6a2416c377856979661060dc028331dd84f07094a0f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfnode" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7531, byteStart: 7496, line: 193, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "tikz",
          target: "body",
        },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "daa99f811715f4d313a409cde3a97484e48064e78905454a6622e74d8c107f51",
      status: "parent-asserted",
      subject: { kind: "environment", name: "scope" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1910, byteStart: 1751, line: 54, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "dd0b39bf00f29ce34656f044ff7aba96d51406a87d62b15342ef7290de859179",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfnodealias" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7660, byteStart: 7626, line: 196, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "dec83ffc8690ba45d3f092c3c3950c88897b3159a90c2c0f6262b73d30819290",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowsthreeparameters" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9189, byteStart: 9145, line: 231, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "dfa6c8a9bade3836d1379f38940bcc6827613a80305606fc8770c1340803143f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetfillopacity" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4481, byteStart: 4444, line: 128, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "dfa9228483c2e5b266711c27ac4e3f9661c15c3d772201581146609c2fc03463",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathqmoveto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5007, byteStart: 4971, line: 140, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "dff1d28454f37264463bc675c8b5592590942fc42ab32402ea4bdedffe50e261",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfaliasimage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5253, byteStart: 5218, line: 146, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e090142f9fc523137970fb4c5e6a9817c363ffe9b875348efb2747f9a101e8f2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfcontent" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13224, byteStart: 13191, line: 323, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e104991a70e58d09a5a20660123938a860ca8bd0649c968453bdad04b2b6ded6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfqboxsynced" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5212, byteStart: 5179, line: 145, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "tikz",
          target: "body",
        },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e29b9a93b78d06e3d959871ca260e1275903432ea3ade203de9c78ac39d80401",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pgfviewboxscope" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2382, byteStart: 2224, line: 69, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e2eee878eeb1438fb4d5c5e6d1ba30082d594f32799383afbb1a168750e913d7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowssetvisualtipend" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8754, byteStart: 8710, line: 222, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e3227605f4752380b97220d1eeeee8904271c252883dc3e3ae5ffccd0a9b2844",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowssavethe" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8932, byteStart: 8896, line: 226, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e352beb79da5321ac97deea01a37ae12b98997835fd64dccff8550f07d538538",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfmultipartnode" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7579, byteStart: 7537, line: 194, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e39fe769cd538b42caba1b034d9cce4709eee75f3bd3f3c1fafa4270c78acf01",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetfadingforcurrentpathstroked" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4721, byteStart: 4666, line: 133, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e43893a480adb9591f2d7ded4f35d274758543702fe4130e3c1ba76050f805d1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetbaselinepointnow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12748, byteStart: 12706, line: 312, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "tikz",
          target: "body",
        },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e48ec55cb29449a33702dae7109bc46dc6783c43a16cb932e8ee046e3d4f6e89",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pgfonlayer" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2061, byteStart: 1916, line: 59, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e54ef38a4ad9d552fa85c72351a2836eddacbf8d0c16283db390009169a8c504",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfimage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5361, byteStart: 5296, line: 148, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e580f98a096ffb0204e36da6015cd93302cd66b3a0303616637ce7b5b2e5412d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "saveddimen" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8048, byteStart: 8016, line: 205, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e665f345e8d8c2598a275eb02ff96712456d5595d096be66c7f6b7bc891e6833",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "anchor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8120, byteStart: 8092, line: 207, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e6f9d5bbec253a16bab5b98b17fa971d569a286b34bdc7a2e62628815c931afe",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathcurveto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10528, byteStart: 10490, line: 263, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e7784f5bb4a56cda6053868e69206c3df0055925dab69134aab384cff744b978",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathlineto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10484, byteStart: 10451, line: 262, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e7cb7d0171fbb565525967972ff3c1c1958f35c6f14b2360f302407eb44de75e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgflowlevel" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6658, byteStart: 6627, line: 174, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e7e7c253ebfbed5430880cf4b330c62505c79617d90dca85f67d87ccad35bdfc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfproperty" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13378, byteStart: 13344, line: 327, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [{ code: "u", modifiers: "", stop: { kind: "token", spelling: ";" } }],
          role: "signature",
          spelling: "u;",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "tikz-path", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e80efff29a81ca5572d226a00a213f43fdd1ed52f1dfefe0428364cdba6705f9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "coordinate" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 14794, byteStart: 14684, line: 372, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e83a7303fe8d9978d9af9fa0e1a83aeea75ae94ffe758c3b6943791f21251076",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfnodepostsetupcode" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7839, byteStart: 7797, line: 200, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e9adadc1bab69070110245951691a1171d1c0e24d9750b46d788425e7dde2649",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetarrowsstart" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9688, byteStart: 9651, line: 243, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "tikz",
          target: "body",
        },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "efc50096fe58ffe5eb99e743d2793db3c4b50a4ddb2639a490cf4d74a79096f6",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pgftransparencygroup" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2562, byteStart: 2388, line: 74, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f17f899e3051e2ef08b100a8313ed9b3f25442ece8c206259a8c093f2a83d875",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetbaselinepointlater" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12798, byteStart: 12754, line: 313, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f3ab7d55839fd3d0fcea35b0350b542a4c4fa52abd2fab8810667b51bca62ca4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfgettransformentries" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6518, byteStart: 6466, line: 171, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f4375b8f195d1047e027a71e242ec891dbd6da270923539a30967f52111b1ae0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointlineattime" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11981, byteStart: 11939, line: 296, utf16Column: 5 },
      },
      authority,
    },
  },
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
      id: "f5fcedb162ba2bcbcddf17f9081607e3685a6909ea5b405569e89e30f5b788fa",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usetikzlibrary" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 804, byteStart: 695, line: 22, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f694df6f24baa474a74ee51de06cedad101e25b3cbb2cce7d4c804c96d3c1122",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowshullpoint" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8800, byteStart: 8760, line: 223, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f69e3c49b4b46118a5a122545c0a9aef7080e64be665510bf56b94480af06062",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpointintersectionoflines" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12302, byteStart: 12249, line: 302, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f6a11fa4d3b8de23486b35fb5ab3207fc75f918736ad12fe41b78920ef8a7c51",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "behindforegroundpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8464, byteStart: 8424, line: 215, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "tikz",
          target: "body",
        },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "tikz-conditional-arguments",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f75f529a5e9ba411e8f43b6c3c8f4d5350aa74f72c0c6411a5bd5602c0e61db2",
      status: "parent-asserted",
      subject: { kind: "environment", name: "tikzpicture" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1581, byteStart: 1416, line: 44, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f7f226648aaf2cd95852357c3ed6f9e5b20f526f882e2bebe59060774ad5bc84",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfrdfrel" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13413, byteStart: 13384, line: 328, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f80a9dd403213fdb71918124b7f63677454d5a5ecd5ce84be8330bd0cf8dbb57",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfsetadditionalshadetransform" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4393, byteStart: 4343, line: 126, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f8955720606bb02f5dde749d5d177f559b221f35f26e322d2f4fed47082e17e7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfextracty" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12547, byteStart: 12514, line: 307, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f900fa542e86b6888334f26dfe4c7c1d8aed3064d6eb02658ec3f1ab3ae10cb1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpathrectangle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11031, byteStart: 10993, line: 273, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f90fb27538ff55d1cda5f32ac9dddbd3aa93caee7d885f8bc0e458139906fe30",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "backgroundpath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8240, byteStart: 8206, line: 210, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fc181232bae33c53dfe760274e7b1a26c5e3b1c0778d7fb348485e87ce528ed6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotxyfile" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3527, byteStart: 3494, line: 108, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fc9e0066ed189ce59751da60c30d98b313c44cdb28c17debbced2cc679a3b127",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgftransformnonlinear" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6939, byteStart: 6898, line: 180, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fd2339925654ea67e15445b1bab987d11a0899b24b77529bf910a19348a02c15",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfplotstreampointoutlier" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3442, byteStart: 3397, line: 106, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fd322531e18c5366dd060bf248af01fc354da81b938f6785ed9b04ecdb3a2603",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfshadepath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4337, byteStart: 4303, line: 125, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fde427d8a63e57c34d37a238777c6769a74bf8da04cee4a804436fd76fc2a406",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "savedanchor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8010, byteStart: 7977, line: 204, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fe2dc74c88cb06b0ddd23de4033441baacb8b43b40f0e0e7186e7463a2f64e7a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfpatharcto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10839, byteStart: 10797, line: 269, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fe2f38529295441a14f64697135f40b12bda51a46c9a44f61cb6bd41f811513c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfextra" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3261, byteStart: 3233, line: 102, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        {
          pattern: [
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fe6a1f0c1220f284581b1c18b270eff2df9d0e14e49243ebc76a00268cddda41",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowslinewidthdependent" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9246, byteStart: 9195, line: 232, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "tikz-body",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ff1c8b347a3c503f1a8f2e35ba5c47036e8a70ccbc70b0b9e7f9d43a5b1356f2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pgfarrowsaddtolateoptions" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9030, byteStart: 8985, line: 228, utf16Column: 5 },
      },
      authority,
    },
  },
]);
