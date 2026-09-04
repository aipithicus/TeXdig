/** Bounded, source-relative Phase 3 sublanguage checkpoints. */

import { performance } from "node:perf_hooks";

import { parse as parseAlignmentGenerated } from "../../generated/alignment.js";
import { parse as parseArgspecGenerated } from "../../generated/argspec.js";
import { parse as parseBibtexGenerated } from "../../generated/bibtex.js";
import { parse as parseGlueGenerated } from "../../generated/glue.js";
import { parse as parsePgfkeysGenerated } from "../../generated/pgfkeys.js";
import { parse as parseTabularGenerated } from "../../generated/tabular.js";
import { parse as parseTikzGenerated } from "../../generated/tikz.js";
import { parse as parseXcolorGenerated } from "../../generated/xcolor.js";
import {
  SourceSlice,
  SourceTopology,
  byteSpan,
  spanEquals,
  utf16Offset,
  type ByteSpan,
  type SourceSnapshot,
} from "../../source/index.js";

export type SublanguageCheckpoint =
  "argspec" | "alignment" | "glue" | "tabular" | "xcolor" | "pgfkeys" | "tikz" | "bibtex";

export type SublanguageScalar = string | number | boolean | null;

export interface SublanguageRecord {
  readonly [key: string]: SublanguageValue;
}

export type SublanguageValue =
  SublanguageScalar | SublanguageNode | SublanguageRecord | readonly SublanguageValue[];

/** A grammar-owned node whose source span is mapped back to the caller's snapshot. */
export interface SublanguageNode {
  readonly kind: string;
  readonly span: ByteSpan;
  readonly fields: SublanguageRecord;
}

export interface InvalidUtf8SublanguageResidue {
  readonly kind: "invalid-utf8-input";
  readonly span: ByteSpan;
  readonly byte: number;
}

export interface UnsupportedSublanguageResidue {
  readonly kind: "unsupported-syntax";
  readonly span: ByteSpan;
  readonly message: string;
}

export type SublanguageResidue = InvalidUtf8SublanguageResidue | UnsupportedSublanguageResidue;

export interface SublanguageDiagnostic {
  readonly code: SublanguageResidue["kind"];
  readonly severity: "error";
  readonly span: ByteSpan;
  readonly residueIndex: number;
  readonly message: string;
}

export interface SublanguageParseOptions {
  /** Parse a source-relative argument frame rather than the whole snapshot. */
  readonly span?: ByteSpan;
  readonly strict?: boolean;
  /** A zero budget deterministically expires before decoding the frame. */
  readonly timeoutMs?: number;
}

export interface SublanguageParseResult<C extends SublanguageCheckpoint = SublanguageCheckpoint> {
  readonly checkpoint: C;
  readonly snapshot: SourceSnapshot;
  readonly span: ByteSpan;
  readonly value: SublanguageNode | null;
  readonly residue: readonly SublanguageResidue[];
  readonly diagnostics: readonly SublanguageDiagnostic[];
}

export type ArgspecParseResult = SublanguageParseResult<"argspec">;
export type AlignmentParseResult = SublanguageParseResult<"alignment">;
export type GlueParseResult = SublanguageParseResult<"glue">;
export type TabularParseResult = SublanguageParseResult<"tabular">;
export type XcolorParseResult = SublanguageParseResult<"xcolor">;
export type PgfkeysParseResult = SublanguageParseResult<"pgfkeys">;
export type TikzParseResult = SublanguageParseResult<"tikz">;
export type BibtexParseResult = SublanguageParseResult<"bibtex">;

export class SublanguageTimeoutError extends Error {
  public override readonly name = "SublanguageTimeoutError";
  public readonly checkpoint: SublanguageCheckpoint;
  public readonly timeoutMs: number;

  public constructor(checkpoint: SublanguageCheckpoint, timeoutMs: number) {
    super(`${checkpoint} parsing exceeded its ${String(timeoutMs)} ms budget`);
    this.checkpoint = checkpoint;
    this.timeoutMs = timeoutMs;
  }
}

export class SublanguageStrictError extends Error {
  public override readonly name = "SublanguageStrictError";
  public readonly result: SublanguageParseResult;

  public constructor(result: SublanguageParseResult) {
    super(
      `strict ${result.checkpoint} parsing rejected ${String(result.residue.length)} residue item(s)`,
    );
    this.result = result;
  }
}

type GeneratedParser = (input: string, options: { readonly checkBudget: () => void }) => unknown;

