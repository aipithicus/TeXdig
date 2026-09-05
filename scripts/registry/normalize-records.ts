import { createHash } from "node:crypto";
import type {
  ArgumentStrategy,
  Authority,
  AuthorityLocation,
  ContentStrategy,
  Provider,
  RegistryAssertion,
  RegistryFacet,
} from "../../packages/texdig/src/registry/types.ts";
import { normalizeArgspec } from "./normalize-argspec.ts";
import {
  readParentRecords,
  type HarvestDiagnostic,
  type StaticProperty,
  type StaticValue,
} from "./read-parent-records.ts";
import type { SourceFamily } from "./source-manifest.ts";

export interface DuplicateAdjudication {
  readonly field: string;
  readonly byteStarts: readonly number[];
  readonly disposition: "retain-disputed";
}
export interface NormalizedFamily {
  readonly family: string;
  readonly assertions: readonly RegistryAssertion[];
  readonly diagnostics: readonly HarvestDiagnostic[];
}
export class HarvestError extends Error {
  public readonly diagnostics: readonly HarvestDiagnostic[];
  public constructor(message: string, diagnostics: readonly HarvestDiagnostic[] = []) {
    super(message);
    this.diagnostics = diagnostics;
  }
}

function stringValue(value: StaticValue, context: string): string {
  if (value.kind !== "literal" || typeof value.value !== "string")
    throw new HarvestError(`${context} must be a string literal`);
  return value.value;
}
function booleanValue(value: StaticValue, context: string): boolean {
  if (value.kind !== "literal" || typeof value.value !== "boolean")
    throw new HarvestError(`${context} must be a boolean literal`);
  return value.value;
}
function properties(value: StaticValue, context: string): readonly StaticProperty[] {
  if (value.kind !== "object") throw new HarvestError(`${context} must be an object literal`);
  return value.properties;
}

export function validateProviderAdvice(
  replacementId: string,
  providers: readonly Provider[],
): void {
  if (!providers.some((provider) => provider.id === replacementId && provider.kind === "package")) {
    throw new HarvestError(`replacement is not a known package provider: ${replacementId}`);
  }
}

export function validateFamilyInventory(
  expected: readonly string[],
  actual: readonly string[],
): void {
  if (
    new Set(actual).size !== actual.length ||
    JSON.stringify([...expected].sort()) !== JSON.stringify([...actual].sort())
  ) {
    throw new HarvestError(
      `family inventory mismatch: expected ${[...expected].sort().join(",")}; found ${[...actual].sort().join(",")}`,
    );
  }
}

function argumentStrategy(family: string, value: StaticValue): ArgumentStrategy | undefined {
  if (value.kind !== "expression") return undefined;
  if (value.importedFrom === "./libs/argument-parser" && value.importedName === "argumentParser") {
    if (family === "listings") return "listings-inline";
    if (family === "minted") return "minted-inline";
  }
  if (
    family === "tikz" &&
    value.importedFrom === "./libs/tikz-command-argument-parser" &&
    value.importedName === "tikzCommandArgumentParser"
  )
    return "tikz-command";
  return undefined;
}

function contentStrategy(
  family: string,
  value: StaticValue,
): { strategy: ContentStrategy; itemCommand?: string } | undefined {
  if (value.kind !== "expression") return undefined;
  if (value.importedFrom === "../../utils/enumerate" && value.importedName === "cleanEnumerateBody")
    return { strategy: "list-items", itemCommand: "item" };
  const text = value.text.replace(/\s+/gu, "");
  if (family === "latex2e" && text === "(nodes)=>{trim(nodes);returnnodes;}")
    return { strategy: "trim-boundaries" };
  if (family === "latex2e" && text === '(nodes)=>cleanEnumerateBody(nodes,"bibitem")')
    return { strategy: "bibliography-items", itemCommand: "bibitem" };
  if (family === "exam") {
    const match =
      /^\(nodes\)=>cleanEnumerateBody\(nodes,"(choice|part|subpart|subsubpart|question)"\)$/u.exec(
        text,
      );
    if (match?.[1] !== undefined) return { strategy: "list-items", itemCommand: match[1] };
  }
  if (family === "tikz" && text === "processTikzEnvironmentContent")
    return { strategy: "tikz-conditional-arguments" };
  return undefined;
}

