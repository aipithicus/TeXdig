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

Start = tokens:Token* !. { return node("alignment", { tokens }); }

Token
  = RowSeparator
  / ColumnSeparator
  / Group
  / Comment
  / Text

RowSeparator = value:$("\\\\" / "\\cr" ![a-zA-Z]) { return node("row-separator", { value }); }

ColumnSeparator = value:"&" { return node("column-separator", { value }); }

Group = value:$("{" (Group / Escaped / [^{}])* "}") { return node("group", { value }); }

Comment = value:$("%" [^\r\n]*) { return node("comment", { value }); }

Escaped = "\\" .

Text
  = value:$(!("\\\\" / "\\cr" ![a-zA-Z] / "&" / "{" / "%") .)+ { return node("text", { value }); }
