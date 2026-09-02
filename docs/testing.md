# Verification & Testing

TeXdig's verification approach combines deterministic property tests over the kernel with differential comparison against the parent projects and a separate, external stress-corpus loop.

---

## 1. Verification Philosophy

- **Deterministic tiers are proven by tests, not by runtime witnesses.** Tokenization, span arithmetic, rebasing, and unambiguous grammar productions carry identity and partition invariants checked in the suite.
- **Every byte accounted.** Parse results are checked for total accounting: each source byte is covered by a node or by explicit residue.
- **Parents are correlated oracles.** unified-latex and latex-utensils outputs and test cases are comparison oracles labeled with producer lineage; the two share grammar ancestry, so their agreement is weaker evidence than independence would provide. Divergences are explained, never assumed.
- **Negative specifications.** Fixtures state what must _not_ be classified as a defect — a legal renewal, a vendored class definition, a disconnected duplicate subtree — as explicitly as what must be detected.

---

## 2. Verification Categories

| Category                         | Purpose                                                                  | Examples                                                                                       |
| :------------------------------- | :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Identity tests**               | Parse → realize reproduces input byte-exactly                            | CRLF and LF sources, non-UTF-8 material, BOM, Unicode scalars                                  |
| **Accounting tests**             | Total byte coverage by node or residue                                   | malformed input, unterminated math, mismatched environments                                    |
| **Invariant tests**              | Structural guarantees hold across operations                             | coordinate-space isolation on rebase, immutability of syntax, span arithmetic on string splits |
| **Differential tests**           | Comparison against parent outputs with lineage labels                    | grammar productions, argument attachment, expansion results                                    |
| **Negative-specification tests** | Properties that must be preserved or distinguished, not flagged          | document-shipped definitions vs. registry material, physical vs. reachable duplication         |
| **Conformance fixtures**         | Language-neutral fixtures shared with the Doccer interval-algebra engine | span, slice, topology, coverage, and origin operations                                         |

---

## 3. Fixture Tiers

| Directory                 | Contents                                                     |
| :------------------------ | :----------------------------------------------------------- |
| `fixtures/differential/`  | Cases ported from the parents' test suites, with attribution |
| `fixtures/negative-spec/` | Synthetic fixtures that isolate one property each            |
| `fixtures/demo/`          | A small set of complete, license-cleared documents           |

Fixtures are byte-exact; `.gitattributes` marks `fixtures/**` as `-text` so line endings are never normalized.

---

## 4. External Stress Corpus

A larger corpus of real documents is exercised through a harness that takes the corpus root as configuration. The corpus and its run outputs are not part of the repository and are not CI gates; the harness is. Results feed development iteration and fixture selection.

---

## 5. Running the Suites

```powershell
pnpm test
```

Unit tests are colocated as `*.test.ts`; cross-package differential and negative-specification suites live under `tests/`.
