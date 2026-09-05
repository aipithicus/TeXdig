# Developer Guide

A practical guide for building, testing, and packaging **TeXdig** (TypeScript, pnpm workspace).

---

## 1. Prerequisites & Toolchain

- **Node.js**: 24 or later; development is pinned to the version in `.node-version` (26.x).
- **pnpm**: the version in `package.json`'s `packageManager` field. Node 25+ no longer bundles corepack, so install pnpm once with `npm install -g pnpm@11.25.0` (or `npm install -g corepack && corepack enable`, which then honors the `packageManager` pin automatically).
- **TypeScript**: 6.0.x — the last TypeScript release with a mature programmatic API, which the type-aware lint rules depend on. TypeScript 7 ships without a programmatic API; it is not adopted until a stable 7.x API exists and the lint toolchain has a stable release built on it.

| Concern               | Tool                                                                                                                |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------ |
| Type checking / build | `tsc -b` over project references (TypeScript 6.0.3)                                                                 |
| Tests                 | vitest 4 (`@vitest/coverage-v8` for coverage)                                                                       |
| Lint                  | eslint 10 with typescript-eslint (type-checked rules), `eslint-config-prettier`; `jiti` loads the TypeScript config |
| Format                | prettier 3 with `prettier-plugin-pegjs` (grammars are formatted source)                                             |
| Grammars              | peggy 5 (generated deterministically into `src/generated/`; copied into `dist/generated/` at build)                 |
| Package health        | publint, arethetypeswrong                                                                                           |
| Releases              | changesets                                                                                                          |

Every version is declared once in `pnpm-workspace.yaml` under `catalog:` and referenced as `catalog:` from package manifests.

---

## 2. Quick Workflow Commands

```powershell
pnpm install --frozen-lockfile   # restore exactly what the lockfile records
pnpm grammars:generate           # generate each parser's .js + .d.ts into src/generated/
pnpm grammars:check              # generate twice in isolation, byte-compare, then materialize verified artifacts
pnpm registry:check              # build, typecheck, registry tests, committed custody and synthetic determinism
pnpm registry:check -- --source-root <clean-checkout> # also re-harvest the pinned upstream twice
pnpm registry:generate -- --source-root <clean-checkout> # explicit maintainer write mode
pnpm typecheck                   # tsc -b (source projects) + tsc -p tsconfig.tests.json (tests, scripts, configs)
pnpm lint
pnpm format:check                # prettier --check .  (pnpm format to write)
pnpm test                        # vitest run   (pnpm test:watch, pnpm test:coverage)
pnpm conformance:check           # regenerate default-tier expectations and validate retained deep metadata
pnpm conformance:check:deep      # regenerate every expectation, including deep digests
pnpm conformance:deep            # full deep regeneration and sharded length-five source census
pnpm build                       # generate, tsc -b, then copy generated parsers into dist/generated/
pnpm pack-check                  # publint + arethetypeswrong on the built packages
pnpm tools:verify                # check external executables against tools/tools.json
pnpm dedupe --check              # single-version policy: fails if the lockfile could be deduplicated
```

---

## 3. Project Structure

