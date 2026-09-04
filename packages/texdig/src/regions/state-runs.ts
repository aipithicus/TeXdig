/** Snapshot-bound lexical-state runs with explicit transition evidence. */

import { byteOffset, byteSpan, type ByteOffset, type ByteSpan } from "../source/span.js";
import { SourceSnapshot } from "../source/snapshot.js";
import type { ProducerStamp } from "./occurrences.js";
import { SpanSet } from "./span-set.js";

export type StateLabel<S extends string> = S | "unknown";

export interface StateTransitionDefinition<S extends string> {
  readonly boundary: ByteOffset;
  readonly evidenceSpan: ByteSpan;
  readonly from: StateLabel<S>;
  readonly to: StateLabel<S>;
  readonly kind: "enter" | "leave" | "switch";
  readonly ruleId: string;
}

export interface StateTransition<S extends string> extends StateTransitionDefinition<S> {
  readonly ordinal: number;
  readonly producer: ProducerStamp;
}

export interface StateRunDefinition<S extends string> {
  readonly span: ByteSpan;
  readonly state: StateLabel<S>;
  readonly enteringTransition: number | null;
  readonly leavingTransition: number | null;
}

export interface StateRun<S extends string> extends StateRunDefinition<S> {
  readonly ordinal: number;
}

export interface StateContinuation<S extends string> {
  readonly state: StateLabel<S>;
  readonly transition: number | null;
}

export interface StateBranchDefinition<S extends string> {
  readonly boundary: ByteOffset;
  readonly alternatives: readonly StateContinuation<S>[];
}

export interface StateBranch<S extends string> extends StateBranchDefinition<S> {
  readonly ordinal: number;
}

export interface StateRunSequenceDefinition<S extends string> {
  readonly snapshot: SourceSnapshot;
  readonly producer: ProducerStamp;
  readonly transitions: readonly StateTransitionDefinition<S>[];
  readonly runs: readonly StateRunDefinition<S>[];
  readonly branches?: readonly StateBranchDefinition<S>[];
}

function assertNonBlank(value: string, what: string): void {
  if (value.trim().length === 0) {
    throw new TypeError(`${what} must not be blank`);
  }
}

function freezeProducer(producer: ProducerStamp): ProducerStamp {
  assertNonBlank(producer.id, "producer id");
  assertNonBlank(producer.version, "producer version");
  return Object.freeze({ id: producer.id, version: producer.version });
}

function validateTransitionIndex<S extends string>(
  transitions: readonly StateTransition<S>[],
  index: number | null,
  what: string,
): StateTransition<S> | undefined {
  if (index === null) {
    return undefined;
  }
  if (!Number.isSafeInteger(index) || index < 0) {
    throw new RangeError(`${what} must be null or a non-negative safe integer`);
  }
  const transition = transitions[index];
  if (transition === undefined) {
    throw new RangeError(`${what} references missing transition ${String(index)}`);
  }
  return transition;
}

/**
 * A total, maximal run partition over one snapshot. Transitions are occurrence-
 * like evidence at run boundaries; branches retain competing continuations.
 */
export class StateRunSequence<S extends string> {
  public readonly snapshot: SourceSnapshot;
  public readonly producer: ProducerStamp;
  public readonly transitions: readonly StateTransition<S>[];
  public readonly runs: readonly StateRun<S>[];
  public readonly branches: readonly StateBranch<S>[];
  public readonly states: readonly StateLabel<S>[];

