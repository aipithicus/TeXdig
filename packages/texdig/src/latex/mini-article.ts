/**
 * The Phase 3 mechanics checkpoint: exact source bytes become lexical items,
 * a lossless CST, explicit recovery residue, and a checked byte ledger.
 *
 * This intentionally proves the integration contracts on a small language. It
 * is not yet a claim that TeXdig implements the general LaTeX grammar.
 */

import { performance } from "node:perf_hooks";

import { parse as parseGenerated } from "../generated/latex.js";
import type { StateRunSequence } from "../regions/index.js";
import {
  SourceTopology,
  byteSpan,
  spanEquals,
  type ByteSpan,
  type SourceAtom,
  type SourceSnapshot,
} from "../source/index.js";
import { scanLatexLexicalStates, type LatexLexicalState } from "./lexical-state.js";

export type MiniArticleStartRule = "document" | "fragment";

export type MiniArticleTokenKind =
  | "control-word"
  | "control-symbol"
  | "paragraph"
  | "group-open"
  | "group-close"
  | "star"
  | "superscript-marker"
  | "subscript-marker"
  | "verbatim"
  | "text";

export interface MiniArticleToken {
  readonly kind: MiniArticleTokenKind;
  readonly span: ByteSpan;
}

export type MiniArticleTriviaKind = "whitespace" | "comment";

export interface MiniArticleTrivia {
  readonly kind: MiniArticleTriviaKind;
  readonly span: ByteSpan;
}

export interface MiniArticleInvalidUtf8Residue {
  readonly kind: "invalid-utf8-byte";
  readonly span: ByteSpan;
  readonly byte: number;
}

export interface MiniArticleUnexpectedCloseResidue {
  readonly kind: "unexpected-group-close";
  readonly span: ByteSpan;
  readonly tokenIndex: number;
}

export interface MiniArticleUnclosedOpenResidue {
  readonly kind: "unclosed-group-open";
  readonly span: ByteSpan;
  readonly tokenIndex: number;
}

export interface MiniArticleUnknownLexicalStateResidue {
  readonly kind: "unknown-lexical-state";
  readonly span: ByteSpan;
}

export type MiniArticleResidue =
  | MiniArticleInvalidUtf8Residue
  | MiniArticleUnexpectedCloseResidue
  | MiniArticleUnclosedOpenResidue
  | MiniArticleUnknownLexicalStateResidue;

export type MiniArticleDiagnosticCode = MiniArticleResidue["kind"];

export interface MiniArticleDiagnostic {
  readonly code: MiniArticleDiagnosticCode;
  readonly severity: "error";
  readonly span: ByteSpan;
  readonly residueIndex: number;
  readonly message: string;
}

export interface MiniArticleTokenNode {
  readonly kind: "token";
  readonly span: ByteSpan;
  readonly tokenIndex: number;
}

export interface MiniArticleTriviaNode {
  readonly kind: "trivia";
  readonly span: ByteSpan;
  readonly triviaIndex: number;
}

export interface MiniArticleResidueNode {
  readonly kind: "residue";
  readonly span: ByteSpan;
  readonly residueIndex: number;
}

export interface MiniArticleGroupNode {
  readonly kind: "group";
  readonly span: ByteSpan;
  readonly openTokenIndex: number;
  readonly children: readonly MiniArticleCstNode[];
  readonly closeTokenIndex: number;
}

export interface MiniArticleRecoveredGroupNode {
  readonly kind: "recovered-group";
  readonly span: ByteSpan;
  readonly openResidueIndex: number;
  readonly children: readonly MiniArticleCstNode[];
}

export type MiniArticleCstNode =
  | MiniArticleTokenNode
  | MiniArticleTriviaNode
  | MiniArticleResidueNode
  | MiniArticleGroupNode
  | MiniArticleRecoveredGroupNode;

export interface MiniArticleRootNode {
  readonly kind: MiniArticleStartRule;
  readonly span: ByteSpan;
  readonly children: readonly MiniArticleCstNode[];
}

export interface MiniArticleSyntaxLedgerEntry {
  readonly kind: "syntax";
  readonly span: ByteSpan;
  readonly tokenIndex: number;
}

export interface MiniArticleTriviaLedgerEntry {
  readonly kind: "trivia";
  readonly span: ByteSpan;
  readonly triviaIndex: number;
}