```text
texdig/
├── package.json                 # private workspace root: scripts, toolchain devDependencies, packageManager pin
├── pnpm-workspace.yaml          # packages: [packages/*] + catalog: (single-version pins)
├── pnpm-lock.yaml               # committed — the restore recipe
├── .npmrc                       # strict-peer-dependencies, save-exact, engine-strict
├── .node-version
├── tsconfig.base.json           # the strict compiler lattice, inherited by every project
├── tsconfig.json                # solution file: references every package (drives `tsc -b`)
├── tsconfig.tests.json          # no-emit project covering tests, scripts, and config files
├── eslint.config.ts  vitest.config.ts  .prettierrc.json  .prettierignore  .editorconfig  .gitattributes
├── .changeset/                  # changesets configuration and pending change entries
├── .github/workflows/ci.yml  conformance-deep.yml
├── NOTICE                       # third-party attribution (unified-latex, latex-utensils)
├── patches/                     # `pnpm patch` output, committed — only if a dependency ever needs one
├── docs/                        # project documentation
├── packages/
│   ├── texdig/                  # the engine — zero runtime dependencies
│   │   ├── package.json         # exports map → ./dist/…; files: ["dist"]
│   │   ├── tsconfig.json        # extends base; composite; rootDir src → outDir dist
│   │   ├── src/
│   │   │   ├── source/  regions/                          # implemented source and region substrate
│   │   │   ├── evidence/                                  # consumed semantic status, location, licensing types
│   │   │   ├── origin/                                    # later derived expansion origins
│   │   │   ├── latex/                                     # core syntax, bounded sublanguages, grammars, typed facades
│   │   │   ├── registry/                                # types, immutable catalog, public index
│   │   │   │   └── records/{curated,harvested}/          # typed assertions; custody by directory
│   │   │   ├── binding/                                  # source-backed invocation and argument overlays
│   │   │   ├── definitions/                              # source activation, document declarations and scope
│   │   │   ├── expand/  project/                         # later semantic consumers
│   │   │   ├── query/  transform/  render/  validate/     # intrinsic terminals; compile/log adapter in validate/
│   │   │   └── generated/                                 # nine parser pairs (.js + peggy-emitted .d.ts) — gitignored
│   │   ├── dist/                # gitignored — tsc emit
│   │   └── node_modules/        # gitignored — symlinks into the pnpm store
│   ├── projections/             # @texdig/projections — added at the projections phase
│   └── cli/                     # @texdig/cli — added when demand exists
├── fixtures/                    # byte-exact: conformance/  differential/  negative-spec/  demo/
├── tests/                       # cross-package suites
├── scripts/                     # conformance/, generation, verification, codegen, harvest — all in tsconfig.tests.json
├── temp/                        # tracked convention + gitignored, operation-owned scratch directories
├── tools/                       # external executables (gitignored) + tools.json (committed manifest)
├── private/                     # gitignored — local glue scripts that drive external corpus runs (AGENTS.md, Private/)
├── artifacts/                   # run outputs — gitignored, never imported as source
└── node_modules/                # gitignored — root install; pnpm's virtual store lives in .pnpm/
```

Unit tests are colocated as `*.test.ts` beside the module they cover and are excluded from the emitting project.

---

## 4. Build Configuration & Conventions

### Compiler

