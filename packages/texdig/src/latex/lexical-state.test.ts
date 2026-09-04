import { describe, expect, it } from "vitest";

import { byteOffset } from "../source/span.js";
import { SourceSnapshot } from "../source/snapshot.js";
import { scanLatexLexicalStates } from "./lexical-state.js";

function scan(text: string) {
  const snapshot = new SourceSnapshot(new TextEncoder().encode(text), {
    sourceId: "lexical-state.tex",
    revision: 1,
  });
  return { snapshot, states: scanLatexLexicalStates(snapshot) };
}

function at(text: string, needle: string, fromIndex = 0): number {
  const offset = text.indexOf(needle, fromIndex);
  if (offset < 0) throw new Error(`missing test needle ${needle}`);
  return offset;
}

describe("LaTeX lexical states", () => {
  it("makes normal, @-letter, and expl3 control-name regimes explicit", () => {
    const text =
      "\\foo@bar \\makeatletter\\foo@bar\\makeatother \\ExplSyntaxOn\\foo_bar:n\\ExplSyntaxOff z";
    const { states } = scan(text);

    expect(states.stateAt(byteOffset(at(text, "@bar")))?.state).toBe("normal");
    expect(states.stateAt(byteOffset(at(text, "\\foo@bar", 10)))?.state).toBe("at-letter");
    expect(states.stateAt(byteOffset(at(text, "\\foo_bar:n")))?.state).toBe("expl3");
    expect(states.stateAt(byteOffset(text.length - 1))?.state).toBe("normal");
    expect(states.transitions.map((transition) => transition.ruleId)).toEqual([
      "makeatletter",
      "makeatother",
      "ExplSyntaxOn",
      "ExplSyntaxOff",
    ]);
  });

  it("treats environment and inline verbatim bodies as state runs", () => {
    const environment = "a\\begin{verbatim}\\makeatletter{x}%\\end{verbatim}b";
    const inline = "x\\verb|a%b|y";
    const env = scan(environment).states;
    const verb = scan(inline).states;

    expect(env.stateAt(byteOffset(at(environment, "\\makeatletter")))?.state).toBe("verbatim");
    expect(env.stateAt(byteOffset(at(environment, "\\end")))?.state).toBe("normal");
    expect(verb.stateAt(byteOffset(at(inline, "a%b")))?.state).toBe("verbatim");
    expect(verb.transitions.map((transition) => transition.ruleId)).toEqual([
      "verb",
      "verb-delimiter",
    ]);
  });

  it("retains an unclosed verbatim continuation as unknown plus an alternative", () => {
    const text = "x\\verb|abc";
    const { states } = scan(text);

    expect(states.stateAt(byteOffset(at(text, "abc")))?.state).toBe("unknown");
    expect(states.branches).toHaveLength(1);
    expect(states.branches[0]?.alternatives.map((alternative) => alternative.state)).toEqual([
      "unknown",
      "verbatim",
    ]);
  });

  it("uses an empty run sequence for empty input", () => {
    expect(scan("").states.runs).toEqual([]);
  });
});