  public constructor(definition: StateRunSequenceDefinition<S>) {
    if (!(definition.snapshot instanceof SourceSnapshot)) {
      throw new TypeError("state runs require a SourceSnapshot");
    }
    this.snapshot = definition.snapshot;
    this.producer = freezeProducer(definition.producer);

    this.transitions = Object.freeze(
      definition.transitions.map((transition, ordinal) => {
        this.snapshot.validateSpan(transition.evidenceSpan, false);
        if (transition.boundary < 0 || transition.boundary > this.snapshot.byteLength) {
          throw new RangeError(
            `transition boundary ${String(transition.boundary)} is out of range`,
          );
        }
        assertNonBlank(transition.from, "transition source state");
        assertNonBlank(transition.to, "transition destination state");
        assertNonBlank(transition.ruleId, "transition rule id");
        return Object.freeze({
          ordinal,
          boundary: byteOffset(transition.boundary),
          evidenceSpan: byteSpan(transition.evidenceSpan.start, transition.evidenceSpan.end),
          from: transition.from,
          to: transition.to,
          kind: transition.kind,
          ruleId: transition.ruleId,
          producer: this.producer,
        });
      }),
    );

    let cursor = 0;
    let priorState: StateLabel<S> | undefined;
    this.runs = Object.freeze(
      definition.runs.map((run, ordinal) => {
        this.snapshot.validateSpan(run.span, false);
        if (run.span.start !== cursor) {
          throw new Error(
            `state runs must tile the snapshot: expected ${String(cursor)}, found ${String(run.span.start)}`,
          );
        }
        assertNonBlank(run.state, "state label");
        if (priorState === run.state) {
          throw new Error(`adjacent state runs must be maximal: duplicate state ${run.state}`);
        }

        const entering = validateTransitionIndex(
          this.transitions,
          run.enteringTransition,
          "enteringTransition",
        );
        if (
          entering !== undefined &&
          (entering.boundary !== run.span.start || entering.to !== run.state)
        ) {
          throw new Error(`entering transition does not establish run ${String(ordinal)}`);
        }
        const leaving = validateTransitionIndex(
          this.transitions,
          run.leavingTransition,
          "leavingTransition",
        );
        if (
          leaving !== undefined &&
          (leaving.boundary !== run.span.end || leaving.from !== run.state)
        ) {
          throw new Error(`leaving transition does not close run ${String(ordinal)}`);
        }

        cursor = run.span.end;
        priorState = run.state;
        return Object.freeze({
          ordinal,
          span: byteSpan(run.span.start, run.span.end),
          state: run.state,
          enteringTransition: run.enteringTransition,
          leavingTransition: run.leavingTransition,
        });
      }),
    );
    if (cursor !== this.snapshot.byteLength) {
      throw new Error(
        `state runs end at ${String(cursor)}, expected ${String(this.snapshot.byteLength)}`,
      );
    }

    for (let ordinal = 0; ordinal < this.runs.length; ordinal++) {
      const run = this.runs[ordinal];
      if (run === undefined) {
        throw new Error(`missing state run ${String(ordinal)}`);
      }
      if (ordinal === 0 && run.enteringTransition !== null) {
        throw new Error("the first state run cannot have an entering transition");
      }
      const next = this.runs[ordinal + 1];
      if (next === undefined) {
        if (run.leavingTransition !== null) {
          throw new Error("the final state run cannot have a leaving transition");
        }
        continue;
      }
      if (
        run.leavingTransition === null ||
        next.enteringTransition === null ||
        run.leavingTransition !== next.enteringTransition
      ) {
        throw new Error(
          `state boundary after run ${String(ordinal)} requires one shared transition`,
        );
      }
    }

    this.branches = Object.freeze(
      (definition.branches ?? []).map((branch, ordinal) => {
        if (branch.boundary < 0 || branch.boundary > this.snapshot.byteLength) {
          throw new RangeError(`branch boundary ${String(branch.boundary)} is out of range`);
        }
        if (branch.alternatives.length < 2) {
          throw new Error("a state branch requires at least two alternatives");
        }
        const states = new Set<StateLabel<S>>();
        const alternatives = Object.freeze(
          branch.alternatives.map((alternative) => {
            assertNonBlank(alternative.state, "branch state");
            if (states.has(alternative.state)) {
              throw new Error(`state branch repeats alternative ${alternative.state}`);
            }
            states.add(alternative.state);
            const transition = validateTransitionIndex(
              this.transitions,
              alternative.transition,
              "branch transition",
            );
            if (
              transition !== undefined &&
              (transition.boundary !== branch.boundary || transition.to !== alternative.state)
            ) {
              throw new Error(`branch transition does not establish ${alternative.state}`);
            }
            return Object.freeze({
              state: alternative.state,
              transition: alternative.transition,
            });
          }),
        );
        return Object.freeze({
          ordinal,
          boundary: byteOffset(branch.boundary),
          alternatives,
        });
      }),
    );

    const states: StateLabel<S>[] = [];
    for (const run of this.runs) {
      if (!states.some((state) => state === run.state)) {
        states.push(run.state);
      }
    }
    this.states = Object.freeze(states);
    Object.freeze(this);
  }

  /** Coverage of every maximal run carrying `state`. */
  public coverage(state: StateLabel<S>): SpanSet {
    assertNonBlank(state, "state label");
    return SpanSet.from(
      this.snapshot,
      this.runs.filter((run) => run.state === state).map((run) => run.span),
    );
  }

  /** Resolve a material byte position to its run. EOF and empty input have no run. */
  public stateAt(offset: ByteOffset): StateRun<S> | undefined {
    if (offset < 0 || offset >= this.snapshot.byteLength) {
      if (offset === this.snapshot.byteLength) {
        return undefined;
      }
      throw new RangeError(`state lookup offset ${String(offset)} is out of range`);
    }
    let low = 0;
    let high = this.runs.length;
    while (low < high) {
      const middle = low + Math.floor((high - low) / 2);
      const run = this.runs[middle];
      if (run === undefined) {
        throw new Error(`missing state run ${String(middle)}`);
      }
      if (offset < run.span.start) {
        high = middle;
      } else if (offset >= run.span.end) {
        low = middle + 1;
      } else {
        return run;
      }
    }
    throw new Error(`state runs do not cover byte offset ${String(offset)}`);
  }
}