interface NormalizationContext {
  readonly slice: SourceSlice;
  readonly topology: SourceTopology;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSublanguageNode(value: SublanguageValue): value is SublanguageNode {
  if (!isRecord(value) || !isRecord(value.span) || !isRecord(value.fields)) {
    return false;
  }
  return (
    typeof value.kind === "string" &&
    typeof value.span.start === "number" &&
    typeof value.span.end === "number"
  );
}

function generatedSpan(context: NormalizationContext, start: number, end: number): ByteSpan {
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    start < 0 ||
    end < start ||
    end > context.topology.utf16Length
  ) {
    throw new RangeError(`generated UTF-16 span [${String(start)}, ${String(end)}) is invalid`);
  }
  const childSpan = byteSpan(
    context.topology.utf16ToByte(utf16Offset(start, "atoms"), "atoms"),
    context.topology.utf16ToByte(utf16Offset(end, "atoms"), "atoms"),
  );
  return context.slice.toParent(childSpan);
}

function normalizeGenerated(value: unknown, context: NormalizationContext): SublanguageValue {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }
  if (value === undefined) {
    return null;
  }
  if (Array.isArray(value)) {
    return Object.freeze(value.map((item) => normalizeGenerated(item, context)));
  }
  if (!isRecord(value)) {
    throw new TypeError(`generated grammar returned unsupported value of type ${typeof value}`);
  }

  const kind = value.type;
  const start = value.start;
  const end = value.end;
  const fields: Record<string, SublanguageValue> = {};
  for (const [key, field] of Object.entries(value)) {
    if (key !== "type" && key !== "start" && key !== "end") {
      fields[key] = normalizeGenerated(field, context);
    }
  }
  if (typeof kind === "string" && typeof start === "number" && typeof end === "number") {
    return Object.freeze({
      kind,
      span: generatedSpan(context, start, end),
      fields: Object.freeze(fields),
    });
  }
  return Object.freeze(fields);
}

function normalizeRoot(value: unknown, context: NormalizationContext): SublanguageNode {
  const normalized = normalizeGenerated(value, context);
  if (!isSublanguageNode(normalized)) {
    throw new TypeError("generated grammar did not return a located root node");
  }
  return normalized;
}

function validateTimeout(timeoutMs: number | undefined): void {
  if (timeoutMs !== undefined && (!Number.isFinite(timeoutMs) || timeoutMs < 0)) {
    throw new RangeError(
      `timeoutMs must be a finite non-negative number, received ${String(timeoutMs)}`,
    );
  }
}

function createBudgetCheck(
  checkpoint: SublanguageCheckpoint,
  timeoutMs: number | undefined,
): () => void {
  validateTimeout(timeoutMs);
  const started = performance.now();
  return (): void => {
    if (timeoutMs !== undefined && performance.now() - started >= timeoutMs) {
      throw new SublanguageTimeoutError(checkpoint, timeoutMs);
    }
  };
}

function freezeResult<C extends SublanguageCheckpoint>(
  checkpoint: C,
  snapshot: SourceSnapshot,
  span: ByteSpan,
  value: SublanguageNode | null,
  residue: readonly SublanguageResidue[],
  diagnostics: readonly SublanguageDiagnostic[],
): SublanguageParseResult<C> {
  return Object.freeze({
    checkpoint,
    snapshot,
    span,
    value,
    residue: Object.freeze(residue),
    diagnostics: Object.freeze(diagnostics),
  });
}

function enforceStrict<C extends SublanguageCheckpoint>(
  result: SublanguageParseResult<C>,
  strict: boolean | undefined,
): SublanguageParseResult<C> {
  if (strict === true && result.residue.length > 0) {
    throw new SublanguageStrictError(result);
  }
  return result;
}

function invalidInputResult<C extends SublanguageCheckpoint>(
  checkpoint: C,
  snapshot: SourceSnapshot,
  span: ByteSpan,
  slice: SourceSlice,
  strict: boolean | undefined,
): SublanguageParseResult<C> {
  const residue: SublanguageResidue[] = [];
  const diagnostics: SublanguageDiagnostic[] = [];
  for (const childOffset of slice.child.decoding.invalidUtf8ByteOffsets) {
    const childSpan = byteSpan(childOffset, childOffset + 1);
    const parentSpan = slice.toParent(childSpan);
    const byte = slice.child.copyBytes(childSpan)[0];
    if (byte === undefined) throw new Error("invalid UTF-8 offset references no byte");
    const residueIndex = residue.length;
    residue.push(Object.freeze({ kind: "invalid-utf8-input", span: parentSpan, byte }));
    diagnostics.push(
      Object.freeze({
        code: "invalid-utf8-input",
        severity: "error",
        span: parentSpan,
        residueIndex,
        message: `invalid UTF-8 byte 0x${byte.toString(16).padStart(2, "0")} in ${checkpoint} frame`,
      }),
    );
  }
  return enforceStrict(
    freezeResult(checkpoint, snapshot, span, null, residue, diagnostics),
    strict,
  );
}

