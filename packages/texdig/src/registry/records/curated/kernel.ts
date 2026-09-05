/** Curated facts from the cited kernel/class sources, not copied implementation code. */
import { immutableRegistryValue } from "../../catalog.js";
import type { RegistryAssertion } from "../../types.js";
export const CURATED_RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    id: "house:kernel:latex2e:environment:center",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "environment",
      name: "center",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltmiscen.dtx",
        inputDigest: "71df65b4448c0cbcfd3a8fde917feb700cb9889acab7a03750fca5fc193bf0fb",
      },
      location: {
        byteStart: 44120,
        byteEnd: 44164,
        line: 1209,
        utf16Column: 1,
      },
      note: "Environment invocation takes no arguments; begin/end implementations are defined in the kernel. This record does not implement environment binding.",
    },
  },
  {
    id: "house:kernel:latex2e:environment:flushleft",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "environment",
      name: "flushleft",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltmiscen.dtx",
        inputDigest: "71df65b4448c0cbcfd3a8fde917feb700cb9889acab7a03750fca5fc193bf0fb",
      },
      location: {
        byteStart: 47076,
        byteEnd: 47125,
        line: 1303,
        utf16Column: 1,
      },
      note: "Environment invocation takes no arguments; begin/end implementations are defined in the kernel. This record does not implement environment binding.",
    },
  },
  {
    id: "house:kernel:latex2e:environment:flushright",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "environment",
      name: "flushright",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltmiscen.dtx",
        inputDigest: "71df65b4448c0cbcfd3a8fde917feb700cb9889acab7a03750fca5fc193bf0fb",
      },
      location: {
        byteStart: 47519,
        byteEnd: 47568,
        line: 1318,
        utf16Column: 1,
      },
      note: "Environment invocation takes no arguments; begin/end implementations are defined in the kernel. This record does not implement environment binding.",
    },
  },
  {
    id: "house:kernel:latex2e:environment:verbatim",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "environment",
      name: "verbatim",
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
        role: "classification",
        property: "environment",
        value: true,
      },
      {
        role: "content-processing",
        target: "body",
        strategy: "verbatim",
        enabled: true,
        availability: "unimplemented",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltmiscen.dtx",
        inputDigest: "71df65b4448c0cbcfd3a8fde917feb700cb9889acab7a03750fca5fc193bf0fb",
      },
      location: {
        byteStart: 54021,
        byteEnd: 54086,
        line: 1492,
        utf16Column: 1,
      },
      note: "Environment invocation takes no arguments; begin/end implementations are defined in the kernel. This record does not implement environment binding.",
    },
  },
  {
    id: "house:class:article:environment:quotation",
    provider: {
      id: "class:article",
      kind: "class",
      name: "article",
    },
    subject: {
      kind: "environment",
      name: "quotation",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 107089,
        byteEnd: 107115,
        line: 3097,
        utf16Column: 1,
      },
      note: "Standard-class environment; preserve class ownership rather than install it as a kernel fact.",
    },
  },
  {
    id: "house:class:article:environment:quote",
    provider: {
      id: "class:article",
      kind: "class",
      name: "article",
    },
    subject: {
      kind: "environment",
      name: "quote",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 107693,
        byteEnd: 107715,
        line: 3116,
        utf16Column: 1,
      },
      note: "Standard-class environment; preserve class ownership rather than install it as a kernel fact.",
    },
  },
  {
    id: "house:class:article:environment:abstract",
    provider: {
      id: "class:article",
      kind: "class",
      name: "article",
    },
    subject: {
      kind: "environment",
      name: "abstract",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 104984,
        byteEnd: 105013,
        line: 3032,
        utf16Column: 1,
      },
      note: "The article|report source guard excludes book; titlepage variants both take zero arguments.",
    },
  },
  {
    id: "house:class:report:environment:quotation",
    provider: {
      id: "class:report",
      kind: "class",
      name: "report",
    },
    subject: {
      kind: "environment",
      name: "quotation",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 107089,
        byteEnd: 107115,
        line: 3097,
        utf16Column: 1,
      },
      note: "Standard-class environment; preserve class ownership rather than install it as a kernel fact.",
    },
  },
  {
    id: "house:class:report:environment:quote",
    provider: {
      id: "class:report",
      kind: "class",
      name: "report",
    },
    subject: {
      kind: "environment",
      name: "quote",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 107693,
        byteEnd: 107715,
        line: 3116,
        utf16Column: 1,
      },
      note: "Standard-class environment; preserve class ownership rather than install it as a kernel fact.",
    },
  },
  {
    id: "house:class:report:environment:abstract",
    provider: {
      id: "class:report",
      kind: "class",
      name: "report",
    },
    subject: {
      kind: "environment",
      name: "abstract",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 104984,
        byteEnd: 105013,
        line: 3032,
        utf16Column: 1,
      },
      note: "The article|report source guard excludes book; titlepage variants both take zero arguments.",
    },
  },
  {
    id: "house:class:book:environment:quotation",
    provider: {
      id: "class:book",
      kind: "class",
      name: "book",
    },
    subject: {
      kind: "environment",
      name: "quotation",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 107089,
        byteEnd: 107115,
        line: 3097,
        utf16Column: 1,
      },
      note: "Standard-class environment; preserve class ownership rather than install it as a kernel fact.",
    },
  },
  {
    id: "house:class:book:environment:quote",
    provider: {
      id: "class:book",
      kind: "class",
      name: "book",
    },
    subject: {
      kind: "environment",
      name: "quote",
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
        role: "classification",
        property: "environment",
        value: true,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 107693,
        byteEnd: 107715,
        line: 3116,
        utf16Column: 1,
      },
      note: "Standard-class environment; preserve class ownership rather than install it as a kernel fact.",
    },
  },
  {
    id: "house:kernel:latex2e:command:abstract-dispute",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "abstract",
      escapeToken: "\\",
    },
    status: "disputed",
    applicability: "provider-selected",
    facets: [
      {
        role: "argument-language",
        language: "unknown",
        reason: "inherited-kernel-command-signature-disputed",
      },
      {
        role: "documentation",
        text: "The standard article/report sources define abstract as a zero-argument environment. The inherited kernel command signature m is disputed; inspect the selected class environment record.",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/classes.dtx",
        inputDigest: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      },
      location: {
        byteStart: 104984,
        byteEnd: 105013,
        line: 3032,
        utf16Column: 1,
      },
      note: "House adjudication retains the inherited assertion and prevents its signature m from being silently treated as verified kernel knowledge.",
    },
  },
]);
