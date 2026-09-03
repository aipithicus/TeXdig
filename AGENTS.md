# TeXdig

This will be the new home for the new TeXdig initiative that will synthesize existing node latex engine work based on previous work in codex-scientiae, doccer, and codex-scientiae's core latex-adjacent dependencies such as latex-utensils and unified-latex, among other things. This will be a nodejs and typescript project.

Private issues, discussion, archaeology, etc. live in an adjacent private space that is not part of this repository. The live project will implement gh-API based issues and project management for public facing on-going work. See [DocOps.md](./DocOps.md) for routing and guidance on private documentation.

---

## 1. Context Routing Map

Do not guess architectural details — consult the relevant source. Contract documentation states what the engine is built to; design rationale explains present choices; the capability outlook maps possibilities without making release commitments.

| Need / Topic                               | Primary Reference                                                                           |
| :----------------------------------------- | :------------------------------------------------------------------------------------------ |
| **Local Planning & Workflows**             | [**`DocOps.md`**](./DocOps.md) (if present; routes to private planning, registers, ledgers) |
| **System Architecture & Design Rationale** | [**`docs/architecture/`**](docs/architecture/) (`overview.md`, `design-principles.md`)      |
| **Kernel, Registry & Binding Contracts**   | [**`docs/specification/contracts.md`**](docs/specification/contracts.md)                    |
| **Scope Boundaries**                       | [**`docs/specification/non-goals.md`**](docs/specification/non-goals.md)                    |
| **Later Capabilities & Open Questions**    | [**`docs/specification/capability-outlook.md`**](docs/specification/capability-outlook.md)  |
| **Verification & Testing Approach**        | [**`docs/testing.md`**](docs/testing.md) (fixture tiers, oracles, external corpus runs)     |
| **Build & Packaging Workflows**            | [**`DEVELOPMENT.md`**](DEVELOPMENT.md) (toolchain, commands, layout, compiler flags)        |

---

## 2. Working Culture & Behavioral Guidance

- **Kernel First**: The `LaTeX → IR` tiers — substrate, syntax, semantics, project graph, realization — are made solid before projection work begins. Projections consume finished analyses; they do not shape the kernel.
- **Every Byte Accounted**: Source bytes never fall outside the syntax/residue ledger. A balanced ledger is not completeness — inspect the residue.
- **No Whisper Channels**: Recovery, uncertainty, and unsupported cases surface as typed diagnostics. No `console.warn`, silent nulls, or sentinel strings in content.
- **Evidence Proportional to the Question**: Deterministic operations are proven by tests, not runtime self-checks. Knowledge-dependent judgments carry a licensing source and a resolution status. External claims (compilation, rendering) carry full observations. Do not add an evidence structure that nothing consumes.
- **Registry Integrity**: A registry record states a language-tier fact cited to package documentation or an authoritative harvest. Document-tier knowledge enters only through the document's own parse and never writes back to the registry. No record exists because one document needed it.
- **Parents Are Oracles, Not Truth**: unified-latex and latex-utensils outputs and tests are correlated comparison oracles (the two share grammar ancestry). Divergences are explained — our fix or their bug — never assumed.
- **Escalate Tool / Test Inaccuracies**: When tooling, tests, or oracles mislead, verify the root cause in source and report it; never work around it silently.

---

## 3. Repository Conventions

### Layout

- `packages/texdig/` — the engine (zero runtime dependencies). `packages/projections/` — `@texdig/projections`. `packages/cli/` — `@texdig/cli`.
- `fixtures/` — byte-exact fixtures by role (`differential/`, `negative-spec/`, `demo/`). `tests/` — cross-package suites. `scripts/` — codegen and harvest tooling. `docs/` — project documentation.
- The full tree is in [`DEVELOPMENT.md`](DEVELOPMENT.md).

### Language & Filetype Standards

- TypeScript for everything authored. Every `.ts` file belongs to a tsconfig project checked by `tsc --noEmit`; Node's type stripping is not verification.
- Strict compiler lattice: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `isolatedDeclarations`, `isolatedModules`, `noImplicitOverride`, `erasableSyntaxOnly`.
- `any` is disallowed; narrow from `unknown`. Every `as` assertion carries a comment naming the invariant that licenses it.
- `.js` only for tool configuration that cannot load `.ts` (each exception listed in `DEVELOPMENT.md`). No `.mjs`/`.cjs`. `.peggy` grammars compile at build into `src/generated/` as `.js` plus a peggy-emitted `.d.ts`; generated parsers are imported only through their typed facades. No hand-written declaration files are expected; a shim for an untyped dependency, if ever needed, lives in a conventional `types/` directory.

### Knowledge Storage

- One kind of knowledge, one format. Registry records are `.ts` typed literals whether curated or harvest-emitted; harvesters generate TypeScript through the same compiler gate. Custody is expressed by directory (`records/curated/`, `records/harvested/`), a generated-file header, and the provenance field — never by a format difference.
- Internal contracts are TS types with no runtime validators and no serialized form between in-process stages. Boundary contracts are defined once. Evidence artifacts are outputs, never source.

### Dependency Standards

- `texdig` has zero runtime dependencies.
- A dependency is adopted when it owns a problem domain with accumulated edge-case knowledge and lives at a tier whose invariants it can satisfy. Ecosystem tree vocabularies (unist, hast, mdast) are projection targets, never the kernel's model.
- One version of any dependency across the workspace (pnpm catalog). `@types/*` appears in runtime dependencies only when the type is part of the public API.

### Naming

- Ancestor and ecosystem brand names (`unified`, `utensils`, `unist`, `hast`, `remark`, `rehype`) do not appear in package names, module paths, exported API, or identifiers. Attribution lives in `NOTICE` and in record provenance.

---

## 4. Verification Mandate

Before concluding any implementation task or refactor, run and pass:

```powershell
pnpm typecheck
pnpm lint
pnpm test
pnpm conformance:check
pnpm format:check
pnpm build
pnpm pack-check
```

`pnpm codegen --check` joins the mandate when the first grammar lands.

`pnpm conformance:deep` is not a routine per-task gate. Run it when UTF-8 decoding, its oracle or fixture generator, digest canonicalization, or the relevant runtime/toolchain inputs change, and before a release if CI has not already produced a deep result for that commit. The dedicated CI workflow reports a quick result for every pull request, runs the census only for relevant diffs, and also runs it nightly and by manual dispatch.

Scripts are established at scaffold; see [`DEVELOPMENT.md`](DEVELOPMENT.md).

## Private/

The private/ directory is for holding scripts used to call code from other projects on the local filesystem, such as the codex-scientiae latex gauntlet in order to leverage the infrastructure and tools of that project for testing TeXdig on wild data
