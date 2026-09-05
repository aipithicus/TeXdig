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

Start = _ specs:(spec:Spec _ { return spec; })* !. { return node("argspec", { specs }); }

Spec
  = modifiers:$[+!]*
    core:(
      "m" { return { code: "m" }; }
      / "b" { return { code: "b" }; }
      / "s" { return { code: "s" }; }
      / "o" { return { code: "o" }; }
      / "v" delimiter:Delimiter { return { code: "v", delimiter }; }
      / "O" _ defaultValue:Group { return { code: "O", defaultValue }; }
      / "t" token:Delimiter { return { code: "t", token }; }
      / "u" stop:Delimiter { return { code: "u", stop }; }
      / code:$[dr] open:DelimiterToken close:DelimiterToken { return { code, open, close }; }
      / code:$[DR] open:DelimiterToken close:DelimiterToken _ defaultValue:Group {
          return { code, open, close, defaultValue };
        }
      / "e" _ tokens:Group { return { code: "e", tokens }; }
      / "E" _ tokens:Group _ defaults:Group { return { code: "E", tokens, defaults }; }
    ) { return node("argument", { modifiers, ...core }); }

// A delimiter pair consists of two tokens. In particular, {} is a pair,
// never a grouped value; defaults and until-stop forms still use Group.
DelimiterToken
  = Macro
  / value:$(![ \t\r\n] .) { return value; }

Delimiter
  = Group
  / Macro
  / value:$(![ \t\r\n{}] .) { return value; }

Group = value:$("{" (Group / Macro / [^{}])* "}") { return value; }

Macro = value:$("\\" ([a-zA-Z]+ / .)) { return value; }

_ = [ \t\r\n]*
