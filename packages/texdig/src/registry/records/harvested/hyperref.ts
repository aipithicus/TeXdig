/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:hyperref", kind: "package", name: "hyperref" };
const authority: Authority = {
  inputDigest: "bdd09ed8d12f837527130ca3df0b924b883281f669f70d9b1b2c24baaa21d22c",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/hyperref/provides.ts",
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
            { code: "s", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0d2db08a2b51eaa7f288cb497a3aece67e3682998190cacd79482ca64cd2d39f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pageref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 639, byteStart: 610, line: 21, utf16Column: 5 },
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
      id: "125518bcf9308172ac6ccfa98a117912347a7579956482bb55f89362779e7e53",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "subpdfbookmark" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 847, byteStart: 811, line: 26, utf16Column: 5 },
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
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "160ba1b10ffe1d1317dd958fdfa31bf4c407e992554dbe1363cd9b440490ae72",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hypersetup" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 245, byteStart: 140, line: 7, utf16Column: 5 },
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
      id: "247660193a1105c3a3592fdc053888accbf778e79b2aa8a747364a13c03f893d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pdfstringdef" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 718, byteStart: 684, line: 23, utf16Column: 5 },
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
      id: "3e4abea84ed5e30a4b556437425bbc3b406b4f9a33b6002d293a06afa5286d4f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "belowpdfbookmark" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 891, byteStart: 853, line: 27, utf16Column: 5 },
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
      id: "57855e42e4add9b252964a49ae2be3d7983a3be9a4aa6a62d7356fe96d4d3176",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hypertarget" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 569, byteStart: 536, line: 19, utf16Column: 5 },
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
      id: "65292596e8ca4dff2c9ee82f53cb6cdda06d2c3e9bf427ff8e9ea3a490a8de81",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "autoref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 604, byteStart: 575, line: 20, utf16Column: 5 },
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
      id: "7d1135ed4d45b8eabda10156ad752062e815991184a4a709529588d64f52d417",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "href" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 279, byteStart: 251, line: 11, utf16Column: 5 },
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
      id: "8108ac2aff0a0ff7ecb23532f1957dbf42af1c0f75ed89bef2d4c61c200fcff6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hyperref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 493, byteStart: 463, line: 17, utf16Column: 5 },
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
      id: "8f9c66503cca0e8e2444c80911aa04dac8512bb03a9eb66acb68086a5f78e910",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "autopageref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 678, byteStart: 645, line: 22, utf16Column: 5 },
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
      id: "94051d1b9b7ae6a4bffad576c80f918970c6fc554155429515149959f8297514",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "currentpdfbookmark" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 805, byteStart: 765, line: 25, utf16Column: 5 },
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
      id: "a73b87851f61f3c7cf32888424220e5ac92b7dc0e2b1d136662e2b1d673a5142",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hypercalcbp" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1012, byteStart: 981, line: 30, utf16Column: 5 },
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
      id: "a8f4efbf6f57d3fdb49b0f8d612bee1240d1f5eac362add55e2c1df01cabfd68",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pdfbookmark" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 759, byteStart: 724, line: 24, utf16Column: 5 },
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
      id: "a977c039a646a207c371d8664e881ee8153c9d6bc8c87ad3a62ebcd18b7e39cb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hyperlink" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 530, byteStart: 499, line: 18, utf16Column: 5 },
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
      id: "b01d660a62d1a595298e107910ee4e0e941c4dab6965d0c8d3b216782ea57082",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hyperbaseurl" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 381, byteStart: 349, line: 14, utf16Column: 5 },
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
      id: "b4ff1bfddb66dc8dc02fda81d877d8dc4d100c5ec3070ce97b73bd4513716483",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "texorpdfstring" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 933, byteStart: 897, line: 28, utf16Column: 5 },
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
      id: "c2a1601d91c9df4b8d99bbb0928970039dbde9835fd2289b33717691b7e1cc4a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hyperimage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 419, byteStart: 387, line: 15, utf16Column: 5 },
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
      id: "c9955768c7f66dfc498cd9aad4964e1b7d5290bb853fd6a16f9a200c066af5a9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "nolinkurl" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 343, byteStart: 314, line: 13, utf16Column: 5 },
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
      id: "d143ce064e9619ae51a83e200aa621d3813e370357d50ae06a2235ee62c5e03d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "thispdfpagelabel" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 975, byteStart: 939, line: 29, utf16Column: 5 },
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
      id: "d54b7c874acdf82af7700621eaf9b78d07c2710dadbebb833793bb2226206018",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "url" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 308, byteStart: 285, line: 12, utf16Column: 5 },
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
      id: "e8fa2224dc2d3d6d98c1b2a92928db419a712afb79fd7c65f2e65da696c806ad",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hyperdef" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 457, byteStart: 425, line: 16, utf16Column: 5 },
      },
      authority,
    },
  },
]);
