# TeXdig

TeXdig is a source-faithful, extensible static language engine for TeX/LaTeX projects, written in TypeScript. It preserves source exactly, resolves knowledge-dependent structure with explicit evidence, supports the surrounding artifact languages (`.bib`, `.bbl`, `.log`), and exposes query, edit, analysis, and projection APIs. HTML and Markdown are projections emitted from the engine; neither is its identity.

TeXdig synthesizes the capabilities of unified-latex and latex-utensils on a new substrate, with the source model, provenance, and diagnostics designed together rather than layered on afterwards.

---

## Architecture in One View

```text
lossless syntax        tokens + trivia + CST + recovery diagnostics
evidence overlays      registry · scopes · binding · definitions · expansion origins   (non-mutating)
project graph          .tex · .bib · .bbl · .log · included files
projections            query · text edits · serializers · HTML/Markdown terminals · validation
```

---

## Design Principles

- **Every byte is accounted for.** Each source byte is represented by syntax or by explicit recovery residue.
- **Analysis never mutates.** Binding, expansion, classification, and conversion are overlays and projections over immutable syntax.
- **Knowledge-dependent facts carry evidence.** Argument binding and classification report their licensing source and a resolution status; unknown is a result, not a failure.
- **Recovery is structured.** Malformed input and unknowable expansion produce typed diagnostics, never silent nulls or synthetic content.

---

## Packages

| Package               | Contents                                                                                                              | Runtime dependencies     |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------- |
| `texdig`              | The engine: substrate, syntax, semantics, project graph, query/transform, intrinsic serializers, validation contracts | none                     |
| `@texdig/projections` | Format projections over a shared HTML-tree stage: HTML and Markdown terminals                                         | the hast/mdast toolchain |
| `@texdig/cli`         | Command-line surface                                                                                                  | CLI dependencies         |

---

## Status

Pre-release. The repository is in its scaffolding phase. The kernel contracts are specified in [`docs/specification/contracts.md`](docs/specification/contracts.md) and are implemented in dependency order, kernel tiers first.

---

## Documentation

| Document                                                           | Description                                                                         |
| :----------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| [**DEVELOPMENT.md**](DEVELOPMENT.md)                               | Toolchain, commands, project layout, build configuration.                           |
| [**AGENTS.md**](AGENTS.md)                                         | Agent orientation, working culture, repository conventions.                         |
| [**Architecture Overview**](docs/architecture/overview.md)         | Tiers, source and coordinate model, package shape, lineage.                         |
| [**Design Principles**](docs/architecture/design-principles.md)    | Principles that shape the engine and questions for placing new capabilities.        |
| [**Kernel Contracts**](docs/specification/contracts.md)            | The contracts the engine is built to, including the registry and binding contracts. |
| [**Scope & Non-Goals**](docs/specification/non-goals.md)           | Deliberately absent features and boundaries.                                        |
| [**Capability Outlook**](docs/specification/capability-outlook.md) | Later capabilities and open design questions, without release commitments.          |
| [**Verification & Testing**](docs/testing.md)                      | Verification approach, fixture tiers, and the boundary with external corpus runs.   |
