/**
 * Immutable source bytes, stable basis identity, and recorded decoding facts.
 *
 * A snapshot owns a copy of the bytes it hashes. Public byte access always
 * returns another copy, so neither the caller's input nor a returned view can
 * invalidate the identity after construction. The identity is exactly the
 * serializable triple `sourceId + contentHash + revision`; decoding metadata is
 * deliberately not part of compatibility because the substrate records it but
 * never applies it.
 */

import { createHash } from "node:crypto";

import { byteOffset, byteSpan, type ByteOffset, type ByteSpan } from "./span.js";
import { decodeUtf8, type Utf8Units } from "./utf8.js";

/** The three-value result of byte-level UTF-8 detection. */
export type DetectedEncoding = "utf-8-bom" | "utf-8-compatible" | "unknown";

/** The line-ending population found in the original bytes. */
export type LineEndingStyle = "none" | "lf" | "crlf" | "cr" | "mixed";

export interface LineEndingFacts {
  readonly style: LineEndingStyle;
  readonly lfCount: number;
  readonly crlfCount: number;
  readonly crCount: number;
}

export interface SourceDecodingFacts {
  /** True only when the byte sequence begins `EF BB BF`; the bytes remain present. */
  readonly hasBom: boolean;
  /** Caller-supplied metadata, retained exactly and never used to transcode bytes. */
  readonly declaredEncoding?: string;
  /** A BOM is identifying; otherwise well-formed bytes are only UTF-8-compatible. */
  readonly detectedEncoding: DetectedEncoding;
  /** Start offset of every invalid one-byte decoder unit, in source order. */
  readonly invalidUtf8ByteOffsets: readonly ByteOffset[];
  readonly lineEndings: LineEndingFacts;
}

/** Stable, serializable identity of one source coordinate basis. */
export interface SourceIdentity {
  readonly sourceId: string;
  /** Lowercase hexadecimal SHA-256 over the exact owned bytes. */
  readonly contentHash: string;
  readonly revision: number;
}

export interface SourceSnapshotOptions {
  /** Path-like identifier within a project base. Preserved exactly, not normalized here. */
  readonly sourceId: string;
  readonly revision: number;
  readonly declaredEncoding?: string;
}

interface SnapshotState {
  readonly bytes: Uint8Array;
  readonly utf8: Utf8Units;
}

const STATES = new WeakMap<SourceSnapshot, SnapshotState>();

function stateFor(snapshot: SourceSnapshot): SnapshotState {
  const state = STATES.get(snapshot);
  if (state === undefined) {
    throw new TypeError("SourceSnapshot method called with an invalid receiver");
  }
  return state;
}

function assertSourceId(sourceId: string): void {
  if (sourceId.trim().length === 0) {
    throw new TypeError("sourceId must not be empty or whitespace");
  }
}

function assertRevision(revision: number): void {
  if (!Number.isSafeInteger(revision) || revision < 0) {
    throw new RangeError(
      `revision must be a non-negative safe integer, received ${String(revision)}`,
    );
  }
}

function assertDeclaredEncoding(declaredEncoding: string | undefined): void {
  if (declaredEncoding?.trim().length === 0) {
    throw new TypeError("declaredEncoding must not be empty or whitespace when supplied");
  }
}

function hashBytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function invalidOffsets(units: Utf8Units): readonly ByteOffset[] {
  const offsets: ByteOffset[] = [];
  for (let index = 0; index < units.count; index++) {
    if (units.valid[index] === 0) {
      offsets.push(byteOffset(units.starts[index] ?? 0));
    }
  }
  return Object.freeze(offsets);
}

function detectedEncoding(units: Utf8Units): DetectedEncoding {
  if (units.hasBom) {
    return "utf-8-bom";
  }
  return units.invalidCount === 0 ? "utf-8-compatible" : "unknown";
}

function lineEndingFacts(bytes: Uint8Array): LineEndingFacts {
  let lfCount = 0;
  let crlfCount = 0;
  let crCount = 0;

  for (let index = 0; index < bytes.length; index++) {
    const value = bytes[index];
    if (value === 0x0d) {
      if (bytes[index + 1] === 0x0a) {
        crlfCount++;
        index++;
      } else {
        crCount++;
      }
    } else if (value === 0x0a) {
      lfCount++;
    }
  }

  const kinds = Number(lfCount > 0) + Number(crlfCount > 0) + Number(crCount > 0);
  let style: LineEndingStyle;
  if (kinds === 0) {
    style = "none";
  } else if (kinds > 1) {
    style = "mixed";
  } else if (lfCount > 0) {
    style = "lf";
  } else if (crlfCount > 0) {
    style = "crlf";
  } else {
    style = "cr";
  }

  return Object.freeze({ style, lfCount, crlfCount, crCount });
}