export interface MiniArticleResidueLedgerEntry {
  readonly kind: "residue";
  readonly span: ByteSpan;
  readonly residueIndex: number;
}

export type MiniArticleLedgerEntry =
  MiniArticleSyntaxLedgerEntry | MiniArticleTriviaLedgerEntry | MiniArticleResidueLedgerEntry;

export interface MiniArticleParseOptions {
  readonly startRule?: MiniArticleStartRule;
  readonly strict?: boolean;
  /** A zero budget deterministically expires before the first source atom. */
  readonly timeoutMs?: number;
}

export interface MiniArticleParseResult {
  readonly snapshot: SourceSnapshot;
  readonly startRule: MiniArticleStartRule;
  readonly lexicalStates: StateRunSequence<LatexLexicalState>;
  readonly tokens: readonly MiniArticleToken[];
  readonly trivia: readonly MiniArticleTrivia[];
  readonly tree: MiniArticleRootNode;
  readonly residue: readonly MiniArticleResidue[];
  readonly diagnostics: readonly MiniArticleDiagnostic[];
  readonly ledger: readonly MiniArticleLedgerEntry[];
}

export class MiniArticleTimeoutError extends Error {
  public override readonly name = "MiniArticleTimeoutError";
  public readonly timeoutMs: number;

  public constructor(timeoutMs: number) {
    super(`mini_article parsing exceeded its ${String(timeoutMs)} ms budget`);
    this.timeoutMs = timeoutMs;
  }
}

export class MiniArticleStrictError extends Error {
  public override readonly name = "MiniArticleStrictError";
  public readonly result: MiniArticleParseResult;

  public constructor(result: MiniArticleParseResult) {
    super(`strict mini_article parsing rejected ${String(result.residue.length)} residue item(s)`);
    this.result = result;
  }
}

interface LexicalSyntaxItem {
  readonly kind: "syntax";
  readonly grammarSymbol: "o" | "c" | "w" | "y" | "p" | "a" | "u" | "d" | "v" | "x";
  readonly tokenIndex: number;
  readonly span: ByteSpan;
}

interface LexicalTriviaItem {
  readonly kind: "trivia";
  readonly grammarSymbol: "t";
  readonly triviaIndex: number;
  readonly span: ByteSpan;
}

interface LexicalInvalidItem {
  readonly kind: "invalid";
  readonly grammarSymbol: "r";
  readonly byte: number;
  readonly span: ByteSpan;
}

interface LexicalUnknownItem {
  readonly kind: "unknown";
  readonly grammarSymbol: "r";
  readonly span: ByteSpan;
}

type LexicalItem = LexicalSyntaxItem | LexicalTriviaItem | LexicalInvalidItem | LexicalUnknownItem;

interface LexicalResult {
  readonly items: readonly LexicalItem[];
  readonly tokens: readonly MiniArticleToken[];
  readonly trivia: readonly MiniArticleTrivia[];
}

interface GrammarRoot {
  readonly kind: MiniArticleStartRule;
  readonly items: readonly GrammarItem[];
}

interface GrammarGroup {
  readonly kind: "group";
  readonly open: number;
  readonly children: readonly GrammarItem[];
  readonly close: number;
}

interface GrammarUnclosedGroup {
  readonly kind: "unclosed-group";
  readonly open: number;
  readonly children: readonly GrammarItem[];
}

interface GrammarIndexedItem {
  readonly kind: "syntax" | "trivia" | "residue" | "unexpected-close";
  readonly index: number;
}

type GrammarItem = GrammarGroup | GrammarUnclosedGroup | GrammarIndexedItem;

interface MaterializationState {
  readonly lexical: LexicalResult;
  readonly residue: MiniArticleResidue[];
  readonly diagnostics: MiniArticleDiagnostic[];
}

function isAsciiLetter(value: number): boolean {
  return (value >= 0x41 && value <= 0x5a) || (value >= 0x61 && value <= 0x7a);
}

function isControlWordCharacter(value: number, state: LatexLexicalState): boolean {
  return (
    isAsciiLetter(value) ||
    (state === "at-letter" && value === 0x40) ||
    (state === "expl3" && (value === 0x40 || value === 0x5f || value === 0x3a))
  );
}

function isWhitespace(value: number): boolean {
  return value === 0x09 || value === 0x0a || value === 0x0d || value === 0x20;
}

