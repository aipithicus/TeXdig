import type { SemanticAssumption, SemanticDiagnostic, SemanticStatus } from "../evidence/types.js";
import type { LatexParseResult } from "../latex/index.js";
import type { RegistryCatalog } from "../registry/catalog.js";
import { bindArguments } from "./argspec.js";
import { createBindingSyntax } from "./syntax.js";
import type { BindingOptions, BindingResult, InvocationBinding, InvocationView } from "./types.js";

export function bindInvocation(
  invocation: InvocationView,
  catalog: RegistryCatalog,
  options: BindingOptions,
): InvocationBinding {
  const selection = catalog.select(
    { kind: "command", name: invocation.name, escapeToken: invocation.escapeToken },
    options.providerIds,
  );
  const diagnostics: SemanticDiagnostic[] = [];
  const assumptions: SemanticAssumption[] = [
    Object.freeze({
      kind: "explicit-providers",
      detail: [...new Set(options.providerIds)].sort().join(", "),
    }),
  ];
  let status: SemanticStatus = "resolved";
  function fail(
    code: SemanticDiagnostic["code"],
    message: string,
    result: SemanticStatus = "unknown",
  ): void {
    diagnostics.push(
      Object.freeze({
        code,
        location: Object.freeze({ snapshot: invocation.snapshot, span: invocation.commandSpan }),
        message,
      }),
    );
    status = result;
  }
  if (selection.unknownProviderIds.length > 0)
    fail(
      "unknown-provider",
      `Provider identities are unknown: ${selection.unknownProviderIds.join(", ")}`,
    );
  if (invocation.scopeStatus === "recovered")
    fail("syntax-residue", "The invocation belongs to an unclosed source group.");
  if (selection.effectiveAssertions.length === 0)
    fail("unknown-command", "No selected assertion licenses this command.");
  if (selection.conflicts.length > 0)
    fail(
      "registry-conflict",
      "Selected registry assertions conflict; no insertion-order winner is chosen.",
      "conflict",
    );
  for (const assertion of selection.effectiveAssertions) {
    if (assertion.status === "disputed" || assertion.status === "deferred")
      fail(
        "unresolved-assertion",
        `Assertion ${assertion.id} remains ${assertion.status}.`,
        "conflict",
      );
    if (assertion.status === "parent-asserted")
      assumptions.push(Object.freeze({ kind: "parent-assertion", detail: assertion.id }));
    const condition = assertion.provider.versionCondition;
    if (condition !== undefined) {
      const version = options.providerVersions?.find((v) => v.providerId === assertion.provider.id);
      if (
        condition.kind === "unknown" ||
        version === undefined ||
        !/^\d{4}-\d{2}-\d{2}$/u.test(version.date) ||
        version.date < condition.date
      )
        fail(
          "unresolved-version",
          `Provider version condition is unresolved: ${assertion.provider.id}`,
        );
      else
        assumptions.push(
          Object.freeze({
            kind: "provider-version",
            detail: `${assertion.provider.id}@${version.date}`,
          }),
        );
    }
    if (assertion.applicability !== "provider-selected") {
      if (!options.applicability?.includes(assertion.applicability))
        fail(
          "unmet-applicability",
          `The ${assertion.applicability} condition has not been supplied.`,
        );
      else
        assumptions.push(Object.freeze({ kind: "applicability", detail: assertion.applicability }));
    }
    for (const facet of assertion.facets) {
      if (facet.role === "version-requirement") {
        const version = options.providerVersions?.find(
          (v) => v.providerId === assertion.provider.id,
        );
        if (
          version === undefined ||
          !/^\d{4}-\d{2}-\d{2}$/u.test(version.date) ||
          version.date < facet.sinceDate
        )
          fail(
            "unresolved-version",
            `Assertion ${assertion.id} requires a provider dated ${facet.sinceDate} or later.`,
          );
        else
          assumptions.push(
            Object.freeze({
              kind: "provider-version",
              detail: `${assertion.provider.id}@${version.date}`,
            }),
          );
      }
      if (facet.role === "argument-language" && facet.language !== "argspec")
        fail(
          "unavailable-strategy",
          facet.language === "bounded-strategy"
            ? `Argument strategy ${facet.strategy} is ${facet.availability}.`
            : facet.reason,
        );
    }
  }
  const signature = selection.effectiveAssertions
    .flatMap((a) => a.facets)
    .find((f) => f.role === "signature");
  if (signature === undefined) fail("unavailable-strategy", "No argument pattern is licensed.");
  const binding =
    diagnostics.length === 0 && signature !== undefined
      ? bindArguments(invocation, signature.pattern, {
          classicBrackets: selection.effectiveAssertions.some((a) =>
            a.facets.some(
              (f) =>
                f.role === "summon" ||
                (f.role === "definition-form" &&
                  (f.form.family === "classic-command" || f.form.family === "classic-environment")),
            ),
          ),
        })
      : undefined;
  return Object.freeze({
    invocation,
    selection,
    status: binding?.status ?? status,
    ...(selection.effectiveAssertions.length > 0
      ? { license: Object.freeze({ kind: "registry", assertions: selection.effectiveAssertions }) }
      : {}),
    assumptions: Object.freeze(assumptions),
    ...(signature === undefined ? {} : { pattern: signature.pattern }),
    arguments: binding?.arguments ?? Object.freeze([]),
    ...(binding?.hull === undefined ? {} : { hull: binding.hull }),
    diagnostics: Object.freeze([...diagnostics, ...(binding?.diagnostics ?? [])]),
  });
}

/** Resolve registry knowledge against source without changing any syntax node. */
export function bindLatex(
  parse: LatexParseResult,
  catalog: RegistryCatalog,
  options: BindingOptions,
): BindingResult {
  const syntax = createBindingSyntax(parse);
  const invocations = syntax.invocations.map((invocation) =>
    bindInvocation(invocation, catalog, options),
  );
  return Object.freeze({
    syntax,
    invocations: Object.freeze(invocations),
    diagnostics: Object.freeze(invocations.flatMap((invocation) => invocation.diagnostics)),
  });
}
