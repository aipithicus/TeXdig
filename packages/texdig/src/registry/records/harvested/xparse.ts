/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = {
  id: "package:xparse",
  kind: "package",
  name: "xparse",
  versionCondition: { kind: "unknown" },
};
const authority: Authority = {
  inputDigest: "63a41c342b6b8e0a9d97e231d11cceeddf026ead52798a9fc1245a44329f0879",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/xparse/provides.ts",
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "058a03d72cf0a6645aad3a2c733f7683501b5b52778ca184a8c72799383b7064",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ProvideDocumentCommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 452, byteStart: 350, line: 15, utf16Column: 5 },
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
      id: "09120a929bce4bbaf5a94fef24ec639e9db5e2d7514becab241816737a1c82f2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "RenewDocumentCommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 344, byteStart: 244, line: 11, utf16Column: 5 },
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
      id: "358b4a45d9c143a615b47bb1b5a9b54d11109bd124574fe1f7984ed1fb47458f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclareExpandableDocumentCommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1476, byteStart: 1364, line: 51, utf16Column: 5 },
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
      id: "3b98c6e329f3ebfc94b88b47a5af6076a3c97b9d1fa7c8f834e6e6669ae28c5b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ProvideExpandableDocumentCommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1358, byteStart: 1246, line: 47, utf16Column: 5 },
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
      id: "3e731fca8b0e7f35a9945e2081068d4a379138a2815c1ddfec01dc4f884fe383",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "NewDocumentEnvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 670, byteStart: 566, line: 23, utf16Column: 5 },
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
      id: "58769746b919c8b30d1cd6a9231a1dea3ec6a506a6561cc0ae9af768deee6cde",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "RenewExpandableDocumentCommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1240, byteStart: 1130, line: 43, utf16Column: 5 },
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
      id: "87da3e7e9bf74397b425f2d57f401e858e0aca765293f63020b81280940c10c6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "NewExpandableDocumentCommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1124, byteStart: 1016, line: 39, utf16Column: 5 },
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
      id: "9ae5482604806dcb2553ea4187acf67739117f0bba0864d8afe379da4c78117b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ProvideDocumentEnvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 896, byteStart: 788, line: 31, utf16Column: 5 },
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
      id: "bac8b533616d0371a50aad78c21e29acdfcdb9c72f4f1d137b49b371cba6fe4b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclareDocumentCommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 560, byteStart: 458, line: 19, utf16Column: 5 },
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
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bf20c26212158763a1710cac593f9a16e2d1fe506f318101b48af260dcf02047",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "RequirePackage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1593, byteStart: 1482, line: 55, utf16Column: 5 },
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
      id: "c14a0403a021e854327411d5f1b57c86490133085c7073c8d953ba9d6e4eedcb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "RenewDocumentEnvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 782, byteStart: 676, line: 27, utf16Column: 5 },
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
      id: "ec4e73e56e3c3424319a59cc750ce71cf4269b495cbb0154d572c22e69544155",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclareDocumentEnvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1010, byteStart: 902, line: 35, utf16Column: 5 },
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
      id: "f14a49e3d8dcc055cd29f39720aa37371f42fa19c08358d09d629303ffe6839a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclareOption" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1669, byteStart: 1599, line: 59, utf16Column: 5 },
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
      id: "f30ecfa945797863004e2a70058416a3bc4a09fbadc2dd0c0ba83d239fd15a27",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "NewDocumentCommand" },
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
]);