function isLineEnding(value: number): boolean {
  return value === 0x0a || value === 0x0d;
}

function isSpecial(value: number): boolean {
  return (
    value === 0x25 ||
    value === 0x2a ||
    value === 0x5c ||
    value === 0x5e ||
    value === 0x5f ||
    value === 0x7b ||
    value === 0x7d
  );
}

function spanFromAtoms(atoms: readonly SourceAtom[], start: number, end: number): ByteSpan {
  const first = atoms[start];
  const last = atoms[end - 1];
  if (first === undefined || last === undefined || end <= start) {
    throw new RangeError(`invalid atom range [${String(start)}, ${String(end)})`);
  }
  return byteSpan(first.span.start, last.span.end);
}

function isParagraph(atoms: readonly SourceAtom[], start: number, end: number): boolean {
  return (
    end - start === 4 &&
    atoms[start]?.value === 0x5c &&
    atoms[start + 1]?.value === 0x70 &&
    atoms[start + 2]?.value === 0x61 &&
    atoms[start + 3]?.value === 0x72
  );
}

function lex(
  snapshot: SourceSnapshot,
  lexicalStates: StateRunSequence<LatexLexicalState>,
  checkBudget: () => void,
): LexicalResult {
  const atoms = SourceTopology.of(snapshot).listAtoms();
  const tokens: MiniArticleToken[] = [];
  const trivia: MiniArticleTrivia[] = [];
  const items: LexicalItem[] = [];

  const addToken = (
    kind: MiniArticleTokenKind,
    span: ByteSpan,
    grammarSymbol: LexicalSyntaxItem["grammarSymbol"],
  ): void => {
    const tokenIndex = tokens.length;
    tokens.push(Object.freeze({ kind, span }));
    items.push(Object.freeze({ kind: "syntax", grammarSymbol, tokenIndex, span }));
  };

  const addTrivia = (kind: MiniArticleTriviaKind, span: ByteSpan): void => {
    const triviaIndex = trivia.length;
    trivia.push(Object.freeze({ kind, span }));
    items.push(Object.freeze({ kind: "trivia", grammarSymbol: "t", triviaIndex, span }));
  };

  const addInvalid = (atom: SourceAtom): void => {
    items.push(
      Object.freeze({ kind: "invalid", grammarSymbol: "r", byte: atom.value, span: atom.span }),
    );
  };

  const addUnknown = (span: ByteSpan): void => {
    items.push(Object.freeze({ kind: "unknown", grammarSymbol: "r", span }));
  };

  let index = 0;
  while (index < atoms.length) {
    checkBudget();
    const atom = atoms[index];
    if (atom === undefined) {
      throw new Error(`missing source atom ${String(index)}`);
    }
    if (!atom.valid) {
      addInvalid(atom);
      index++;
      continue;
    }

    const stateRun = lexicalStates.stateAt(atom.span.start);
    if (stateRun === undefined) {
      throw new Error(`lexical state does not cover source atom ${String(index)}`);
    }
    const lexicalState = stateRun.state;
    if (lexicalState === "verbatim" || lexicalState === "unknown") {
      const start = index;
      index++;
      while (index < atoms.length) {
        const next = atoms[index];
        if (next === undefined || !next.valid || next.span.start >= stateRun.span.end) {
          break;
        }
        index++;
      }
      const span = spanFromAtoms(atoms, start, index);
      if (lexicalState === "verbatim") {
        addToken("verbatim", span, "v");
      } else {
        addUnknown(span);
      }
      continue;
    }

    if (isWhitespace(atom.value)) {
      const start = index;
      index++;
      while (index < atoms.length) {
        const next = atoms[index];
        if (
          next === undefined ||
          !next.valid ||
          !isWhitespace(next.value) ||
          lexicalStates.stateAt(next.span.start)?.state !== lexicalState
        ) {
          break;
        }
        index++;
      }
      addTrivia("whitespace", spanFromAtoms(atoms, start, index));
      continue;
    }

    if (atom.value === 0x25) {
      let segmentStart = index;
      index++;
      while (index < atoms.length) {
        const next = atoms[index];
        if (next === undefined || (next.valid && isLineEnding(next.value))) {
          break;
        }
        if (!next.valid) {
          if (segmentStart < index) {
            addTrivia("comment", spanFromAtoms(atoms, segmentStart, index));
          }
          addInvalid(next);
          index++;
          segmentStart = index;
          continue;
        }
        index++;
      }
      if (segmentStart < index) {
        addTrivia("comment", spanFromAtoms(atoms, segmentStart, index));
      }
      continue;
    }

    if (atom.value === 0x7b) {
      addToken("group-open", atom.span, "o");
      index++;
      continue;
    }
    if (atom.value === 0x7d) {
      addToken("group-close", atom.span, "c");
      index++;
      continue;
    }

    if (atom.value === 0x2a) {
      addToken("star", atom.span, "a");
      index++;
      continue;
    }
    if (atom.value === 0x5e) {
      addToken("superscript-marker", atom.span, "u");
      index++;
      continue;
    }
    if (atom.value === 0x5f) {
      addToken("subscript-marker", atom.span, "d");
      index++;
      continue;
    }

    if (atom.value === 0x5c) {
      const start = index;
      const next = atoms[index + 1];
      if (next !== undefined && next.valid && isControlWordCharacter(next.value, lexicalState)) {
        index += 2;
        while (index < atoms.length) {
          const following = atoms[index];
          if (
            following === undefined ||
            !following.valid ||
            !isControlWordCharacter(following.value, lexicalState) ||
            lexicalStates.stateAt(following.span.start)?.state !== lexicalState
          ) {
            break;
          }
          index++;
        }
        const span = spanFromAtoms(atoms, start, index);
        if (isParagraph(atoms, start, index)) {
          addToken("paragraph", span, "p");
        } else {
          addToken("control-word", span, "w");
        }
        continue;
      }
      if (next?.valid === true) {
        index += 2;
      } else {
        index++;
      }
      addToken("control-symbol", spanFromAtoms(atoms, start, index), "y");
      continue;
    }

    const start = index;
    index++;
    while (index < atoms.length) {
      const next = atoms[index];
      if (
        next === undefined ||
        !next.valid ||
        isWhitespace(next.value) ||
        isSpecial(next.value) ||
        lexicalStates.stateAt(next.span.start)?.state !== lexicalState
      ) {
        break;
      }
      index++;
    }
    addToken("text", spanFromAtoms(atoms, start, index), "x");
  }

  return Object.freeze({
    items: Object.freeze(items),
    tokens: Object.freeze(tokens),
    trivia: Object.freeze(trivia),
  });
}

