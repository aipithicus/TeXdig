/**
 * The `texdig/source` surface: coordinates, decoding, snapshots, topology, and
 * slices. Modules land in dependency order — span, utf8, snapshot, topology,
 * slice — and each is exported here deliberately rather than by wildcard.
 */

export {
  CONVENTIONS,
  type AtomOffset,
  type AtomSpan,
  type ByteOffset,
  type ByteSpan,
  type Convention,
  type Offset,
  type Span,
  type Utf16Offset,
  type Utf16Span,
  atomOffset,
  atomSpan,
  byteOffset,
  byteSpan,
  containsOffset,
  containsSpan,
  crosses,
  intersects,
  isEmpty,
  properlyContains,
  span,
  spanEquals,
  spanLength,
  utf16Offset,
  utf16Span,
} from "./span.js";

export { type Utf8Unit, type Utf8Units, decodeUtf8, listUnits, unitAt } from "./utf8.js";

export {
  SourceSnapshot,
  type DetectedEncoding,
  type LineEndingFacts,
  type LineEndingStyle,
  type SourceDecodingFacts,
  type SourceIdentity,
  type SourceSnapshotOptions,
} from "./snapshot.js";

export { SourceTopology, type AtomRun, type LineRange, type SourceAtom } from "./topology.js";