export function normalizeRecords(
  family: SourceFamily,
  text: string,
  authority: Authority,
  providers: readonly Provider[],
  adjudications: readonly DuplicateAdjudication[] = [],
): NormalizedFamily {
  const source = readParentRecords(family.path, text);
  validateFamilyInventory(
    family.tables,
    source.tables.map((table) => table.name),
  );
  const diagnostics = [...source.diagnostics];
  if (diagnostics.some((item) => item.code === "invalid-shape"))
    throw new HarvestError("invalid source shape", diagnostics);
  const duplicates = diagnostics.filter((item) => item.code === "duplicate-key");
  for (const duplicate of duplicates) {
    const all = duplicates
      .filter((item) => item.field === duplicate.field)
      .flatMap((item) => [item.location, ...(item.related ?? [])]);
    const starts = [...new Set(all.map((item) => item.byteStart))].sort((a, b) => a - b);
    if (
      !adjudications.some(
        (item) =>
          item.field === duplicate.field &&
          JSON.stringify([...item.byteStarts].sort((a, b) => a - b)) === JSON.stringify(starts),
      )
    ) {
      throw new HarvestError(`unadjudicated duplicate key: ${duplicate.field}`, diagnostics);
    }
  }
  for (const adjudication of adjudications) {
    if (!duplicates.some((item) => item.field === adjudication.field))
      throw new HarvestError(`stale duplicate adjudication: ${adjudication.field}`);
  }
  const assertions: RegistryAssertion[] = [];
  function diagnostic(
    code: HarvestDiagnostic["code"],
    location: AuthorityLocation,
    field: string,
    detail: string,
  ): void {
    diagnostics.push({ code, path: family.path, location, field, detail });
  }
  for (const table of source.tables) {
    if (!["macros", "environments", "conditionalMacros"].includes(table.name))
      throw new HarvestError(`unrecognized record table: ${table.name}`);
    for (const entry of table.entries) {
      const fieldPrefix = `${table.name}.${entry.name}`;
      if (entry.value.kind === "expression") {
        assertions.push({
          id: createHash("sha256")
            .update(`${authority.inputDigest}:${fieldPrefix}:${String(entry.location.byteStart)}`)
            .digest("hex"),
          provider: family.provider,
          subject:
            table.name === "environments"
              ? { kind: "environment", name: entry.name }
              : { kind: "command", name: entry.name, escapeToken: "\\" },
          status: "deferred",
          applicability: table.name === "conditionalMacros" ? "tikz-body" : "provider-selected",
          facets: [
            {
              role: "argument-language",
              language: "unknown",
              reason: "entry-is-an-unsupported-expression",
            },
          ],
          provenance: { custody: "harvested", authority, location: entry.location },
        });
        continue;
      }
      const fields = properties(entry.value, fieldPrefix);
      const facets: RegistryFacet[] = [];
      let escapeToken = "\\";
      let hasSignature = false;
      let hasParser = false;
      let unavailable = false;
      const names: (string | null)[] = [];
      let hasNames = false;
      for (const property of fields) {
        const field = `${fieldPrefix}.${property.name}`;
        switch (property.name) {
          case "signature": {
            if (property.value.kind === "expression") {
              unavailable = true;
              break;
            }
            const spelling = stringValue(property.value, field);
            facets.push({ role: "signature", spelling, pattern: normalizeArgspec(spelling) });
            hasSignature = true;
            break;
          }
          case "escapeToken":
            escapeToken = stringValue(property.value, field);
            break;
          case "argumentParser": {
            hasParser = true;
            const strategy = argumentStrategy(family.family, property.value);
            facets.push(
              strategy === undefined
                ? {
                    role: "argument-language",
                    language: "unknown",
                    reason: "unrecognized-parent-callback",
                  }
                : {
                    role: "argument-language",
                    language: "bounded-strategy",
                    strategy,
                    availability: "unimplemented",
                  },
            );
            if (strategy === undefined) unavailable = true;
            else diagnostic("symbolic-callback", property.location, field, strategy);
            break;
          }
          case "processContent": {
            const strategy = contentStrategy(family.family, property.value);
            if (strategy === undefined) {
              unavailable = true;
              facets.push({
                role: "documentation",
                text: "Parent content callback is unrecognized; content processing remains unresolved.",
              });
            } else {
              facets.push({
                role: "content-processing",
                target: "body",
                ...strategy,
                enabled: true,
                availability: "unimplemented",
              });
              diagnostic("symbolic-callback", property.location, field, strategy.strategy);
            }
            break;
          }
          case "renderInfo": {
            for (const info of properties(property.value, field)) {
              if (info.value.kind === "expression") {
                unavailable = true;
                continue;
              }
              switch (info.name) {
                case "namedArguments": {
                  if (info.value.kind !== "array")
                    throw new HarvestError(`${field}.namedArguments must be an array`);
                  hasNames = true;
                  for (const name of info.value.items) {
                    if (
                      name.kind !== "literal" ||
                      !(name.value === null || typeof name.value === "string")
                    )
                      throw new HarvestError("argument names must be strings or null");
                    names.push(name.value);
                  }
                  break;
                }
                case "alignContent":
                case "pgfkeysArgs":
                case "tikzEnvironment":
                  facets.push({
                    role: "content-processing",
                    target: info.name === "pgfkeysArgs" ? "arguments" : "body",
                    strategy:
                      info.name === "alignContent"
                        ? "alignment"
                        : info.name === "pgfkeysArgs"
                          ? "pgfkeys"
                          : "tikz",
                    enabled: booleanValue(info.value, field),
                    availability: "checkpoint",
                  });
                  break;
                case "inMathMode":
                case "inParMode":
                case "tikzPathCommand":
                  facets.push({
                    role: "classification",
                    property:
                      info.name === "inMathMode"
                        ? "math-mode"
                        : info.name === "inParMode"
                          ? "paragraph-mode"
                          : "tikz-path",
                    value: booleanValue(info.value, field),
                  });
                  break;
                case "breakAfter":
                case "breakBefore":
                case "breakAround":
                case "hangingIndent":
                  facets.push({
                    role: "serialization-hint",
                    property:
                      info.name === "breakAfter"
                        ? "break-after"
                        : info.name === "breakBefore"
                          ? "break-before"
                          : info.name === "breakAround"
                            ? "break-around"
                            : "hanging-indent",
                    value: booleanValue(info.value, field),
                  });
                  break;
                default:
                  unavailable = true;
                  diagnostic(
                    "unsupported-expression",
                    info.location,
                    `${field}.${info.name}`,
                    "unrecognized render field",
                  );
              }
            }
            break;
          }
          // Synthetic boundary probes exercise capability and advice integrity without copying outside inputs.
          case "targetCapability": {
            const values = new Map(
              properties(property.value, field).map((item) => [
                item.name,
                stringValue(item.value, field),
              ]),
            );
            const status = values.get("status");
            const target = values.get("target");
            const version = values.get("version");
            if (
              target === undefined ||
              version === undefined ||
              status === undefined ||
              values.size !== 3
            )
              throw new HarvestError("capability requires exactly target, version, status");
            const normalized = status === "Not supported" ? "unsupported" : status;
            if (
              normalized !== "supported" &&
              normalized !== "unsupported" &&
              normalized !== "partial" &&
              normalized !== "unknown"
            )
              throw new HarvestError(`invalid capability status: ${status}`);
            facets.push({ role: "target-capability", target, version, status: normalized });
            break;
          }
          case "replacementProvider": {
            const replacementProviderId = stringValue(property.value, field);
            validateProviderAdvice(replacementProviderId, providers);
            facets.push({ role: "provider-advice", replacementProviderId });
            break;
          }
          default:
            unavailable = true;
            diagnostic(
              "unsupported-expression",
              property.location,
              field,
              "unrecognized entry field",
            );
        }
      }
      if (!hasParser)
        facets.push(
          hasSignature
            ? { role: "argument-language", language: "argspec" }
            : { role: "argument-language", language: "unknown", reason: "signature-not-declared" },
        );
      // The source-family disposition explicitly reserves this sublanguage. There is
      // no systeme checkpoint or binder implementation to advertise as available.
      if (family.family === "systeme" && table.name === "macros" && entry.name === "systeme") {
        facets.push({
          role: "content-processing",
          target: "arguments",
          strategy: "systeme",
          enabled: true,
          availability: "unimplemented",
        });
        diagnostic(
          "unavailable-strategy",
          entry.location,
          fieldPrefix,
          "systeme content processing is deferred",
        );
      }
      if (hasNames && !hasSignature)
        throw new HarvestError(`named arguments lack a signature: ${fieldPrefix}`);
      const withNames = facets.map((facet): RegistryFacet =>
        facet.role === "signature" && hasNames ? { ...facet, namedArguments: names } : facet,
      );
      const disputed = duplicates.some(
        (item) => item.field === fieldPrefix || item.field.startsWith(`${fieldPrefix}.`),
      );
      assertions.push({
        id: createHash("sha256")
          .update(`${authority.inputDigest}:${fieldPrefix}:${String(entry.location.byteStart)}`)
          .digest("hex"),
        provider: family.provider,
        subject:
          table.name === "environments"
            ? { kind: "environment", name: entry.name }
            : { kind: "command", name: entry.name, escapeToken },
        status: disputed ? "disputed" : unavailable ? "deferred" : "parent-asserted",
        applicability: table.name === "conditionalMacros" ? "tikz-body" : "provider-selected",
        facets: withNames,
        provenance: { custody: "harvested", authority, location: entry.location },
      });
    }
  }
  return { family: family.family, assertions, diagnostics };
}
