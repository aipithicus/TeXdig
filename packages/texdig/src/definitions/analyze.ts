import { bindInvocation } from "../binding/bind.js";
import { createBindingSyntax } from "../binding/syntax.js";
import type { BindingOptions, InvocationBinding } from "../binding/types.js";
import type { SemanticAssumption, SemanticStatus } from "../evidence/types.js";
import { immutableRegistryValue, type RegistryCatalog } from "../registry/catalog.js";
import type { RegistrySubject } from "../registry/types.js";
import { byteSpan, type ByteSpan } from "../source/index.js";
import { bindDefinition, sameSubject, scopeContains, selectDefinition } from "./bind.js";
import { diagnostic, readDefinition, sourceArgument, textAt } from "./read.js";
import type {
  DefinitionAnalysis,
  DefinitionOptions,
  DefinitionScope,
  DocumentDefinition,
  OrderedSourceUnit,
  ProviderActivation,
  ScopedInvocation,
} from "./types.js";

// A spelling candidate is explicitly unclassified unless registry authority supplies a form.
const candidateName =
  /^(?:(?:new|renew|provide)[a-zA-Z@]+|Declare[a-zA-Z@]+|(?:New|Renew|Provide|Declare)(?:Expandable)?Document(?:Command|Environment)|(?:e|g|x)?def|let)$/u;
const ordinaryNames = new Set(["newpage", "newline", "newblock", "newgeometry", "newlabel"]);

