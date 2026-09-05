# Source activation and definitions

`texdig/definitions` analyzes a caller-supplied ordered list of source units. Each unit has a unique ID, an explicit `entrypoint`, `shipped-class`, or `shipped-style` role, and an existing `LatexParseResult`. The result retains every snapshot and leaves syntax, byte accounting, and realization unchanged.

```typescript
import { SourceSnapshot } from "texdig/source";
import { parseLatex } from "texdig/latex";
import { RegistryCatalog, CURATED_RECORDS, HARVESTED_RECORDS } from "texdig/registry";
import { analyzeDefinitions } from "texdig/definitions";

const parse = parseLatex(
  new SourceSnapshot(new TextEncoder().encode("\\newcommand\\hello[1]{Hello, #1!}\\hello{world}"), {
    sourceId: "example.tex",
    revision: 0,
  }),
);
const result = analyzeDefinitions(
  [{ id: "main", role: "entrypoint", parse }],
  new RegistryCatalog([...CURATED_RECORDS, ...HARVESTED_RECORDS]),
  { knownUndefined: [{ kind: "command", name: "hello", escapeToken: "\\" }] },
);
```

The default initial providers are `kernel:tex` and `kernel:latex2e`. Literal `documentclass`, `usepackage`, and `RequirePackage` summons activate known provider identities after their source occurrence. Activations retain their binding and scope. Unknown or computed names remain diagnostic observations. A mixed package list preserves each provider's outcome independently. Requested versions are source arguments; actual provider dates must be supplied through `providerVersions`. No include discovery, root selection, dependency closure, or package runtime simulation occurs.

The source pass is bounded to literal declarations and known lexical groups. It does not execute macros to discover new declarations, evaluate conditions, or simulate assignments. Conditional/dynamic control and currently unpaired environment scopes retain indeterminate declarations. Caller order is an explicit assumption, not proof of execution or reachability.

Definitions carry a form, declaration role, optional literal subject, source span, header evidence, scope, precondition, signature/parameter text, body sites, expansion availability, and diagnostics. Scope and source order determine document precedence over registry assertions; the lower registry selection remains inspectable. A root declaration can be visible in a subsequent ordered unit, while a group-local declaration cannot escape its group. Global primitive definitions survive group exits. Aliases capture the document meaning visible at assignment time.

| Disposition     | Meaning                                                                                              |
| :-------------- | :--------------------------------------------------------------------------------------------------- |
| `installed`     | A supported literal declaration with satisfied preconditions contributes to the bounded source model |
| `skipped`       | A provide operation found an existing definition                                                     |
| `rejected`      | A known precondition failed                                                                          |
| `deferred`      | The declaration occurs as tokens in an unevaluated argument or definition body                       |
| `indeterminate` | Authority, syntax, context, preconditions, or implementation are insufficient                        |

Catalog absence never establishes undefinedness. `knownUndefined` supplies explicit initial facts; an observed definition takes precedence over those initial facts. `new`, `renew`, `provide`, unconditional declarations, aliases, and global scope are retained separately. Unknown definitions never license an invocation hull. Each scoped invocation also has an explicit `invocation`, `declaration`, or `unclassified` role; declaration occurrences are not ordinary content invocations.

Supported readers cover classic command/environment declarations, document-command/environment argument specifications, primitive parameter sequences with flat literal delimiters, and simple token aliases. Classic optional brackets have their own non-nesting rule. Replacement parameters and body lexical residue are checked. Definition discovery is broader than expansion: expanded definitions (`edef`/`xdef`), robust wrappers, constructor declarations, dynamic names, and unsupported argument languages retain their source evidence and explicit unavailable status.

Theorem, math-operator, and paired-delimiter constructors gain a declaration role only through selected registry facts. Other spellings resembling declarations remain unclassified candidates. No fact inferred from a document is written into the registry. Constructor execution and a general expansion engine are separate consumers.

The curated facts cite the pinned [LaTeX sources](https://github.com/latex3/latex2e/tree/20a58e9da170677b33916b27cdfa71f7768a93f4), [TeX source](https://github.com/TeX-Live/texlive-source/blob/bb984049b0b66e1be0370ad161c57db1f09ba585/texk/web2c/tex.web), and [mathematical constructor documentation](https://github.com/latex3/mathtools/blob/23e4b518e825f1afc60985b137c6fc17b870cac9/mathtools.dtx). Records retain exact source digests and locations. These are language facts, with no implementation code copied.
