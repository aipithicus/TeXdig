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

Start
  = _
    fixed:Dimension
    stretch:(_ "plus" _ value:RubberDimension { return value; })?
    shrink:(_ "minus" _ value:RubberDimension { return value; })?
    _
    !. { return node("glue", { fixed, stretch: stretch || null, shrink: shrink || null }); }

Dimension = value:Number _ unit:Unit { return node("dimension", { value, unit }); }

RubberDimension = value:Number _ unit:RubberUnit { return node("dimension", { value, unit }); }

Number = value:$([+-]? ([0-9]* "." [0-9]+ / [0-9]+)) { return value; }

RubberUnit
  = Unit
  / $("filll" / "fill" / "fil")

Unit = $("pt" / "mm" / "cm" / "in" / "ex" / "em" / "bp" / "pc" / "dd" / "cc" / "nd" / "nc" / "sp")

_ = [ \t\r\n]*
