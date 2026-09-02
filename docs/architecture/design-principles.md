# Design Principles

TeXdig's architecture is organized around five principles. They explain the shape of the engine and supply the questions used to evaluate additions; they are not a closed list of every form the engine may take.

---

## 1. Five Principles

### I. Every Byte Is Accounted For

Each source byte is represented by a syntax node or by explicit recovery residue. The accounting is an invariant of the parse result and is checked at the result boundary, not maintained as a separate runtime accounting system.

### II. Analysis Never Mutates

Syntax is immutable once parsed. Binding, expansion, classification, typography, and conversion are overlays or projections. Exact realization of source is a slice of the original bytes plus explicit edits; formatting is a separate, intentional rewriting operation and is never on the conversion path.

### III. Knowledge-Dependent Facts Carry Evidence

Where a result depends on knowledge — which package provides a macro, how many arguments it takes, what a definition expands to — the result carries its licensing source and a resolution status. Evidence is proportional to the question:

- deterministic operations (tokenization, span arithmetic, rebasing) are proven by tests, not by runtime witnesses;
- knowledge-dependent judgments carry a source and a status;
- claims about the external world (compilation, rendering) carry full observations with backend identity.

An evidence structure exists only if some consumer branches on it.

### IV. Recovery and Uncertainty Are Structured Results

Malformed input, unknown macros, dynamic catcodes, and unknowable expansion produce typed diagnostics and explicit uncertainty. Nothing is repaired silently, dropped silently, or replaced with synthetic content.

### V. Knowledge Is Stored Once, in One Form per Kind, with Provenance

Registry records are TypeScript typed literals whether curated by hand or emitted by a harvest pipeline, so the whole knowledge store is compiler-checked and uniformly importable. Every record cites its authority. Document-shipped definitions belong to the document tier and never enter the registry.

---

## 2. Questions for Core Placement

When deciding whether a capability or dependency belongs in the engine, the following questions distinguish a stable kernel mechanism from projection- or adapter-level behavior:

1. **Determinism**: Does the operation produce repeatable results for identical inputs under an explicit policy?
2. **Moat**: Does an existing library own this problem domain with accumulated edge-case knowledge that would otherwise be re-earned one bug at a time? If so, adoption at the right tier is preferred over reimplementation.
3. **Tier fit**: Can the capability satisfy the invariants of the tier it would join — mandatory spans, immutability, typed diagnostics in the kernel? Ecosystem tree vocabularies are projection targets, never the kernel's model.
4. **Source and evidence preservation**: Does it retain exact coordinates, provenance, and unresolved residue appropriate to its contract?
5. **Domain separation**: Is the mechanism independent of any single destination format, or does it belong in a projection or adapter?

These are placement questions, not permanent exclusions. An incomplete answer may justify further contract work, an exploratory implementation, or an adapter-level home.
