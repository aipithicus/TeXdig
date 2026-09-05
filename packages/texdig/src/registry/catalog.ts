import type {
  Provider,
  RegistryAssertion,
  RegistryConflict,
  RegistryFacet,
  RegistrySelection,
  RegistrySubject,
} from "./types.js";

/** Stable object-key order without changing meaningful array order. */
export function registryValueKey(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(registryValueKey).join(",")}]`;
  if (typeof value === "object" && value !== null) {
    return `{${Object.entries(value)
      .sort(([a], [b]) => compareRegistryText(a, b))
      .map(([key, item]) => `${JSON.stringify(key)}:${registryValueKey(item)}`)
      .join(",")}}`;
  }
  if (
    value === undefined ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    typeof value === "bigint"
  )
    throw new TypeError("registry values must be declarative data");
  return JSON.stringify(value);
}

export function compareRegistryText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function freezeValue(value: unknown): void {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return;
  for (const child of Object.values(value)) freezeValue(child);
  Object.freeze(value);
}

/** A defensive copy prevents callers from changing catalog knowledge through aliases. */
export function immutableRegistryValue<T>(value: T): T {
  const copy = structuredClone(value);
  freezeValue(copy);
  return copy;
}

function facetKey(facet: RegistryFacet): string {
  switch (facet.role) {
    case "classification":
    case "serialization-hint":
      return `${facet.role}:${facet.property}`;
    case "content-processing":
      return `${facet.role}:${facet.target}:${facet.strategy}`;
    case "target-capability":
      return `${facet.role}:${facet.target}:${facet.version}`;
    case "documentation":
      return `${facet.role}:${facet.text}`;
    case "signature":
    case "argument-language":
    case "provider-advice":
      return facet.role;
  }
}

function facetValue(facet: RegistryFacet): string {
  // Signature whitespace is documentary; the parsed pattern is the semantic comparison.
  return registryValueKey(facet.role === "signature" ? facet.pattern : facet);
}

export class RegistryCatalog {
  public readonly assertions: readonly RegistryAssertion[];
  public readonly providers: readonly Provider[];

  public constructor(assertions: readonly RegistryAssertion[]) {
    const ids = new Set<string>();
    const providers = new Map<string, Provider>();
    for (const assertion of assertions) {
      if (ids.has(assertion.id)) throw new Error(`duplicate assertion identity: ${assertion.id}`);
      ids.add(assertion.id);
      const previous = providers.get(assertion.provider.id);
      if (
        previous !== undefined &&
        registryValueKey(previous) !== registryValueKey(assertion.provider)
      ) {
        throw new Error(`inconsistent provider identity: ${assertion.provider.id}`);
      }
      if (assertion.facets.length === 0)
        throw new Error(`assertion has no declared facet: ${assertion.id}`);
      providers.set(assertion.provider.id, assertion.provider);
    }
    this.assertions = immutableRegistryValue(
      [...assertions].sort((a, b) => compareRegistryText(a.id, b.id)),
    );
    this.providers = immutableRegistryValue(
      [...providers.values()].sort((a, b) => compareRegistryText(a.id, b.id)),
    );
    Object.freeze(this);
  }

  /** Explicit provider selection is a knowledge query, not source-position activation. */
  public select(subject: RegistrySubject, providerIds: readonly string[]): RegistrySelection {
    const selected = new Set(providerIds);
    const known = new Set(this.providers.map((provider) => provider.id));
    const unknownProviderIds = [...selected]
      .filter((id) => !known.has(id))
      .sort(compareRegistryText);
    const assertions = this.assertions.filter(
      (assertion) =>
        selected.has(assertion.provider.id) &&
        registryValueKey(assertion.subject) === registryValueKey(subject),
    );
    // House precedence applies only within the same provider and applicability condition.
    // All original assertions remain visible, including lower-precedence disagreements.
    const house = new Set(
      assertions
        .filter((a) => a.provenance.custody === "curated")
        .map((a) => `${a.provider.id}:${a.applicability}`),
    );
    const shadowedAssertions = assertions.filter(
      (a) =>
        a.provenance.custody === "harvested" && house.has(`${a.provider.id}:${a.applicability}`),
    );
    const shadowed = new Set(shadowedAssertions.map((a) => a.id));
    const effectiveAssertions = assertions.filter((a) => !shadowed.has(a.id));
    const conflicts: RegistryConflict[] = [];
    const slots = new Map<string, { assertionId: string; value: string }[]>();
    for (const assertion of effectiveAssertions) {
      if (assertion.status === "disputed" || assertion.status === "deferred") {
        conflicts.push({
          kind: "unresolved-assertion",
          assertionIds: [assertion.id],
          facet: "assertion-status",
        });
      }
      for (const [slot, value] of assertion.facets.flatMap((facet) => {
        const entries: [string, string][] = [[facetKey(facet), facetValue(facet)]];
        if (facet.role === "signature" && facet.namedArguments !== undefined)
          entries.push(["argument-names", registryValueKey(facet.namedArguments)]);
        return entries;
      })) {
        const key = `${assertion.applicability}:${slot}`;
        const previous = slots.get(key) ?? [];
        for (const entry of previous) {
          if (entry.value !== value)
            conflicts.push({
              kind: "facet-disagreement",
              assertionIds: [entry.assertionId, assertion.id],
              facet: key,
            });
        }
        previous.push({ assertionId: assertion.id, value });
        slots.set(key, previous);
      }
    }
    return immutableRegistryValue({
      status:
        unknownProviderIds.length > 0
          ? "unknown"
          : conflicts.length > 0
            ? "conflict"
            : effectiveAssertions.length === 0
              ? "unknown"
              : effectiveAssertions.length === 1
                ? "single"
                : "compatible",
      assertions,
      effectiveAssertions,
      shadowedAssertions,
      unknownProviderIds,
      conflicts,
    });
  }
}
