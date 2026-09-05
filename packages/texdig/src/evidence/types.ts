import type { RegistryAssertion } from "../registry/types.js";
import type { ByteSpan, SourceSnapshot } from "../source/index.js";

export type SemanticStatus = "resolved" | "ambiguous" | "conflict" | "unknown";

/** A location always carries its original coordinate basis. */
export interface SourceLocation {
  readonly snapshot: SourceSnapshot;
  readonly span: ByteSpan;
}

export interface SemanticDiagnostic {
  readonly code:
    | "unknown-command"
    | "unknown-provider"
    | "registry-conflict"
    | "unresolved-assertion"
    | "unresolved-version"
    | "unmet-applicability"
    | "unavailable-strategy"
    | "missing-argument"
    | "unclosed-delimiter"
    | "paragraph-not-allowed"
    | "syntax-residue"
    | "unsupported-argument-form"
    | "invalid-argument-pattern";
  readonly location: SourceLocation;
  readonly message: string;
}

export interface SemanticAssumption {
  readonly kind: "explicit-providers" | "parent-assertion" | "provider-version" | "applicability";
  readonly detail: string;
}

export interface RegistryLicense {
  readonly kind: "registry";
  readonly assertions: readonly RegistryAssertion[];
}
