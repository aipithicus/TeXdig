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

Bibliography = items:Item* !. { return node("bibliography", { items }); }

Item
  = StringEntry
  / PreambleEntry
  / CommentEntry
  / BasicEntry
  / PercentComment
  / Whitespace
  / Raw

StringEntry
  = "@" "string"i _ "{" _ name:Name _ "=" _ value:Value _ "}" {
      return node("string-entry", { name, value });
    }
  / "@" "string"i _ "(" _ name:Name _ "=" _ value:Value _ ")" {
      return node("string-entry", { name, value });
    }

PreambleEntry
  = "@" "preamble"i _ "{" _ value:Value _ "}" { return node("preamble-entry", { value }); }
  / "@" "preamble"i _ "(" _ value:Value _ ")" { return node("preamble-entry", { value }); }

CommentEntry
  = "@" "comment"i _ value:(Braced / Parenthesized) { return node("comment-entry", { value }); }

BasicEntry
  = "@" entryType:Identifier _ "{" _ key:Key? _ "," _ fields:FieldList? _ "}" {
      return node("entry", { entryType, key: key || null, fields: fields || [] });
    }
  / "@" entryType:Identifier _ "(" _ key:Key? _ "," _ fields:FieldList? _ ")" {
      return node("entry", { entryType, key: key || null, fields: fields || [] });
    }

FieldList
  = first:Field rest:(_ "," _ field:Field { return field; })* _ ","? { return [first, ...rest]; }

Field = name:Identifier _ "=" _ value:Value { return node("field", { name, value }); }

Value
  = Concat
  / AtomicValue

Concat
  = first:AtomicValue rest:(_ "#" _ value:AtomicValue { return value; })+ {
      return node("concat", { values: [first, ...rest] });
    }

AtomicValue
  = BracedValue
  / QuotedValue
  / NumberValue
  / Abbreviation

BracedValue = value:Braced { return node("braced-value", { value }); }

QuotedValue
  = value:$("\"" (Braced / Escaped / [^\"{}])* "\"") { return node("quoted-value", { value }); }

NumberValue = value:$[+-]? [0-9]+ { return node("number", { value }); }

Abbreviation = value:Name { return node("abbreviation", { value }); }

Braced = $("{" (Braced / Escaped / [^{}])* "}")

Parenthesized = $("(" (Parenthesized / Braced / Escaped / [^()])* ")")

Escaped = "\\" .

Identifier = $[a-zA-Z_]+

Key = $[^, \t\r\n{}()]+

Name = $[^%@={}()\"#, \t\r\n]+

PercentComment = value:$("%" [^\r\n]*) { return node("comment", { value }); }

Whitespace = value:$[ \t\r\n]+ { return node("whitespace", { value }); }

Raw = value:. { return node("raw", { value }); }

_ = ([ \t\r\n] / "%" [^\r\n]*)*
