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

Start = items:Item* !. { return node("tabular-spec", { items }); }

Item
  = Whitespace
  / Repetition
  / Decorated
  / Divider
  / Parbox
  / Alignment

Whitespace = value:$[ \t\r\n]+ { return node("whitespace", { value }); }

Alignment = value:$[lcrX] { return node("alignment", { value }); }

Parbox = baseline:$[pmbwW] _ size:Group { return node("parbox", { baseline, size }); }

Divider = value:"|" { return node("vertical-divider", { value }); }

Decorated = marker:$[!@><] _ content:Group { return node("decorator", { marker, content }); }

Repetition
  = "*" _ count:Group _ specification:Group { return node("repetition", { count, specification }); }

Group = value:$("{" (Group / Escaped / [^{}])* "}") { return value; }

Escaped = "\\" .

_ = [ \t\r\n]*
