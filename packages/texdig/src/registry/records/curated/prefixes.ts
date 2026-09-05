/** Curated primitive prefix facts consumed by definition scopes. */
import { immutableRegistryValue } from "../../catalog.js";
import type { RegistryAssertion } from "../../types.js";
export const PREFIX_RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    id: "house:kernel:tex:command:global",
    provider: {
      id: "kernel:tex",
      kind: "kernel",
      name: "tex",
    },
    subject: {
      kind: "command",
      name: "global",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "",
        pattern: [],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-prefix",
        flag: "global",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/TeX-Live/texlive-source",
        revision: "bb984049b0b66e1be0370ad161c57db1f09ba585",
        license: "LicenseRef-Knuth-tex-web",
        path: "texk/web2c/tex.web",
        inputDigest: "c62ab513ef167e93f71a23bd34f311e243210afd7c7a0f9b779614b71e398324",
      },
      location: {
        byteStart: 947717,
        line: 22651,
        byteEnd: 948559,
        utf16Column: 1,
      },
      note: "Primitive prefix fact; no implementation code copied.",
    },
  },
  {
    id: "house:kernel:tex:command:long",
    provider: {
      id: "kernel:tex",
      kind: "kernel",
      name: "tex",
    },
    subject: {
      kind: "command",
      name: "long",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "",
        pattern: [],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-prefix",
        flag: "long",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/TeX-Live/texlive-source",
        revision: "bb984049b0b66e1be0370ad161c57db1f09ba585",
        license: "LicenseRef-Knuth-tex-web",
        path: "texk/web2c/tex.web",
        inputDigest: "c62ab513ef167e93f71a23bd34f311e243210afd7c7a0f9b779614b71e398324",
      },
      location: {
        byteStart: 947717,
        line: 22651,
        byteEnd: 948559,
        utf16Column: 1,
      },
      note: "Primitive prefix fact; no implementation code copied.",
    },
  },
  {
    id: "house:kernel:tex:command:outer",
    provider: {
      id: "kernel:tex",
      kind: "kernel",
      name: "tex",
    },
    subject: {
      kind: "command",
      name: "outer",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "",
        pattern: [],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-prefix",
        flag: "outer",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/TeX-Live/texlive-source",
        revision: "bb984049b0b66e1be0370ad161c57db1f09ba585",
        license: "LicenseRef-Knuth-tex-web",
        path: "texk/web2c/tex.web",
        inputDigest: "c62ab513ef167e93f71a23bd34f311e243210afd7c7a0f9b779614b71e398324",
      },
      location: {
        byteStart: 947717,
        line: 22651,
        byteEnd: 948559,
        utf16Column: 1,
      },
      note: "Primitive prefix fact; no implementation code copied.",
    },
  },
]);
