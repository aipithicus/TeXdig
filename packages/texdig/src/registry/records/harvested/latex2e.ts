/** GENERATED FILE. DO NOT EDIT. Source custody is pinned by scripts/registry/source-manifest.ts. */
import { immutableRegistryValue } from "../../catalog.js";
import type { Authority, Provider, RegistryAssertion } from "../../types.js";
const provider: Provider = { id: "kernel:latex2e", kind: "kernel", name: "latex2e" };
const authority: Authority = {
  inputDigest: "bc90ee4ee6d23307fcf5ac98f97e71cc9d4ee9a256cabd781e12a12407b113ad",
  kind: "parent-source",
  license: "MIT",
  path: "packages/unified-latex-ctan/package/latex2e/provides.ts",
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
      id: "00ff227e4929960ef83f98220d280d8d30a755fc469b0b8ad374c3b905ccc234",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "indent" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2420, byteStart: 2375, line: 83, utf16Column: 5 },
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
      id: "01531d2e448a2c9aee8c61d80e6172337f64f8f8543939dfa924490a41003078",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "footnotemark" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6033, byteStart: 6001, line: 178, utf16Column: 5 },
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
      id: "018286afd7334a74eeefd6857a30611d58b579aeeb8824a6a973c84361f553d7",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathnormal" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10553, byteStart: 10523, line: 298, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ")" },
              code: "r",
              modifiers: "",
              open: { kind: "token", spelling: "(" },
            },
            {
              close: { kind: "token", spelling: ")" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "(" },
            },
          ],
          role: "signature",
          spelling: "r() d()",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "037145e430fb2352a0c590efb37df88eed97b6b9f9e8ec5b8efaf36c18f865e1",
      status: "parent-asserted",
      subject: { kind: "environment", name: "picture" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13481, byteStart: 13448, line: 368, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "0371a8c3f7a64a109b1c8483605e4346fd2d1aaca81601aa55d034f07bb79f39",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pagebreak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3399, byteStart: 3335, line: 101, utf16Column: 5 },
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
      id: "03df98380bef644a3db53fab2517053df94c25448196f9d187427ec7b1bd33c3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "frame" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4034, byteStart: 3974, line: 120, utf16Column: 5 },
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
      id: "03e103f4b15e23bb358718208120f231c4c285bea7b2cd71adf30ea64fd1d034",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "@ifstar" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11673, byteStart: 11642, line: 325, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "068b9b831b916b93802782aa4d5f39e470d4093090c7842b483ef37967c6696d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "subsection" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8475, byteStart: 8273, line: 241, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "087eb6eaf1dde997c8f30d7807d48c95f58eab71767492afca6b2e7a9181dbd5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "maketitle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6700, byteStart: 6652, line: 194, utf16Column: 5 },
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
      id: "0935050b381238194997bbdb145fd855c92ee82658880ac4a4a5d52dc9dafe52",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "addtolength" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1886, byteStart: 1797, line: 62, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "0afe20ed6589d217f46f8215ed463f7591e2e952527d765200378ba7938e7b1d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "marginpar" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4221, byteStart: 4155, line: 123, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "0fde76a4fa91bee4b8d267f1cf616847c06c1aba6429e6163c7fb6ee15cbdc2c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "smallskip" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2628, byteStart: 2580, line: 88, utf16Column: 5 },
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
      id: "12a6e32b5424379f596bc4a7389df962320ca2bdebffb4f674474ec8c0b893a0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ensuremath" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6516, byteStart: 6452, line: 188, utf16Column: 5 },
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
            { code: "m", modifiers: "+" },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "+" },
            { code: "m", modifiers: "+" },
          ],
          role: "signature",
          spelling: "s +m o +o +m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "12a9927b743904f72ba8ee334e92a7b357b1a21da31968241d7f9fac82eb7826",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "providecommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1147, byteStart: 1046, line: 29, utf16Column: 5 },
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
      id: "12f8eec70b6f7d185cc6cc4bfce5bc737f25b060bf4fdc918becdbb14088cb19",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "addtocounter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1496, byteStart: 1406, line: 45, utf16Column: 5 },
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
      id: "13723579cd9b42327788799fadabf6ae7b87b1c2594cd0aebfda36f20056fe04",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3789, byteStart: 3765, line: 116, utf16Column: 5 },
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
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1604f5c941d0d023544a8fcb30e1f168393a60d3eb8491116785ea1a25fe6c41",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fcolorbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4368, byteStart: 4300, line: 125, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "16e50dd6c375aaa4e3ebcea2e766210ed71d707f3494a0c02eae6f0da7bc35fa",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "texttt" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10121, byteStart: 10062, line: 289, utf16Column: 5 },
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
      id: "170193eb1fab04562a6e14fddc6a24f53f4b905c4366fef21705c9572e17e0de",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "phantom" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2453, byteStart: 2426, line: 84, utf16Column: 5 },
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
      id: "17b0a708cdfc75737a2189debbdfc233da9b7fb21b08a14615b9c65b358dfb74",
      status: "parent-asserted",
      subject: { kind: "environment", name: "filecontents*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13402, byteStart: 13365, line: 366, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["label"],
          pattern: [{ code: "o", modifiers: "" }],
          role: "signature",
          spelling: "o",
        },
        { property: "hanging-indent", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "17b69a823a20b32172c697de94f0177aa75bb9036e74370d6304f0c95175d40d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "item" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5515, byteStart: 5406, line: 163, utf16Column: 5 },
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
      id: "18471cdec54bccba166cd9b57b31b3f94119aa34d47478e29a28c97e23d34049",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "contentsline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12446, byteStart: 12375, line: 341, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "1888de96e278e2113498dbe19eee77f404ab37892764d06cfe65b75961aca62e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "vfill" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2369, byteStart: 2325, line: 82, utf16Column: 5 },
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
      id: "193ef5c44239de9180b9d13c7c13658a27fcb74edb2c5c99daf3b0185760904a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "rotatebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4407, byteStart: 4374, line: 126, utf16Column: 5 },
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
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1a163c9df8322820d0d699e7bc0446a21092282f91569b335c3df4a81b62c8e1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "framebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3968, byteStart: 3901, line: 119, utf16Column: 5 },
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
      id: "1b0727f6c840e6cdc3c073b93f31dbe58766f626ea5b6bc0005e3cb6223943e5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathtt" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10485, byteStart: 10459, line: 296, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "item",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1b6bd18d19bc4a3a473b97e1504fe0fed272dfe6671ab15f86308bf0620a9aae",
      status: "parent-asserted",
      subject: { kind: "environment", name: "itemize" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13114, byteStart: 13051, line: 360, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m o o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1beac3cd2e7d50027f0cf011506408ec9b102ebba17f2d2a73bc45204da3aae8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "savebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3759, byteStart: 3670, line: 112, utf16Column: 5 },
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
      id: "1c82a1ae4e15f84de157425456f22c69635295e6e9dc48d6fa92f39642afa430",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathbf" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10421, byteStart: 10395, line: 294, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "name", "numArgs", "default", "body"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "m", modifiers: "+" },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "+" },
            { code: "m", modifiers: "+" },
          ],
          role: "signature",
          spelling: "s +m o +o +m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "1d095c29952897e4ffbd566c3da5859b39a6ce2cda292e1deda65b2f3fc6005a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "renewcommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1040, byteStart: 841, line: 22, utf16Column: 5 },
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
      id: "1d76be746b765ea45c23688d1c7431ff1ade5e2032b01ef74af1902f05b374b0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "reflectbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4481, byteStart: 4451, line: 128, utf16Column: 5 },
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
      id: "218542e12562ed3ba28422b4394295f2aeb3b05029e5be870efb9637a889daea",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bibliography" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12519, byteStart: 12452, line: 342, utf16Column: 5 },
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
      id: "26a500eae6a0aa7aeb9778a4538ad6e64c52af2ed26b9169b864efd08952869e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "setlength" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12037, byteStart: 11971, line: 335, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "280383ef18415517a83350cf2d394a0e3fe43adb4e398b1c04395d80157c0d62",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "scalebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4445, byteStart: 4413, line: 127, utf16Column: 5 },
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
      id: "288862184f2376f407822b0e352536c82c7923ea38d6a26ea6b96514843bc0a6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hspace" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2250, byteStart: 2222, line: 80, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2905d1e84708192b909a78ba7cfc3ebc39cbbb6f065191638a0081e70f5a1d30",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textsc" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10056, byteStart: 9997, line: 288, utf16Column: 5 },
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
      id: "29a6cfa2f79ac4c5aca83f378ba3c8bd04cc0de1d4f6520a214242d3ac7b7aca",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathring" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11268, byteStart: 11240, line: 316, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "29bf83f072ce13637512899c0bb82a2c7af5c4ac7d3446ded8be3b1ea905b7c8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "smallbreak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2787, byteStart: 2738, line: 91, utf16Column: 5 },
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
      id: "2c18c1629ff1bfa69407d1bfd5a689f1578841521780f4aa7c013678772e7718",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "arabic" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5062, byteStart: 5036, line: 150, utf16Column: 5 },
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
      id: "2c9b46987a481c22f328909ebef452956f7306d9e686514b3b5299629a2d374d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pagenumbering" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7062, byteStart: 6994, line: 202, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m o o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2d4dc7394b11426f05c2eaf155faded059ae4b5570b346c385a12a51f8fb9469",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "raisebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4149, byteStart: 4115, line: 122, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "2e8fc6499a2a8e310446b676c25ff768d23f47a17d2e42d3854a71eff77f0a81",
      status: "parent-asserted",
      subject: { kind: "environment", name: "tabular" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13636, byteStart: 13571, line: 371, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3088e7d0f35b6d1a5aa592c3ff503b5864d785370526fdf3fb3e8a580c75c8b4",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "emph" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10252, byteStart: 10195, line: 291, utf16Column: 5 },
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
      id: "34e40b6ef0e7b3490fe2ec781c3f27cb6dad9662f3a34c972787c420a78bf36f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "Roman" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5124, byteStart: 5099, line: 152, utf16Column: 5 },
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
      id: "34fcd7c024fbe7c69d5cffe9479cc7f59ee95f6c7524e1fe3647c45b3cb643bc",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "dot" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10962, byteStart: 10939, line: 306, utf16Column: 5 },
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
      id: "35bfa5333b181033c8d74c044824b18c79208c3976beb655cba48140afbcdc7b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "settowidth" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2169, byteStart: 2081, line: 74, utf16Column: 5 },
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
      id: "35dd1cae69690668d27faa0fc57fa84a96c3cda229a1716e7edf27bea6bb9c28",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "refstepcounter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1685, byteStart: 1595, line: 53, utf16Column: 5 },
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
      id: "36824793e8190c20b9a6bfb6dff075085422ef07ed4bf5dfbd145774da084aaa",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "multicolumn" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7465, byteStart: 7430, line: 209, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "3a9b245e3eacd0a8fc81997734e944291ea07f6074156c054e7d9c26d7812dcd",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "noindent" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2574, byteStart: 2527, line: 87, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "3c6064a8bbdd96430f31f8b3bd3abf6734b45a0e6860c67ffc1a86960f52f51d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newpage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3253, byteStart: 3207, line: 99, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "3c949d0c1739a4b6480c895526f144d1b72e0076c35c408061de12fc901b6d7d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "nopagecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7424, byteStart: 7374, line: 208, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "3d0e2223c35cd5b4f3c07586f5093cb775b21c5ec22afb95fe5a4fad4b825f4a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "appendix" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9173, byteStart: 9109, line: 273, utf16Column: 5 },
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
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3d7ade7c75cbbb19e2f1100576fd3c33015f229d4a11172895b437e9a0ed302f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "frac" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6410, byteStart: 6350, line: 186, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "3ee93955791fc944113e60deb57410a1175af0573170324eb0e0e18568c5b99a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textnormal" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10321, byteStart: 10258, line: 292, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4622bd51f5ca80a0e34ace8e8282e857983c3ecfb7370925672e333b530dc640",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "nopagebreak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3471, byteStart: 3405, line: 102, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "47e3b9d9bb14316347660087e77ab4a6445431099e057420ae5f36d789ad42af",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "uppercase" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10389, byteStart: 10327, line: 293, utf16Column: 5 },
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
      id: "4ac3ba397e62b9cde19708a2fe57848500dcf70b22df03e18da1bd8e74a13c7c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "addcontentsline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12369, byteStart: 12295, line: 340, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "name", "numArgs", "default", "body"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "m", modifiers: "+" },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "+" },
            { code: "m", modifiers: "+" },
          ],
          role: "signature",
          spelling: "s +m o +o +m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "4b38d42a6fb40a73ae077cdfeca038014f80231eaf134ab1fcf84a9d1e8c895e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newcommand" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 835, byteStart: 638, line: 15, utf16Column: 5 },
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
      id: "4d86addae510fd6b2c53a801c5aa6668812c13ea9e8094c86487030890a7cec0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "@ifundefined" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11760, byteStart: 11722, line: 327, utf16Column: 5 },
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
      id: "5136f1d96a3272a95d7b770d3af9818ed6512eaf31b683ef0500c484076e6e1a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "includegraphics" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7603, byteStart: 7487, line: 211, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "s", modifiers: "" }], role: "signature", spelling: "s" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5303af057a7c4758249d68f95cfa25dfa34b66a816dfd5b139f012c0675d0567",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "enlargethispage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3329, byteStart: 3259, line: 100, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "item",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "537b68ae24ab5f99a4181c198333ab2b1d69b418b4fc046d3f42fdf056d68677",
      status: "parent-asserted",
      subject: { kind: "environment", name: "enumerate" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13045, byteStart: 12916, line: 355, utf16Column: 5 },
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
      id: "53bc63b7b86b5e478980c32a0d4663b37328db275f0dc529178275e440acf6d8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathpalette" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11636, byteStart: 11603, line: 324, utf16Column: 5 },
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
      id: "55bfc7d1cb73bb81c1c3220b0d3022d7e6a2595b1ca0be1507cc9da58ae81784",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newtheorem" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4863, byteStart: 4769, line: 139, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5774d3afe60a743f5870a9f8642e4818c3c66f12ab8bae16e5068b908f539f43",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "linebreak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3015, byteStart: 2951, line: 95, utf16Column: 5 },
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
      id: "57a479e0819fef15a4c169478936397d5d911618968428e90ff044586bd16498",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "definecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7296, byteStart: 7226, line: 206, utf16Column: 5 },
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
      id: "5a4bb2bed141726326d4e81724acc7d3e7cde51909fc756653b196def6346d73",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "settodepth" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1980, byteStart: 1892, line: 66, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m o o m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "5ad5380f1e319629e19bbbf4f5622428d5224b9e5b11220ced3082b469c3b93a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "renewenvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4763, byteStart: 4661, line: 135, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "5ca40d401b731e0f39c64c36c6a8db7468a6e9bb6786d13d1aae34371c0288ec",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bigskip" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2732, byteStart: 2686, line: 90, utf16Column: 5 },
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
      id: "5e333e664f24b291a683bda9d29530f4436e4cdfbd4b5da3476c273a999ed4e3",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newlength" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1791, byteStart: 1706, line: 58, utf16Column: 5 },
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
      id: "5f204e4097faa568e56da4372ce359468e4b2e69df854cc951789b3a9e85766a",
      status: "parent-asserted",
      subject: { escapeToken: "", kind: "command", name: "^" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 430, byteStart: 390, line: 12, utf16Column: 5 },
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
            { code: "s", modifiers: "!" },
            { code: "o", modifiers: "!" },
          ],
          role: "signature",
          spelling: "!s !o",
        },
        { property: "break-after", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6527f038601ea5e85cb355d24f7432c1f65104babd59deb6cc1482dcbbba9d76",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "\\" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 340, byteStart: 278, line: 10, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m m m m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "679b358ddc8259db64bcc2e0760610b88fd8f11e441d89293e48f17bad5aa67e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "DeclareMathAlphabet" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11952, byteStart: 11849, line: 330, utf16Column: 5 },
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
      id: "67c8ca45231d47f24fc0e240a7ad99a79f45b89149d3e8af2624883298e225ad",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "@ifnextchar" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11716, byteStart: 11679, line: 326, utf16Column: 5 },
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
      id: "68706185de2cc7619b8c5290dd20f43bccd910ef8ff915195727d6d62c9654a1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ddot" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10992, byteStart: 10968, line: 307, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "6a558947b39170a5f0117e4d726e9ce96a0fed068c60964bd89adc20d57965d5",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "doublespacing" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6758, byteStart: 6706, line: 195, utf16Column: 5 },
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
      id: "6b2f9d2dcc5e1064741d5d692390de62134e5ecdea9995bd72dfa1723c2f36f6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bibliographystyle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12597, byteStart: 12525, line: 343, utf16Column: 5 },
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
      id: "6b3d926740a1ef1d17407266d15ad1f35baec261bda42bfc1f11ed81567bf39d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "widetilde" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11336, byteStart: 11307, line: 318, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "6ffc1a6e4f6eee84e7ff65dd923dd68084349db342881bc1031bcbb62d35f594",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textbf" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9796, byteStart: 9737, line: 284, utf16Column: 5 },
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
      id: "7091b7fee812a1020dfb5730acded9c8237973b0064ce0e03c14dae4438f2634",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pagestyle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7132, byteStart: 7068, line: 203, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "item",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "71dc142eaf5522f4dd3709799b96450bd678cb103d61cff2a7ffd79d2c2e0371",
      status: "parent-asserted",
      subject: { kind: "environment", name: "description" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12910, byteStart: 12843, line: 354, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "72b220bf6683b2c1113db63d459c942efb52a4b202baef820877e4761abd4dce",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "medbreak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2840, byteStart: 2793, line: 92, utf16Column: 5 },
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
      id: "73859092057f2752972f6b0d360c2b2c02e1ac3ab13cf5f12e65c64d9ef20c9e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathrm" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10618, byteStart: 10592, line: 300, utf16Column: 5 },
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
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "76d2ee0fd0c72a29403f908980cda155c428331a46a579991a1127abc3e9cf64",
      status: "parent-asserted",
      subject: { kind: "environment", name: "tabbing" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13534, byteStart: 13487, line: 369, utf16Column: 5 },
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
      id: "77212fefc3c51d2f302a6759fb6c65fc95eb7ee1af80ac23969b41e2efcac596",
      status: "parent-asserted",
      subject: { kind: "environment", name: "filecontents" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13359, byteStart: 13325, line: 365, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "77303ec09c01f7d16fbe8dddaa06ba77ea36a201c8492ecc30f21141c1cd2f4b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "singlespacing" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6816, byteStart: 6764, line: 196, utf16Column: 5 },
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
      id: "79627aa6d8e24230c7177abc1ba965c469b71158e0317a84116e4dc674ea8518",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3895, byteStart: 3871, line: 118, utf16Column: 5 },
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
      id: "7a0f439227f0ff38b78901d8288a2dd6ad391190a679258758ac43476dc7a18b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "overline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11485, byteStart: 11457, line: 321, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "7eafd5b221ce549745a98f1fd7b22305bd272986af7f7e02ef4a5359bbd4bd7d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "underline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10189, byteStart: 10127, line: 290, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "7f01323c2ad336e1d37c61eec98210c345361cee79327d4c29b7c19cf4b446eb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newline" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2945, byteStart: 2899, line: 94, utf16Column: 5 },
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
            {
              close: { kind: "token", spelling: ")" },
              code: "d",
              modifiers: "",
              open: { kind: "token", spelling: "(" },
            },
            { code: "o", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "d() o o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "80385435ce374786df947b87fb450fc7e818707c071a6ac5619d56a9717b0aeb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "makebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3865, byteStart: 3795, line: 117, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o o o m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "808cff22661fcaea5b26ee93fc698bb0c378cb4ff6c85361279751df3a6d72a4",
      status: "parent-asserted",
      subject: { kind: "environment", name: "minipage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13442, byteStart: 13408, line: 367, utf16Column: 5 },
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
      id: "80d7cdbe9e0b432288b3a45ee96d5c609ee1e479088dda94fe13a620d07df9c9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "Alph" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5030, byteStart: 5006, line: 149, utf16Column: 5 },
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
      id: "828ce173d5ffd8b789a415133823395b324d093b440ec0e24ff49bd6890161ef",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "fnsymbol" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5158, byteStart: 5130, line: 153, utf16Column: 5 },
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
      id: "8373462024b1a07e6dbf7cf85a6cfa4ad38fad9740a31b03167556f439d029ae",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "discretionary" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5889, byteStart: 5852, line: 175, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o o o m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "854c1666b67d01d865854d95429a021c0796bcdeaa9a67139cf3d1c590114a0d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "parbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4109, byteStart: 4040, line: 121, utf16Column: 5 },
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
      id: "855c27eae2b17c232893017352f1d36f6840062b175539e9bfda476c1b55302a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "value" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5546, byteStart: 5521, line: 167, utf16Column: 5 },
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
      id: "85f05d91c07c3ccee6fdcfadfd09aa97b11403d236ef68bc947e608c6e2b8afe",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "stackrel" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6446, byteStart: 6416, line: 187, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "86cc095f2689b1cbe80e7b2d68263beb19ba861baf4cacb95008bc705c936f14",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "pagecolor" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7368, byteStart: 7302, line: 207, utf16Column: 5 },
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
      id: "884a74f1e8a42a6ea7a07f8b595c54f72a56e1561b7a6bfbd06098aa3bbb262b",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "vphantom" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2487, byteStart: 2459, line: 85, utf16Column: 5 },
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
      id: "89967281adfdd88053d80233a5a478e2a8136f6dc1a0347611cb96e1a6e72b00",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "include" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5734, byteStart: 5672, line: 170, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8a7efad97c9952689aaba4498933c9d8809321db393b8da76daf49bdba4e6487",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "section" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8267, byteStart: 8068, line: 233, utf16Column: 5 },
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
      id: "8b35fe358b96bff0fc8aa979b8355111a66c189b8c7f0210fcf760328c25c604",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathit" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10517, byteStart: 10491, line: 297, utf16Column: 5 },
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
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m o o m m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8c226f73d5723c557d60daa359256371e3eb66e596b389dd70b477e7a497471a",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newenvironment" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4655, byteStart: 4555, line: 131, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8de3d8966639f72b901da79a699a90eca605d8c52aeb689342f094066870f391",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "thanks" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6988, byteStart: 6889, line: 198, utf16Column: 5 },
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
      id: "8e6c90a1f891cd3f220c6e11df10402ff4d1a5ffde811baf0dff1cd8c4440521",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "breve" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11172, byteStart: 11147, line: 313, utf16Column: 5 },
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
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "8f4d05da1d2b9e49f08e1a5471e450abd2a65e566a4db0f360f04483e539eead",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "documentclass" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5287, byteStart: 5177, line: 155, utf16Column: 5 },
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
      id: "91481de908da35a3848acadf158a9a6095bc7e2494a96f44bfc9f3e6a661da0d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bar" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11081, byteStart: 11058, line: 310, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "91d0fcce882a5173db25bdf878089cef9ff61f37562d3fd13dcdc72ba886f907",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "clearpage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3141, byteStart: 3093, line: 97, utf16Column: 5 },
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
          enabled: true,
          role: "content-processing",
          strategy: "trim-boundaries",
          target: "body",
        },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "933b302b7d013179c23154a8fdb4a9bbad90404e50c1d38ebaa2b2ae3c248173",
      status: "parent-asserted",
      subject: { kind: "environment", name: "document" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12768, byteStart: 12652, line: 347, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9474dfb1031ae098d99c4a3c9189fd1c48de24123ff2721ac2e6e8ed9a03234d",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "paragraph" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8893, byteStart: 8692, line: 257, utf16Column: 5 },
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
      id: "956f0d8e1707b8fca0e1c26cd74029c1f3810e6828c310ff1021adbed185c2de",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "tilde" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11052, byteStart: 11027, line: 309, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "963ec68f3988cda5f9271745fb5d02456c7846f626cce37ecae01d16cabc0e62",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "subparagraph" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9103, byteStart: 8899, line: 265, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "96c55fac28e8c55d2d2c6f62c9d7ddae81a550a1eca4773667c7138d1b144494",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bigbreak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2893, byteStart: 2846, line: 93, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "974ac19577975523b2993f770897420c3e64be7864bec9b07b88d898f6dacc61",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textrm" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9601, byteStart: 9542, line: 281, utf16Column: 5 },
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
      id: "9767410c758fb107ac50ebc18b8a0d62968293f8dd317697bb57255075122d5f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11021, byteStart: 10998, line: 308, utf16Column: 5 },
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
        { property: "hanging-indent", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "9774a2256f92cae50cc96c5bbaa3941abcc8cd4b266fa779726ad33246ee1863",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "bibitem" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9491, byteStart: 9425, line: 278, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "97c18b3e572654039987a68078e9f413fe2f1c184af414aafca787f7ed7a2d46",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "footnote" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5995, byteStart: 5932, line: 177, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "98b628c6af79510b212e741a35cf4abd965ec84e1ce34067d25c1366e9243a77",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "medskip" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2680, byteStart: 2634, line: 89, utf16Column: 5 },
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
      id: "9919e92ca156625ebfa13af08f5a00fc978dbe1af97c2a9665daa7a70dc90279",
      status: "parent-asserted",
      subject: { kind: "environment", name: "math" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13899, byteStart: 13857, line: 378, utf16Column: 5 },
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
      id: "9a2fd12fab21cc8969d19564bb73622e4da7c86dd48fd411d4d774c067789189",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "roman" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5093, byteStart: 5068, line: 151, utf16Column: 5 },
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
      id: "9a384e7aad543930469b8f97b675bee4759a85ac500b7b70f91afc5251ad3eb1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "input" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5666, byteStart: 5606, line: 169, utf16Column: 5 },
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
      id: "9a747c2e7b11aac4059d0d2f555fdc1ec812a013343586acb7c441b3ed43b531",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "alph" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5000, byteStart: 4976, line: 148, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "9c3e7827748820e96052a10960320342d4ec300ca74aa970e251a5756b6b6dbb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "backmatter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9390, byteStart: 9324, line: 276, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "9d18c3625a8c92382576e2f8ff3dfe958bfdcfa737bf133f6cc7a6de8b541e73",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "cleardoublepage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3201, byteStart: 3147, line: 98, utf16Column: 5 },
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
      id: "9f6c235912608ffd3d851a150136ece2d8ade270ba09e195635b3e044a1a989c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "thispagestyle" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7206, byteStart: 7138, line: 204, utf16Column: 5 },
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
      id: "a324ea71a503c21220625ae6e66fcfac436abbddaa509ce8365f8c14763dd898",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "label" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12101, byteStart: 12074, line: 337, utf16Column: 5 },
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
      id: "a3376cbb9c29b21b97f3d3f88bf1eb572d646ff8d0f5afcb545ea53ede3fbd8b",
      status: "parent-asserted",
      subject: { escapeToken: "", kind: "command", name: "_" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 384, byteStart: 346, line: 11, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "a66e3d195b1fc79dc9c8a582076dbfdaa2428e43fbb8f3c3d93f5147027ace90",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "subsubsection" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8686, byteStart: 8481, line: 249, utf16Column: 5 },
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
      id: "aaeca7466b895368f4ef06c193a9de3db2ae1bbf8db9d92ee03d72360c477b4c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "@firstoftwo" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11801, byteStart: 11766, line: 328, utf16Column: 5 },
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
      id: "ace3bbf6b376b0207bccbee5e39ccba3ca06fdcdfdb6ae74b9a9ea18ae50b614",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newsavebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3576, byteStart: 3490, line: 104, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "ad40e1ae054f4c79fd9829b33786f64a7bc81786138dd42447e6e8e271327fc9",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "printbibliography" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12213, byteStart: 12157, line: 338, utf16Column: 5 },
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
        {
          availability: "checkpoint",
          enabled: true,
          role: "content-processing",
          strategy: "pgfkeys",
          target: "arguments",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "adc1cab24f730b8bd3d22c3576f6d794981290eca260b08eee049edf06c73127",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usepackage" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5400, byteStart: 5293, line: 159, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "item",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b21983d49be6fe000f2d4b75bf518302216385bd88d980290dee177a3ba47759",
      status: "parent-asserted",
      subject: { kind: "environment", name: "trivlist" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13184, byteStart: 13120, line: 361, utf16Column: 5 },
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
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s m m m",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b28962103ee61c9f5ddcc6cd59912727ad41b89d09daef0e5b73bc0e5cf04479",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "resizebox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4522, byteStart: 4487, line: 129, utf16Column: 5 },
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
      id: "b2d4ab13e857b7331af1e7aefd27720324c35c7b30fdf0eab5fcad6e0fae242e",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hphantom" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2521, byteStart: 2493, line: 86, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "b3882e735890ca3bc429247cbc73d375cbc38124da6b47e87d80899fb437db4f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "centering" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5600, byteStart: 5552, line: 168, utf16Column: 5 },
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
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "b483964245cf909363c1c91137ec538be26fe5384d518779e1d6facef93221d2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "vspace" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2319, byteStart: 2256, line: 81, utf16Column: 5 },
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
      id: "b68b59a18713d5916dba1928246a58d16ea196d3ed2eb87bed0051a71557323f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "acute" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11203, byteStart: 11178, line: 314, utf16Column: 5 },
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
      id: "b98ca1b5f0de58ecdb224d2fa04e4928265cc3d25e244bd68f0eac376157fcb5",
      status: "parent-asserted",
      subject: { kind: "environment", name: "figure" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13284, byteStart: 13258, line: 363, utf16Column: 5 },
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
          availability: "unimplemented",
          enabled: true,
          itemCommand: "bibitem",
          role: "content-processing",
          strategy: "bibliography-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "bb7efdce5ad749969126e82c788480631749d84a7f6e3369992cc213e1b842a5",
      status: "parent-asserted",
      subject: { kind: "environment", name: "thebibliography" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13839, byteStart: 13718, line: 373, utf16Column: 5 },
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
      id: "c0b9f3e138df8dd8e8d1361ade2fc244e3db8f624df63b53bb6a22671755ea85",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "usecounter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1306, byteStart: 1263, line: 38, utf16Column: 5 },
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
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c1d718f38e9d1dba9ab3aea3fdb7cc0d749213965b4bcd975bd3c64ce83c4b52",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "colorbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4294, byteStart: 4227, line: 124, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c32c5a0cc850c4d7ab9eb70081201a25df11f7271f6719448fa9115973a09737",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textup" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9861, byteStart: 9802, line: 285, utf16Column: 5 },
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
      id: "c4ac1b2cc19d702185839174f986518435fdfbaf86c15e4cd2f83b06c1c05680",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "stepcounter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1589, byteStart: 1502, line: 49, utf16Column: 5 },
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
      id: "c54c23b69a41d35d5b4b8d45f43b269283684d12bd197940f78df176e86f4529",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "settoheight" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2075, byteStart: 1986, line: 70, utf16Column: 5 },
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
      id: "c6ac710905cf0422da1b1d987b4bd9be8989914c7f73db862e06c9b0a9cd8ce0",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "stretch" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 2216, byteStart: 2189, line: 79, utf16Column: 5 },
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
      id: "c6b882ac0b2078a8b1a81cacfdb9e5148a97acd3ac9f72c5bf12dd8ada347cc1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "widehat" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11301, byteStart: 11274, line: 317, utf16Column: 5 },
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
        { language: "argspec", role: "argument-language" },
      ],
      id: "c6dc2016f4186e483520743e6e0f6537273577bb007bb575682ead4f8c8e6888",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "date" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6883, byteStart: 6822, line: 197, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c8513076e6d3161118bd6e386a979a97b168bc1cba42d831289b865ba6764cc6",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "footnotetext" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6106, byteStart: 6039, line: 179, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["short", "captionText"],
          pattern: [
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "o m",
        },
        { property: "paragraph-mode", role: "classification", value: true },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "c85cfd5f6cd9a63d0fde792678ac0c389671c0788811df47695fca89ceded3d1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "caption" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6257, byteStart: 6112, line: 180, utf16Column: 5 },
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
      id: "c8a7576d0019db6a811ac7a8dcd95d87cb7f745cc78693da47aa2e1733b91bac",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "setcounter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1400, byteStart: 1312, line: 41, utf16Column: 5 },
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
      id: "cc398226b45257a952d3a6bb9e3335f330f22fff67968eb299e4ea977977de75",
      status: "parent-asserted",
      subject: { kind: "environment", name: "figure*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13319, byteStart: 13290, line: 364, utf16Column: 5 },
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
      id: "d003307abbeff354be1e505b02e9c839840fa6836ff7e3b7965b9bb4a0073056",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "ref" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12068, byteStart: 12043, line: 336, utf16Column: 5 },
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
      id: "d1b75265046fe482e74ff6e09beae1b92a2ff28d7a8059610b621326ab82fc04",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "cite" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9523, byteStart: 9497, line: 279, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "o", modifiers: "" }], role: "signature", spelling: "o" },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d1e9332393b1ac99c330a983d8fd4be264cf4f6a907aefd7fdba0dfcbb6bc124",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "nolinebreak" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3087, byteStart: 3021, line: 96, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d3b674827052f864fb92b11783c32d9ce50e200ba01a36537262cf30a0339268",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textsf" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9991, byteStart: 9932, line: 287, utf16Column: 5 },
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
      id: "d4c29024bdf36b4bc611aac9e74be93348bf6d459de5c8f3b8f010d42bf7d5a2",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sbox" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 3664, byteStart: 3582, line: 108, utf16Column: 5 },
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
      id: "d59830fa6654125dad198c84e10f24d90519426ba99412cea6bbf4b89a91cb08",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathcal" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10586, byteStart: 10559, line: 299, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m o",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "d829a7a426ccec43f734bdd35c715e6e262503d9c0c582d5805d2cf857e5d395",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newcounter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 1257, byteStart: 1169, line: 34, utf16Column: 5 },
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
      id: "da8a09ee9ccbd489457c704a51f09333500d86a79b795400a42eab2b75577c07",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "grave" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11234, byteStart: 11209, line: 315, utf16Column: 5 },
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
      id: "db8bcb28d77ac111b612602e385e65f5a504578399bb10472b99d69e7d80e3da",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "newfont" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 4954, byteStart: 4869, line: 143, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "ddd2ea3c627b4ef74c97a3290c49022675c0fc68d383917028483d9de3178b39",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mainmatter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9318, byteStart: 9252, line: 275, utf16Column: 5 },
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
      id: "e14118a18de1358637f1f6a39235f98267eb22b23ca3d836a5fe7dcb9c971166",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "@secondoftwo" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11843, byteStart: 11807, line: 329, utf16Column: 5 },
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
      id: "e5e90ecf563bce1c41b189897065725e433bfed985d85e72eff44253efbfd593",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "includeonly" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5846, byteStart: 5740, line: 171, utf16Column: 5 },
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
          strategy: "alignment",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ebcfb3b5d69a74fcc45d5338a7c4bff641981d762682c87b7dd5fdabb771a531",
      status: "parent-asserted",
      subject: { kind: "environment", name: "array" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12837, byteStart: 12774, line: 353, utf16Column: 5 },
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
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ec4d352c718076df7621abba1526b9d23d8d1f70afe156c69f4237a6b08eb736",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "abstract" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6646, byteStart: 6545, line: 190, utf16Column: 5 },
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
          ],
          role: "signature",
          spelling: "m o m",
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
      id: "ed7434912ec4dd77b614f894f37f47ecb6a670b298b287fd40adf74ffbdb2ce2",
      status: "parent-asserted",
      subject: { kind: "environment", name: "tabular*" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13712, byteStart: 13642, line: 372, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f015f0e00f7b9e631e21cf32ba09b7c968bab6f5db0dfd99ba330e796c140ef8",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textit" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9666, byteStart: 9607, line: 282, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f124eeb16eac04385899cad745621195025ca044bd2916359c83091b62e29255",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "chapter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 8062, byteStart: 7863, line: 225, utf16Column: 5 },
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
      id: "f23c1f0df4914c835fc341260bd509bd61e0f26894b89f5c599b0e34c304733f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "mathsf" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 10453, byteStart: 10427, line: 295, utf16Column: 5 },
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
      id: "f34db2aca7e6d8ed185ee8a1ee0282f455e6d2653a58bc351dd2f50a6048e7ce",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "vec" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11110, byteStart: 11087, line: 311, utf16Column: 5 },
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
      id: "f34eb6b729c076abf542e6cf3a154a0c094214bbcea78f27da3ee46d20668cea",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "hyphenation" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 5926, byteStart: 5895, line: 176, utf16Column: 5 },
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
      id: "f463352a90f6fccb4258709c892141cf2e04326a28a85ef3f1694303ea12ffeb",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "addtocontents" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 12289, byteStart: 12219, line: 339, utf16Column: 5 },
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
      id: "f4d4728104030ba5c20301514dc6e2f59bd1525d37dd62651869d68cf5754a1b",
      status: "parent-asserted",
      subject: { kind: "environment", name: "table" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13565, byteStart: 13540, line: 370, utf16Column: 5 },
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
        {
          availability: "unimplemented",
          enabled: true,
          itemCommand: "item",
          role: "content-processing",
          strategy: "list-items",
          target: "body",
        },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f5140190cc23b0b11f2fbca1d558a041eade679e47d99e35ffc556d001eea5a3",
      status: "parent-asserted",
      subject: { kind: "environment", name: "list" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 13252, byteStart: 13190, line: 362, utf16Column: 5 },
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
      id: "f57da476b2f5fed0915352fe0059ef827c4b3008e5908760063754bed93daee1",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "rule" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7637, byteStart: 7609, line: 215, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "unknown", reason: "signature-not-declared", role: "argument-language" },
      ],
      id: "f6ce701beb29cb5d1bae7b9a0efb972fc0b6563c1999f26588f6e5e4a73ee85c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "frontmatter" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9246, byteStart: 9179, line: 274, utf16Column: 5 },
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
      id: "f72289cdd45e49c5b3bd39155543c197b293ace1b1a73cb0b7062f5f6fbeaf23",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "check" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 11141, byteStart: 11116, line: 312, utf16Column: 5 },
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
        { property: "math-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "f921d3961504b766eaf6a2fa9bcf0363692b7a3f6e88d9aa3b202d33c0876b01",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "sqrt" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 6344, byteStart: 6284, line: 185, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "faaaba82cd97e9f566fc81fb3464f51201760ff075305a0fd1dc47374923a01c",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textmd" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9731, byteStart: 9672, line: 283, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        { pattern: [{ code: "m", modifiers: "" }], role: "signature", spelling: "m" },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "fd79a248bebc5c48e1a33f91b42da2e2d5365270d7143322a91b6f0f704cff5f",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "textsl" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 9926, byteStart: 9867, line: 286, utf16Column: 5 },
      },
      authority,
    },
  },
  {
    ...{
      applicability: "provider-selected",
      facets: [
        {
          namedArguments: ["starred", "tocTitle", "title"],
          pattern: [
            { code: "s", modifiers: "" },
            { code: "o", modifiers: "" },
            { code: "m", modifiers: "" },
          ],
          role: "signature",
          spelling: "s o m",
        },
        { property: "break-around", role: "serialization-hint", value: true },
        { property: "paragraph-mode", role: "classification", value: true },
        { language: "argspec", role: "argument-language" },
      ],
      id: "ff154e68eb854271e9769625119c0fe1f32485ebf9d8ce71eeb5ecdcf8144fba",
      status: "parent-asserted",
      subject: { escapeToken: "\\", kind: "command", name: "part" },
    },
    provider,
    provenance: {
      ...{
        custody: "harvested",
        location: { byteEnd: 7857, byteStart: 7661, line: 217, utf16Column: 5 },
      },
      authority,
    },
  },
]);
