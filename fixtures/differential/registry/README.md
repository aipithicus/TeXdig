# Registry differential cases

`beamer-arguments.tsv` retains the seven brace-delimiter signatures from the Beamer record at [the pinned source revision](https://github.com/siefkenj/unified-latex/blob/3c1350edbc8f13ccfbbd5d96919391fefa4d268d/packages/unified-latex-ctan/package/beamer/provides.ts). Source license: MIT; attribution is in the repository `NOTICE`.

Expected relationship: the parent's `xparse-argspec.pegjs` `brace_spec` reads two delimiter tokens. TeXdig must preserve the literal signature and its positional argument count; `{}` must not become one grouped delimiter. The former TeXdig parser rejected these cases and silently interpreted `d{}m` as one argument. Core regression tests also assert exact spans, adjacent arguments, nested defaults, modifiers, and control-sequence delimiters.

This is a source-shape differential, not an independent verification of Beamer semantics. The registry retains these assertions as `parent-asserted`, and no upstream module is executed by these tests.
