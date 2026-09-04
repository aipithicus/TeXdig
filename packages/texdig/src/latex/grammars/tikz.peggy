{
  function checkBudget() {
    if (typeof options.checkBudget === "function") options.checkBudget();
  }
  function node(type, fields = {}) {
    checkBudget();
    const where = location();
    return { type, start: where.start.offset, end: where.end.offset, ...fields };
  }
}

Path = tokens:Token* !. { return node("tikz-path", { tokens }); }

Token
  = Comment
  / Options
  / Group
  / Coordinate
  / Curve
  / Line
  / Macro
  / Word
  / Whitespace
  / Raw

Comment = value:$("%" [^\r\n]*) { return node("comment", { value }); }

Options
  = value:$("[" (Options / Group / Escaped / [^\[\]])* "]") { return node("options", { value }); }

Group = value:$("{" (Group / Escaped / [^{}])* "}") { return node("group", { value }); }

Coordinate
  = prefix:$("++" / "+")? value:$("(" (Group / Escaped / [^()])* ")") {
      return node("coordinate", { prefix: prefix || null, value });
    }

Curve = value:".." { return node("curve-marker", { value }); }

Line = value:$("--" / "|-" / "-|") { return node("line-operation", { value }); }

Macro = value:$("\\" ([a-zA-Z]+ / .)) { return node("macro", { value }); }

Word = value:$[a-zA-Z]+ { return node("operation", { value }); }

Whitespace = value:$[ \t\r\n]+ { return node("whitespace", { value }); }

Escaped = "\\" .

Raw = value:. { return node("raw", { value }); }