/** A bounded literal-source pass. It does not execute arbitrary macros or discover input edges. */
export function analyzeDefinitions(
  units: readonly OrderedSourceUnit[],
  catalog: RegistryCatalog,
  options: DefinitionOptions = {},
): DefinitionAnalysis {
  if (new Set(units.map((u) => u.id)).size !== units.length)
    throw new Error("Ordered source unit IDs must be unique.");
  const syntaxes = units.map((u) => createBindingSyntax(u.parse));
  const definitions: DocumentDefinition[] = [];
  const activations: ProviderActivation[] = [];
  const invocations: ScopedInvocation[] = [];
  const assumptions: SemanticAssumption[] = [
    Object.freeze({
      kind: "ordered-source-units",
      detail:
        "Caller-supplied source order and roles; literal source analysis does not establish execution, includes, or package runtime behavior.",
    }),
  ];
  const initialProviders = options.providerIds ?? ["kernel:tex", "kernel:latex2e"];
  const bindingOptions = (providerIds: readonly string[]): BindingOptions => ({
    providerIds,
    ...(options.providerVersions === undefined
      ? {}
      : { providerVersions: options.providerVersions }),
    ...(options.applicability === undefined ? {} : { applicability: options.applicability }),
  });
  function observed(
    subject: RegistrySubject,
    unitIndex: number,
    at: number,
    providerIds: readonly string[],
  ): "defined" | "undefined" | "unknown" {
    const visible = selectDefinition(definitions, subject, unitIndex, at);
    if (visible !== undefined)
      return visible.disposition === "installed" && visible.status === "resolved"
        ? "defined"
        : "unknown";
    const selected = catalog.select(subject, providerIds);
    if (
      selected.unknownProviderIds.length === 0 &&
      selected.conflicts.length === 0 &&
      selected.effectiveAssertions.length > 0 &&
      selected.effectiveAssertions.every(
        (a) =>
          a.status === "verified" &&
          a.provider.versionCondition === undefined &&
          a.applicability === "provider-selected" &&
          a.facets.every(
            (f) =>
              f.role !== "version-requirement" ||
              options.providerVersions?.some(
                (v) => v.providerId === a.provider.id && v.date >= f.sinceDate,
              ) === true,
          ),
      )
    )
      return "defined";
    if (options.knownUndefined?.some((s) => sameSubject(s, subject))) return "undefined";
    return "unknown";
  }
  for (const [unitIndex, syntax] of syntaxes.entries()) {
    const regions: { span: ByteSpan; context: ScopedInvocation["context"] }[] = [];
    const uncertainScopes: ByteSpan[] = [];
    for (const lexicalInvocation of syntax.invocations) {
      const at = lexicalInvocation.commandSpan.start;
      const region = regions.find((r) => r.span.start <= at && at < r.span.end);
      let invocation = lexicalInvocation;
      if (region !== undefined) {
        const candidates = lexicalInvocation.candidates;
        let endIndex = candidates.startIndex;
        while (
          endIndex < candidates.endIndex &&
          (candidates.items[endIndex]?.span.end ?? Infinity) <= region.span.end
        )
          endIndex++;
        invocation = Object.freeze({
          ...lexicalInvocation,
          candidates: Object.freeze({
            ...candidates,
            endIndex,
            span: byteSpan(
              candidates.span.start,
              Math.max(candidates.span.start, Math.min(candidates.span.end, region.span.end)),
            ),
          }),
        });
      }
      const context: ScopedInvocation["context"] =
        region?.context ??
        (uncertainScopes.some((s) => s.start <= at && at < s.end) ? "indeterminate" : "source");
      const providerIds = Object.freeze([
        ...new Set([
          ...initialProviders,
          ...activations
            .filter((a) => a.status === "resolved" && scopeContains(a.scope, a.from, unitIndex, at))
            .flatMap((a) => a.providerIds),
        ]),
      ]);
      const activeOptions = bindingOptions(providerIds);
      const subject: RegistrySubject = {
        kind: "command",
        name: invocation.name,
        escapeToken: invocation.escapeToken,
      };
      const visible = selectDefinition(definitions, subject, unitIndex, at);
      const candidateBinding =
        visible === undefined
          ? bindInvocation(invocation, catalog, activeOptions)
          : bindDefinition(invocation, visible, catalog, activeOptions);
      const binding: InvocationBinding =
        context !== "indeterminate"
          ? candidateBinding
          : Object.freeze({
              invocation,
              selection: candidateBinding.selection,
              status: "unknown",
              ...(candidateBinding.license === undefined
                ? {}
                : { license: candidateBinding.license }),
              assumptions: candidateBinding.assumptions,
              ...(candidateBinding.pattern === undefined
                ? {}
                : { pattern: candidateBinding.pattern }),
              arguments: Object.freeze([]),
              diagnostics: Object.freeze([
                ...candidateBinding.diagnostics,
                diagnostic(
                  invocation,
                  "indeterminate-source-context",
                  "Earlier source control leaves this interpretation indeterminate.",
                ),
              ]),
            });
      const facets = binding.selection.effectiveAssertions.flatMap((a) => a.facets);
      const form =
        visible === undefined ? facets.find((f) => f.role === "definition-form")?.form : undefined;
      const summon = visible === undefined ? facets.find((f) => f.role === "summon") : undefined;
      invocations.push(
        Object.freeze({
          binding,
          role:
            form !== undefined
              ? "declaration"
              : candidateName.test(invocation.name) && !ordinaryNames.has(invocation.name)
                ? "unclassified"
                : "invocation",
          unitIndex,
          context,
          providerIds,
          ...(visible === undefined ? {} : { definition: visible }),
        }),
      );
      const scope: DefinitionScope = Object.freeze({
        unitIndex,
        span: invocation.scope,
        global: form?.global ?? false,
        root:
          invocation.scope.start === syntax.parse.tree.span.start &&
          invocation.scope.end === syntax.parse.tree.span.end,
      });
      if (summon !== undefined) {
        const diagnostics = [...binding.diagnostics];
        const names = sourceArgument(binding.arguments[summon.nameArgument], invocation);
        const raw = names === undefined ? undefined : textAt(invocation, names.span);
        const literals = raw?.split(",").map((s) => s.trim());
        const ids = literals?.every((n) => /^[a-zA-Z0-9._-]+$/u.test(n))
          ? literals.map((name) => `${summon.providerKind}:${name}`)
          : undefined;
        if (ids === undefined || (summon.providerKind === "class" && ids.length !== 1))
          diagnostics.push(
            diagnostic(
              invocation,
              "dynamic-provider-name",
              "A summon requires literal provider names; macro-computed names are not evaluated.",
            ),
          );
        if (context !== "source")
          diagnostics.push(
            diagnostic(
              invocation,
              "indeterminate-source-context",
              "This summon is inside an unevaluated or uncertain source context.",
            ),
          );
        for (const providerGroup of ids === undefined ? [[]] : ids.map((id) => [id])) {
          const providerDiagnostics = [...diagnostics];
          for (const id of providerGroup)
            if (!catalog.providers.some((p) => p.id === id))
              providerDiagnostics.push(
                diagnostic(
                  invocation,
                  "unknown-provider",
                  `Summoned provider knowledge is unavailable: ${id}`,
                ),
              );
          activations.push(
            Object.freeze({
              invocation,
              header: binding,
              status: providerDiagnostics.length === 0 ? "resolved" : "unknown",
              scope,
              from: binding.hull?.end ?? invocation.commandSpan.end,
              providerIds: Object.freeze(providerGroup),
              diagnostics: Object.freeze(providerDiagnostics),
            }),
          );
        }
      }
      if (
        form !== undefined ||
        (candidateName.test(invocation.name) && !ordinaryNames.has(invocation.name))
      ) {
        const read =
          form === undefined
            ? {
                span: binding.hull ?? invocation.commandSpan,
                prefix: Object.freeze([]),
                defaults: Object.freeze([]),
                diagnostics: [
                  diagnostic(
                    invocation,
                    "unclassified-declaration-candidate",
                    "Spelling suggests a declaration candidate, but no selected assertion licenses a definition form.",
                  ),
                ],
              }
            : readDefinition(binding, form);
        const diagnostics = [...read.diagnostics];
        const declarationAssumptions = [...assumptions, ...binding.assumptions];
        const declared = "subject" in read ? read.subject : undefined;
        const current =
          declared === undefined ? "unknown" : observed(declared, unitIndex, at, providerIds);
        const required =
          form?.operation === "new"
            ? "undefined"
            : form?.operation === "renew"
              ? "defined"
              : "none";
        let status: SemanticStatus = diagnostics.length === 0 ? "resolved" : "unknown";
        let disposition: DocumentDefinition["disposition"] = "installed";
        if (diagnostics.some((d) => d.code === "definition-precondition")) {
          status = "conflict";
          disposition = "rejected";
        }
        if (context !== "source") {
          status = "unknown";
          diagnostics.push(
            diagnostic(
              invocation,
              "indeterminate-source-context",
              "A declaration inside an unevaluated body or uncertain scope is retained without installation.",
            ),
          );
        }
        if (
          form !== undefined &&
          form.family !== "primitive" &&
          form.family !== "alias" &&
          binding.status !== "resolved"
        ) {
          status = binding.status;
          diagnostics.push(...binding.diagnostics);
        }
        if (binding.selection.conflicts.length > 0 || invocation.scopeStatus !== "complete") {
          status = "unknown";
          diagnostics.push(
            diagnostic(
              invocation,
              "indeterminate-source-context",
              "The declaration's registry selection or enclosing source scope is unresolved.",
            ),
          );
        }
        if (
          binding.diagnostics.some((d) =>
            [
              "unknown-provider",
              "unmet-applicability",
              "unresolved-version",
              "unresolved-assertion",
            ].includes(d.code),
          )
        ) {
          status = "unknown";
          diagnostics.push(...binding.diagnostics.filter((d) => d.code !== "unavailable-strategy"));
        }
        if (form?.operation === "provide" && current === "defined") disposition = "skipped";
        else if (required !== "none" && current !== "unknown" && current !== required) {
          status = "conflict";
          disposition = "rejected";
          diagnostics.push(
            diagnostic(
              invocation,
              "definition-precondition",
              `Declaration requires ${required}, but the name is ${current}.`,
            ),
          );
        } else if (
          (required !== "none" || form?.operation === "provide") &&
          current === "unknown"
        ) {
          status = "unknown";
          diagnostics.push(
            diagnostic(
              invocation,
              "definition-precondition",
              "The required initial definition state is unknown; registry absence is not undefinedness.",
            ),
          );
        }
        if (current === "undefined")
          declarationAssumptions.push(
            Object.freeze({
              kind: "known-undefined",
              detail: `Caller-supplied initial fact for ${declared?.name ?? invocation.name}`,
            }),
          );
        const aliasSubject = "aliasSubject" in read ? read.aliasSubject : undefined;
        const alias =
          aliasSubject === undefined
            ? undefined
            : selectDefinition(definitions, aliasSubject, unitIndex, at);
        if (
          aliasSubject !== undefined &&
          (alias?.disposition !== "installed" || alias.status !== "resolved")
        ) {
          status = "unknown";
          diagnostics.push(
            diagnostic(
              invocation,
              "unsupported-definition",
              "The alias target has no resolved document meaning at assignment time.",
            ),
          );
        }
        if (status !== "resolved" && disposition === "installed") disposition = "indeterminate";
        if (context === "argument" || context === "definition-body") disposition = "deferred";
        const prefixes = invocation.candidates.items.slice(0, invocation.candidates.startIndex - 1);
        const flags: string[] = [];
        for (let i = prefixes.length - 1; i >= 0; i--) {
          const t = prefixes[i];
          if (t?.kind === "space" || t?.kind === "comment") continue;
          if (t?.kind !== "command") break;
          const previous = invocations.findLast(
            (i) =>
              i.binding.invocation.snapshot === invocation.snapshot &&
              i.binding.invocation.commandSpan.start === t.span.start,
          )?.binding;
          const flag =
            previous?.status === "resolved" && previous.license?.kind === "registry"
              ? previous.selection.effectiveAssertions
                  .flatMap((a) => a.facets)
                  .find((f) => f.role === "definition-prefix")?.flag
              : undefined;
          if (flag === undefined) break;
          flags.push(flag);
        }
        if (
          flags.length > 0 &&
          form?.family !== "primitive" &&
          (form?.family !== "alias" || flags.some((f) => f !== "global"))
        ) {
          status = "unknown";
          if (disposition === "installed") disposition = "indeterminate";
          diagnostics.push(
            diagnostic(
              invocation,
              "unsupported-definition",
              "These prefixes require a definition form that supports them.",
            ),
          );
        }
        const readPattern = "pattern" in read ? read.pattern : undefined;
        const pattern = alias?.pattern ?? readPattern;
        const body = alias?.body ?? ("body" in read ? read.body : undefined);
        const endBody = "endBody" in read ? read.endBody : undefined;
        const parameterText = "parameterText" in read ? read.parameterText : undefined;
        const definition: DocumentDefinition = Object.freeze({
          id: `definition:${invocation.id}`,
          invocation,
          role: form === undefined ? "unclassified" : "declaration",
          ...(form === undefined ? {} : { form }),
          ...(declared === undefined ? {} : { subject: declared }),
          status,
          disposition,
          precondition: Object.freeze({ required, observed: current }),
          scope: Object.freeze({ ...scope, global: scope.global || flags.includes("global") }),
          span: read.span,
          header: binding,
          ...(pattern === undefined
            ? {}
            : {
                pattern: immutableRegistryValue(
                  flags.includes("long")
                    ? pattern.map((p) => ({ ...p, modifiers: `+${p.modifiers}` }))
                    : pattern,
                ),
              }),
          prefix: alias?.prefix ?? read.prefix,
          ...(parameterText === undefined ? {} : { parameterText }),
          ...(body === undefined ? {} : { body }),
          ...(endBody === undefined ? {} : { endBody }),
          defaults: Object.freeze((alias?.defaults ?? read.defaults).map((d) => Object.freeze(d))),
          ...(alias === undefined ? {} : { aliasOf: alias.id }),
          ...(aliasSubject === undefined ? {} : { aliasSubject }),
          expansion:
            form?.body === "literal" &&
            body !== undefined &&
            pattern !== undefined &&
            alias?.expansion !== "unsupported" &&
            !flags.includes("outer") &&
            !flags.includes("protected")
              ? "supported"
              : "unsupported",
          assumptions: Object.freeze(declarationAssumptions),
          diagnostics: Object.freeze(diagnostics),
        });
        definitions.push(definition);
        if (body !== undefined && alias === undefined)
          regions.push({ span: body.span, context: "definition-body" });
        if (endBody !== undefined) regions.push({ span: endBody.span, context: "definition-body" });
        if (read.span.end > invocation.commandSpan.end)
          regions.push({
            span: byteSpan(invocation.commandSpan.end, read.span.end),
            context: "argument",
          });
      }
      // Do not execute declarations encountered as tokens in an already bound argument.
      if (binding.hull !== undefined)
        for (const argument of binding.arguments)
          if (argument.kind === "source")
            regions.push({ span: argument.contentSpan, context: "argument" });
      if (
        context === "source" &&
        (facets.some((f) => f.role === "environment-boundary" && f.side === "open") ||
          invocation.name.startsWith("if") ||
          [
            "else",
            "or",
            "fi",
            "expandafter",
            "csname",
            "globaldefs",
            "protected",
            "begingroup",
            "endgroup",
          ].includes(invocation.name))
      )
        uncertainScopes.push(byteSpan(invocation.commandSpan.end, invocation.scope.end));
    }
  }
  return Object.freeze({
    units: Object.freeze([...units]),
    syntaxes: Object.freeze(syntaxes),
    definitions: Object.freeze(definitions),
    activations: Object.freeze(activations),
    invocations: Object.freeze(invocations),
    assumptions: Object.freeze(assumptions),
    diagnostics: Object.freeze([
      ...definitions.flatMap((d) => d.diagnostics),
      ...activations.flatMap((a) => a.diagnostics),
      ...invocations.flatMap((i) => i.binding.diagnostics),
    ]),
  });
}
