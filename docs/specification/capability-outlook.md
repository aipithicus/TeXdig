# Capability Outlook

Plausible directions and open design questions beyond the kernel contracts. Nothing here is a release commitment; each item follows the kernel tiers and is admitted through the placement questions in `docs/architecture/design-principles.md`.

---

## 1. Validation Plane

A validation model in which a subject (project, source, node, span, or artifact) accumulates independent, immutable **observations** rather than a single verdict. Each observation carries its capability (syntax, binding, compile, render, lint, round-trip, visual), the identity and version of the backend that produced it, a status (`pass`, `fail`, `unsupported`, `indeterminate`, `skipped`, `error`), preserved raw evidence, and artifact hashes. A separate profile decides what an operation requires.

Candidate backends, all as adapters outside the kernel: a TeX engine for compilation, dependency, and source-to-page correspondence evidence; a web-math renderer for dialect compatibility, with the project's macro closure supplied and honest `unsupported` classification; a PDF engine for artifact inspection; a TikZ renderer; Markdown linting for the Markdown projection; and static rule packs (structural and typographic checks) expressed as CST-aware diagnostics with optional fix providers.

## 2. Projections

- **HTML and Markdown terminals** in `@texdig/projections`: an origin-mapped HTML tree emitted directly from the CST and analyses, HTML serialized from it, Markdown produced through the rehype/remark toolchain with math preserved as source TeX in dedicated math nodes. Open question: how much origin information survives the HTML-to-Markdown hop, and whether a native handler set is needed for that step.
- **Additional source lanes.** The HTML tree is a natural convergence point for documents arriving in other forms — for example, HTML renderings of scientific papers, which present math as rendered glyphs and a flattened linear structure. Bringing such inputs into the same tree shape would also provide a comparison study for math-register normalization.
- **Further formats** as additional terminal hops off the shared tree.

## 3. Compile Side-Artifacts

A grammar for TeX and build-tool logs (file stacks, page numbers, error vocabulary) attached to a compile adapter, with raw logs retained beside structured output.

## 4. Formatter

A formatter built on the derived-content printer, admitted only if demand for lossless edits establishes it; formatting remains off the conversion path.

## 5. Command-Line Surface and Pipeline Interoperability

`@texdig/cli` as a thin surface over the engine's contracts. A bridge allowing external processing pipelines to invoke TeXdig follows their conventions as a guest artifact and is not part of the engine's namespace.