function unsupportedResult<C extends SublanguageCheckpoint>(
  checkpoint: C,
  snapshot: SourceSnapshot,
  span: ByteSpan,
  message: string,
  strict: boolean | undefined,
): SublanguageParseResult<C> {
  const residue = Object.freeze<SublanguageResidue[]>([
    Object.freeze({ kind: "unsupported-syntax", span, message }),
  ]);
  const diagnostics = Object.freeze<SublanguageDiagnostic[]>([
    Object.freeze({
      code: "unsupported-syntax",
      severity: "error",
      span,
      residueIndex: 0,
      message,
    }),
  ]);
  return enforceStrict(
    freezeResult(checkpoint, snapshot, span, null, residue, diagnostics),
    strict,
  );
}

function parseCheckpoint<C extends SublanguageCheckpoint>(
  checkpoint: C,
  snapshot: SourceSnapshot,
  parser: GeneratedParser,
  options: SublanguageParseOptions,
): SublanguageParseResult<C> {
  const span = options.span ?? snapshot.extent;
  snapshot.validateSpan(span);
  const slice = SourceSlice.create(snapshot, span);
  const checkBudget = createBudgetCheck(checkpoint, options.timeoutMs);
  checkBudget();
  if (slice.child.decoding.invalidUtf8ByteOffsets.length > 0) {
    return invalidInputResult(checkpoint, snapshot, span, slice, options.strict);
  }

  const input = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(
    slice.child.copyBytes(),
  );
  let generated: unknown;
  try {
    generated = parser(input, { checkBudget });
  } catch (error: unknown) {
    if (error instanceof SublanguageTimeoutError) throw error;
    if (error instanceof Error && error.name === "SyntaxError") {
      return unsupportedResult(
        checkpoint,
        snapshot,
        span,
        `${checkpoint} grammar rejected the bounded source: ${error.message}`,
        options.strict,
      );
    }
    throw error;
  }
  checkBudget();

  const context: NormalizationContext = {
    slice,
    topology: SourceTopology.of(slice.child),
  };
  const value = normalizeRoot(generated, context);
  if (!spanEquals(value.span, span)) {
    throw new Error(`${checkpoint} root does not cover its complete bounded frame`);
  }
  return freezeResult(checkpoint, snapshot, span, value, [], []);
}

export function parseArgspec(
  snapshot: SourceSnapshot,
  options: SublanguageParseOptions = {},
): ArgspecParseResult {
  return parseCheckpoint("argspec", snapshot, parseArgspecGenerated, options);
}

export function parseAlignment(
  snapshot: SourceSnapshot,
  options: SublanguageParseOptions = {},
): AlignmentParseResult {
  return parseCheckpoint("alignment", snapshot, parseAlignmentGenerated, options);
}

export function parseGlue(
  snapshot: SourceSnapshot,
  options: SublanguageParseOptions = {},
): GlueParseResult {
  return parseCheckpoint("glue", snapshot, parseGlueGenerated, options);
}

export function parseTabular(
  snapshot: SourceSnapshot,
  options: SublanguageParseOptions = {},
): TabularParseResult {
  return parseCheckpoint("tabular", snapshot, parseTabularGenerated, options);
}

export function parseXcolor(
  snapshot: SourceSnapshot,
  options: SublanguageParseOptions = {},
): XcolorParseResult {
  return parseCheckpoint("xcolor", snapshot, parseXcolorGenerated, options);
}

export function parsePgfkeys(
  snapshot: SourceSnapshot,
  options: SublanguageParseOptions = {},
): PgfkeysParseResult {
  return parseCheckpoint("pgfkeys", snapshot, parsePgfkeysGenerated, options);
}

export function parseTikz(
  snapshot: SourceSnapshot,
  options: SublanguageParseOptions = {},
): TikzParseResult {
  return parseCheckpoint("tikz", snapshot, parseTikzGenerated, options);
}

export function parseBibtex(
  snapshot: SourceSnapshot,
  options: SublanguageParseOptions = {},
): BibtexParseResult {
  return parseCheckpoint("bibtex", snapshot, parseBibtexGenerated, options);
}

/** Return the exact bytes of the bounded frame, independent of parse success. */
export function realizeSublanguage(result: SublanguageParseResult): Uint8Array {
  return result.snapshot.copyBytes(result.span);
}