function lexicalItemAt(lexical: LexicalResult, index: number): LexicalItem {
  if (!Number.isSafeInteger(index) || index < 0) {
    throw new RangeError(`invalid lexical item index ${String(index)}`);
  }
  const item = lexical.items[index];
  if (item === undefined) {
    throw new RangeError(`missing lexical item ${String(index)}`);
  }
  return item;
}

function syntaxItemAt(lexical: LexicalResult, index: number): LexicalSyntaxItem {
  const item = lexicalItemAt(lexical, index);
  if (item.kind !== "syntax") {
    throw new Error(`lexical item ${String(index)} is not syntax`);
  }
  return item;
}

function addResidue(
  state: MaterializationState,
  residue: MiniArticleResidue,
  message: string,
): MiniArticleResidueNode {
  const residueIndex = state.residue.length;
  state.residue.push(Object.freeze(residue));
  state.diagnostics.push(
    Object.freeze({
      code: residue.kind,
      severity: "error",
      span: residue.span,
      residueIndex,
      message,
    }),
  );
  return Object.freeze({ kind: "residue", span: residue.span, residueIndex });
}

function materializeItem(item: GrammarItem, state: MaterializationState): MiniArticleCstNode {
  switch (item.kind) {
    case "syntax": {
      const lexical = syntaxItemAt(state.lexical, item.index);
      return Object.freeze({ kind: "token", span: lexical.span, tokenIndex: lexical.tokenIndex });
    }
    case "trivia": {
      const lexical = lexicalItemAt(state.lexical, item.index);
      if (lexical.kind !== "trivia") {
        throw new Error(`lexical item ${String(item.index)} is not trivia`);
      }
      return Object.freeze({
        kind: "trivia",
        span: lexical.span,
        triviaIndex: lexical.triviaIndex,
      });
    }
    case "residue": {
      const lexical = lexicalItemAt(state.lexical, item.index);
      if (lexical.kind === "invalid") {
        return addResidue(
          state,
          { kind: "invalid-utf8-byte", span: lexical.span, byte: lexical.byte },
          `invalid UTF-8 byte 0x${lexical.byte.toString(16).padStart(2, "0")}`,
        );
      }
      if (lexical.kind === "unknown") {
        return addResidue(
          state,
          { kind: "unknown-lexical-state", span: lexical.span },
          "source bytes occur under an unresolved lexical-state continuation",
        );
      }
      throw new Error(`lexical item ${String(item.index)} is not residue material`);
    }
    case "unexpected-close": {
      const lexical = syntaxItemAt(state.lexical, item.index);
      return addResidue(
        state,
        {
          kind: "unexpected-group-close",
          span: lexical.span,
          tokenIndex: lexical.tokenIndex,
        },
        "group close has no matching open",
      );
    }
    case "group": {
      const open = syntaxItemAt(state.lexical, item.open);
      const close = syntaxItemAt(state.lexical, item.close);
      const children = Object.freeze(item.children.map((child) => materializeItem(child, state)));
      return Object.freeze({
        kind: "group",
        span: byteSpan(open.span.start, close.span.end),
        openTokenIndex: open.tokenIndex,
        children,
        closeTokenIndex: close.tokenIndex,
      });
    }
    case "unclosed-group": {
      const open = syntaxItemAt(state.lexical, item.open);
      const opening = addResidue(
        state,
        { kind: "unclosed-group-open", span: open.span, tokenIndex: open.tokenIndex },
        "group open reaches the end of input without a close",
      );
      const children = Object.freeze(item.children.map((child) => materializeItem(child, state)));
      const finalChild = children.at(-1);
      return Object.freeze({
        kind: "recovered-group",
        span: byteSpan(open.span.start, finalChild?.span.end ?? open.span.end),
        openResidueIndex: opening.residueIndex,
        children,
      });
    }
  }
}

