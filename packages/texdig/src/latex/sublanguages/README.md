# Bounded syntax checkpoints

Each parser in this directory consumes one explicitly bounded source span. A
successful root covers that complete frame and every generated UTF-16 location
is mapped back to the caller's byte coordinate basis. Unsupported closed
syntax and invalid UTF-8 are typed residue; strict mode rejects either without
discarding the inspectable result.

The checkpoints deliberately stop at syntax:

- argspec retains `+` and `!` modifiers and structured delimiter/default data;
- alignment exposes group-protected column and row separator spans;
- glue recognizes signed fixed, stretch, and shrink dimensions and rejects
  unsupported units;
- tabular recognizes alignment, divider, decorator, parbox, and repetition
  forms and rejects unsupported column forms;
- xcolor retains mix, weighted, postfix, and function structure but does not
  import named-color knowledge;
- pgfkeys keeps ordered tokens, duplicate keys, comments, and separators; an
  object projection would be a later derived view;
- TikZ keeps recognized path forms and explicit raw tokens inside the argument
  frame, independently of any printer;
- BibTeX keeps entries, declarations, values, comments, whitespace, and raw
  top-level material. Project-level bibliography resolution is later work.

LaTeX log parsing is intentionally absent. It belongs to the Phase 8 compile
adapter, where the raw log remains attached to every parsed observation.
