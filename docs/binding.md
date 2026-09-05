# Argument binding

`texdig/binding` builds immutable semantic views over a `LatexParseResult`. Syntax, byte accounting, residue, and exact source realization remain unchanged.

```typescript
import { SourceSnapshot } from "texdig/source";
import { parseLatex } from "texdig/latex";
import { RegistryCatalog, HARVESTED_RECORDS, CURATED_RECORDS } from "texdig/registry";
import { bindLatex } from "texdig/binding";

const snapshot = new SourceSnapshot(new TextEncoder().encode("\\section[Short]{Long}"), {
  sourceId: "example.tex",
  revision: 0,
});
const catalog = new RegistryCatalog([...HARVESTED_RECORDS, ...CURATED_RECORDS]);
const result = bindLatex(parseLatex(snapshot), catalog, { providerIds: ["kernel:latex2e"] });
```

Each invocation retains its snapshot, command span, exact name, enclosing scope, and lexical candidates. Candidates are a window into a shared sibling-token sequence, including trivia; they are an upper bound, not a consumption claim. Text runs are viewed as Unicode scalar tokens without splitting source byte sequences. Groups retain their source spans and children.

| Agreement   | Meaning                                                                        |
| :---------- | :----------------------------------------------------------------------------- |
| `resolved`  | Selected knowledge licenses the observed arguments and exact hull              |
| `ambiguous` | Competing semantic interpretations remain; reserved for source-scope consumers |
| `conflict`  | Assertions disagree or a required argument constraint fails                    |
| `unknown`   | Authority, version, applicability, strategy, or syntax is insufficient         |

Only resolved bindings carry a licensed hull. Source arguments have full and content spans; empty content is distinct from optional absence. Booleans, defaults, absence, and missing required material are typed outcomes. Defaults carry no fabricated source span; their authority is the retained licensing assertion. Parent assertions remain labelled assumptions even when their pattern binds mechanically.

The interpreter covers mandatory tokens/groups, optional/star/token tests, paired delimiters, structured defaults, complete multi-token until delimiters, embellishments, paragraph acceptance through `+`, and optional-space control through `!`. One unbraced mandatory argument consumes one TeX token; a recursively attached macro hull is not one token. The comparison authority is the [LaTeX document-command guide](https://www.latex-project.org/help/documentation/usrguide.pdf); parent fixtures remain correlated evidence.

Body arguments require a paired environment context. The inherited fixed-delimiter `v` pattern and custom Listings, Minted, and TikZ argument strategies remain unavailable. Unknown lexical state, invalid source bytes, and unclosed enclosing groups produce typed uncertainty. Source activation, definitions, expansion, and full TeX execution are separate concerns.

`normalizeArgumentPattern` is shared by binding consumers and registry harvesting. It consumes the existing argspec facade and preserves structured patterns. Unsupported grammar input is rejected without installing a second grammar. The stored vocabulary is bounded and does not claim every contemporary document-command extension.
