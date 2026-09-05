/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:listings", kind: "package", name: "listings" };
const authority: Authority = {
  inputDigest: "d54f4489e9947363545b560cce52390c8f244b14f2a92cf5dabac4365377cacf",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/listings/provides.ts",
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2fd9cefaec8ebc2f089330da295313eb869107803d5a84fd8c245a58867bde80",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstinputlisting" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 317, byteStart: 280, line: 10, utf16Column: 5 },
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
      id: "392af66aa895255831c25cd981a67551caca544f80cd24876796989c972ef2ac",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstdefineformat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 545, byteStart: 508, line: 15, utf16Column: 5 },
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
      id: "45c7ae8fdd5873a6d23fcb5925f76c7ee41c69e9d15a155f41c70810f8ccd8c7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstDeleteShortInline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 502, byteStart: 462, line: 14, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "unimplemented",
          language: "bounded-strategy",
          role: "argument-language",
          strategy: "listings-inline",
        },
      ],
      id: "4e5ad58a2a3da05a69b720226a7b91f10271d5492b81acf5eedea7ef9ca5013c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstinline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 274, byteStart: 229, line: 9, utf16Column: 5 },
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
      id: "6df64ccca00994dd0e13b43e543320b68b268b709381b7d5ab0f9ec2fb661af2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstdefinestyle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 359, byteStart: 323, line: 11, utf16Column: 5 },
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
      id: "79a4d1bdc440f313cbb020a7a2df61b3d94b86d119689791456e342881db0055",
      status: "parent-asserted",
      subject: { kind: "environment", name: "lstlisting" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 798, byteStart: 733, line: 22, utf16Column: 5 },
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
      id: "b5a758a3d381a630f5392ea911830102d91576bd3774481f89dadda4a4535a26",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstset" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 223, byteStart: 197, line: 8, utf16Column: 5 },
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
      id: "cc7c2d44a8a3d6aef79cb8a8652a95db2f975f4fe3f553e9a26c9e8dd3c6c905",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstMakeShortInline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 456, byteStart: 416, line: 13, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m o o m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d0bfec65dee4ff7ad20ef8bbe48ca3075de2646ca292aef36a64d2cb2beec4aa",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstnewenvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 410, byteStart: 365, line: 12, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m o m o",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e67d6529fde9c9c7f2e91f3d588a06fe3439490bdfc8103919acfa753a7839e2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstdefinelanguage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 596, byteStart: 551, line: 16, utf16Column: 5 },
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
      id: "f6263e287b26bbe4ca383fcaa86779632f9886406a252ca33269aaab48ff514d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstloadlanguages" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 678, byteStart: 642, line: 18, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "f84c48fa496fc42650f8faebcdd56ce6378c0bb9e0488edc775ae7984898d588",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "lstalias" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 636, byteStart: 602, line: 17, utf16Column: 5 },
      },
      authority,
    },
  },
]);
