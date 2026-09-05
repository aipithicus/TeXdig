# TeXdig

TeXdig is a source-faithful, extensible static language engine for TeX/LaTeX projects, written in TypeScript. It preserves source exactly, resolves knowledge-dependent structure with explicit evidence, supports the surrounding artifact languages (`.bib`, `.bbl`, `.log`), and exposes query, edit, analysis, and projection APIs. HTML and Markdown are projections emitted from the engine; neither is its identity.

TeXdig synthesizes the capabilities of unified-latex and latex-utensils on a new substrate, with the source model, provenance, and diagnostics designed together rather than layered on afterwards.

---

## Architecture in One View

```text
source substrate       bytes · snapshots · topology · slices · occurrences · coverage · pairing
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

Pre-release. The source and thin-region substrate is fixture-green, and the first syntax surface is implemented: byte-exact LaTeX token/trivia/CST/residue accounting, explicit lexical-state runs for name regimes and verbatim, eight bounded sublanguage checkpoints, deterministic generation of nine Peggy parsers, and an 82-file parent-oracle inventory. External corpus evidence remains milestone work rather than a routine repository gate. The governing kernel contracts remain in [`docs/specification/contracts.md`](docs/specification/contracts.md).

The [`texdig/registry`](docs/registry.md) surface provides immutable, provider-scoped knowledge: eighteen harvested source families, authority-cited house corrections, separate assertion and capability statuses, and deterministic collision results. [`texdig/binding`](docs/binding.md) interprets explicitly selected signatures into source-backed arguments and licensed hulls, with uncertainty retained. Source activation and definitions are separate consumers. Registry presence does not establish package support.

---

## Documentation

| Document                                                           | Description                                                                          |
| :----------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| [**DEVELOPMENT.md**](DEVELOPMENT.md)                               | Toolchain, commands, project layout, build configuration.                            |
| [**AGENTS.md**](AGENTS.md)                                         | Agent orientation, working culture, repository conventions.                          |
| [**Architecture Overview**](docs/architecture/overview.md)         | Tiers, source and coordinate model, package shape, lineage.                          |
| [**Design Principles**](docs/architecture/design-principles.md)    | Principles that shape the engine and questions for placing new capabilities.         |
| [**Grammar Capability Ledger**](docs/grammar-capability-ledger.md) | Fourteen parent grammars, consumers, fault lines, authority, and TeXdig disposition. |
| [**Kernel Contracts**](docs/specification/contracts.md)            | The contracts the engine is built to, including the registry and binding contracts.  |
| [**Registry**](docs/registry.md)                                   | Catalog API, record custody, harvest commands, and verification limits.              |
| [**Argument binding**](docs/binding.md)                            | Invocation candidates, argument spans, agreement, and uncertainty.                   |
| [**Scope & Non-Goals**](docs/specification/non-goals.md)           | Deliberately absent features and boundaries.                                         |
| [**Capability Outlook**](docs/specification/capability-outlook.md) | Later capabilities and open design questions, without release commitments.           |
| [**Verification & Testing**](docs/testing.md)                      | Verification approach, fixture tiers, and the boundary with external corpus runs.    |
