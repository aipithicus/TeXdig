/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:mathtools", kind: "package", name: "mathtools" };
const authority: Authority = {
  inputDigest: "582c78be4a6aff984b8fca4b003fefd503ebf8b4f4b8a77ccc81dbe51349c0da",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/mathtools/provides.ts",
  repository: "https://github.com/siefkenj/unified-latex.git",
  revision: "3c1350edbc8f13ccfbbd5d96919391fefa4d268d",
};
export const RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "006d32eeb11a551016064fa2307177dfe9d10596fe5c81ba79597370f94cfead",
      status: "parent-asserted",
      subject: { kind: "environment", name: "Bmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3704, byteStart: 3639, line: 132, utf16Column: 5 },
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
      id: "01fe53142269dcae1f851221cfe2a1a25914f8055bbff68e0c3bc8dcea1d396d",
      status: "parent-asserted",
      subject: { kind: "environment", name: "proposition" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7578, byteStart: 7547, line: 221, utf16Column: 5 },
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
      id: "028ecca3b3782adbee9479eb9c14b99b06e8412337c773a3099b6b2e25309281",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathrlap" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 345, byteStart: 302, line: 14, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "0301c9c35f08c1bf906e65e4774e02ff207013f4fbe4adcf8829e7a4717dd7f2",
      status: "parent-asserted",
      subject: { kind: "environment", name: "equation*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6870, byteStart: 6821, line: 206, utf16Column: 5 },
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
      id: "0517dc3f4546eb1aea79a26bc57fc6bc645b39cbb06429c359aa1517aa1b1b5e",
      status: "parent-asserted",
      subject: { kind: "environment", name: "definition" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7541, byteStart: 7511, line: 220, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0b8b860be654b27149289297c4ceae47937c8286d728930ab07737cfa14c14f0",
      status: "parent-asserted",
      subject: { kind: "environment", name: "Vmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4895, byteStart: 4790, line: 160, utf16Column: 5 },
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
      id: "0ef4b700744de5eb1899d18e95be7dae756c6f7469f662b3e69cf0b12f8d41c5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pmb" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2779, byteStart: 2756, line: 104, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "10f843ab7964cd8ce64bd8a146d331b4cf412a1095489d69a1f6d81570d6a54f",
      status: "parent-asserted",
      subject: { kind: "environment", name: "Vmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3775, byteStart: 3710, line: 133, utf16Column: 5 },
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
      id: "120a5fc26d6e2ef839b8217a03b9edd81649de265b04f509033019278639d5f3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "xhookleftarrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1136, byteStart: 1100, line: 58, utf16Column: 5 },
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
      id: "14a32081bd355222cdaa388a27d4a1bfa318c4ce2b4867cd0d999d3557a038fa",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crampedrlap" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 690, byteStart: 644, line: 35, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "o", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m o m o",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "16da35d2101c1bf45e1d359366875723d57dea58629c12f20ef374db466a2863",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newtheorem" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2371, byteStart: 2298, line: 92, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "180c0cba182e6588ba3af96df591d842f11969a328dd61ff41839341cf08ba26",
      status: "parent-asserted",
      subject: { kind: "environment", name: "flalign" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7277, byteStart: 7212, line: 213, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "1cd9ca8b8edab7c0bc85af4066ca0f340e294d4931345d09c6726ee8873be449",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "renewgathered" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2165, byteStart: 2126, line: 87, utf16Column: 5 },
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
      id: "1e598798d43c5b3122550574aab2dfc7e6b4046e7c90560789a52846cd08b57f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "shoveleft" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1487, byteStart: 1456, line: 67, utf16Column: 5 },
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
      id: "2146091ea5e619691a6e14fa5add1e4bed924d7658a2e6993ab0a7ace9e2013d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathllap" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 296, byteStart: 253, line: 11, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "21b4d3f5efae6e1f3ba17782080cd491ff818eb40d118e767db06259d4d98b58",
      status: "parent-asserted",
      subject: { kind: "environment", name: "example" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7680, byteStart: 7652, line: 224, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "25c0c22992889ba1a614de99f505444bac2b4cda38a09382c872dda845a3ce92",
      status: "parent-asserted",
      subject: { kind: "environment", name: "matrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4340, byteStart: 4236, line: 140, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "2a2b7a51fa5e1a664ea2b8dac057539aa6eaf35868dcf4c7eb936c8b2e06c641",
      status: "parent-asserted",
      subject: { kind: "environment", name: "Bsmallmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4154, byteStart: 4084, line: 138, utf16Column: 5 },
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
      id: "2af1f32b634495852b067c294a6c1020a1cfc32bcacefb3b93e655f049a42331",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "prescript" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2029, byteStart: 1996, line: 84, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "2cbacb8b70c516f9c97b7910776e54d204da3480a700cc4f72bca97f7b5c56ba",
      status: "parent-asserted",
      subject: { kind: "environment", name: "bsmallmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4078, byteStart: 4008, line: 137, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "33348745a2a6a7b79e9335789ce1ebeebb4b796c566db2843252872cc90a99ad",
      status: "parent-asserted",
      subject: { kind: "environment", name: "align*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6530, byteStart: 6464, line: 201, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "369378167aa1c91c4c506b9a5dfd3c6cf42982824be29b41d5170c3725d72d97",
      status: "parent-asserted",
      subject: { kind: "environment", name: "psmallmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5126, byteStart: 5016, line: 168, utf16Column: 5 },
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
      id: "380edfbcce5bd49c5904e7576687910c084fbba40af4070108a6669b97748903",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usetagform" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1013, byteStart: 970, line: 53, utf16Column: 5 },
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
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3b4252faa7c8dd8b1ddbb905f72313c1116f0321529b9afb931ea9b684c0a1bd",
      status: "parent-asserted",
      subject: { kind: "environment", name: "multilined" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5662, byteStart: 5596, line: 188, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "3d00d1bfe5604551463650b4b794e0e25040fd3e9153fcdc0e04bc2c2e20e217",
      status: "parent-asserted",
      subject: { kind: "environment", name: "equation" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6922, byteStart: 6876, line: 207, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "3e0d5516d6229977154d1c0dcbc44b88760fbcdbf95ae4b2912b8afd3bc29a7b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newgathered" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2120, byteStart: 2083, line: 86, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "3f9d07a8b385393459b24ce914581529e67d649a1109cf1b8de82a60f4cf0c4e",
      status: "parent-asserted",
      subject: { kind: "environment", name: "alignat*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6744, byteStart: 6676, line: 204, utf16Column: 5 },
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
      id: "413c9e1d92fa8049c095439aa9cbaef3e3cd932ef2abc5c04ba1d5b967a8bd7d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "vdotswithin" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1607, byteStart: 1576, line: 70, utf16Column: 5 },
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
      id: "41eeb2b434ead882daf9988d75ceee634022ad63593a0d3bd24e73df578f721c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "xmapsto" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1171, byteStart: 1142, line: 59, utf16Column: 5 },
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
      id: "45df2ffddcfd4bf0fb34c6172437eb708449ed3008308ce4641c9437eb421e3c",
      status: "parent-asserted",
      subject: { kind: "environment", name: "lemma" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7505, byteStart: 7480, line: 219, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4762689bf1423848f8b4e36a86fec30ef0eb7fe36b9dc647160a66940342eb2a",
      status: "parent-asserted",
      subject: { kind: "environment", name: "Bsmallmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5474, byteStart: 5364, line: 180, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "s o",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "492b9128c158a95f58a61d66229cc8238c5036a52493fb47c0e1e07168728ef9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ArrowBetweenLines" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1570, byteStart: 1531, line: 69, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "49b8a515988966aea6a1df496ea5bafe87cfa56dd6d30a88b45d1ae04e56bf65",
      status: "parent-asserted",
      subject: { kind: "environment", name: "rgathered" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6443, byteStart: 6380, line: 199, utf16Column: 5 },
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
      id: "4a18c4d042968b083b39db72a7e5b6d0f468bd4a476c75a2927a115d17423536",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crampedsubstack" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 798, byteStart: 748, line: 41, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "518ee163a15fdaecb1fca6819dc9b902454f5f9e8c9031af6fa74f34432e917c",
      status: "parent-asserted",
      subject: { kind: "environment", name: "vsmallmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4002, byteStart: 3932, line: 136, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "53135d4fbb9878a0fbd62587bbcef95fa463537c68b4e01e5acfe5bb4705667b",
      status: "parent-asserted",
      subject: { kind: "environment", name: "bmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3491, byteStart: 3426, line: 129, utf16Column: 5 },
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
      id: "549f002a5e153e08dcf4f95c772f10327d0565fbc5ee1986a7d4eca3d43dc089",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathfrak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2894, byteStart: 2866, line: 108, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "555e107119a93caf20dc8a7f046c64d1d4f9352e6662bdbbf0f0eac1b81bc117",
      status: "parent-asserted",
      subject: { kind: "environment", name: "spreadlines" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6305, byteStart: 6240, line: 197, utf16Column: 5 },
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
      id: "572d64dc5b71d598f63c8f0c0a440c522e0d9980702bd64e55630ea865b8dbe2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclarePairedDelimiter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1758, byteStart: 1656, line: 72, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5734eb616d4f28597f85e8c9e3ccc16d0e3f21ba9426b4bf4b4f379bdc4fc82e",
      status: "parent-asserted",
      subject: { kind: "environment", name: "remark" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7646, byteStart: 7619, line: 223, utf16Column: 5 },
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
      id: "5790442e9be1822d5724123413e1906c5c4283068deaa20e9fea473f81f8147f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathbb" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2827, byteStart: 2801, line: 106, utf16Column: 5 },
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
      id: "58ec9167d8241f68e75d8631b7e2256a1f707f0ae07cd6c4aad2a588998c5367",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathscr" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2860, byteStart: 2833, line: 107, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "5d87cc8ecc0676c6173efb43e9499bca074082108a9b472d319a7fd792dfb7f4",
      status: "parent-asserted",
      subject: { kind: "environment", name: "rcases" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6016, byteStart: 5952, line: 193, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m o m m m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5e3e437e90a27da4dc72d69d7a21c125b8232bc66d23fd308b5570024555f73a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclarePairedDelimiterXPP" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1990, byteStart: 1877, line: 80, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "6157a8ffe27173458397b17cdd35d966f6891993950b6404c388be5218f4bd67",
      status: "parent-asserted",
      subject: { kind: "environment", name: "displaymath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7406, byteStart: 7357, line: 216, utf16Column: 5 },
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
      id: "623aa1c2ae1b5d150cfcd4cf2165ce9e1072e5343ec1b32c3a1c39d203c1143d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "splitdfrac" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2240, byteStart: 2208, line: 89, utf16Column: 5 },
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
      id: "62b7bf7760eee4e3018ce0b9e540aa18d52c3ba81da9664951f1ef9e83681404",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "Bdd" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2953, byteStart: 2930, line: 110, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "63324c9bd149f47d1d546b0a27f9377c7b3a091c5134015d1559f3d619f63f30",
      status: "parent-asserted",
      subject: { kind: "environment", name: "smallmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3850, byteStart: 3781, line: 134, utf16Column: 5 },
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
      id: "6720f4519ed5e894cefebe5409cd116cd8e3238d9ace39a728f90d1b08a2362c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crampedclap" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 742, byteStart: 696, line: 38, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "69210242d03ad03535b8e94b70a0735e4f2402f7a582f664cee5dc5a63227e63",
      status: "parent-asserted",
      subject: { kind: "environment", name: "matrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3420, byteStart: 3356, line: 128, utf16Column: 5 },
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
      id: "6af53948ccc3b1061022855cdf813da764d40ed47018fdf83d1f14eb426873ee",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "shoveright" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1525, byteStart: 1493, line: 68, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "6cd9c6fc214d378f8eaac54d35e9e112e57ec48c5af2ff7f24a03eed592cf92c",
      status: "parent-asserted",
      subject: { kind: "environment", name: "alignat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6815, byteStart: 6750, line: 205, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "6e0483443ddef4e3019a52f6d597bb0d173ee4ee1310ba33468fdba4f5bb7ca7",
      status: "parent-asserted",
      subject: { kind: "environment", name: "drcases" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6160, byteStart: 6095, line: 195, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "6f01e30497246038bbb13004243e52bc75cfb0666820fbeb7c47148e31ca045c",
      status: "parent-asserted",
      subject: { kind: "environment", name: "dcases" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5873, byteStart: 5809, line: 191, utf16Column: 5 },
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
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6f25192364ae0fe5286102111df5a6291c872ccbe0d784eba3c45f9d4503fa5e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclareMathOperator" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3142, byteStart: 3043, line: 114, utf16Column: 5 },
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
      id: "7147987395b0ca0aea678a889d73eb9d7d30a8c6dbc682bdf706a56b740620f9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "clap" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 437, byteStart: 400, line: 20, utf16Column: 5 },
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
      id: "72ad56b6281e99da3d0313f5ee8bdb2ef4c3473bd75f7c5b0ff489b5e76661e3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathclap" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 394, byteStart: 351, line: 17, utf16Column: 5 },
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
      id: "7583658a5ce15369573ee6b5f58340cf16a7121115b7c0bd67fc844b421db9de",
      status: "parent-asserted",
      subject: { kind: "environment", name: "proof" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7711, byteStart: 7686, line: 225, utf16Column: 5 },
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
      id: "76da82b8f689c5d79211f4ed15b3de09394ffc2ba156da96cb5e8498175f2530",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "xLeftarrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1094, byteStart: 1062, line: 57, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "79e59631d20388149b6e34ba394d85328357cd703b800023d295be36f71259dc",
      status: "parent-asserted",
      subject: { kind: "environment", name: "gather" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7025, byteStart: 6981, line: 209, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "7b2078be94df3281fefd35c1288d888e86e429e650e87463a2bf501909f0cd67",
      status: "parent-asserted",
      subject: { kind: "environment", name: "Vsmallmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4230, byteStart: 4160, line: 139, utf16Column: 5 },
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
      id: "7b4c8a032be7ac7114d89db2790392d32a5fcc7d613e065c7dfc9db7e72a042e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "xLeftrightarrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1253, byteStart: 1216, line: 61, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "7ddf54dd58c66b5fc5ea5d1ee38566012268b17a40cbc3033c55c2ef61957bba",
      status: "parent-asserted",
      subject: { kind: "environment", name: "cases*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5803, byteStart: 5737, line: 190, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "80a51a814ed82ef93b80510e7a1a43db48bde21dd32a8f0b8bcb29dcbbbf581b",
      status: "parent-asserted",
      subject: { kind: "environment", name: "crampedsubarray" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3350, byteStart: 3240, line: 124, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "87092abea1b540d6a18714efde43507a9e2688bebf7996ae2728d4605aa18c41",
      status: "parent-asserted",
      subject: { kind: "environment", name: "bsmallmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5242, byteStart: 5132, line: 172, utf16Column: 5 },
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
      id: "8874990f3db4ba259bbaa9c3b8f3f6405e6500127a4e63b9d92e135869e17805",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "xhookrightarrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1296, byteStart: 1259, line: 62, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "89d6402bd03e62bdc0548b6395d5ffd1e4849ab8aa776895446a35592ef6a8cf",
      status: "parent-asserted",
      subject: { kind: "environment", name: "flalign*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7206, byteStart: 7138, line: 212, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8bed5a2f563ffe42b4f203cfc03197d21e4d4a0de6ed88ec9d844ebc6a1a3815",
      status: "parent-asserted",
      subject: { kind: "environment", name: "bmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4451, byteStart: 4346, line: 144, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8fe4157461bde2442358a962c453a78fdf1c73b0cbb83883eb492ec84d576826",
      status: "parent-asserted",
      subject: { kind: "environment", name: "Bmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4784, byteStart: 4679, line: 156, utf16Column: 5 },
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
      id: "95351724e2a5ba0100f176645a1c9a125a2700ab0e41ab292c2216d167388b48",
      status: "parent-asserted",
      subject: { kind: "environment", name: "theorem" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7474, byteStart: 7447, line: 218, utf16Column: 5 },
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
      id: "970fe9efc4e82db2a84fecf6366855a17f4e60494f07e57b90d4d77c012d023a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ddddot" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2700, byteStart: 2674, line: 101, utf16Column: 5 },
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
      id: "982972e86e9bce0ba5be04282d8fb78e06859083486053514949906a025df5cb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "operatorname" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3037, byteStart: 3003, line: 113, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "987d56afc03d2e1cc5f9b119e504fadd052a3a145aa8d475d78ace2728aa0ebe",
      status: "parent-asserted",
      subject: { kind: "environment", name: "gather*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6975, byteStart: 6928, line: 208, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9cc0e9381485fbe461474a174567602b30ee3646eee494570a50a3af83c1ac4a",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4562, byteStart: 4457, line: 148, utf16Column: 5 },
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
      id: "9d723a906c8f1376ea3fb8c6aec2554c9eebd043200bbf8d801b100f64958f04",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "smashoperator" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 852, byteStart: 804, line: 44, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m m m m m m m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a1b7fe14f71646240c0ca3eedf0d0b7a2064f9eede1b4fb4918f68d79c65a9eb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newtheoremstyle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2557, byteStart: 2450, line: 94, utf16Column: 5 },
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
      id: "a2f5094c753c19d02493cdc302a222e9dcfb0fa0c47d197db0874396a708cf7d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "overbrace" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1450, byteStart: 1421, line: 66, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "ac936e25c32a376ae33586e7b550b2374bd57a0033d3b34b05782016f5486c0a",
      status: "parent-asserted",
      subject: { kind: "environment", name: "split" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7326, byteStart: 7283, line: 214, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "aca92fc9374c86a944d9a3b6beb773c3cd4db1eb2be8aa68698da177daa676f5",
      status: "parent-asserted",
      subject: { kind: "environment", name: "multline*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7080, byteStart: 7031, line: 210, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ad978b868a79109d0b2b190017851e6a4234885f7793e8bc4b004381eb848b34",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "underbracket" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1338, byteStart: 1302, line: 63, utf16Column: 5 },
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
      id: "af8572df89bd16a53dc96ae8541df84202b40858197e22e7f249175ec687fb39",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "boldsymbol" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2750, byteStart: 2720, line: 103, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "aff54d7cdb23a8e6dea8ac309a54e5d70e092be9874bb876c4048215a51f812b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclareMathSizes" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2077, byteStart: 2035, line: 85, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "b0730ccb3bd251aed90e0795b849b6830cbef0313987560d88893603d0c2dbd2",
      status: "parent-asserted",
      subject: { kind: "environment", name: "align" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6599, byteStart: 6536, line: 202, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b086b0f7c1dd09d40dfefc0d66154570738b5ae42c28f3c003ddc116c2b194c5",
      status: "parent-asserted",
      subject: { kind: "environment", name: "vsmallmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5358, byteStart: 5248, line: 176, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "b287d4ad2f7e0287ba2db3c9de7a8b1c24bc204de912db732f84ca0d8a58a89e",
      status: "parent-asserted",
      subject: { kind: "environment", name: "drcases*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6234, byteStart: 6166, line: 196, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m o m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b59a1e568ac5fd24df74ef969671135130f8d13f8551c9ecbdcfcc73a4258e0e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclarePairedDelimiterX" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1871, byteStart: 1764, line: 76, utf16Column: 5 },
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
      id: "bac6537a00d56e672f936bb7231bbc600fa90b4ae5e958394c175ae888c44a23",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "xRightarrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1210, byteStart: 1177, line: 60, utf16Column: 5 },
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
      id: "bb3e97e94d8ae1cc7d650730ac8ccbe1e49ae60bba8f317f309c74cd174577d0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "frak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2924, byteStart: 2900, line: 109, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "bde307783ec601be77ff4b94d1b6550d2e37b5d6a0a334e2f764c7149531d723",
      status: "parent-asserted",
      subject: { kind: "environment", name: "multline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7132, byteStart: 7086, line: 211, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c0ff3bb1c63d4162a034c33879059d7cb25b81ea33d4f874dba10328acc63c70",
      status: "parent-asserted",
      subject: { kind: "environment", name: "lgathered" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6374, byteStart: 6311, line: 198, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "math-mode", role: "classification", value: true },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "c1146ac9c76ed324aea983d366c716de1095b5f48ce02bbfb5f86c1f05f148e2",
      status: "parent-asserted",
      subject: { kind: "environment", name: "aligned" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6670, byteStart: 6605, line: 203, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "c19d5e3ae674adb9bb95140f6fdf6776a6db54a9c72d8c40d055851d4740b21d",
      status: "parent-asserted",
      subject: { kind: "environment", name: "rcases*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6089, byteStart: 6022, line: 194, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c1d7d9084637116b99815d1957b98d28d1c76b0792f84e792cdf98a3e30eb9e9",
      status: "parent-asserted",
      subject: { kind: "environment", name: "Vsmallmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5590, byteStart: 5480, line: 184, utf16Column: 5 },
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
      id: "c3ac3eb99ab4ae0076debc08c98230acbc4c2d9018a474ca370706095042dc87",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bold" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2983, byteStart: 2959, line: 111, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c4bfb9654a24ab7e603bd93ba2aaff2fb533aab521a0d4aafc999a64f3bc4fd6",
      status: "parent-asserted",
      subject: { kind: "environment", name: "vmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4673, byteStart: 4568, line: 152, utf16Column: 5 },
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
      id: "c788fce16cbba372aecfef631b84599c0b49a83c2f1bc7570ab4b6d90f57b0af",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "splitfrac" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2202, byteStart: 2171, line: 88, utf16Column: 5 },
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
      id: "cc816d96bc5a35cf85ea00d20c314f0b9bb343c53ef3819a99155d89f571c037",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "theoremstyle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2444, byteStart: 2377, line: 93, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m o m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "cead509e0496bcd1fbf2ab183969c2490499310ecc16d16b8e2f7a1dcbf75a5b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newtagform" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 907, byteStart: 858, line: 47, utf16Column: 5 },
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
      id: "cfa7df7c478b28e30c40b51eaafe766cdfd445f65a2c9bf2196965d2267ba7f0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathmbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 484, byteStart: 443, line: 23, utf16Column: 5 },
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
      id: "d24a278903d0f2aca475a1ec6422fe742669f4041e71a294f9b72a093944f8c5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "xmathstrut" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2278, byteStart: 2246, line: 90, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d6ee996659fe107574afcf3123d5b631f6f5510bd9511ba4d716be87f5e602f4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "overbracket" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1379, byteStart: 1344, line: 64, utf16Column: 5 },
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
      id: "d75bff42f09f445ffdb7ecacb6dcc000bffbbbdae9209e005eac8d46debfb165",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "xleftrightarrow" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1056, byteStart: 1019, line: 56, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "d82073e93def1626853157ca0816826cd8f092a999cd185cf27c5a95bc6e5229",
      status: "parent-asserted",
      subject: { kind: "environment", name: "vmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3633, byteStart: 3568, line: 131, utf16Column: 5 },
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
      id: "dc823e69618dd7831f31ab68e834b839a12aae9c44974c00f50397557e32c7ff",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "underbrace" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1415, byteStart: 1385, line: 65, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "dd80d51200e36d9e087e7283ef017962bb48ffe21e71a2fb2a2b6bc842630a5d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathmakebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 538, byteStart: 490, line: 26, utf16Column: 5 },
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
      id: "dda483f9d46d329efb374113d083005c7f860ca5edd2770771e84c961e6b1ce8",
      status: "parent-asserted",
      subject: { kind: "environment", name: "corollary" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7613, byteStart: 7584, line: 222, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "math-mode", role: "classification", value: false },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e12cb50bcf31ed185245eb547ae6ed41a1b61be64b2c13c0f675b2dc34d96045",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "text" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2637, byteStart: 2578, line: 99, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "m o m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e2596d3fc6cad03cd412a0277d1e6add5271bb4a2085823bc3a0159b84fd56cd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "renewtagform" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 964, byteStart: 913, line: 50, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e399c105269d1656362285a76ebccc331f465a5879dabf2bd8318592f481f06a",
      status: "parent-asserted",
      subject: { kind: "environment", name: "smallmatrix*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5010, byteStart: 4901, line: 164, utf16Column: 5 },
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
      id: "e6618fbb66c3391b8af0d213a9d9c78e93581dd9f5003cfa7f1c7ed3d6446cb1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "cramped" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 586, byteStart: 544, line: 29, utf16Column: 5 },
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
      id: "e74729e990e25f63d9cdfb4a6fb40e7142a77b97bbb68e09d34d42ea7ef44622",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathtoolsset" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 247, byteStart: 140, line: 7, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "e7e02210c5ed5446052e532ffd77aceede6617c132182c739578948ea65eb977",
      status: "parent-asserted",
      subject: { kind: "environment", name: "cases" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5731, byteStart: 5668, line: 189, utf16Column: 5 },
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
      id: "f2b63b44fba17ff68dbaf55868753704d4c972d4e8d7ed42157723cd1f89f37a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "dddot" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2668, byteStart: 2643, line: 100, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "f422ff6be4a301e24bebcd17b1ab5ae6c6886b4b72856f49ff8327273827272b",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3562, byteStart: 3497, line: 130, utf16Column: 5 },
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
      id: "f59212be4490b48e0f1bf57f8ad22ae6bc35a81a7a9b008cc710519fd17b4e82",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "crampedllap" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 638, byteStart: 592, line: 32, utf16Column: 5 },
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
      id: "fb49365c014d065c9a3b1a47bde63845a0897e9b6bfb8293409927aed0a34acc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "shortdotswithin" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1650, byteStart: 1613, line: 71, utf16Column: 5 },
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
      id: "fbae658284a1a6dc010d5cf4520c37778df52fe81ebd8c9ae740dc8fc9d93abe",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "eqref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3186, byteStart: 3148, line: 118, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "fbf8095ae2acbf40300221cd4f2018cb98d17109eb297309a74214efe489efa6",
      status: "parent-asserted",
      subject: { kind: "environment", name: "psmallmatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3926, byteStart: 3856, line: 135, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { property: "math-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "fe2bc064361866df5f3b3ea38ca7dea05a66b859375a3f25cd83dcd632438882",
      status: "parent-asserted",
      subject: { kind: "environment", name: "dcases*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5946, byteStart: 5879, line: 192, utf16Column: 5 },
      },
      authority,
    },
  },
]);