function decodingFacts(
  bytes: Uint8Array,
  units: Utf8Units,
  declaredEncoding: string | undefined,
): SourceDecodingFacts {
  const common = {
    hasBom: units.hasBom,
    detectedEncoding: detectedEncoding(units),
    invalidUtf8ByteOffsets: invalidOffsets(units),
    lineEndings: lineEndingFacts(bytes),
  } as const;

  return declaredEncoding === undefined
    ? Object.freeze(common)
    : Object.freeze({ ...common, declaredEncoding });
}

/** An immutable root snapshot and the identity of its byte coordinate basis. */
export class SourceSnapshot {
  public readonly sourceId: string;
  public readonly contentHash: string;
  public readonly revision: number;
  public readonly identity: SourceIdentity;
  public readonly byteLength: number;
  public readonly extent: ByteSpan;
  public readonly decoding: SourceDecodingFacts;

  public constructor(bytes: Uint8Array, options: SourceSnapshotOptions) {
    assertSourceId(options.sourceId);
    assertRevision(options.revision);
    assertDeclaredEncoding(options.declaredEncoding);

    const ownedBytes = Uint8Array.from(bytes);
    const utf8 = decodeUtf8(ownedBytes);
    const contentHash = hashBytes(ownedBytes);
    const identity: SourceIdentity = Object.freeze({
      sourceId: options.sourceId,
      contentHash,
      revision: options.revision,
    });

    this.sourceId = options.sourceId;
    this.contentHash = contentHash;
    this.revision = options.revision;
    this.identity = identity;
    this.byteLength = ownedBytes.length;
    this.extent = byteSpan(0, ownedBytes.length);
    this.decoding = decodingFacts(ownedBytes, utf8, options.declaredEncoding);

    STATES.set(this, { bytes: ownedBytes, utf8 });
    Object.freeze(this);
  }

  /** Returns a defensive copy of `span`, or of the entire source when omitted. */
  public copyBytes(span: ByteSpan = this.extent): Uint8Array {
    this.validateSpan(span);
    return stateFor(this).bytes.slice(span.start, span.end);
  }

  /** Validates byte geometry against this basis. Atom-boundary checks belong to topology. */
  public validateSpan(span: ByteSpan, allowEmpty = true): void {
    if (
      !Number.isSafeInteger(span.start) ||
      !Number.isSafeInteger(span.end) ||
      span.start < 0 ||
      span.end < span.start ||
      span.end > this.byteLength
    ) {
      throw new RangeError(
        `byte span [${String(span.start)}, ${String(span.end)}) exceeds snapshot length ${String(this.byteLength)}`,
      );
    }
    if (!allowEmpty && span.start === span.end) {
      throw new RangeError("byte span must not be empty");
    }
  }

  /** Compatibility is equality of the identity triple, with reference identity as a fast path. */
  public isCompatibleWith(other: SourceSnapshot | null | undefined): boolean {
    if (this === other) {
      return true;
    }
    if (other === null || other === undefined) {
      return false;
    }
    return (
      this.sourceId === other.sourceId &&
      this.contentHash === other.contentHash &&
      this.revision === other.revision
    );
  }

  /** Throws when `other` names a different source coordinate basis. */
  public ensureCompatibleWith(other: SourceSnapshot | null | undefined): void {
    if (other === null || other === undefined) {
      throw new TypeError("a source snapshot is required for compatibility");
    }
    if (!this.isCompatibleWith(other)) {
      throw new Error(
        `source coordinate bases are incompatible: '${this.sourceId}' r${String(this.revision)} and '${other.sourceId}' r${String(other.revision)}`,
      );
    }
  }
}

/**
 * Package-internal access for `topology.ts`; deliberately absent from
 * `source/index.ts` so public callers cannot mutate the cached decoder columns.
 *
 * @internal
 */
export function snapshotUtf8Units(snapshot: SourceSnapshot): Utf8Units {
  return stateFor(snapshot).utf8;
}
