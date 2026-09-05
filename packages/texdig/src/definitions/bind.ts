import { bindArguments } from "../binding/argspec.js";
import { bindInvocation } from "../binding/bind.js";
import type { BindingOptions, InvocationBinding, InvocationView } from "../binding/types.js";
import type { RegistryCatalog } from "../registry/catalog.js";
import type { RegistrySubject } from "../registry/types.js";
import { byteSpan } from "../source/index.js";
import type { DefinitionScope, DocumentDefinition } from "./types.js";
import { diagnostic } from "./read.js";

export function sameSubject(left: RegistrySubject, right: RegistrySubject): boolean {
  return (
    left.kind === right.kind &&
    left.name === right.name &&
    (left.kind !== "command" ||
      (right.kind === "command" && left.escapeToken === right.escapeToken))
  );
}
export function scopeContains(
  scope: DefinitionScope,
  from: number,
  unitIndex: number,
  at: number,
): boolean {
  if (unitIndex < scope.unitIndex || (unitIndex === scope.unitIndex && at < from)) return false;
  if (scope.global || scope.root) return true;
  return unitIndex === scope.unitIndex && scope.span.start <= at && at < scope.span.end;
}
export function selectDefinition(
  definitions: readonly DocumentDefinition[],
  subject: RegistrySubject,
  unitIndex: number,
  at: number,
): DocumentDefinition | undefined {
  for (let i = definitions.length - 1; i >= 0; i--) {
    const definition = definitions[i];
    if (
      definition?.subject !== undefined &&
      sameSubject(definition.subject, subject) &&
      definition.disposition !== "rejected" &&
      definition.disposition !== "skipped" &&
      definition.disposition !== "deferred" &&
      scopeContains(definition.scope, definition.span.end, unitIndex, at)
    )
      return definition;
  }
  return undefined;
}

/** Document authority supersedes registry knowledge while preserving the lower selection. */
export function bindDefinition(
  invocation: InvocationView,
  definition: DocumentDefinition,
  catalog: RegistryCatalog,
  options: BindingOptions,
): InvocationBinding {
  const fallback = bindInvocation(invocation, catalog, options);
  const base = {
    invocation,
    selection: fallback.selection,
    license: Object.freeze({
      kind: "definition",
      definitionId: definition.id,
      declaration: Object.freeze({
        snapshot: definition.invocation.snapshot,
        span: definition.span,
      }),
    }),
    assumptions: definition.assumptions,
  };
  // Only definite installation and a recoverable signature license source consumption.
  if (
    definition.disposition !== "installed" ||
    definition.status !== "resolved" ||
    definition.pattern === undefined ||
    invocation.scopeStatus !== "complete"
  ) {
    return Object.freeze({
      ...base,
      status: definition.status === "conflict" ? "conflict" : "unknown",
      arguments: Object.freeze([]),
      diagnostics: Object.freeze([
        diagnostic(
          invocation,
          "unsupported-definition",
          "The visible document definition does not license a complete signature.",
        ),
      ]),
    });
  }
  const items = invocation.candidates.items;
  let start = invocation.candidates.startIndex;
  if (invocation.controlWord)
    while (items[start]?.kind === "space" || items[start]?.kind === "comment") start++;
  for (const token of definition.prefix) {
    const actual = items[start];
    if (
      !("spelling" in token) ||
      actual === undefined ||
      !("spelling" in actual) ||
      token.kind !== actual.kind ||
      token.spelling !== actual.spelling
    ) {
      return Object.freeze({
        ...base,
        status: "conflict",
        arguments: Object.freeze([]),
        diagnostics: Object.freeze([
          diagnostic(
            invocation,
            "missing-argument",
            "The primitive macro's literal parameter prefix does not match.",
          ),
        ]),
      });
    }
    start++;
  }
  const view: InvocationView =
    definition.prefix.length === 0
      ? invocation
      : Object.freeze({
          ...invocation,
          controlWord: false,
          candidates: Object.freeze({ ...invocation.candidates, startIndex: start }),
        });
  const bound = bindArguments(view, definition.pattern, {
    classicBrackets:
      definition.form?.family === "classic-command" ||
      definition.form?.family === "classic-environment",
    preserveUntilSpaces: definition.form?.family === "primitive",
  });
  return Object.freeze({
    ...base,
    status: bound.status,
    pattern: definition.pattern,
    arguments: bound.arguments,
    ...(bound.hull === undefined
      ? {}
      : {
          hull: byteSpan(
            bound.hull.start,
            Math.max(bound.hull.end, items[start - 1]?.span.end ?? bound.hull.end),
          ),
        }),
    diagnostics: bound.diagnostics,
  });
}
