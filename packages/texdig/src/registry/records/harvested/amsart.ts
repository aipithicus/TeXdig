/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "class:amsart", kind: "class", name: "amsart" };
const authority: Authority = {
  inputDigest: "c520c5a371a6c71626f6fda639094e2fb7b928ec10db623896c2ede8073825f8",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/amsart/provides.ts",
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
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "21c9466535e93fe92fe4eb36aa38c246f08347689660bba5c060ba94730377a5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "urladdr" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 778, byteStart: 676, line: 27, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "39a0075e78d4187f77d864d1f69e0557a62acbb67e5f321aebd2cd03da5fcc34",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "title" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 670, byteStart: 570, line: 23, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9af35e92d68747ca63ef89205fa2030fef62bc56df60d0e305adb7b5d5b5c844",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "address" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 349, byteStart: 247, line: 11, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c0c92339524103fdf2fe360bb4b578e0c4bbaf2d2a7106c0fab24d627c2d0205",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "curraddr" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 458, byteStart: 355, line: 15, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "cc594c117e1c9e1e78495d040851e91ecb2342523eb17772ccafc42743c4ae2b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "email" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 564, byteStart: 464, line: 19, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f406b87d390828cd11d62c34c7fd5ac2fb5d7033298c43526210e90366921869",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "author" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 241, byteStart: 140, line: 7, utf16Column: 5 },
      },
      authority,
    },
  },
]);
