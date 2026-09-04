import { describe, expect, it } from "vitest";

import { byteOffset, byteSpan } from "../source/span.js";
import { SourceSnapshot } from "../source/snapshot.js";
import { StateRunSequence } from "./state-runs.js";

function source(text: string): SourceSnapshot {
  return new SourceSnapshot(new TextEncoder().encode(text), {
    sourceId: "state-runs.tex",
    revision: 1,
  });
}

describe("StateRunSequence", () => {
  it("retains a maximal total partition with occurrence-like transition evidence", () => {
    const snapshot = source("aa\\makeatletter@@\\makeatotherzz");
    const runs = new StateRunSequence<"normal" | "at-letter">({
      snapshot,
      producer: { id: "test-state-scanner", version: "1" },
      transitions: [
        {
          boundary: byteOffset(15),
          evidenceSpan: byteSpan(2, 15),
          from: "normal",
          to: "at-letter",
          kind: "enter",
          ruleId: "makeatletter",
        },
        {
          boundary: byteOffset(29),
          evidenceSpan: byteSpan(17, 29),
          from: "at-letter",
          to: "normal",
          kind: "leave",
          ruleId: "makeatother",
        },
      ],
      runs: [
        {
          span: byteSpan(0, 15),
          state: "normal",
          enteringTransition: null,
          leavingTransition: 0,
        },
        {
          span: byteSpan(15, 29),
          state: "at-letter",
          enteringTransition: 0,
          leavingTransition: 1,
        },
        {
          span: byteSpan(29, snapshot.byteLength),
          state: "normal",
          enteringTransition: 1,
          leavingTransition: null,
        },
      ],
    });

    expect(runs.states).toEqual(["normal", "at-letter"]);
    expect([...runs.coverage("normal")]).toEqual([
      byteSpan(0, 15),
      byteSpan(29, snapshot.byteLength),
    ]);
    expect(runs.stateAt(byteOffset(16))?.state).toBe("at-letter");
    expect(runs.stateAt(byteOffset(snapshot.byteLength))).toBeUndefined();
    expect(runs.transitions[0]?.producer).toEqual({ id: "test-state-scanner", version: "1" });
    expect(Object.isFrozen(runs)).toBe(true);
  });

  it("admits an empty source as an empty total partition", () => {
    const snapshot = source("");
    const runs = new StateRunSequence<"normal">({
      snapshot,
      producer: { id: "test-state-scanner", version: "1" },
      transitions: [],
      runs: [],
    });

    expect(runs.runs).toEqual([]);
    expect(runs.stateAt(byteOffset(0))).toBeUndefined();
    expect([...runs.coverage("normal")]).toEqual([]);
  });

  it("rejects gaps, adjacent duplicate states, and unlinked state boundaries", () => {
    const snapshot = source("abcd");
    const common = {
      snapshot,
      producer: { id: "test-state-scanner", version: "1" },
      transitions: [],
    } as const;

    expect(
      () =>
        new StateRunSequence({
          ...common,
          runs: [
            {
              span: byteSpan(1, 4),
              state: "normal",
              enteringTransition: null,
              leavingTransition: null,
            },
          ],
        }),
    ).toThrow(/tile/);
    expect(
      () =>
        new StateRunSequence({
          ...common,
          runs: [
            {
              span: byteSpan(0, 2),
              state: "normal",
              enteringTransition: null,
              leavingTransition: null,
            },
            {
              span: byteSpan(2, 4),
              state: "normal",
              enteringTransition: null,
              leavingTransition: null,
            },
          ],
        }),
    ).toThrow(/maximal/);
    expect(
      () =>
        new StateRunSequence({
          ...common,
          runs: [
            {
              span: byteSpan(0, 2),
              state: "normal",
              enteringTransition: null,
              leavingTransition: null,
            },
            {
              span: byteSpan(2, 4),
              state: "unknown",
              enteringTransition: null,
              leavingTransition: null,
            },
          ],
        }),
    ).toThrow(/shared transition/);
  });

  it("retains explicit competing continuations without choosing one", () => {
    const snapshot = source("abcd");
    const runs = new StateRunSequence<"normal" | "verbatim">({
      snapshot,
      producer: { id: "test-state-scanner", version: "1" },
      transitions: [
        {
          boundary: byteOffset(4),
          evidenceSpan: byteSpan(0, 4),
          from: "normal",
          to: "verbatim",
          kind: "enter",
          ruleId: "ambiguous-opener",
        },
      ],
      runs: [
        {
          span: byteSpan(0, 4),
          state: "normal",
          enteringTransition: null,
          leavingTransition: null,
        },
      ],
      branches: [
        {
          boundary: byteOffset(4),
          alternatives: [
            { state: "normal", transition: null },
            { state: "verbatim", transition: 0 },
          ],
        },
      ],
    });

    expect(runs.branches[0]?.alternatives.map((alternative) => alternative.state)).toEqual([
      "normal",
      "verbatim",
    ]);
  });
});
