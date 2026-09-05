/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:cleveref", kind: "package", name: "cleveref" };
const authority: Authority = {
  inputDigest: "a2a29196ddf402162968d84065c92187133a36936e4440080a695bb829ded956",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/cleveref/provides.ts",
  repository: "https://github.com/siefkenj/unified-latex.git",
  revision: "3c1350edbc8f13ccfbbd5d96919391fefa4d268d",
};
export const RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0327384df286149cce3219800c195dca216423f31b2bbae5542198cd2391cf6e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pageref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 410, byteStart: 383, line: 14, utf16Column: 5 },
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
      id: "0cb48c47ec27ebb79dd97203e3cb0cf1c33f3eab44ab2f83c049bea85c679eae",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "namecref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 444, byteStart: 416, line: 15, utf16Column: 5 },
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
      id: "2788d225f4b4fc81821f619d7d0a7b61de8d3015e3f8788069e27924a5a2cf04",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "labelcref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 656, byteStart: 627, line: 21, utf16Column: 5 },
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
      id: "2c579d6e758c1e07c6a0ec25eed715c7752b7daf9594879718fc30f8aaf164bf",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lcnamecref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 514, byteStart: 484, line: 17, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2c949f23c08ec1d63e07091d4838fe508043cefa2847d0dbcc50ec682d9db508",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crefrange" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 237, byteStart: 204, line: 9, utf16Column: 5 },
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
      id: "5534bb9042f8835dad3a76439569240f4fb6777b95c7333bfd0627ed9e7944f7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crefalias" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 732, byteStart: 701, line: 23, utf16Column: 5 },
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
      id: "653e453687efe54cc597a68012817d1c7581e11238a88108a8674bda4a29ebc1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crefrangeconjunction" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 961, byteStart: 921, line: 28, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "745e79be56a13b2a216ec9bd99afc17edece526e2c4209b4e7f4a83fdc2694eb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "Crefrange" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 276, byteStart: 243, line: 10, utf16Column: 5 },
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
      id: "89685fdf1ade9d0b9a8204d3a21e4f8378af6878099634188f523031ae524f57",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "Cpageref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 348, byteStart: 318, line: 12, utf16Column: 5 },
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
      id: "aabfdb42949fa6e034efe5a96388ce1f2cd5c5808789b537f2f6d78fac3432eb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "Cref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 198, byteStart: 172, line: 8, utf16Column: 5 },
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
      id: "ae3e294877dd4290dd1bc6aac401e5ef2cbf729e85175a4503d9f584f9847a41",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crefname" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 770, byteStart: 738, line: 24, utf16Column: 5 },
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
      id: "c2abcee3694cf28d6355ba7686299e4cd5994b9c28f299a1f343d75636cfa378",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "cref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 166, byteStart: 140, line: 7, utf16Column: 5 },
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
      id: "c4e99cdf273d7c2668e45eb007bb159857ab64098f88ddac74b5b4e2767de2da",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "cpageref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 312, byteStart: 282, line: 11, utf16Column: 5 },
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
      id: "c50759591b0aa16403e26adb4246216294cbce4bd8e4847c975f57c63a47d4fa",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crefdefaultlabelformat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 915, byteStart: 873, line: 27, utf16Column: 5 },
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
      id: "c5117c5d5848c3a032d58bf6710219b39db3982604d420e7b81e752539c9815e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "nameCref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 478, byteStart: 450, line: 16, utf16Column: 5 },
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
      id: "ca709ba6bf08537ea1916585e9b1b91588769c4953702087b922cba23703a16e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "labelcpageref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 695, byteStart: 662, line: 22, utf16Column: 5 },
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
      id: "d71606ffd7675fd0ce6e332ead5c844bfc24246ac673c0689bd8e1eb3c460115",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 377, byteStart: 354, line: 13, utf16Column: 5 },
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
      id: "db40aa4263b51d6ac8bfa8484a713d762e2a339f4df174924985deb1d41afd80",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "namecrefs" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 549, byteStart: 520, line: 18, utf16Column: 5 },
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
      id: "f381d4604cdb48cb8d296dd88752b905149c9ad4b6f87de76cdb068444a7b450",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lcnamecrefs" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 621, byteStart: 590, line: 20, utf16Column: 5 },
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
      id: "f59833a2d1a0b25d76886ab579ef09b7becfb39f7173a59e5939939f81b9bf12",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "nameCrefs" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 584, byteStart: 555, line: 19, utf16Column: 5 },
      },
      authority,
    },
  },
]);
