/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:makeidx", kind: "package", name: "makeidx" };
const authority: Authority = {
  inputDigest: "ba35c1f73d343b4bd5c52f91f45f5a97983913321850c4fc6dc2c824dcf0c1b0",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/makeidx/provides.ts",
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
      id: "3f53ed22e3ebc9e2c3208934f00bdb7e146b72767676f0e8236aceaa1db8512a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "index" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 298, byteStart: 273, line: 11, utf16Column: 5 },
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
      id: "65622c6b72996bbaac27b73e16cc631900b5563fba60a344a2049b664d6fdf02",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "alsoname" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 267, byteStart: 239, line: 10, utf16Column: 5 },
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
      id: "86e303228a22146cc6efc315414d6f0f07535c4b4b0f38be84662ee0c0f7bbb7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "seename" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 233, byteStart: 206, line: 9, utf16Column: 5 },
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
      id: "9e39ac03cd6521a30af5bb02516d05edf3399bcbd04e7b4d72a3261a96dfd871",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "seealso" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 200, byteStart: 171, line: 8, utf16Column: 5 },
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
      id: "d176eb586e25f68cd94b3ef46c0a470ad5fe4a2c9b4a1b8d36e72f8c6b50ff27",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "see" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 165, byteStart: 140, line: 7, utf16Column: 5 },
      },
      authority,
    },
  },
]);
