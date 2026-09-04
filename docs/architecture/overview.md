# Architecture Overview

TeXdig is a source-faithful static language engine for TeX/LaTeX projects. It preserves source exactly, resolves knowledge-dependent structure with explicit evidence, and exposes query, edit, analysis, and projection APIs over the result.

---

## 1. Four Tiers

```text
lossless syntax          tokens + trivia + CST + recovery diagnostics
        │
evidence overlays        registry · scopes · binding · definitions · expansion origins   (non-mutating)
        │
project graph            .tex · .bib · .bbl · .log · .aux · included files
        │
projections              query · text edits · serializers · HTML/Markdown terminals · validation
```

- **Lossless syntax** — a concrete syntax tree over the exact source, with trivia (comments, whitespace) as first-class nodes and malformed input represented as explicit recovery residue.
- **Evidence overlays** — analyses that attach meaning without mutating syntax: registry activation by summoning scope, argument binding, definition discovery, and origin-mapped expansion. Each knowledge-dependent result carries its licensing source and a resolution status.
- **Project graph** — multi-file bases relating the main document, included sources, bibliography artifacts, and compile side-artifacts.
- **Projections** — everything derived from the tiers above: queries, text edits, source realization, HTML and Markdown terminals, and validation observations.

---

## 2. Source Model & Coordinate Spaces

- Source bytes are stored once. Nodes reference half-open byte ranges; byte, UTF-16, atom, and line/column coordinates are derived through source topology rather than stored on nodes. Conversion among those spaces is explicit and rejects positions that are not valid boundaries under the named convention.
- Rebasing between a parent snapshot and a child `SourceSlice` basis is explicit. A slice parsed in isolation cannot present its local offsets as parent coordinates.
- Every source byte is represented by syntax or by explicit residue. The accounting is part of the parse result.
- Original bytes are preserved; encoding and line-ending facts (CRLF, non-UTF-8 material) are recorded, not normalized away.

The implemented substrate exposes immutable `SourceSnapshot`, `SourceTopology`, and `SourceSlice` values; snapshot-bound `OccurrenceBatch`, `OccurrenceSelection`, and `SpanSet` collections; and strict-stack pairing with typed mismatch, dangling-close, and unclosed-open residue. Collection rebasing is explicit and checked, while selection and pairing retain their exact ordinal bases.

---

## 3. Knowledge & Evidence

- **Registry**: records state language-tier facts about packages, classes, and the kernel — signatures, environment roles, classifications, typography tables, target capabilities — each with provenance and a declared role facet. Activation is scoped to what the document summons; name collisions are reported as diagnostics rather than resolved silently.
- **Binding**: two strata are computed for every macro invocation — the lexical candidates adjacent in the source, and the signature-exact hull licensed by the registry or by the document's own definitions. Agreement between them is computed; the result reports `resolved`, `ambiguous`, `conflict`, or `unknown`.
- **Expansion**: expansion output is derived content carrying its definition span, invocation span, and per-argument provenance. Circularity and non-convergence are typed diagnostics.
- **Document-tier knowledge**: definitions, and class or style files shipped with a document, are read by the definition tier and take precedence at binding time; they are never written back into the registry.

---

## 4. Package Shape

| Package               | Role                                                                                                                                                                                                                                                                                                                   |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `texdig`              | The engine: substrate, syntax, semantics, project graph, query/transform, intrinsic serializers, and validation contracts. No runtime dependencies.                                                                                                                                                                    |
| `@texdig/projections` | Format projections over one shared stage: TeXdig emits an HTML tree (hast) directly from the CST and its analyses, origin-mapped and record-driven; HTML is serialized from that tree, and Markdown is produced from it through the rehype/remark toolchain with math preserved as source TeX in dedicated math nodes. |
| `@texdig/cli`         | Command-line surface.                                                                                                                                                                                                                                                                                                  |

The HTML tree is the convergence point for projections: additional source lanes can be brought into the same tree shape and share the same terminals.

---

## 5. Lineage

TeXdig synthesizes the capabilities of **unified-latex** (record-driven argument binding, macro expansion, sub-language grammars, conversion pipelines) and **latex-utensils** (position-faithful typed syntax, strict parsing, bibliography and log grammars). The two descend from one ancestral PEG grammar; both are MIT-licensed, and attribution is recorded in `NOTICE`. Their outputs and test suites serve as comparison oracles.

The substrate's separation of location, occurrence, structure, derivation, provenance, and output follows the ontology of the **Doccer** interval-algebra engine. Doccer is a specification reference, not a dependency: the fixture families are language-neutral so it can consume them, but the engine verifies its own work and neither project gates the other.
