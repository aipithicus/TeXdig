/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "package:nicematrix", kind: "package", name: "nicematrix" };
const authority: Authority = {
  inputDigest: "bd3d0a4d813fe18b9e5e7631ff5a7518ea0624643e743b9696c3ace63f1d02c4",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/nicematrix/provides.ts",
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
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "o m !o",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "44900b002eb353fd234ab86eba20a8ce31fc083143e7cd23affd753b38bc3ab4",
      status: "parent-asserted",
      subject: { kind: "environment", name: "BNiceArray" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1134, byteStart: 1023, line: 38, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "m m o m !o",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5b41e4bd7b95d6af8bf19ae813b380145bb317b8d6c9e1508a2740d5bee87364",
      status: "parent-asserted",
      subject: { kind: "environment", name: "NiceArrayWithDelims" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 667, byteStart: 543, line: 22, utf16Column: 5 },
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
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "o m !o",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7bab4bdeae21ab90a34110e09c4ecbed462249c0e8a6709e867550461afed96a",
      status: "parent-asserted",
      subject: { kind: "environment", name: "NiceTabular" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 419, byteStart: 307, line: 14, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a291442df2e75f3f8d2318c53b5bacd87f89c2c2c0911910a21cc7126454f7ab",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pNiceMatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1595, byteStart: 1487, line: 54, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a60554071501bdebeecbdc59c3b4c75b9378a8308135b0fc16b49438680cb99c",
      status: "parent-asserted",
      subject: { kind: "environment", name: "VNiceMatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2051, byteStart: 1943, line: 70, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "aa7fdf057f42f7f8857a2a24286edbf16337186a1f5d3ee37aadb7d4fd925ba9",
      status: "parent-asserted",
      subject: { kind: "environment", name: "NiceMatrixBlock" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 537, byteStart: 425, line: 18, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "aca48d3fe24f2de9faaab7b5561143ecd71487cb2eba6a109901ebf2584d7d9d",
      status: "parent-asserted",
      subject: { kind: "environment", name: "NiceMatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1481, byteStart: 1374, line: 50, utf16Column: 5 },
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
          strategy: "pgfkeys",
          target: "arguments",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b42b1110dad22036f1c582e5e5400d98dc44b6cc2e04cfd6ad83be6f104f5f4c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "NiceMatrixOptions" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 252, byteStart: 140, line: 7, utf16Column: 5 },
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
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "o m !o",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c32c6c733fc5f6bd5c84dab271a7dfe101bfc08438603459c225bcf86a184b18",
      status: "parent-asserted",
      subject: { kind: "environment", name: "NiceArray" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 783, byteStart: 673, line: 26, utf16Column: 5 },
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
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "o m !o",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c60b73e2d6ceed07c529462055adb952c04dd26d44f303d08b92ded8479dc9c0",
      status: "parent-asserted",
      subject: { kind: "environment", name: "bNiceArray" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1017, byteStart: 906, line: 34, utf16Column: 5 },
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
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "o m !o",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c9a647942d00a3933049aecd6abd841e64e9d5024d4675c257fc224f98bd3ac9",
      status: "parent-asserted",
      subject: { kind: "environment", name: "vNiceArray" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1251, byteStart: 1140, line: 42, utf16Column: 5 },
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
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "o m !o",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e217a9f22f670ffd38ed6cf121d26e85b4605d62ef3182a605006495cfe475d7",
      status: "parent-asserted",
      subject: { kind: "environment", name: "pNiceArray" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 900, byteStart: 789, line: 30, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "e9f88c9a6949d6f4b71bbd5cd174bb7e4a3e4842bcc2a1a3f5b6ff6e944ce03b",
      status: "parent-asserted",
      subject: { kind: "environment", name: "vNiceMatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1937, byteStart: 1829, line: 66, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "eb1e4848b1b20f13a2abfaa42ba7cf15fc768cb6fa04c67bc40a29ec76aa7050",
      status: "parent-asserted",
      subject: { kind: "environment", name: "BNiceMatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1823, byteStart: 1715, line: 62, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "!" }], role: "signature", spelling: "!o" },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f2b8ae5563d0ef2f6bdd56d0f2af3afd4f0679aa5e7291dea357cf1fcb123855",
      status: "parent-asserted",
      subject: { kind: "environment", name: "bNiceMatrix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1709, byteStart: 1601, line: 58, utf16Column: 5 },
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
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "o m !o",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f5599f43c226e3012e825c293ada7338028b24a672f13d78fe0ac051301c2e97",
      status: "parent-asserted",
      subject: { kind: "environment", name: "VNiceArray" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1368, byteStart: 1257, line: 46, utf16Column: 5 },
      },
      authority,
    },
  },
]);
