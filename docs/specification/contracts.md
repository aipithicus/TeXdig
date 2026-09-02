# Kernel Contracts

This document states the contracts the TeXdig engine is built to. Implementation proceeds in dependency order; source and the verification suite are the evidence of what is implemented at any point.

---

## 1. Source and Coordinates

- Source text is stored once. Concrete syntax nodes reference half-open ranges into it.
- Byte, UTF-16, scalar, and line/column coordinates are derived through the source document, not stored on nodes.
- Rebasing between coordinate spaces is explicit and checked. Out-of-window geometry is rejected, never clamped.
- Original bytes are preserved. Line endings, byte-order marks, and non-UTF-8 material are recorded as facts.

## 2. Accounting

- Every source byte is represented by a syntax node or by explicit recovery residue.
- The accounting is part of the parse result and is checked at the result boundary.

## 3. Semantic Objects and Origins

- Semantic objects (bound arguments, expansions, classifications) never masquerade as source nodes.
- They carry origins, which may be discontiguous or derived from a definition plus invocation arguments.

## 4. Non-Mutation

- Syntax is immutable after parsing. Binding, expansion, classification, typography, and conversion are overlays or projections.

## 5. Realization

- Exact realization of source is an unchanged slice of the original bytes plus explicit edits.
- Two serializers exist, by role: source realization (slices, never reconstructs) and derived-content printing (typed printers proven by round-trip tests).
- Formatting is a separate, intentional rewriting operation.

## 6. Diagnostics

- Recovery always produces structured diagnostics with spans. No logging channel, silent null, or synthetic content stands in for a diagnostic.

## 7. Expansion

- Expansion output is derived content carrying definition span, invocation span, and per-argument provenance.
- Circularity and non-convergence are typed diagnostic outcomes.

## 8. Execution Boundary

- Full TeX execution is not promised. Dynamic catcodes and unknowable expansion produce explicit uncertainty unless a profile or an external compile witness resolves them.

## 9. Destination Demand

- The destination's demand sets the recovery bar. Structure recovered beyond what a destination requires is enrichment: opt-in, separately priced, never on the critical path.

---

## 10. Registry Contract

- A registry record states a **language-tier fact**: a property of a package, class, or the kernel as published, cited to package documentation, a package source file, or an authoritative harvest. Every record carries provenance.
- Record facets are declared by role: `signature`, argument language, content processing, classification, serialization hint, documentation. Parse-affecting facets are never filed as rendering hints.
- Activation is scoped to what the document summons (`\documentclass`, `\usepackage`, `\RequirePackage`). Name collisions between active providers are diagnostics, never resolved by insertion order.
- Precedence at binding: document-tier definitions and document-shipped style files, then house records, then upstream-derived records.
- Document-tier knowledge is read by the definition tier and is never written back to the registry.
- Records are TypeScript typed literals in one format regardless of author; harvest pipelines emit TypeScript with a generated-file header and per-record provenance.

## 11. Binding Contract

- Two strata are computed for each invocation: the lexical candidates adjacent in source (the upper bound on what the macro could consume) and the signature-exact hull licensed by an active record or a document definition.
- Agreement between strata is computed. The result reports `resolved`, `ambiguous`, `conflict`, or `unknown` with the evidence and assumptions that produced it.
- Lexical catcode state (at-letter and expl3 regions) is a lexer mode driven by tracked regions, not a post-hoc repair of names.

## 12. Environments and Math Roles

- Environments are objects with attached arguments and bodies; begin/end pairing is strict and pairing failures are residue.
- Math environment roles (display carrier versus interior) are record-driven, not grammar-frozen.

## 13. Typography

- The typographic surjection (ligatures, quotes, dashes, spacing, accent macros to Unicode) is table-driven, mode-gated, and independent of tokenization granularity.

## 14. Bibliography

- `.bib` files are parsed and resolved (`@string`, concatenation, cross-references) as declarations.
- Styled `.bbl` files are read as an envelope — entry boundaries, keys, labels, and order across the `\bibitem` and `\harvarditem` vocabularies — with entry bodies passing through the standard prose realization. Field-level structure recovery from styled output is opt-in enrichment.
- biber-format `.bbl` files (`\entry`/`\field`) are rendered from fields under one declared convention, and the output is marked generated rather than transcribed.
