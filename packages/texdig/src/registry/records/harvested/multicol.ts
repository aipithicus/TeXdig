/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:multicol", kind: "package", name: "multicol" };
const authority: Authority = {
  inputDigest: "481986b3163ac8d4d857717742022ebd6d71f3668f2ad5304d9efe4e4b19d58d",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/multicol/provides.ts",
  repository: "https://github.com/siefkenj/unified-latex.git",
  revision: "3c1350edbc8f13ccfbbd5d96919391fefa4d268d",
};
export const RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "366593323a199906b95ec23309d0e52adcb170f5ee83ae063f99a08bfe689fa8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "columnbreak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 190, byteStart: 140, line: 7, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "9eafcf41ba0474401826f1782204a1c307d93253cc2b6406f1c5d80f22eada11",
      status: "parent-asserted",
      subject: { kind: "environment", name: "multicols" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 291, byteStart: 245, line: 11, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "ba5841943a7d040e4796e04c2597a6fd9f3e6fb8a95559738d726d7611b368f0",
      status: "parent-asserted",
      subject: { kind: "environment", name: "multicols*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 346, byteStart: 297, line: 14, utf16Column: 5 },
      },
      authority,
    },
  },
]);
