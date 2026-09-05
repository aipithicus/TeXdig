import type { LatexParseResult } from "../latex/index.js";
import type { ArgumentPattern, ArgumentToken, RegistrySelection } from "../registry/types.js";
import type { ByteSpan, SourceSnapshot } from "../source/index.js";
import type {
  SemanticLicense,
  SemanticAssumption,
  SemanticDiagnostic,
  SemanticStatus,
} from "../evidence/types.js";

export type BindingToken =
  | {
      readonly kind: "character" | "space" | "comment" | "paragraph" | "verbatim";
      readonly span: ByteSpan;
      readonly spelling: string;
    }
  | {
      readonly kind: "command";
      readonly span: ByteSpan;
      readonly spelling: string;
      readonly controlWord: boolean;
    }
  | {
      readonly kind: "group";
      readonly span: ByteSpan;
      readonly contentSpan: ByteSpan;
      readonly children: readonly BindingToken[];
    }
  | {
      readonly kind: "residue";
      readonly span: ByteSpan;
      readonly children?: readonly BindingToken[];
    };

/** A shared sibling sequence plus a window avoids copying suffixes for every invocation. */
export interface LexicalCandidates {
  readonly items: readonly BindingToken[];
  readonly startIndex: number;
  readonly endIndex: number;
  readonly span: ByteSpan;
}

export interface InvocationView {
  readonly id: string;
  readonly snapshot: SourceSnapshot;
  readonly commandSpan: ByteSpan;
  readonly name: string;
  readonly escapeToken: string;
  readonly controlWord: boolean;
  readonly scope: ByteSpan;
  readonly scopeStatus: "complete" | "recovered";
  readonly candidates: LexicalCandidates;
}

export interface BindingSyntax {
  readonly parse: LatexParseResult;
  readonly items: readonly BindingToken[];
  readonly invocations: readonly InvocationView[];
}

interface ArgumentPosition {
  /** Zero-based parameter ordinal; embellishments each occupy one ordinal. */
  readonly ordinal: number;
  readonly patternIndex: number;
}

export type BoundArgument = ArgumentPosition &
  (
    | { readonly kind: "source"; readonly span: ByteSpan; readonly contentSpan: ByteSpan }
    | { readonly kind: "boolean"; readonly value: boolean; readonly span?: ByteSpan }
    | { readonly kind: "absent"; readonly reason: "optional-not-present"; readonly at: ByteSpan }
    | {
        readonly kind: "default";
        readonly value: ArgumentToken;
        readonly reason: "optional-not-present" | "required-delimiter-missing";
        readonly at: ByteSpan;
      }
    | {
        readonly kind: "missing";
        readonly reason: "required-argument" | "closing-delimiter";
        readonly at: ByteSpan;
      }
  );

export interface ArgumentBinding {
  readonly status: SemanticStatus;
  readonly arguments: readonly BoundArgument[];
  /** Speculative progress is retained separately; only resolved results license a hull. */
  readonly examinedSpan: ByteSpan;
  readonly hull?: ByteSpan;
  readonly nextIndex: number;
  readonly diagnostics: readonly SemanticDiagnostic[];
}

export interface BindingOptions {
  readonly providerIds: readonly string[];
  readonly providerVersions?: readonly { readonly providerId: string; readonly date: string }[];
  readonly applicability?: readonly "tikz-body"[];
}

export interface InvocationBinding {
  readonly invocation: InvocationView;
  readonly status: SemanticStatus;
  readonly selection: RegistrySelection;
  readonly license?: SemanticLicense;
  readonly assumptions: readonly SemanticAssumption[];
  readonly pattern?: readonly ArgumentPattern[];
  readonly arguments: readonly BoundArgument[];
  readonly hull?: ByteSpan;
  readonly diagnostics: readonly SemanticDiagnostic[];
}

export interface BindingResult {
  readonly syntax: BindingSyntax;
  readonly invocations: readonly InvocationBinding[];
  readonly diagnostics: readonly SemanticDiagnostic[];
}
