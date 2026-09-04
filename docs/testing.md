# Verification & Testing

TeXdig's verification approach combines deterministic property tests over the kernel with differential comparison against the parent projects and a separate, external stress-corpus loop.

---

## 1. Verification Philosophy

- **Deterministic tiers are proven by tests, not by runtime witnesses.** Tokenization, span arithmetic, rebasing, and unambiguous grammar productions carry identity and partition invariants checked in the suite.
- **Every byte accounted.** Parse results are checked for total accounting: each source byte is covered by a node or by explicit residue.
- **Parents are correlated oracles.** unified-latex and latex-utensils outputs and test cases are comparison oracles labeled with producer lineage; the two share grammar ancestry, so their agreement is weaker evidence than independence would provide. Divergences are explained, never assumed.
- **Negative specifications.** Fixtures state what must _not_ be classified as a defect — a legal renewal, a vendored class definition, a disconnected duplicate subtree — as explicitly as what must be detected.
- **The engine checks its own work.** Verification never depends on another project executing anything. Fixture families are language-neutral so sibling engines can consume them, but every gate here is satisfied by this repository alone.

---

## 2. Verification Categories

| Category                         | Purpose                                                                                 | Examples                                                                                            |
| :------------------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| **Identity tests**               | Parse → realize reproduces input byte-exactly                                           | CRLF and LF sources, non-UTF-8 material, BOM, Unicode scalars                                       |
| **Accounting tests**             | Total byte coverage by node or residue                                                  | malformed input, unterminated math, mismatched environments                                         |
| **Invariant tests**              | Structural guarantees hold across operations                                            | coordinate-space isolation on rebase, immutability of syntax, span arithmetic on string splits      |
| **Differential tests**           | Comparison against parent outputs with lineage labels                                   | grammar productions, argument attachment, expansion results                                         |
| **Negative-specification tests** | Properties that must be preserved or distinguished, not flagged                         | document-shipped definitions vs. registry material, physical vs. reachable duplication              |
| **Conformance fixtures**         | Twelve generated, language-neutral fixture families checked against independent oracles | UTF-8, span, snapshot, topology, slice, occurrence, selection, coverage, rebasing, and pairing laws |

---

## 3. Fixture Tiers

| Directory                 | Contents                                                                                 |
| :------------------------ | :--------------------------------------------------------------------------------------- |
| `fixtures/differential/`  | Cases ported from the parents' test suites, with attribution                             |
| `fixtures/negative-spec/` | Synthetic fixtures that isolate one property each                                        |
| `fixtures/demo/`          | A small set of complete, license-cleared documents                                       |
| `fixtures/conformance/`   | Line-oriented source and region laws with explicit rows and deterministic census digests |

Fixtures are byte-exact; `.gitattributes` marks `fixtures/**` as `-text` so line endings are never normalized.

---

## 4. External Corpus Runs

Larger corpora of real documents are exercised by downstream applications that consume the engine as a dependency and own their corpus, batch execution, run hygiene, and artifacts. Those runs are not part of this repository and are not CI gates; they inform development iteration and the selection of properties for `fixtures/negative-spec/`. The engine exposes only its programmatic API for this purpose — no corpus runner ships here.

---

## 5. Running the Suites

```powershell
pnpm test
pnpm conformance:check
pnpm conformance:check:deep
pnpm conformance:deep
```

Unit tests are colocated as `*.test.ts`; cross-package differential and negative-specification suites live under `tests/`.
The ordinary test command runs the default conformance tier: every explicit family, the 346,200 UTF-8 class sequences through length four, the seeded UTF-8 random census, the 500-case occurrence lookup and batch-rebasing census, the 500-case occurrence-selection Boolean census, the 500-case SpanSet bitmap and rebasing census, and all 5,461 strict-stack pairing words through length six. `conformance:check` regenerates default-tier fixture content and validates the retained deep digest header and count without recomputing its value.

`conformance:deep` concurrently recomputes all fixture digests and checks the 7,962,624 length-five UTF-8 class sequences against the oracle and source implementation. It shards source validation across a bounded number of processes; `TEXDIG_CONFORMANCE_WORKERS` overrides that count for diagnosis. The dedicated Ubuntu workflow reports a result for every pull request, but runs the census only when executable UTF-8 decoding, class-oracle, digest-canonicalization, deep-runner, or toolchain inputs change; region-only fixture work exits after the diff check. It also runs nightly on `main`, on relevant `main` pushes, on version tags, and on manual request. A release requires a deep result for the release commit.
