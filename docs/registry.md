# Registry

`texdig/registry` exposes declarative language knowledge and an immutable catalog. It answers which assertions and conflicts exist for an exact subject and explicitly selected providers. It does not inspect a document or activate providers from source.

```typescript
import { CURATED_RECORDS, HARVESTED_RECORDS, RegistryCatalog } from "texdig/registry";

const catalog = new RegistryCatalog([...HARVESTED_RECORDS, ...CURATED_RECORDS]);
const result = catalog.select({ kind: "command", name: "definecolor", escapeToken: "\\" }, [
  "kernel:latex2e",
  "package:xcolor",
]);
// Both provider assertions survive. Their different signatures produce a conflict.
```

Provider ids identify a kernel, class, or package. Commands retain their exact name and escape token; environments are distinct subjects. The catalog preserves all assertions, makes defensive immutable copies, and sorts by assertion id so input order cannot decide a collision. No providers are selected by default.

Selection returns `unknown`, `single`, `compatible`, or `conflict`, together with all matching assertions, effective assertions, shadowed assertions, unknown provider ids, and individual conflicts. An unknown provider makes the selection `unknown` while preserving any known matches and conflicts. House precedence applies within the same provider, subject, and applicability condition; shadowed parent assertions remain available for inspection. Different providers retain separate authority. Disputed or deferred effective assertions produce an unresolved-assertion conflict. Compatible assertions agree where their declared facets overlap; absent metadata is not a disagreement or affirmative knowledge.

Selection does not evaluate version conditions or applicability against source. The inherited TikZ conditional table retains `tikz-body` applicability, and the xparse provider has an explicitly unknown version condition. The [argument binder](binding.md) requires these conditions and any required strategy to be licensed before claiming resolution. A `single` result describes the catalog query, not a bound invocation.

## Knowledge and capability

Every assertion carries a provider, subject, role-declared facets, status, and provenance. Its authority includes source repository, exact revision, license, input digest, and a source location with half-open UTF-8 byte offsets and one-based line/UTF-16 column.

| Dimension             | Values                                                | Meaning                                                                                       |
| :-------------------- | :---------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| Assertion status      | `verified`, `parent-asserted`, `disputed`, `deferred` | How the knowledge is established or unresolved                                                |
| Target capability     | `supported`, `unsupported`, `partial`, `unknown`      | An explicitly declared claim about a named target and version                                 |
| Strategy availability | `checkpoint`, `unimplemented`                         | Whether a referenced bounded syntax checkpoint exists; this does not install binding behavior |

Facets separate signatures, argument languages, content processing, classification, serialization hints, and documentation. Optional target-capability and provider-advice facets have their own types. A missing signature becomes an explicit unknown argument language. No capability is inferred from record presence. The capability contract is tested using synthetic data; no target-renderer capability table is shipped.

Signatures retain the original argspec spelling and typed patterns, including modifiers, nested defaults, delimiter tokens, until sequences, and verbatim forms. Parent callbacks are represented by closed symbolic strategy ids with unavailable execution stated explicitly. `systeme` has an unimplemented content strategy. Existing alignment, pgfkeys, and TikZ checkpoints are syntax tools; their presence does not mean that registry-driven argument or body processing is implemented.

## Sources and custody

Curated and harvested records use the same TypeScript assertion type. Directories, generated headers, and provenance identify custody:

- `packages/texdig/src/registry/records/curated/` contains reviewed house assertions citing the LaTeX kernel and standard classes. These include kernel `center`, `flushleft`, `flushright`, and `verbatim`, class-owned `quote`/`quotation`, and `abstract` for article and report. The inherited kernel macro claim for `abstract` is retained under an explicit house dispute.
- `packages/texdig/src/registry/records/harvested/` contains generated assertions from eighteen explicitly enumerated source families, including `tabularx`, which the parent's aggregate omits. These assertions remain `parent-asserted` until independently verified.
- `scripts/registry/source-manifest.ts` pins the upstream repository, revision, license, providers, and every selected input digest. `curated-authorities.ts` pins the independent sources for house records.
- `scripts/registry/receipts/parent-records.ts` is the compiler-checked harvest receipt, with input/output digests, generator/compiler versions, family/facet/status counts, and every located harvest diagnostic. It is outside the packed runtime surface.

Attribution and applicable source licenses are recorded in [NOTICE](../NOTICE). The static reader uses the pinned TypeScript compiler API to inspect literal syntax. It never imports, transpiles, or executes source modules. Unrecognized expressions retain located diagnostics. Duplicate keys retain their source locations and block generation without explicit adjudication. All known callback expressions remain visible in diagnostics even after conversion to symbolic strategies.

## Generation and checks

Run from the workspace root:

```powershell
pnpm registry:check
pnpm registry:check -- --source-root <clean-checkout>
pnpm registry:generate -- --source-root <clean-checkout>
```

The routine check works in a fresh public checkout without upstream source or network access. It builds the engine, typechecks all projects, runs registry tests, verifies the committed manifest/record/receipt relationship, and compares two synthetic generations. The build supplies the same typed argspec facade used by normal consumers.

The source-root check additionally requires the exact clean Git revision in the manifest, verifies every selected file against its digest and Git blob, validates the complete family inventory, and harvests twice with reversed family order. It byte-compares both full generations and the checked-in tree. A retained report under ignored `artifacts/registry/` records operational source identity, distinct scratch directories, and output digests.

Generate mode performs the same two-run comparison before writing harvested records and their receipt. It never writes curated records. Each operation allocates unique children of `temp/` and removes only those children on success or failure. Line-ending conversion in the input checkout is rejected even if Git considers that checkout clean; use exact blob bytes when preparing source.

These gates verify custody, determinism, schema consistency, and catalog behavior. They do not establish package completeness, document activation, argument binding, semantic coverage, compilation, or rendering. Parent records and differential fixtures remain correlated comparison evidence; disagreements require an explicit disposition. External corpus observations use separate revision-labelled denominators and do not run in the public gate.
