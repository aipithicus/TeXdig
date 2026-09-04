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

Start = _ value:(Extended / NumericSpec / HexSpec / Color) _ !. { return value; }

Extended
  = model:Name
    divisor:(_ "," _ value:Number { return value; })?
    _
    ":"
    _
    first:Weighted
    rest:(_ ";" _ value:Weighted { return value; })* {
      return node("extended-color", {
        model,
        divisor: divisor || null,
        weighted: [first, ...rest],
      });
    }

Weighted = color:Color _ "," _ weight:Number { return node("weighted-color", { color, weight }); }

Color
  = prefix:$"-"* name:Name mixes:Mix* postfix:Postfix? functions:FunctionCall* {
      return node("color", { prefix, name, mixes, postfix: postfix || null, functions });
    }

Mix
  = "!" !"!" percent:Number? name:("!" !"!" value:Name { return value; })? {
      return node("mix", { percent: percent || null, name: name || null });
    }

Postfix
  = "!![" value:Integer "]" { return node("postfix-index", { value }); }
  / "!!" value:$"+"+ { return node("postfix-series", { value }); }

FunctionCall
  = ">" name:Name args:(_ "," _ value:Integer { return value; })* {
      return node("function", { name, args });
    }

NumericSpec
  = first:Number rest:((_* "," _* / [ \t\r\n]+) value:Number { return value; })+ {
      return node("numeric-spec", { values: [first, ...rest] });
    }

HexSpec
  = value:$([0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) ![0-9a-zA-Z] {
      return node("hex-spec", { value });
    }

Name = $("." / [a-zA-Z0-9]+)

Number = $([+-]? ([0-9]+ ("." [0-9]*)? / "." [0-9]+))

Integer = $("-"? [0-9]+)

_ = [ \t\r\n]*