function addLedgerNode(
  node: MiniArticleCstNode,
  entries: MiniArticleLedgerEntry[],
  tokens: readonly MiniArticleToken[],
  trivia: readonly MiniArticleTrivia[],
  residue: readonly MiniArticleResidue[],
): void {
  switch (node.kind) {
    case "token":
      entries.push(Object.freeze({ kind: "syntax", span: node.span, tokenIndex: node.tokenIndex }));
      return;
    case "trivia":
      entries.push(
        Object.freeze({ kind: "trivia", span: node.span, triviaIndex: node.triviaIndex }),
      );
      return;
    case "residue":
      entries.push(
        Object.freeze({ kind: "residue", span: node.span, residueIndex: node.residueIndex }),
      );
      return;
    case "group": {
      const open = tokens[node.openTokenIndex];
      const close = tokens[node.closeTokenIndex];
      if (open === undefined || close === undefined) {
        throw new Error("group references a missing delimiter token");
      }
      entries.push(
        Object.freeze({ kind: "syntax", span: open.span, tokenIndex: node.openTokenIndex }),
      );
      for (const child of node.children) {
        addLedgerNode(child, entries, tokens, trivia, residue);
      }
      entries.push(
        Object.freeze({ kind: "syntax", span: close.span, tokenIndex: node.closeTokenIndex }),
      );
      return;
    }
    case "recovered-group": {
      const opening = residue[node.openResidueIndex];
      if (opening === undefined) {
        throw new Error("recovered group references missing opening residue");
      }
      entries.push(
        Object.freeze({
          kind: "residue",
          span: opening.span,
          residueIndex: node.openResidueIndex,
        }),
      );
      for (const child of node.children) {
        addLedgerNode(child, entries, tokens, trivia, residue);
      }
      return;
    }
  }
}

function referencedSpan(
  entry: MiniArticleLedgerEntry,
  tokens: readonly MiniArticleToken[],
  trivia: readonly MiniArticleTrivia[],
  residue: readonly MiniArticleResidue[],
): ByteSpan {
  switch (entry.kind) {
    case "syntax": {
      const token = tokens[entry.tokenIndex];
      if (token === undefined) {
        throw new Error(`ledger references missing token ${String(entry.tokenIndex)}`);
      }
      return token.span;
    }
    case "trivia": {
      const item = trivia[entry.triviaIndex];
      if (item === undefined) {
        throw new Error(`ledger references missing trivia ${String(entry.triviaIndex)}`);
      }
      return item.span;
    }
    case "residue": {
      const item = residue[entry.residueIndex];
      if (item === undefined) {
        throw new Error(`ledger references missing residue ${String(entry.residueIndex)}`);
      }
      return item.span;
    }
  }
}

