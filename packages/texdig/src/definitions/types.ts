import type {
  BindingOptions,
  BindingSyntax,
  BindingToken,
  InvocationBinding,
  InvocationView,
} from "../binding/types.js";
import type {
  SemanticAssumption,
  SemanticDiagnostic,
  SemanticStatus,
  SourceLocation,
} from "../evidence/types.js";
import type { LatexParseResult } from "../latex/index.js";
import type { ArgumentPattern, DefinitionForm, RegistrySubject } from "../registry/types.js";
import type { ByteSpan } from "../source/index.js";

/** Order and source role are supplied by the caller, never inferred from filenames. */
export interface OrderedSourceUnit {
  readonly id: string;
  readonly role: "entrypoint" | "shipped-class" | "shipped-style";
  readonly parse: LatexParseResult;
}
export interface DefinitionOptions extends Omit<BindingOptions, "providerIds"> {
  readonly providerIds?: readonly string[];
  /** Explicit facts about the initial context, not an inference from catalog absence. */
  readonly knownUndefined?: readonly RegistrySubject[];
}
export interface DefinitionScope {
  readonly unitIndex: number;
  readonly span: ByteSpan;
  readonly global: boolean;
  readonly root: boolean;
}
export interface DocumentDefinition {
  readonly id: string;
  readonly invocation: InvocationView;
  readonly role: "declaration" | "unclassified";
  readonly form?: DefinitionForm;
  readonly subject?: RegistrySubject;
  readonly status: SemanticStatus;
  readonly disposition: "installed" | "skipped" | "rejected" | "deferred" | "indeterminate";
  readonly precondition: {
    readonly required: "undefined" | "defined" | "none";
    readonly observed: "undefined" | "defined" | "unknown";
  };
  readonly scope: DefinitionScope;
  readonly span: ByteSpan;
  readonly header: InvocationBinding;
  readonly pattern?: readonly ArgumentPattern[];
  readonly prefix: readonly BindingToken[];
  readonly parameterText?: SourceLocation;
  readonly body?: SourceLocation;
  readonly endBody?: SourceLocation;
  readonly defaults: readonly { readonly ordinal: number; readonly location: SourceLocation }[];
  readonly aliasOf?: string;
  readonly aliasSubject?: RegistrySubject;
  readonly expansion: "supported" | "unsupported";
  readonly assumptions: readonly SemanticAssumption[];
  readonly diagnostics: readonly SemanticDiagnostic[];
}
export interface ProviderActivation {
  readonly invocation: InvocationView;
  readonly header: InvocationBinding;
  readonly status: SemanticStatus;
  readonly scope: DefinitionScope;
  readonly from: number;
  readonly providerIds: readonly string[];
  readonly diagnostics: readonly SemanticDiagnostic[];
}
export interface ScopedInvocation {
  readonly binding: InvocationBinding;
  readonly role: "invocation" | "declaration" | "unclassified";
  readonly unitIndex: number;
  readonly context: "source" | "argument" | "definition-body" | "indeterminate";
  readonly providerIds: readonly string[];
  readonly definition?: DocumentDefinition;
}
export interface DefinitionAnalysis {
  readonly units: readonly OrderedSourceUnit[];
  readonly syntaxes: readonly BindingSyntax[];
  readonly definitions: readonly DocumentDefinition[];
  readonly activations: readonly ProviderActivation[];
  readonly invocations: readonly ScopedInvocation[];
  readonly assumptions: readonly SemanticAssumption[];
  readonly diagnostics: readonly SemanticDiagnostic[];
}
