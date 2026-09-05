/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:minted", kind: "package", name: "minted" };
const authority: Authority = {
  inputDigest: "d99b3a816b59042df81070aa54d23b920839feb0ab858cba3c0628d66fc294f6",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/minted/provides.ts",
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2ddef54eae13595ff1969a53cc2e13ec87183a0efc2068c470526128dde84742",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newmintedfile" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 624, byteStart: 587, line: 17, utf16Column: 5 },
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
      id: "3a9ccfc28cf6fffa7116b5711f9a055a26ef9b9b4852d8917cad822af5b4e62a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "setminted" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 419, byteStart: 388, line: 12, utf16Column: 5 },
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
      id: "6705867cb3d005d89b6cc6cac7a3ee7fce19558dc12304f13fc03393d6b82c5b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "setmintedinline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 462, byteStart: 425, line: 13, utf16Column: 5 },
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
      id: "800390304b67770b8fa1c716acb323e1e6c2f9f8ed55489611fb72b15558c1f3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usemintedstyle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 382, byteStart: 348, line: 11, utf16Column: 5 },
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
      id: "92d40681cf1a70cb2664d87b4aa02a0fcd7b2dd8c95a0c909c353f40327615b2",
      status: "parent-asserted",
      subject: { kind: "environment", name: "minted" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 707, byteStart: 679, line: 21, utf16Column: 5 },
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
      id: "a7047773dfca713cf69710a9a03733f2f759a71b8d626fbdbe8ab21eaf40343f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newmint" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 499, byteStart: 468, line: 14, utf16Column: 5 },
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
          strategy: "minted-inline",
        },
      ],
      id: "ac5f4d6cfc82b8dac9713e5dd919231844d7f2c66424ef06402da3cb33d6fdda",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "inputminted" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 342, byteStart: 295, line: 10, utf16Column: 5 },
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
          strategy: "minted-inline",
        },
      ],
      id: "cbcf0f8036efa907916f95e9dd98e932f633f1d9ebe59303fee84bcee6e2a7b8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mint" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 237, byteStart: 197, line: 8, utf16Column: 5 },
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
      id: "d15db35895cfecb0b8ad9b1921bacc3ca35075312fd05b1cdd9d6b3c0d2832f7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newmintinline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 581, byteStart: 544, line: 16, utf16Column: 5 },
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
      id: "d2d5816c52b1abce964afdd2303ebca9e0ad06df8033ec1251e456dbaded6ccd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newminted" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 538, byteStart: 505, line: 15, utf16Column: 5 },
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
          strategy: "minted-inline",
        },
      ],
      id: "d6afc92dca5511ddbec86e22ec40456211d7df080f79e8ee6443478eabe3bc15",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mintinline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 289, byteStart: 243, line: 9, utf16Column: 5 },
      },
      authority,
    },
  },
]);
