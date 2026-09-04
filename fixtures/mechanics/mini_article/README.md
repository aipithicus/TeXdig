# `mini_article` mechanics fixtures

These files prove the bounded Phase 3 mechanics contract, not general LaTeX coverage. They are byte-exact inputs protected by the repository-wide `fixtures/** -text` rule.

| Fixture | Purpose |
| :--- | :--- |
| `lf.tex` | LF line endings, comments, control words, and balanced groups |
| `crlf.tex` | The same mechanics with CRLF retained byte-for-byte |
| `unicode.tex` | Multi-byte UTF-8 scalars in text and a group |
| `malformed-byte.tex` | Valid text surrounding a literal `FF` invalid byte |
| `empty.tex` | Empty source and the zero-entry ledger |
| `all-node.tex` | Every byte belongs to syntax or first-class trivia; no residue |
| `all-residue.tex` | Literal bytes `80 FF FE`; every byte is explicit invalid-byte residue |

Regenerate the seven inputs with `pnpm mechanics:fixtures:generate`. The script writes fixed bytes and no timestamps.
