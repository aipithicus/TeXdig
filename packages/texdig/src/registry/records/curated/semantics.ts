/** Curated bootstrap facts; independent source authority is retained per assertion. */
import { immutableRegistryValue } from "../../catalog.js";
import type { RegistryAssertion } from "../../types.js";
export const SEMANTIC_RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  {
    id: "house:kernel:latex2e:command:documentclass",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "documentclass",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "o m o",
        pattern: [
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "summon",
        providerKind: "class",
        nameArgument: 1,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltclass.dtx",
        inputDigest: "05232c3c927f65f62ca2c92e721fd70524ad098aa295708a7cbead2f8df64a2f",
      },
      location: {
        byteStart: 2967,
        line: 90,
        byteEnd: 5058,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:usepackage",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "usepackage",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "o m o",
        pattern: [
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "summon",
        providerKind: "package",
        nameArgument: 1,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltclass.dtx",
        inputDigest: "05232c3c927f65f62ca2c92e721fd70524ad098aa295708a7cbead2f8df64a2f",
      },
      location: {
        byteStart: 2967,
        line: 90,
        byteEnd: 5058,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:RequirePackage",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "RequirePackage",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "o m o",
        pattern: [
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "summon",
        providerKind: "package",
        nameArgument: 1,
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltclass.dtx",
        inputDigest: "05232c3c927f65f62ca2c92e721fd70524ad098aa295708a7cbead2f8df64a2f",
      },
      location: {
        byteStart: 10109,
        line: 254,
        byteEnd: 10487,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:begin",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "begin",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "environment-boundary",
        side: "open",
        nameArgument: 0,
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
        byteStart: 27762,
        line: 750,
        byteEnd: 28698,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:end",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "end",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "environment-boundary",
        side: "close",
        nameArgument: 0,
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
        byteStart: 35147,
        line: 938,
        byteEnd: 35844,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:newcommand",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "newcommand",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "s m o o +m",
        pattern: [
          {
            code: "s",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "classic-command",
          operation: "new",
          global: false,
          body: "literal",
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltdefns.dtx",
        inputDigest: "c04db7f93f0962398d856164052ad0229b153220e9cd4956b7ff75aae2625925",
      },
      location: {
        byteStart: 14841,
        line: 491,
        byteEnd: 16295,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:renewcommand",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "renewcommand",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "s m o o +m",
        pattern: [
          {
            code: "s",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "classic-command",
          operation: "renew",
          global: false,
          body: "literal",
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltdefns.dtx",
        inputDigest: "c04db7f93f0962398d856164052ad0229b153220e9cd4956b7ff75aae2625925",
      },
      location: {
        byteStart: 22912,
        byteEnd: 25166,
        line: 722,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:providecommand",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "providecommand",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "s m o o +m",
        pattern: [
          {
            code: "s",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "classic-command",
          operation: "provide",
          global: false,
          body: "literal",
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltdefns.dtx",
        inputDigest: "c04db7f93f0962398d856164052ad0229b153220e9cd4956b7ff75aae2625925",
      },
      location: {
        byteStart: 29568,
        line: 913,
        byteEnd: 30627,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:DeclareRobustCommand",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "DeclareRobustCommand",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "s m o o +m",
        pattern: [
          {
            code: "s",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "classic-command",
          operation: "declare",
          global: false,
          body: "unavailable",
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltdefns.dtx",
        inputDigest: "c04db7f93f0962398d856164052ad0229b153220e9cd4956b7ff75aae2625925",
      },
      location: {
        byteStart: 39185,
        line: 1169,
        byteEnd: 39667,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:newenvironment",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "newenvironment",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "s m o o +m +m",
        pattern: [
          {
            code: "s",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "classic-environment",
          operation: "new",
          global: false,
          body: "literal",
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltdefns.dtx",
        inputDigest: "c04db7f93f0962398d856164052ad0229b153220e9cd4956b7ff75aae2625925",
      },
      location: {
        byteStart: 25466,
        byteEnd: 28874,
        line: 791,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:renewenvironment",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "renewenvironment",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "s m o o +m +m",
        pattern: [
          {
            code: "s",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "classic-environment",
          operation: "renew",
          global: false,
          body: "literal",
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltdefns.dtx",
        inputDigest: "c04db7f93f0962398d856164052ad0229b153220e9cd4956b7ff75aae2625925",
      },
      location: {
        byteStart: 25466,
        byteEnd: 28874,
        line: 791,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:NewDocumentCommand",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "NewDocumentCommand",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "document-command",
          operation: "new",
          global: false,
          body: "literal",
        },
      },
      {
        role: "version-requirement",
        sinceDate: "2020-10-01",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltcmd.dtx",
        inputDigest: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      },
      location: {
        byteStart: 9139,
        line: 192,
        byteEnd: 12213,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:NewDocumentEnvironment",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "NewDocumentEnvironment",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m +m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "document-environment",
          operation: "new",
          global: false,
          body: "literal",
        },
      },
      {
        role: "version-requirement",
        sinceDate: "2020-10-01",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltcmd.dtx",
        inputDigest: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      },
      location: {
        byteStart: 9139,
        line: 192,
        byteEnd: 12213,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:RenewDocumentCommand",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "RenewDocumentCommand",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "document-command",
          operation: "renew",
          global: false,
          body: "literal",
        },
      },
      {
        role: "version-requirement",
        sinceDate: "2020-10-01",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltcmd.dtx",
        inputDigest: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      },
      location: {
        byteStart: 9139,
        line: 192,
        byteEnd: 12213,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:RenewDocumentEnvironment",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "RenewDocumentEnvironment",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m +m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "document-environment",
          operation: "renew",
          global: false,
          body: "literal",
        },
      },
      {
        role: "version-requirement",
        sinceDate: "2020-10-01",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltcmd.dtx",
        inputDigest: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      },
      location: {
        byteStart: 9139,
        line: 192,
        byteEnd: 12213,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:ProvideDocumentCommand",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "ProvideDocumentCommand",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "document-command",
          operation: "provide",
          global: false,
          body: "literal",
        },
      },
      {
        role: "version-requirement",
        sinceDate: "2020-10-01",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltcmd.dtx",
        inputDigest: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      },
      location: {
        byteStart: 9139,
        line: 192,
        byteEnd: 12213,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:ProvideDocumentEnvironment",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "ProvideDocumentEnvironment",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m +m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "document-environment",
          operation: "provide",
          global: false,
          body: "literal",
        },
      },
      {
        role: "version-requirement",
        sinceDate: "2020-10-01",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltcmd.dtx",
        inputDigest: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      },
      location: {
        byteStart: 9139,
        line: 192,
        byteEnd: 12213,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:DeclareDocumentCommand",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "DeclareDocumentCommand",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "document-command",
          operation: "declare",
          global: false,
          body: "literal",
        },
      },
      {
        role: "version-requirement",
        sinceDate: "2020-10-01",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltcmd.dtx",
        inputDigest: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      },
      location: {
        byteStart: 9139,
        line: 192,
        byteEnd: 12213,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:DeclareDocumentEnvironment",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "DeclareDocumentEnvironment",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m +m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "document-environment",
          operation: "declare",
          global: false,
          body: "literal",
        },
      },
      {
        role: "version-requirement",
        sinceDate: "2020-10-01",
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltcmd.dtx",
        inputDigest: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      },
      location: {
        byteStart: 9139,
        line: 192,
        byteEnd: 12213,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:tex:command:def",
    provider: {
      id: "kernel:tex",
      kind: "kernel",
      name: "tex",
    },
    subject: {
      kind: "command",
      name: "def",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "argument-language",
        language: "unknown",
        reason: "requires-definition-reader",
      },
      {
        role: "definition-form",
        form: {
          family: "primitive",
          operation: "declare",
          global: false,
          body: "literal",
        },
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
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:tex:command:gdef",
    provider: {
      id: "kernel:tex",
      kind: "kernel",
      name: "tex",
    },
    subject: {
      kind: "command",
      name: "gdef",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "argument-language",
        language: "unknown",
        reason: "requires-definition-reader",
      },
      {
        role: "definition-form",
        form: {
          family: "primitive",
          operation: "declare",
          global: true,
          body: "literal",
        },
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
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:tex:command:edef",
    provider: {
      id: "kernel:tex",
      kind: "kernel",
      name: "tex",
    },
    subject: {
      kind: "command",
      name: "edef",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "argument-language",
        language: "unknown",
        reason: "requires-definition-reader",
      },
      {
        role: "definition-form",
        form: {
          family: "primitive",
          operation: "declare",
          global: false,
          body: "expanded",
        },
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
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:tex:command:xdef",
    provider: {
      id: "kernel:tex",
      kind: "kernel",
      name: "tex",
    },
    subject: {
      kind: "command",
      name: "xdef",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "argument-language",
        language: "unknown",
        reason: "requires-definition-reader",
      },
      {
        role: "definition-form",
        form: {
          family: "primitive",
          operation: "declare",
          global: true,
          body: "expanded",
        },
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
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:tex:command:let",
    provider: {
      id: "kernel:tex",
      kind: "kernel",
      name: "tex",
    },
    subject: {
      kind: "command",
      name: "let",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "argument-language",
        language: "unknown",
        reason: "requires-definition-reader",
      },
      {
        role: "definition-form",
        form: {
          family: "alias",
          operation: "alias",
          global: false,
          body: "literal",
        },
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
        byteStart: 953618,
        line: 22827,
        byteEnd: 954569,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:kernel:latex2e:command:newtheorem",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    subject: {
      kind: "command",
      name: "newtheorem",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "argument-language",
        language: "unknown",
        reason: "requires-definition-reader",
      },
      {
        role: "definition-form",
        form: {
          family: "declaration",
          operation: "new",
          global: false,
          body: "unavailable",
          target: {
            kind: "environment",
            nameArgument: 0,
          },
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "base/ltthm.dtx",
        inputDigest: "5fac1a0873d8569f100295e62bff6b2ed5bfa506b213c3ee3234fe2784c062da",
      },
      location: {
        byteStart: 1533,
        line: 60,
        byteEnd: 2221,
        utf16Column: 1,
      },
      note: "Language facts only. No implementation code copied; source discovery and bounded execution have separate statuses.",
    },
  },
  {
    id: "house:package:amsopn:command:DeclareMathOperator",
    provider: {
      id: "package:amsopn",
      kind: "package",
      name: "amsopn",
    },
    subject: {
      kind: "command",
      name: "DeclareMathOperator",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "s m m",
        pattern: [
          {
            code: "s",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "declaration",
          operation: "new",
          global: false,
          body: "unavailable",
          target: {
            kind: "command",
            nameArgument: 1,
          },
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/latex2e",
        revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
        license: "LPPL-1.3c-or-later",
        path: "required/amsmath/amsopn.dtx",
        inputDigest: "5d3afcd3828f9a1fe14b8aa7fa43f1cd37e0919057b97e9c95431aa605cd0237",
      },
      location: {
        byteStart: 4358,
        byteEnd: 5207,
        line: 130,
        utf16Column: 1,
      },
      note: "Located constructor declaration. Runtime construction, math behavior, and expansion are unavailable; no implementation code copied.",
    },
  },
  {
    id: "house:package:mathtools:command:DeclarePairedDelimiter",
    provider: {
      id: "package:mathtools",
      kind: "package",
      name: "mathtools",
    },
    subject: {
      kind: "command",
      name: "DeclarePairedDelimiter",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m m m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "declaration",
          operation: "new",
          global: false,
          body: "unavailable",
          target: {
            kind: "command",
            nameArgument: 0,
          },
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/mathtools",
        revision: "23e4b518e825f1afc60985b137c6fc17b870cac9",
        license: "LPPL-1.3c-or-later",
        path: "mathtools.dtx",
        inputDigest: "b279ceb33ca9e9a6bd354d76b12c942b0d86998a8696728beb4d2dd87a8db7f1",
      },
      location: {
        byteStart: 76206,
        byteEnd: 77074,
        line: 1997,
        utf16Column: 1,
      },
      note: "Located constructor declaration. Runtime construction, math behavior, and expansion are unavailable; no implementation code copied.",
    },
  },
  {
    id: "house:package:mathtools:command:DeclarePairedDelimiterX",
    provider: {
      id: "package:mathtools",
      kind: "package",
      name: "mathtools",
    },
    subject: {
      kind: "command",
      name: "DeclarePairedDelimiterX",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m o m m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "declaration",
          operation: "new",
          global: false,
          body: "unavailable",
          target: {
            kind: "command",
            nameArgument: 0,
          },
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/mathtools",
        revision: "23e4b518e825f1afc60985b137c6fc17b870cac9",
        license: "LPPL-1.3c-or-later",
        path: "mathtools.dtx",
        inputDigest: "b279ceb33ca9e9a6bd354d76b12c942b0d86998a8696728beb4d2dd87a8db7f1",
      },
      location: {
        byteStart: 78695,
        byteEnd: 80237,
        line: 2066,
        utf16Column: 1,
      },
      note: "Located constructor declaration. Runtime construction, math behavior, and expansion are unavailable; no implementation code copied.",
    },
  },
  {
    id: "house:package:mathtools:command:DeclarePairedDelimiterXPP",
    provider: {
      id: "package:mathtools",
      kind: "package",
      name: "mathtools",
    },
    subject: {
      kind: "command",
      name: "DeclarePairedDelimiterXPP",
      escapeToken: "\\",
    },
    status: "verified",
    applicability: "provider-selected",
    facets: [
      {
        role: "signature",
        spelling: "m o +m m m +m +m",
        pattern: [
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "o",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "",
          },
          {
            code: "m",
            modifiers: "+",
          },
          {
            code: "m",
            modifiers: "+",
          },
        ],
      },
      {
        role: "argument-language",
        language: "argspec",
      },
      {
        role: "definition-form",
        form: {
          family: "declaration",
          operation: "new",
          global: false,
          body: "unavailable",
          target: {
            kind: "command",
            nameArgument: 0,
          },
        },
      },
    ],
    provenance: {
      custody: "curated",
      authority: {
        kind: "package-source",
        repository: "https://github.com/latex3/mathtools",
        revision: "23e4b518e825f1afc60985b137c6fc17b870cac9",
        license: "LPPL-1.3c-or-later",
        path: "mathtools.dtx",
        inputDigest: "b279ceb33ca9e9a6bd354d76b12c942b0d86998a8696728beb4d2dd87a8db7f1",
      },
      location: {
        byteStart: 84359,
        byteEnd: 84965,
        line: 2211,
        utf16Column: 1,
      },
      note: "Located constructor declaration. Runtime construction, math behavior, and expansion are unavailable; no implementation code copied.",
    },
  },
]);
