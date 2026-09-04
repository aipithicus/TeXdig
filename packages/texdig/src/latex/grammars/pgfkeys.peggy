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

Start = tokens:Token* !. { return node("pgfkeys", { tokens }); }

Token
  = Group
  / Parenthesized
  / Comment
  / Comma
  / Equals
  / Whitespace
  / Text

Group
  = value:$("{" (Group / Parenthesized / Escaped / [^{}])* "}") { return node("group", { value }); }

Parenthesized
  = value:$("(" (Parenthesized / Group / Escaped / [^()])* ")") {
      return node("parenthesized", { value });
    }

Comment = value:$("%" [^\r\n]*) { return node("comment", { value }); }

Comma = value:"," { return node("comma", { value }); }

Equals = value:"=" { return node("equals", { value }); }

Whitespace = value:$[ \t\r\n]+ { return node("whitespace", { value }); }

Escaped = "\\" .

Text = value:$(![{},=()% \t\r\n] .)+ { return node("text", { value }); }
