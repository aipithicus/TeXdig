/** The `texdig/regions` surface: occurrences first, then coverage, selection, and pairing. */

export {
  OccurrenceBatchBuilder,
  type OccurrenceBatch,
  type OccurrenceClaim,
  type OccurrenceLookup,
  type OccurrenceOrder,
  type OccurrenceRecord,
  type ProducerStamp,
} from "./occurrences.js";
export { SpanSet } from "./span-set.js";
export { OccurrenceSelection } from "./selection.js";
export {
  PairingPolicy,
  pairOccurrences,
  type PairingDanglingCloseResidue,
  type PairingFaults,
  type PairingMatch,
  type PairingMismatchNames,
  type PairingMismatchResidue,
  type PairingPolicyDefinition,
  type PairingResidue,
  type PairingResult,
  type PairingUnclosedOpenResidue,
} from "./pairing.js";
export {
  StateRunSequence,
  type StateBranch,
  type StateBranchDefinition,
  type StateContinuation,
  type StateLabel,
  type StateRun,
  type StateRunDefinition,
  type StateRunSequenceDefinition,
  type StateTransition,
  type StateTransitionDefinition,
} from "./state-runs.js";