function buildLedger(
  snapshot: SourceSnapshot,
  tree: MiniArticleRootNode,
  tokens: readonly MiniArticleToken[],
  trivia: readonly MiniArticleTrivia[],
  residue: readonly MiniArticleResidue[],
): readonly MiniArticleLedgerEntry[] {
  const entries: MiniArticleLedgerEntry[] = [];
  for (const child of tree.children) {
    addLedgerNode(child, entries, tokens, trivia, residue);
  }

  let cursor = 0;
  for (const entry of entries) {
    if (entry.span.start !== cursor || entry.span.end <= entry.span.start) {
      throw new Error(
        `unbalanced byte ledger at ${String(cursor)}: found [${String(entry.span.start)}, ${String(entry.span.end)})`,
      );
    }
    const reference = referencedSpan(entry, tokens, trivia, residue);
    if (!spanEquals(entry.span, reference)) {
      throw new Error("ledger entry does not match its referenced syntax, trivia, or residue span");
    }
    cursor = entry.span.end;
  }
  if (cursor !== snapshot.byteLength) {
    throw new Error(
      `unbalanced byte ledger ends at ${String(cursor)}, expected ${String(snapshot.byteLength)}`,
    );
  }
  return Object.freeze(entries);
}

function validateTimeout(timeoutMs: number | undefined): void {
  if (timeoutMs !== undefined && (!Number.isFinite(timeoutMs) || timeoutMs < 0)) {
    throw new RangeError(
      `timeoutMs must be a finite non-negative number, received ${String(timeoutMs)}`,
    );
  }
}

function createBudgetCheck(timeoutMs: number | undefined): () => void {
  validateTimeout(timeoutMs);
  const started = performance.now();
  return (): void => {
    if (timeoutMs !== undefined && performance.now() - started >= timeoutMs) {
      throw new MiniArticleTimeoutError(timeoutMs);
    }
  };
}

/** Parse one immutable source basis into the Phase 3 mechanics result. */
export function parseMiniArticle(
  snapshot: SourceSnapshot,
  options: MiniArticleParseOptions = {},
): MiniArticleParseResult {
  const startRule = options.startRule ?? "document";
  const checkBudget = createBudgetCheck(options.timeoutMs);
  checkBudget();
  const lexicalStates = scanLatexLexicalStates(snapshot);
  const lexical = lex(snapshot, lexicalStates, checkBudget);
  const grammarInput = lexical.items.map((item) => item.grammarSymbol).join("");
  const generated =
    startRule === "document"
      ? parseGenerated(grammarInput, { startRule: "Document", checkBudget })
      : parseGenerated(grammarInput, { startRule: "Fragment", checkBudget });
  checkBudget();

  // Generated-grammar invariant: the selected public start rule returns GrammarRoot.
  const grammar = generated as GrammarRoot;
  if (grammar.kind !== startRule) {
    throw new Error(`generated grammar returned ${grammar.kind} for ${startRule}`);
  }

  const state: MaterializationState = { lexical, residue: [], diagnostics: [] };
  const children = Object.freeze(grammar.items.map((item) => materializeItem(item, state)));
  const tree: MiniArticleRootNode = Object.freeze({
    kind: startRule,
    span: snapshot.extent,
    children,
  });
  const residue = Object.freeze(state.residue);
  const diagnostics = Object.freeze(state.diagnostics);
  const ledger = buildLedger(snapshot, tree, lexical.tokens, lexical.trivia, residue);
  const result: MiniArticleParseResult = Object.freeze({
    snapshot,
    startRule,
    lexicalStates,
    tokens: lexical.tokens,
    trivia: lexical.trivia,
    tree,
    residue,
    diagnostics,
    ledger,
  });

  if (options.strict === true && residue.length > 0) {
    throw new MiniArticleStrictError(result);
  }
  return result;
}

/** Reassemble exact source bytes from the checked, non-overlapping ledger. */
export function realizeMiniArticle(result: MiniArticleParseResult): Uint8Array {
  const realized = new Uint8Array(result.snapshot.byteLength);
  for (const entry of result.ledger) {
    realized.set(result.snapshot.copyBytes(entry.span), entry.span.start);
  }
  return realized;
}
