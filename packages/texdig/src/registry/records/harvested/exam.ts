/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "class:exam", kind: "class", name: "exam" };
const authority: Authority = {
  inputDigest: "c052d8defbfe78ec6ae5b2ee6bb08cb34ad41a60a628f2463fba4e4d43843ae8",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/exam/provides.ts",
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "01dca32c58e4724320c39792380b03c4d95a8a46c390faf612529ec5445b1d55",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bonuspointpoints" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1591, byteStart: 1518, line: 32, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "part",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1bc8b63134a8d59503cbd11360b06029cae23eac1369021473af3bf06493ce5c",
      status: "parent-asserted",
      subject: { kind: "environment", name: "parts" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2244, byteStart: 2136, line: 52, utf16Column: 5 },
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
      id: "229ce439bd6d98dfa7eac3d9681d4f4df328dc1b5f17eed9e8a0ac6b469bced8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fullwidth" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 299, byteStart: 270, line: 10, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "choice",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "248aa87eb4c5dd8535002d07665c79b422f127f3ebf1a108adb12cd153ea7a39",
      status: "parent-asserted",
      subject: { kind: "environment", name: "oneparchoices" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2003, byteStart: 1885, line: 44, utf16Column: 5 },
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
      id: "272923f348ff5e9ebc7db8a1509d5fc177f82ae175b5692cefdc583982a0afba",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "qformat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1361, byteStart: 1299, line: 29, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "choice",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "36f99b545d420f564044de0f90a25c9ff3f2b90c820476d2b39fd56201c2438b",
      status: "parent-asserted",
      subject: { kind: "environment", name: "oneparcheckboxes" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2130, byteStart: 2009, line: 48, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "choice",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4161973cfc3f41c5e81ccff237c7e2eeea31b82e96c2d9593063e22cc7a9f952",
      status: "parent-asserted",
      subject: { kind: "environment", name: "choices" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1758, byteStart: 1646, line: 36, utf16Column: 5 },
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
      id: "50347d8255f3d926a0f36855ed7529f9ece57dcc6b3336011ee451f0828b08d5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "checkboxchar" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 783, byteStart: 716, line: 21, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "subsubpart",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5513b05ffe340cffce1c5fc2936988db1b2d782ac294ff24b6e15254114966e0",
      status: "parent-asserted",
      subject: { kind: "environment", name: "subsubparts" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2490, byteStart: 2370, line: 60, utf16Column: 5 },
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
      id: "5a5134759cff4e3b6c46401515f806047e62bbeb5c6bfc8e034edb91fd033ac4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bonuspointformat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1221, byteStart: 1150, line: 27, utf16Column: 5 },
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
      id: "6efd29359ca18bad93b1aebbcd24a1e6b58f1d8abd6514e2da23c42728448b9b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "marginpointname" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1001, byteStart: 931, line: 24, utf16Column: 5 },
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
      id: "70147e4b7cd0d0b14d536b2b6a5dda2f57f5d828e4092828416b23f3ffd78c23",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pointname" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 925, byteStart: 861, line: 23, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "subpart",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "88644aeaa4348508bc8d2a6fc57b67838d64dc180fd5ba5cd71521873b6207a6",
      status: "parent-asserted",
      subject: { kind: "environment", name: "subparts" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2364, byteStart: 2250, line: 56, utf16Column: 5 },
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
      id: "898df5cd997e6b040a097647beb1e20945c43ab0dd9a03be1d37ce8200c2805a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fillwidthdottedlines" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 385, byteStart: 345, line: 12, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
          ],
          role: "signature",
          spelling: "o o",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9cb95d2d8aa282f96f2b3c47421a45b14d6e69f4134871a739e56ad5d18dd022",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fillin" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 264, byteStart: 236, line: 9, utf16Column: 5 },
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
      id: "9e60c032d0df27c5645c7c4660138456a846edb2c2bbfde7813412e1cc04c717",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "totalformat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1293, byteStart: 1227, line: 28, utf16Column: 5 },
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
      id: "a2640c076001dd87eead33e47fcb7ccb9b04a54b5c869eb9f38b309b30837fc0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pointpoints" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1512, byteStart: 1444, line: 31, utf16Column: 5 },
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
      id: "aad4a4446e05cc83fecf662d01d06aa90e7a4bb757f84bc8f72e84e8b08d168c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "extrawidth" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1072, byteStart: 1007, line: 25, utf16Column: 5 },
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
      id: "acfad9217b23c4a30925348695541cb418568ebafa5e2d6cccd9e0d1c098080d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "checkedchar" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 855, byteStart: 789, line: 22, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m o",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c184cf2fdc0356d425e5274bc0fb3012276817edfdb7e195d33b2b03806efde2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "titledquestion" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1438, byteStart: 1367, line: 30, utf16Column: 5 },
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
      id: "cc1be3c9e8047afb8d8ec1c90e95e1090d989cfa2faeda4b25ba2326c8d56a34",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "CorrectChoiceEmphasis" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 565, byteStart: 468, line: 15, utf16Column: 5 },
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
      id: "cd2f3da02bdac9b1e3afc42125906411cb944893ff430844588fa6eca6960da0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "SolutionEmphasis" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 642, byteStart: 571, line: 19, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "choice",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "cf92718a9dbd7f1e45496ee81743fa1c38adef6f40eedd59a3c517d50cdbc5be",
      status: "parent-asserted",
      subject: { kind: "environment", name: "checkboxes" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1879, byteStart: 1764, line: 40, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "question",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d1063ebcf2e7682f7660681d159c165c70ea5676b40383d7fe4a6e168d596afc",
      status: "parent-asserted",
      subject: { kind: "environment", name: "questions" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2612, byteStart: 2496, line: 64, utf16Column: 5 },
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
      id: "d4504f22886c79370327c0381eda2c216c99f933b2e7b5b0cb7ff97a4349f02e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "makeemptybox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 462, byteStart: 430, line: 14, utf16Column: 5 },
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
      id: "e1dc277a5a1b0b9b685ad9eef91dfd3546ad6790251accc71f66a608e9a9fd39",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pointformat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1144, byteStart: 1078, line: 26, utf16Column: 5 },
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
      id: "e257c543cf3e4dd02a94c09412e2a3abfb89d1d7e8aa2ad328b187a0129b9777",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "answerline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 230, byteStart: 200, line: 8, utf16Column: 5 },
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
      id: "e8f2695f253ef4a085db20e1c72d87fd9d7d1d7948b0891991a61ab3c88ce9b1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fillwidthlines" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 339, byteStart: 305, line: 11, utf16Column: 5 },
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
      id: "f7f17295adca4f1859356a1d7e00098e9e3349fe1aaf44d5f1511d33d19f2e6c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fillwidthgrid" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 424, byteStart: 391, line: 13, utf16Column: 5 },
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
      id: "fb23701e90fc22ae5800e672bee58a3e2bb6feb2124c484479350248629e2f87",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "uplevel" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 710, byteStart: 648, line: 20, utf16Column: 5 },
      },
      authority,
    },
  },
]);
