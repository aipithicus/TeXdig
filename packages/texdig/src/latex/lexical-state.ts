/** LaTeX name-regime and verbatim runs over one immutable source snapshot. */

import {
  StateRunSequence,
  type StateBranchDefinition,
  type StateLabel,
  type StateRunDefinition,
  type StateTransitionDefinition,
} from "../regions/index.js";
import { byteOffset, byteSpan, type ByteSpan, type SourceSnapshot } from "../source/index.js";

export type LatexLexicalState = "normal" | "at-letter" | "expl3" | "verbatim";

interface StateChange {
  readonly transition: number;
  readonly boundary: number;
  readonly to: StateLabel<LatexLexicalState>;
}

interface VerbatimOpening {
  readonly end: number;
  readonly closing: string;
  readonly ruleId: string;
}

const PRODUCER = Object.freeze({ id: "latex-lexical-state", version: "1" });

function isAsciiLetter(value: number | undefined): boolean {
  return (
    value !== undefined && ((value >= 0x41 && value <= 0x5a) || (value >= 0x61 && value <= 0x7a))
  );
}

function isNameCharacter(value: number | undefined, state: LatexLexicalState): boolean {
  return (
    isAsciiLetter(value) ||
    (state === "at-letter" && value === 0x40) ||
    (state === "expl3" && (value === 0x40 || value === 0x5f || value === 0x3a))
  );
}

function isLineEnding(value: number | undefined): boolean {
  return value === 0x0a || value === 0x0d;
}

function isInlineDelimiter(value: number | undefined): boolean {
  return value !== undefined && value !== 0x09 && value !== 0x20 && !isLineEnding(value);
}

function asciiEquals(bytes: Uint8Array, start: number, value: string): boolean {
  if (start < 0 || start + value.length > bytes.length) {
    return false;
  }
  for (let offset = 0; offset < value.length; offset++) {
    if (bytes[start + offset] !== value.charCodeAt(offset)) {
      return false;
    }
  }
  return true;
}

function asciiSlice(bytes: Uint8Array, start: number, end: number): string {
  let result = "";
  for (let index = start; index < end; index++) {
    const value = bytes[index];
    if (value === undefined) {
      throw new RangeError(`missing byte ${String(index)}`);
    }
    result += String.fromCharCode(value);
  }
  return result;
}

function findAscii(bytes: Uint8Array, value: string, start: number): number {
  for (let index = start; index + value.length <= bytes.length; index++) {
    if (asciiEquals(bytes, index, value)) {
      return index;
    }
  }
  return -1;
}

function verbatimEnvironmentOpening(bytes: Uint8Array, commandEnd: number): VerbatimOpening | null {
  if (asciiEquals(bytes, commandEnd, "{verbatim}")) {
    return {
      end: commandEnd + "{verbatim}".length,
      closing: "\\end{verbatim}",
      ruleId: "begin-verbatim",
    };
  }
  if (asciiEquals(bytes, commandEnd, "{verbatim*}")) {
    return {
      end: commandEnd + "{verbatim*}".length,
      closing: "\\end{verbatim*}",
      ruleId: "begin-verbatim-star",
    };
  }
  return null;
}

/**
 * Scan only the constructs that alter lexical interpretation. The result is a
 * sparse sequence of maximal runs, not a per-byte mask. Unclosed verbatim input
 * becomes an explicit `unknown` continuation with a retained verbatim branch.
 */
