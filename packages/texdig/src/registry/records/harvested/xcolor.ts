/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:xcolor", kind: "package", name: "xcolor" };
const authority: Authority = {
  inputDigest: "7c345645c766511238f8c42eebc5ee23ffb66e5abcdd346487d781392db6488f",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/xcolor/provides.ts",
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "0375afe9048ffe56af43a4cb177c0966785aba1a19d4126a5f7e3f9494aeba07",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "selectcolormodel" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 336, byteStart: 244, line: 11, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m o m o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0c1ef1bd5695688ac77017640674e70709379728e08881069a8af0873dd0a744",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "definecolorseries" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1855, byteStart: 1750, line: 64, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "10822e4759e0f76ee66f1ad2d41fd6a23966d3caf97e62dc525c712d88d0d062",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textcolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1476, byteStart: 1410, line: 56, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "21262e7d57078b08695b93e319759c537dc449144aae2b17e8cb2e1959f83bc2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "definecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 435, byteStart: 342, line: 15, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "22b119e056ad69ae7e3393d3a62c9dce67f036b4b671b26ea3f2293647e91e5f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "resetcolorseries" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1955, byteStart: 1861, line: 68, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2977ab921c048f6aca85aec4852b32151c9d02efd3854c8e8226e8094409100b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "definecolorset" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 733, byteStart: 637, line: 27, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "2f3ba19523cbf6568068fea6ad6569eaf5c186ecf56ad7f689c540203f4dda75",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "color" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1404, byteStart: 1342, line: 55, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "397f9cdd6a4e9cbc4457f2c0a62bbd5e10678c56dd138c0437bc1254a44b9f7c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pagecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1513, byteStart: 1482, line: 57, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "44aa06633df9019d1646fabd34192fba4b6b00a40eeca547578dc8968e6dcd7d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "blendcolors" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1706, byteStart: 1673, line: 62, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4c6ba0dbd89ad292b89d585751c6f0273c2399cef3459a6e5cfdef1ee79ebeea",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "colorlet" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 631, byteStart: 541, line: 23, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "61347e1b0dcba48f207aac7ad1d3d19745cc8794746256685223fe18dcde292b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "preparecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 938, byteStart: 844, line: 35, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "658372665249d5af7a3fcd733ed762bbbeaf7dc30db03af4361549274d5c1c83",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "substitutecolormodel" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 238, byteStart: 140, line: 7, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "80acdd6529c647aaba1b7704edf0769756a60d9b684b427075be6c493450892a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "boxframe" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1630, byteStart: 1600, line: 60, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "82d70abdd6c9f27eaec9e0da8caed9b867e605d7f6e98525840c70c119315fd5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "rowcolors" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1998, byteStart: 1961, line: 72, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "87c0c1fcfff74c8c518e6505602d815a764e4be82f2174062ddb4412527a89a1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "convertcolorspec" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2137, byteStart: 2095, line: 75, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "8ce4d0bb0ade659be359fa789d28ef9104ee5587d18496b34780ff115b9d0b5b",
      status: "parent-asserted",
      subject: { kind: "environment", name: "testcolors" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2257, byteStart: 2192, line: 79, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8e3c4ff7b9a61fd13137316b2fb8e15f0db598935f7f3067e10740354310d1db",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "providecolorset" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 838, byteStart: 739, line: 31, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "8eb5154bf0cf9ad9236b42f9ef75b9e3f0d515dbf7821d2fd43d0ace302b67d5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "maskcolors" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1744, byteStart: 1712, line: 63, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "946bcef038cb4d66502973309208f0758884d96808385b92ba40f6e528fb1bdc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "preparecolorset" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1043, byteStart: 944, line: 39, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "aca4fbe6ab10b3f372eda11413619b0adba13ea53f7c71c315fac8ca9a6b5961",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DefineNamedColor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1147, byteStart: 1049, line: 43, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ad76105d6b58416bc2d01cf95f97c6d67501278456a56a510eaad88c4a95f085",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "providecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 535, byteStart: 441, line: 19, utf16Column: 5 },
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
      id: "afaeb2bde176a069a668e5f96263169bf0cca93f9c205e639d6c5ed2446b38c4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "providecolors" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1336, byteStart: 1247, line: 51, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "afbf565e12cabf39e6046f90461fa353ba55157dd84e855a5627b0e41855f3f1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "extractcolorspecs" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2089, byteStart: 2048, line: 74, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m o m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b22f56848ec5791f538d971ae2c48bc33e88ee3908f4b8581e38bc60fbcdf085",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fcolorbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1594, byteStart: 1557, line: 59, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "c4b0117639165c95476dd8a4de1b6d8f2aa7a285006986b6a452c4a1d1863eb3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "colorbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1551, byteStart: 1519, line: 58, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "d5a2765845eabd6cb63f9ce994da9de8f7ca826189b94236bbf5046c77293b17",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "testcolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1667, byteStart: 1636, line: 61, utf16Column: 5 },
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
      id: "ea86f0517316783dd50f04687f9c30bc2c51a6980b7ba080ba19c36697f7335d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "extractcolorspec" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2042, byteStart: 2004, line: 73, utf16Column: 5 },
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
      id: "fea130b227fe3099232d179e827654f24d3e60a7e7c0b5020aa5c21159d145a9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "definecolors" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1241, byteStart: 1153, line: 47, utf16Column: 5 },
      },
      authority,
    },
  },
]);