- **Lattice** (`tsconfig.base.json`): `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `verbatimModuleSyntax`, `isolatedModules`, `isolatedDeclarations`, `erasableSyntaxOnly`; `module`/`moduleResolution` `nodenext`, so relative imports carry explicit `.js` extensions.
- **Two kinds of project.** Package `tsconfig.json` files are `composite` and emit to `dist/` through the root solution file (`tsc -b`, incremental via `dist/.tsbuildinfo`). `tsconfig.tests.json` is a no-emit project covering colocated tests, `tests/`, `scripts/`, and the config files, with `paths` mapping `texdig` to its source. Its scripts use explicit `.ts` imports because Node executes them through native type stripping and does not remap `.js` specifiers to source files. Together they satisfy the rule that every `.ts` file belongs to a checked project; nothing outside `src/` ever reaches `dist/`.
- **Module format**: ESM only. No bundler, no dual publish. Library modules avoid top-level `await` so the package stays loadable from CommonJS consumers through Node's `require(esm)`; scripts may use it.

### Dependencies

- Dependencies live in `node_modules/` and nowhere else; they are never edited or vendored. pnpm keeps one content-addressable store per drive (here `D:\.pnpm-store`) and hard-links each project's `node_modules/` into it.
- Versions are declared once in the catalog; internal packages reference each other with the `workspace:` protocol. `pnpm dedupe --check` runs in CI so a second version of anything is a failing build, not a surprise.
- If a dependency ever needs a local fix, use `pnpm patch <pkg>` and commit the result under `patches/`; pnpm re-applies it on every install and fails loudly when it no longer applies.
- `texdig` declares no runtime dependencies. The root manifest holds the toolchain only. The engine targets the Node runtime and uses Node built-ins where they fit (`node:crypto` computes snapshot identity); no browser build is provided.

### Generated code and caches

- `pnpm grammars:generate` emits each Peggy parser's `.js` and `.d.ts` pair into `src/generated/`, which is gitignored. `pnpm grammars:check` generates every pair twice in isolated workspace-local directories, byte-compares both artifacts, and only then materializes one verified set in `src/generated/`. `pnpm build` copies all pairs into `dist/generated/` after TypeScript emit, preserving the package's `dist`-only boundary without enabling `allowJs`. TypeScript resolves generated modules through ordinary sibling-declaration lookup; typed facades are the only importers, and no declaration is handwritten. Harvest-emitted records are committed with a generated-file header and provenance.
- No hand-written `.d.ts` files are expected. If a dependency ever ships without types, its shim lives in a conventional `types/` directory (created only then) and is listed here.
- Registry harvesters use the pinned TypeScript compiler API without executing input modules. Committed records and receipts are TypeScript literals checked by the ordinary compiler projects. `registry:check` is self-contained without an upstream checkout; its optional source root must match the clean revision and exact input bytes in `scripts/registry/source-manifest.ts`. Both registry commands build first because signature normalization consumes the built argspec facade. See [Registry](docs/registry.md) for source custody and output boundaries.
- Tool caches stay inside `node_modules/` (eslint, prettier, vitest) or `dist/` (`.tsbuildinfo`). Test coverage is written to `coverage/`, gitignored.

### Temporary workspaces

- [`temp/README.md`](temp/README.md) defines the shared scratch contract for development tools, automation, and agents. Each operation owns a uniquely allocated child directory under `temp/`; durable run evidence belongs in `artifacts/`, and `.codex/` remains configuration-only.

### Fixtures

- `fixtures/**` is byte-exact. `.gitattributes` marks it `-text` (no line-ending normalization), `.editorconfig` unsets whitespace rules for it, and `.prettierignore` excludes it from formatting.
- `fixtures/conformance/README.md` defines the language-neutral line format. `pnpm conformance:generate` regenerates every source and region family. `pnpm conformance:check` performs the routine zero-difference check without recomputing deep digests, while still validating each retained deep header and census count. `pnpm conformance:check:deep` recomputes every digest. `pnpm conformance:deep` runs that full check concurrently with a sharded exhaustive source census; set `TEXDIG_CONFORMANCE_WORKERS` to a positive integer to override its bounded automatic worker count.
- Routine CI runs the default tier on Windows and Ubuntu. The Ubuntu-only deep workflow reports a result for every pull request so it can be required, but it installs dependencies and runs the census only when executable UTF-8 decoding, class-oracle, digest-canonicalization, deep-runner, or toolchain inputs change; region-only pull requests exit after the diff check. It also runs nightly on `main`, on relevant `main` pushes, on version tags, and by manual dispatch. A manual deep run is required before publishing a release when the tagged commit has not already passed it.

### External executables

- Tools npm cannot carry (the Tectonic engine) live under `tools/`, gitignored, with `tools/tools.json` as the committed record of name, version, platform, SHA-256, and source. `pnpm tools:verify` checks present binaries against the manifest and reports absent ones without failing. Adapters resolve a tool from configuration (for example `TEXDIG_TECTONIC`) or the manifest path and record its version and hash in every observation they produce.

### Local glue

- `private/` holds untracked, machine-local scripts that invoke external infrastructure — the corpus runner of a downstream application, for example. Nothing in the repository depends on them, and they are never committed.

### Known `.js` exceptions

- None. All configuration files are TypeScript or JSON.

---

## 5. Further Documentation

- [**AGENTS.md**](AGENTS.md) — working culture, repository conventions, verification mandate.
- [**Architecture Overview**](docs/architecture/overview.md) — tiers, source and coordinate model, package shape, lineage.
- [**Design Principles**](docs/architecture/design-principles.md) — principles and placement questions.
- [**Kernel Contracts**](docs/specification/contracts.md) — the contracts the engine is built to.
- [**Scope & Non-Goals**](docs/specification/non-goals.md) — deliberately absent features.
- [**Capability Outlook**](docs/specification/capability-outlook.md) — later capabilities and open questions.
- [**Verification & Testing**](docs/testing.md) — fixture tiers, oracles, and the boundary with external corpus runs.