export function scanLatexLexicalStates(
  snapshot: SourceSnapshot,
): StateRunSequence<LatexLexicalState> {
  const bytes = snapshot.copyBytes();
  const transitions: StateTransitionDefinition<LatexLexicalState>[] = [];
  const changes: StateChange[] = [];
  const branches: StateBranchDefinition<LatexLexicalState>[] = [];
  let current: StateLabel<LatexLexicalState> = "normal";
  const currentState = (): StateLabel<LatexLexicalState> => current;

  const addTransition = (
    from: StateLabel<LatexLexicalState>,
    to: StateLabel<LatexLexicalState>,
    boundary: number,
    evidenceSpan: ByteSpan,
    kind: StateTransitionDefinition<LatexLexicalState>["kind"],
    ruleId: string,
  ): number => {
    const transition = transitions.length;
    transitions.push(
      Object.freeze({
        boundary: byteOffset(boundary),
        evidenceSpan,
        from,
        to,
        kind,
        ruleId,
      }),
    );
    return transition;
  };

  const changeState = (
    to: StateLabel<LatexLexicalState>,
    boundary: number,
    evidenceSpan: ByteSpan,
    kind: StateTransitionDefinition<LatexLexicalState>["kind"],
    ruleId: string,
  ): number | null => {
    const from = current;
    if (to === from || boundary >= bytes.length) {
      current = to;
      return null;
    }
    const prior = changes.at(-1);
    if (prior !== undefined && boundary <= prior.boundary) {
      throw new Error(`non-increasing lexical-state boundary ${String(boundary)}`);
    }
    const transition = addTransition(from, to, boundary, evidenceSpan, kind, ruleId);
    changes.push(Object.freeze({ transition, boundary, to }));
    current = to;
    return transition;
  };

  const beginUnknownVerbatim = (
    prior: LatexLexicalState,
    bodyStart: number,
    evidenceSpan: ByteSpan,
    ruleId: string,
  ): void => {
    if (bodyStart >= bytes.length) {
      return;
    }
    const main = changeState("unknown", bodyStart, evidenceSpan, "switch", `unclosed-${ruleId}`);
    if (main === null) {
      throw new Error("material unknown verbatim state must have a transition");
    }
    const alternative = addTransition(
      prior,
      "verbatim",
      bodyStart,
      evidenceSpan,
      "enter",
      `${ruleId}-continuation`,
    );
    branches.push(
      Object.freeze({
        boundary: byteOffset(bodyStart),
        alternatives: Object.freeze([
          Object.freeze({ state: "unknown", transition: main }),
          Object.freeze({ state: "verbatim", transition: alternative }),
        ]),
      }),
    );
  };

  let index = 0;
  while (index < bytes.length) {
    const value = bytes[index];
    if (value === 0x25) {
      index++;
      while (index < bytes.length && !isLineEnding(bytes[index])) {
        index++;
      }
      continue;
    }
    if (value !== 0x5c) {
      index++;
      continue;
    }

    const commandStart = index;
    const commandState = currentState();
    if (!isNameCharacter(bytes[index + 1], commandState === "unknown" ? "normal" : commandState)) {
      index = Math.min(index + 2, bytes.length);
      continue;
    }
    index += 2;
    while (
      index < bytes.length &&
      isNameCharacter(bytes[index], commandState === "unknown" ? "normal" : commandState)
    ) {
      index++;
    }
    const name = asciiSlice(bytes, commandStart + 1, index);
    const evidence = (): ByteSpan => byteSpan(commandStart, index);

    if (name === "begin") {
      const opening = verbatimEnvironmentOpening(bytes, index);
      if (opening !== null) {
        const prior = currentState();
        if (prior === "unknown" || prior === "verbatim") {
          throw new Error(`unexpected ${prior} state while scanning a verbatim opener`);
        }
        const closeStart = findAscii(bytes, opening.closing, opening.end);
        const openingEvidence = byteSpan(commandStart, opening.end);
        if (closeStart < 0) {
          beginUnknownVerbatim(prior, opening.end, openingEvidence, opening.ruleId);
          break;
        }
        if (opening.end < closeStart) {
          changeState("verbatim", opening.end, openingEvidence, "enter", opening.ruleId);
          changeState(
            prior,
            closeStart,
            byteSpan(closeStart, closeStart + opening.closing.length),
            "leave",
            opening.ruleId.replace("begin", "end"),
          );
        }
        index = closeStart + opening.closing.length;
        continue;
      }
    }

    if (name === "verb") {
      let delimiterIndex = index;
      let ruleId = "verb";
      if (bytes[delimiterIndex] === 0x2a) {
        delimiterIndex++;
        ruleId = "verb-star";
      }
      const delimiter = bytes[delimiterIndex];
      if (isInlineDelimiter(delimiter)) {
        const bodyStart = delimiterIndex + 1;
        let bodyEnd = bodyStart;
        while (
          bodyEnd < bytes.length &&
          bytes[bodyEnd] !== delimiter &&
          !isLineEnding(bytes[bodyEnd])
        ) {
          bodyEnd++;
        }
        const prior = currentState();
        if (prior === "unknown" || prior === "verbatim") {
          throw new Error(`unexpected ${prior} state while scanning inline verbatim`);
        }
        const openingEvidence = byteSpan(commandStart, bodyStart);
        if (bytes[bodyEnd] === delimiter) {
          if (bodyStart < bodyEnd) {
            changeState("verbatim", bodyStart, openingEvidence, "enter", ruleId);
            changeState(
              prior,
              bodyEnd,
              byteSpan(bodyEnd, bodyEnd + 1),
              "leave",
              `${ruleId}-delimiter`,
            );
          }
          index = bodyEnd + 1;
          continue;
        }
        if (bodyStart < bodyEnd) {
          beginUnknownVerbatim(prior, bodyStart, openingEvidence, ruleId);
          if (bodyEnd < bytes.length) {
            changeState(
              prior,
              bodyEnd,
              byteSpan(
                bodyEnd,
                bodyEnd + (bytes[bodyEnd] === 0x0d && bytes[bodyEnd + 1] === 0x0a ? 2 : 1),
              ),
              "leave",
              `${ruleId}-line-recovery`,
            );
            index = bodyEnd;
            continue;
          }
        }
        break;
      }
    }

    const switchTo = (
      to: LatexLexicalState,
      kind: StateTransitionDefinition<LatexLexicalState>["kind"],
      ruleId: string,
    ): void => {
      changeState(to, index, evidence(), kind, ruleId);
    };
    if (name === "makeatletter") {
      switchTo("at-letter", "enter", "makeatletter");
    } else if (name === "makeatother") {
      switchTo("normal", "leave", "makeatother");
    } else if (name === "ExplSyntaxOn") {
      switchTo("expl3", "enter", "ExplSyntaxOn");
    } else if (name === "ExplSyntaxOff") {
      switchTo("normal", "leave", "ExplSyntaxOff");
    }
  }

  const runs: StateRunDefinition<LatexLexicalState>[] = [];
  let cursor = 0;
  let state: StateLabel<LatexLexicalState> = "normal";
  let enteringTransition: number | null = null;
  for (const change of changes) {
    runs.push(
      Object.freeze({
        span: byteSpan(cursor, change.boundary),
        state,
        enteringTransition,
        leavingTransition: change.transition,
      }),
    );
    cursor = change.boundary;
    state = change.to;
    enteringTransition = change.transition;
  }
  if (cursor < bytes.length) {
    runs.push(
      Object.freeze({
        span: byteSpan(cursor, bytes.length),
        state,
        enteringTransition,
        leavingTransition: null,
      }),
    );
  }

  return new StateRunSequence({
    snapshot,
    producer: PRODUCER,
    transitions,
    runs,
    branches,
  });
}
