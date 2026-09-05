/** Registry knowledge is independent of document activation and binding. */
export interface Provider {
  readonly id: string;
  readonly kind: "kernel" | "class" | "package";
  readonly name: string;
  /** Unknown is not an unrestricted version claim. Selection does not evaluate versions. */
  readonly versionCondition?:
    | { readonly kind: "unknown" }
    | {
        readonly kind: "since-date";
        readonly date: string;
      };
}

export type RegistrySubject =
  | { readonly kind: "command"; readonly name: string; readonly escapeToken: string }
  | { readonly kind: "environment"; readonly name: string };

export type AssertionStatus = "verified" | "parent-asserted" | "disputed" | "deferred";
export type CapabilityStatus = "supported" | "unsupported" | "partial" | "unknown";

export interface Authority {
  readonly kind: "package-source" | "documentation" | "parent-source" | "synthetic";
  readonly repository: string;
  readonly revision: string;
  readonly license: string;
  readonly path: string;
  readonly inputDigest: string;
}

/** Half-open UTF-8 byte offsets; line and UTF-16 column are one-based display coordinates. */
export interface AuthorityLocation {
  readonly byteStart: number;
  readonly byteEnd: number;
  readonly line: number;
  readonly utf16Column: number;
}

export interface RegistryProvenance {
  readonly custody: "curated" | "harvested";
  readonly authority: Authority;
  readonly location: AuthorityLocation;
  readonly note?: string;
}

/** Group braces, nesting and control-sequence spelling remain exact. */
export type ArgumentToken =
  | { readonly kind: "token"; readonly spelling: string }
  | {
      readonly kind: "group";
      readonly spelling: string;
      readonly children: readonly ArgumentToken[];
    };

interface ArgumentModifiers {
  readonly modifiers: string;
}
export type ArgumentPattern = ArgumentModifiers &
  (
    | { readonly code: "m" | "b" | "s" | "o" }
    | { readonly code: "v"; readonly delimiter: ArgumentToken }
    | { readonly code: "t"; readonly token: ArgumentToken }
    | { readonly code: "u"; readonly stop: ArgumentToken }
    | { readonly code: "O"; readonly defaultValue: ArgumentToken }
    | { readonly code: "d" | "r"; readonly open: ArgumentToken; readonly close: ArgumentToken }
    | {
        readonly code: "D" | "R";
        readonly open: ArgumentToken;
        readonly close: ArgumentToken;
        readonly defaultValue: ArgumentToken;
      }
    | { readonly code: "e"; readonly tokens: ArgumentToken }
    | { readonly code: "E"; readonly tokens: ArgumentToken; readonly defaults: ArgumentToken }
  );

export type ArgumentStrategy = "listings-inline" | "minted-inline" | "tikz-command";
export type ContentStrategy =
  | "alignment"
  | "pgfkeys"
  | "verbatim"
  | "tikz"
  | "systeme"
  | "trim-boundaries"
  | "list-items"
  | "bibliography-items"
  | "tikz-conditional-arguments";

export type RegistryFacet =
  | {
      readonly role: "signature";
      readonly spelling: string;
      readonly pattern: readonly ArgumentPattern[];
      readonly namedArguments?: readonly (string | null)[];
    }
  | { readonly role: "argument-language"; readonly language: "argspec" }
  | {
      readonly role: "argument-language";
      readonly language: "bounded-strategy";
      readonly strategy: ArgumentStrategy;
      readonly availability: "unimplemented";
    }
  | { readonly role: "argument-language"; readonly language: "unknown"; readonly reason: string }
  | {
      readonly role: "content-processing";
      readonly target: "body" | "arguments";
      readonly strategy: ContentStrategy;
      readonly enabled: boolean;
      readonly availability: "checkpoint" | "unimplemented";
      readonly itemCommand?: string;
    }
  | {
      readonly role: "classification";
      readonly property:
        "math-mode" | "paragraph-mode" | "tikz-path" | "declaration" | "summon" | "environment";
      readonly value: string | boolean;
    }
  | {
      readonly role: "serialization-hint";
      readonly property: "break-after" | "break-before" | "break-around" | "hanging-indent";
      readonly value: boolean;
    }
  | { readonly role: "documentation"; readonly text: string }
  | {
      readonly role: "target-capability";
      readonly target: string;
      readonly version: string;
      readonly status: CapabilityStatus;
    }
  | { readonly role: "provider-advice"; readonly replacementProviderId: string };

export interface RegistryAssertion {
  readonly id: string;
  readonly provider: Provider;
  readonly subject: RegistrySubject;
  readonly status: AssertionStatus;
  /** Conditional parent tables remain conditional; the catalog does not infer source scope. */
  readonly applicability: "provider-selected" | "tikz-body";
  readonly facets: readonly RegistryFacet[];
  readonly provenance: RegistryProvenance;
}

export interface RegistryConflict {
  readonly kind: "facet-disagreement" | "unresolved-assertion";
  readonly assertionIds: readonly string[];
  readonly facet: string;
}

export interface RegistrySelection {
  readonly status: "unknown" | "single" | "compatible" | "conflict";
  readonly assertions: readonly RegistryAssertion[];
  readonly effectiveAssertions: readonly RegistryAssertion[];
  readonly shadowedAssertions: readonly RegistryAssertion[];
  readonly unknownProviderIds: readonly string[];
  readonly conflicts: readonly RegistryConflict[];
}
