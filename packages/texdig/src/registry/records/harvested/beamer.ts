/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "class:beamer", kind: "class", name: "beamer" };
const authority: Authority = {
  inputDigest: "34273a87cfa9677fe64cfeeb3a0b2404c1d8f91eaca16c09acee1266cc06219f",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/beamer/provides.ts",
  repository: "https://github.com/siefkenj/unified-latex.git",
  revision: "3c1350edbc8f13ccfbbd5d96919391fefa4d268d",
};
export const RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "00920b8b9a9a2cdd97f208f16d956709ecc97c305eed24d633f9baf5de219844",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertshortinstitute" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 816, byteStart: 741, line: 20, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "0571b65ececc59bae41208f2b3aec4cb9c6ab1150eaee4e51f2af00e868f3d52",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "keywords" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4003, byteStart: 3940, line: 116, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0cbc95f33dc3f5f6e8efdd50b14b2371a927fb61aaf9c9d970edd449f3216ae9",
      status: "parent-asserted",
      subject: { kind: "environment", name: "column" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6864, byteStart: 6832, line: 209, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
            {
              close: { kind: "token", spelling: "}" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "{" },
            },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "!d<> !d{} !d<>",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0dde8993286c9a5fc07ffd26013aa5a674f77f2280dc558fe690f0d3cd9257f2",
      status: "parent-asserted",
      subject: { kind: "environment", name: "block" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6441, byteStart: 6390, line: 190, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "!d<>",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "122f4eaf62249bba2f7297e4a55a635b010c0b78699865fdf99b68131eba7aec",
      status: "parent-asserted",
      subject: { kind: "environment", name: "onlyenv" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6616, byteStart: 6573, line: 199, utf16Column: 5 },
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
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            {
              close: { kind: "token", spelling: "}" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "{" },
            },
          ],
          role: "signature",
          spelling: "s d<> d{}",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "12d618cffec6a268bb562adc5b4fcb73a6b7ad46d0f388ef26c0ef5778bf195f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mode" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 207, byteStart: 140, line: 7, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "19c14206c09d6994bf6171ccf9333e802d4027bfae8eade3dfb537ec8ecbfd74",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertverticalnavigation" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1305, byteStart: 1205, line: 31, utf16Column: 5 },
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
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s d<> m o o m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1d25d3881b361796549aa94339a09f6a831363ef043911e7be1875865815f9d1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newenvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2584, byteStart: 2480, line: 78, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "237ce0f945d234f0c7f65dd2390334eb07326a63e5c7a18f633dbd9b1d8df4f6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertshorttitle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 969, byteStart: 898, line: 22, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "" },
          ],
          role: "signature",
          spelling: "m o o",
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
      id: "23fbece0cb31b3af9bfc1ab82fb6d1d8f6427a37743124a93090ec4394b44b93",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "setbeamersize" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1697, byteStart: 1585, line: 41, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "r",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "r<>",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2883bd5941dfaa8e72b65708812d5aae06a360964fc916000666ba445e40058a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "animate" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4837, byteStart: 4773, line: 135, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "28d868a464e1be3a2aba1e153f3347fc3a954a1e222a2c528a51b0e2b6057dbf",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sectionpage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4185, byteStart: 4135, line: 120, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "2ac410c0b2a2ec66783f3a68044bf0006775e914474b10977ac99a35cb80bef3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "resetcountonoverlays" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2881, byteStart: 2806, line: 90, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "r",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "r<> m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2f5123295e026b50da0fda32b1d1b160a7ec9045b70c0c032867b334699852f1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "temporal" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3410, byteStart: 3374, line: 102, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "d<> m m d<>",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "317f6885bd26522bb9fefb5e6de631769c1acc55624d927f2f3a413aeeb6fab4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "alt" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3368, byteStart: 3335, line: 101, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "326920e22d208699fe6920ce4d96adeccf685eb666175d6b2c2243cdb32ed080",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "action" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3733, byteStart: 3703, line: 111, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "34f799442b9828790c10be94ef0614e7729ed73d7c070a3ea20fc141b0a46de1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "visible" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3290, byteStart: 3259, line: 99, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3892c3161c8c00be3fc24d4054754ec3ecad6377986b96a4637dc996d603de0e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "label" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3615, byteStart: 3584, line: 110, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4273a54951d97fb8f49cf8af1d24d877226958fe0453d470e6b9514df4d337ef",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "uncover" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3253, byteStart: 3222, line: 98, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
            {
              close: { kind: "token", spelling: "}" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "{" },
            },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "!d<> !d{} !d<>",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4a4348de95e03b8ea8d7e57fdd59fb4d8e2a9f915e1a61b33efb76c8a44bd8c8",
      status: "parent-asserted",
      subject: { kind: "environment", name: "exampleblock" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6567, byteStart: 6509, line: 196, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "4ab603f41e699c63373a04f896897f2985e225dbc3bf7075aa38b7d4914f5b63",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "titlegraphic" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3866, byteStart: 3799, line: 114, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4cef205317689f5df27fd4e87645d00e961663cfe4169134daa431e058b81403",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "column" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4766, byteStart: 4699, line: 133, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "r",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            {
              close: { kind: "token", spelling: ">" },
              code: "r",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            {
              close: { kind: "token", spelling: ")" },
              code: "r",
              modifiers: "",
              open: { kind: "token", spelling: "(" },
            },
            {
              close: { kind: "token", spelling: ")" },
              code: "r",
              modifiers: "",
              open: { kind: "token", spelling: "(" },
            },
          ],
          role: "signature",
          spelling: "r<> r<> o r() r()",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "525833e95c75f06705634435a59e97b4144e7d6b42f14779ebe84afa2a44dd59",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "framezoom" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4693, byteStart: 4592, line: 129, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "53e6ca0ee4dcf025d5f7630e334d0e0d3b68f7cc405e974ddde87bca4fbb949e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "invisible" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3329, byteStart: 3296, line: 100, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "545463cb69dae7fe8a143a11c4cca2aa83a33a97084d6c75f41a543d42d5fb38",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertshortpart" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 892, byteStart: 822, line: 21, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> o",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "54634efd9ed543f71ccc7573cec9bd2b9e515ab226513417ac12e742779de4fd",
      status: "parent-asserted",
      subject: { kind: "environment", name: "columns" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6826, byteStart: 6795, line: 208, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m",
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
      id: "5a496bc9a4a82d98549ec6e1320cd67f1f78e009de8f67fcb8a86bc19e958dd2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hyperlinksound" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5147, byteStart: 5034, line: 141, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "r",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "r<> m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5e41ac64d2496f47ef40e9df93f95e4134ca9d4d103d724d131c00b53a76998f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "animatevalue" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4918, byteStart: 4843, line: 136, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "!d<>",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5fa96023f0290f84576b60afc91b6bb423e0d9e474a2c0aa9491d4f9e10f4247",
      status: "parent-asserted",
      subject: { kind: "environment", name: "actionenv" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6789, byteStart: 6757, line: 207, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "62c14efde0ead40fb65260c2475903458e66633510b764f1328bff9ae651f223",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertshortdate" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 735, byteStart: 665, line: 19, utf16Column: 5 },
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
            { code: "t", modifiers: "", token: { kind: "token", spelling: "+" } },
            { code: "t", modifiers: "", token: { kind: "token", spelling: "*" } },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            {
              close: { kind: "token", spelling: "}" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "{" },
            },
          ],
          role: "signature",
          spelling: "t+ t* d<> d{}",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "688b8ab74616f34b065be4a04c866a8a75842601da51f547a49dec87417ad895",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "onslide" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3178, byteStart: 3139, line: 96, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6eb8f4ceb97155a52f4291bc3e7b024317557aec96c108c4091f6ae61262a2db",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertauthor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 581, byteStart: 514, line: 17, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "6f7a7ec92d9bef3db17da10a58cd6b7bba014b8f417d2a58b7a22a013a8c2937",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertsectionnavigation" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 389, byteStart: 290, line: 9, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m",
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
      id: "75812733a6947812c0970186f97df64ab845e37e82fcd49866a6b943184ec71a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sound" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5028, byteStart: 4924, line: 137, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", null, "name", "numArgs", "default", "body"],
          pattern: [
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "+" },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "+" },
            { code: "m", modifiers: "+" },
          ],
          role: "signature",
          spelling: "s d<> +m o +o +m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7f7105dfe26a94525d9d7a052e64408e34d7e5fab46f34d8a25483069829abbb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "renewcommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2474, byteStart: 2154, line: 64, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "80dd6ed4d736111a13660c510c9e6de33d05310764321f860d9a1ff71f142e74",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "partpage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4129, byteStart: 4082, line: 119, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "847f71a5cb2426bd92acb3fc617a7c0487099c0f047bae5694f4ad7879547e63",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "AtBeginLecture" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4319, byteStart: 4250, line: 122, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "874bac9828ef3fbe349cfdb0f673b1e50d49296b5545e76154bccf5ccf39a929",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "AtBeginPart" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4391, byteStart: 4325, line: 123, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "8cb29620f9c4ba76417f4ad57d3b70d59e4d065e8206ca34a6d57d128868488d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "subject" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3934, byteStart: 3872, line: 115, utf16Column: 5 },
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
            { code: "s", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8edaa1794303978a3d591b86971f861a84fa9e44e99c140f7257fbcf7285591f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usebeamercolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1382, byteStart: 1311, line: 35, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9054c62d609f2c8592beba593c572096255fa53af198fa2e38bd85d899fe41be",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertsubsectionnavigationhorizontal" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1199, byteStart: 1083, line: 27, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9f9651851ab7d326aa01dc2846452f9e0cc371bdaa2554dcc1ee81d1973cbf21",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertsectionnavigationhorizontal" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 508, byteStart: 395, line: 13, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "!" },
            { code: "o", modifiers: "!" },
            {
              close: { kind: "token", spelling: "}" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "{" },
            },
            {
              close: { kind: "token", spelling: "}" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "{" },
            },
          ],
          role: "signature",
          spelling: "!d<> !o !o !d{} !d{}",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a386659e363d921bba1e9770048089e70d1182ffa86d026294122c3d92fba052",
      status: "parent-asserted",
      subject: { kind: "environment", name: "frame" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6384, byteStart: 6327, line: 187, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "a8ba5260ca003480dd4788b6e6993e1a2c921beb3a233e6820361e908c1098d7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "subsectionpage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4244, byteStart: 4191, line: 121, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
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
      id: "aa654540997f1c1bf9a63e84ae318e4bcf9216e5b2c3a9f37ff1b7a124d2b627",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "tableofcontents" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4507, byteStart: 4397, line: 124, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "ac0a98e87836a1b0a2d9a810ff0b4e65dad6e3431f043f9143ea5149aad80a38",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertnavigation" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 284, byteStart: 213, line: 8, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> o o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b839fa5d773eb3cbd2ed53bddf0aa2866a01f8c62dd5c92b1c22c6006b4a63cb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "againframe" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4586, byteStart: 4513, line: 128, utf16Column: 5 },
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
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s d<> m o o m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b845e93eb3dd244612e6d643b116640bb610e6c2f0ef726dac4f0de809d3785c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "renewenvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2696, byteStart: 2590, line: 82, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "!d<> m m m m !d<>",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b884041eb41ed52b009f5cfec822664ab41d3aa850195ff1e2efe0a646b880ec",
      status: "parent-asserted",
      subject: { kind: "environment", name: "altenv" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6677, byteStart: 6622, line: 202, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b8cc024813a9a9dd6a092b1a9405abacf9de5bc79ab2c2f6e080437cda7669b7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertshortauthor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 659, byteStart: 587, line: 18, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", null, "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s d<> o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bb1d036579dd847cf31e7ed6f5fe03eb1e324a9e05b66424cc5c38ede9e7fdae",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "subsection" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5709, byteStart: 5526, line: 156, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: [null, "label", null],
          pattern: [
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "d<> o d<>",
        },
        { property: "hanging-indent", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bbebff559123faf12033d0e773baa80941ed85f30f1dc183fff61d9af44baacd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "item" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3578, byteStart: 3416, line: 103, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m m",
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
      id: "bc73a2080012528d8d92305f37c62545097341bb72d7f6c9345fa27dc211ec9a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "setbeamercolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1579, byteStart: 1468, line: 37, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "" },
            {
              close: { kind: "token", spelling: "}" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "{" },
            },
          ],
          role: "signature",
          spelling: "m o o d{}",
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
      id: "bd391536f9ef1747adee6c21bc5f101f8e4984dde74562c73094e694f3953842",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "setbeamertemplate" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1823, byteStart: 1703, line: 45, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", null, "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s d<> o m",
        },
        { property: "hanging-indent", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c62ad91cc309d39e88c3fa33c64a45ae980db04eb63126d264580c3ecca4f34d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bibitem" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6272, byteStart: 6090, line: 177, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "ca8706c66dca04245926d1cd1fa32fb1e0b599ac0d39d94c7e43175ee17bb02e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "insertsubsectionnavigation" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1077, byteStart: 975, line: 23, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "cb6ca67fab1f03c85538d6fd78615e097fa85dfa16e387c14b1641484ae4bde4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "beamerdefaultoverlayspecification" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3792, byteStart: 3739, line: 112, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "cedf211814101df9ea50d05a993b34b86556fbfcccb24c79342b81723bd045fe",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "resetcounteronoverlays" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2800, byteStart: 2702, line: 86, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", null, "name", "numArgs", "default", "body"],
          pattern: [
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "+" },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "+" },
            { code: "m", modifiers: "+" },
          ],
          role: "signature",
          spelling: "s d<> +m o +o +m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d3494c343c03ac0eb3e2f37bf979a634ce03042ab935f9069d7df8bafbe55c7a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newcommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2148, byteStart: 1830, line: 50, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", null, "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s d<> o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d63848fede6c0f557b28a76e416ae7de9ef35b5f3ce2805048ed41c07057dc45",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "part" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6084, byteStart: 5907, line: 170, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d7de150803288011e9c62431c1c0754c6c5e74d63b9ad871d1bcf3d4cfb858aa",
      status: "parent-asserted",
      subject: { kind: "environment", name: "overlayarea" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6716, byteStart: 6683, line: 205, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", null, "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s d<> o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d81ceb6d0f82131514369619fd058a911d79ca2ecc2bc5d3809f43c837d1adf5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "section" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5520, byteStart: 5340, line: 149, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "dd040de4ed1488d31e8d96dda13bccce4b5624abb07457981900da37fb795ca7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "logo" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2947, byteStart: 2888, line: 92, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", null, "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s d<> o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "dd30015eb052d10aea9e0b7c58f6229910a13ebecc4cf1d12cff30205b7fabb6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "subsubsection" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5901, byteStart: 5715, line: 163, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
            {
              close: { kind: "token", spelling: "}" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "{" },
            },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "!",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "!d<> !d{} !d<>",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e08d62b57fcff4e33402ff0ed3231a651796fbb92f8dc9b41655de3cbbeae4d8",
      status: "parent-asserted",
      subject: { kind: "environment", name: "alertblock" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6503, byteStart: 6447, line: 193, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e34f400921d87966defb71540fddfa2fa6b6e8bf275c335fab41264d76d7db4a",
      status: "parent-asserted",
      subject: { kind: "environment", name: "overprint" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6751, byteStart: 6722, line: 206, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e5079f799b36d3e55d4f9904b868a9f445ae23f61e9035448efbb448f05f630a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "framesubtitle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3102, byteStart: 3030, line: 94, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e5599cd21a6378153578db67e644a5e7b1ee72218de842cd914eef5412c2e767",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lecture" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4076, byteStart: 4010, line: 118, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "f16baf8375c6159ddbf37157618501f8295a65a23ee0fcb9a0d3891017675e9f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hyperlinkmute" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5221, byteStart: 5153, line: 145, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d<> o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f26047309b3f6a60a1030c91da27dd7898e9c35aae18d00964d7ff9d2d6510fc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "frametitle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3024, byteStart: 2953, line: 93, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f44f05ba37ae931c0c66acce92e93236a24bf1df9fe6f005f21e895e68844781",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pause" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3133, byteStart: 3108, line: 95, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
            { code: "m", modifiers: "" },
            {
              close: { kind: "token", spelling: ">" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "<" },
            },
          ],
          role: "signature",
          spelling: "d<> m d<>",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f4f13fe7591d1cc0d49a9cbdf32a75aa770f7df959aa68d2f2351d45c8048afe",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "only" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3216, byteStart: 3184, line: 97, utf16Column: 5 },
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
            { code: "s", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "faa8b8cbdd22d2bfc04f1db0f4f1e77b90acfefcce92973f90aa5fccc720f4cb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usebeamertemplate" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1462, byteStart: 1388, line: 36, utf16Column: 5 },
      },
      authority,
    },
  },
]);
