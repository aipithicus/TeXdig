# Scope & Non-Goals

Features and roles the engine deliberately does not take on. Each is a boundary, not an oversight; several have a designated home elsewhere.

---

- **Full TeX execution.** TeXdig is a static language engine. Dynamic catcodes, conditional expansion, and other execution-dependent behavior produce explicit uncertainty; an external compile witness may resolve them, the engine does not emulate them.
- **Ecosystem tree vocabularies as the kernel's data model.** unist, hast, and mdast are projection targets. The kernel's syntax and evidence tiers carry invariants (mandatory spans, immutability, typed diagnostics) those vocabularies do not express.
- **Formatting on the conversion path.** Source realization slices bytes; formatting is a separate, intentional rewrite.
- **Page geometry and PDF layout.** Two-dimensional layout belongs to a separate spatial model connected to source through correspondence data, not to one-dimensional spans.
- **Document-specific knowledge in the registry.** The registry holds language-tier facts about packages and the kernel. A document's own definitions and shipped style files are read at binding time and never persisted as registry records.
- **Field-level recovery from styled bibliographies as a dependency of conversion.** Recovering structured fields from typeset `.bbl` text is opt-in enrichment.
- **A Markdown converter as the product identity.** Markdown is one projection among siblings emitted from the engine.
- **A command-line tool or pipeline bridge ahead of demand.** `@texdig/cli` and any interoperability bridge for external processing pipelines follow the kernel, not the other way around.
