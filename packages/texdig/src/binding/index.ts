export { bindLatex } from "./bind.js";
export { createBindingSyntax } from "./syntax.js";
export { normalizeArgumentPattern } from "./pattern.js";
export type {
  BindingToken,
  LexicalCandidates,
  InvocationView,
  BindingSyntax,
  BoundArgument,
  ArgumentBinding,
  BindingOptions,
  InvocationBinding,
  BindingResult,
} from "./types.js";
export type {
  SemanticStatus,
  SourceLocation,
  SemanticDiagnostic,
  SemanticAssumption,
  RegistryLicense,
  DefinitionLicense,
  SemanticLicense,
} from "../evidence/types.js";
