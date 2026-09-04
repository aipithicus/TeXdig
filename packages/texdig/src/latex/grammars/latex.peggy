{
  function currentIndex() {
    return location().start.offset;
  }

  function checkBudget() {
    if (typeof options.checkBudget === "function") {
      options.checkBudget();
    }
  }

  function syntax() {
    checkBudget();
    return { kind: "syntax", index: currentIndex() };
  }
}

Document
  = items:TopItem* {
      checkBudget();
      return { kind: "document", items };
    }

Fragment
  = items:GroupItem* {
      checkBudget();
      return { kind: "fragment", items };
    }

TopItem
  = Group
  / UnexpectedClose
  / Syntax
  / Trivia
  / Residue

GroupItem
  = Group
  / Syntax
  / Trivia
  / Residue

Group
  = open:Open children:GroupItem* close:Close? {
      checkBudget();
      return close === null
        ? { kind: "unclosed-group", open, children }
        : { kind: "group", open, children, close };
    }

Open
  = "o" {
      checkBudget();
      return currentIndex();
    }

Close
  = "c" {
      checkBudget();
      return currentIndex();
    }

UnexpectedClose
  = "c" {
      checkBudget();
      return { kind: "unexpected-close", index: currentIndex() };
    }

Syntax
  = ControlWord
  / ControlSymbol
  / Paragraph
  / Star
  / Superscript
  / Subscript
  / Verbatim
  / Text

ControlWord = "w" { return syntax(); }

ControlSymbol = "y" { return syntax(); }

Paragraph = "p" { return syntax(); }

Star = "a" { return syntax(); }

Superscript = "u" { return syntax(); }

Subscript = "d" { return syntax(); }

Verbatim = "v" { return syntax(); }

Text = "x" { return syntax(); }

Trivia
  = "t" {
      checkBudget();
      return { kind: "trivia", index: currentIndex() };
    }

Residue
  = "r" {
      checkBudget();
      return { kind: "residue", index: currentIndex() };
    }
