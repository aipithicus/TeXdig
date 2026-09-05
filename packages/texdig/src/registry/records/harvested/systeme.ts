/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:systeme", kind: "package", name: "systeme" };
const authority: Authority = {
  inputDigest: "fb46a6140b4dacef4190a5f7865b4748e1d545925c9dee5e3f5d53a086dc3fb2",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/systeme/provides.ts",
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
      id: "14289a00712c4613cb7470ccc851aeee648f355439286fbe4063682c360bdd84",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "syssubstitute" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 736, byteStart: 703, line: 25, utf16Column: 5 },
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
      id: "1d0326b00980e6647ca9c12818b61e0359fd12911049c1b05fe7d5dc90ae2fc5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "syseqspace" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 419, byteStart: 389, line: 17, utf16Column: 5 },
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
      id: "62946d7411a239c2fc637b90b605d7242d635984747d9dec2384c5cd72d9ca6a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "syscodeextracol" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 661, byteStart: 626, line: 23, utf16Column: 5 },
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
      id: "873e719092ed7e6de3d57eddba0105d0f1f9e6e47848202e8b564679658d6519",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "syseqivsign" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 498, byteStart: 467, line: 19, utf16Column: 5 },
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
      id: "8755de87c4f5b190d05b48e37b6dd711bc982fef64d2226fbec8b0f798740119",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "syseqsep" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 311, byteStart: 283, line: 14, utf16Column: 5 },
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
      id: "8c8e97a31be23a91e17074ac173aec6e4c91e636d91a11090f1520cbf2aca7a6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sysremoveeqsign" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 577, byteStart: 542, line: 21, utf16Column: 5 },
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
      id: "a8ee2232a9d7c8e266e42f2a42c804253a637e5565c7e63bc8762ba64e569a4b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sysdelim" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 277, byteStart: 234, line: 11, utf16Column: 5 },
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
      id: "bfb7cded8f815febe336330b2b11d0bbef07f2436fbb7001210f7cf4103a43cd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sysextracolonsign" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 620, byteStart: 583, line: 22, utf16Column: 5 },
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
      id: "c67ff3219bb34824b0b9557cf33f758f1e0a189ebd088db6a0c50f1f19bce40f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "syssignspace" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 383, byteStart: 351, line: 16, utf16Column: 5 },
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
      id: "c85f1137f0874ebb536fdf29f41371070b2aa2a419dd7944230b0e28a2c2560d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sysaddeqsign" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 536, byteStart: 504, line: 20, utf16Column: 5 },
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
      id: "cc5a290fd7ddaefc48aad725b7bc8a8b53f7886ff24f242d655a14efb96a37bf",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sysautonum" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 697, byteStart: 667, line: 24, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o o m",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
        {
          availability: "unimplemented",
          enabled: true,
          role: "content-processing",
          strategy: "systeme",
          target: "arguments",
        },
      ],
      id: "df69c903db04a326bda4004b63fcfc77a09f8837850db6d0fa99455b90a15382",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "systeme" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 228, byteStart: 140, line: 7, utf16Column: 5 },
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
      id: "e70ec7a8b3445247f3e6630125dd13314f2bc1379cc76a4fd23913b91bf9b84d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sysalign" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 345, byteStart: 317, line: 15, utf16Column: 5 },
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
      id: "e7793ba5db8d53752e5f445eee9d38edb2edec4cfcf7c031dfb2de1ed2ac1602",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "syslineskipcoeff" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 461, byteStart: 425, line: 18, utf16Column: 5 },
      },
      authority,
    },
  },
]);
