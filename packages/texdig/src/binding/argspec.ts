import type { SemanticDiagnostic, SemanticStatus } from "../evidence/types.js";
import type { ArgumentPattern, ArgumentToken } from "../registry/types.js";
import { byteSpan, type ByteSpan } from "../source/index.js";
import type { ArgumentBinding, BindingToken, BoundArgument, InvocationView } from "./types.js";

function spelling(token: BindingToken | undefined): string | undefined {
  return token !== undefined && "spelling" in token ? token.spelling : undefined;
}

function hasParagraph(tokens: readonly BindingToken[]): boolean {
  const pending = [...tokens];
  while (pending.length > 0) {
    const token = pending.pop();
    if (token?.kind === "paragraph") return true;
    if (token?.kind === "group") for (const child of token.children) pending.push(child);
  }
  return false;
}

function hasResidue(tokens: readonly BindingToken[]): boolean {
  const pending = [...tokens];
  while (pending.length > 0) {
    const token = pending.pop();
    if (token?.kind === "residue") return true;
    if (token?.kind === "group") for (const child of token.children) pending.push(child);
  }
  return false;
}

function required(spec: ArgumentPattern): boolean {
  return (
    spec.code === "m" ||
    spec.code === "r" ||
    spec.code === "R" ||
    spec.code === "u" ||
    spec.code === "b" ||
    spec.code === "v"
  );
}

/** Interpret only source tokens. No recursively attached macro hull becomes one TeX token. */
export function bindArguments(
  invocation: InvocationView,
  pattern: readonly ArgumentPattern[],
): ArgumentBinding {
  const { items, endIndex } = invocation.candidates;
  const args: BoundArgument[] = [];
  const diagnostics: SemanticDiagnostic[] = [];
  let cursor = invocation.candidates.startIndex;
  let consumedEnd = invocation.commandSpan.end;
  let examinedEnd = consumedEnd;
  let status: SemanticStatus = "resolved";

  function point(index: number): ByteSpan {
    const at =
      index < endIndex
        ? (items[index]?.span.start ?? invocation.candidates.span.end)
        : invocation.candidates.span.end;
    return byteSpan(at, at);
  }
  function fail(
    code: SemanticDiagnostic["code"],
    span: ByteSpan,
    message: string,
    uncertain = false,
  ): void {
    diagnostics.push(
      Object.freeze({
        code,
        location: Object.freeze({ snapshot: invocation.snapshot, span }),
        message,
      }),
    );
    status = uncertain ? "unknown" : status === "unknown" ? "unknown" : "conflict";
    if (span.end > examinedEnd) examinedEnd = span.end;
  }
  function skipTrivia(index: number, spaces: boolean): number {
    let afterComment = false;
    while (index < endIndex) {
      const token = items[index];
      if (token?.kind === "comment") {
        afterComment = true;
        index++;
      } else if (
        token?.kind === "space" &&
        (spaces || (afterComment && /\r|\n/u.test(token.spelling)))
      ) {
        index++;
        afterComment = false;
      } else break;
    }
    return index;
  }
  function take(next: number): void {
    cursor = next;
    const last = items[next - 1];
    if (last !== undefined && last.span.end > consumedEnd) consumedEnd = last.span.end;
    if (consumedEnd > examinedEnd) examinedEnd = consumedEnd;
  }
  function sourceArgument(
    index: number,
    spec: ArgumentPattern,
    patternIndex: number,
    ordinal: number,
  ): { argument: BoundArgument; next: number } | undefined {
    const token = index < endIndex ? items[index] : undefined;
    if (token === undefined) {
      fail("missing-argument", point(index), "A required source argument is missing.");
      return undefined;
    }
    if (token.kind === "residue" || (token.kind === "group" && hasResidue(token.children))) {
      fail("syntax-residue", token.span, "The candidate contains syntax residue.", true);
      return undefined;
    }
    if (
      !spec.modifiers.includes("+") &&
      (token.kind === "paragraph" || (token.kind === "group" && hasParagraph(token.children)))
    ) {
      fail(
        "paragraph-not-allowed",
        token.span,
        "A short argument cannot contain a paragraph token.",
      );
      return undefined;
    }
    if (token.kind === "verbatim") {
      fail(
        "unavailable-strategy",
        token.span,
        "A verbatim lexical region requires its own argument reader.",
        true,
      );
      return undefined;
    }
    return {
      argument: Object.freeze({
        kind: "source",
        ordinal,
        patternIndex,
        span: token.span,
        contentSpan: token.kind === "group" ? token.contentSpan : token.span,
      }),
      next: index + 1,
    };
  }
  function absent(
    spec: ArgumentPattern,
    patternIndex: number,
    ordinal: number,
    index: number,
  ): void {
    const at = point(index);
    if (spec.code === "s" || spec.code === "t")
      args.push(Object.freeze({ kind: "boolean", ordinal, patternIndex, value: false }));
    else if (spec.code === "O" || spec.code === "D" || spec.code === "R")
      args.push(
        Object.freeze({
          kind: "default",
          ordinal,
          patternIndex,
          value: spec.defaultValue,
          at,
          reason: spec.code === "R" ? "required-delimiter-missing" : "optional-not-present",
        }),
      );
    else if (required(spec))
      args.push(
        Object.freeze({ kind: "missing", ordinal, patternIndex, at, reason: "required-argument" }),
      );
    else
      args.push(
        Object.freeze({
          kind: "absent",
          ordinal,
          patternIndex,
          at,
          reason: "optional-not-present",
        }),
      );
    if (required(spec)) fail("missing-argument", at, "A required opening delimiter is missing.");
  }

  for (const [patternIndex, spec] of pattern.entries()) {
    const ordinal = args.length;
    if (/[^+!]/u.test(spec.modifiers)) {
      fail(
        "invalid-argument-pattern",
        point(cursor),
        "The argument has an unknown modifier.",
        true,
      );
      break;
    }
    const laterRequired = pattern.slice(patternIndex).some(required);
    const initialWordSpace = cursor === invocation.candidates.startIndex && invocation.controlWord;
    const previous = items[cursor - 1];
    const followingWordSpace = previous?.kind === "command" && previous.controlWord;
    const index = skipTrivia(
      cursor,
      !spec.modifiers.includes("!") ||
        required(spec) ||
        laterRequired ||
        initialWordSpace ||
        followingWordSpace,
    );
    const token = index < endIndex ? items[index] : undefined;
    if (token?.kind === "residue") {
      fail(
        "syntax-residue",
        token.span,
        "The next token has no known lexical interpretation.",
        true,
      );
      break;
    }
    if (spec.code === "m") {
      const result = sourceArgument(index, spec, patternIndex, ordinal);
      if (result === undefined) {
        args.push(
          Object.freeze({
            kind: "missing",
            ordinal,
            patternIndex,
            reason: "required-argument",
            at: point(index),
          }),
        );
        break;
      }
      args.push(result.argument);
      take(result.next);
    } else if (spec.code === "s" || spec.code === "t") {
      const target = spec.code === "t" ? spec.token.spelling : "*";
      if (spec.code === "t" && spec.token.kind === "group") {
        fail(
          "invalid-argument-pattern",
          point(index),
          "A token test requires one token, not a group.",
          true,
        );
        break;
      }
      if (token !== undefined && spelling(token) === target) {
        args.push(
          Object.freeze({ kind: "boolean", ordinal, patternIndex, value: true, span: token.span }),
        );
        take(index + 1);
      } else absent(spec, patternIndex, ordinal, index);
    } else if (
      spec.code === "o" ||
      spec.code === "O" ||
      spec.code === "d" ||
      spec.code === "D" ||
      spec.code === "r" ||
      spec.code === "R"
    ) {
      const open = "open" in spec ? spec.open.spelling : "[";
      const close = "close" in spec ? spec.close.spelling : "]";
      if (open === "{" && close === "}" && token?.kind === "group") {
        const result = sourceArgument(index, spec, patternIndex, ordinal);
        if (result === undefined) break;
        args.push(result.argument);
        take(result.next);
        continue;
      }
      if (spelling(token) !== open) {
        absent(spec, patternIndex, ordinal, index);
        if (required(spec)) break;
        continue;
      }
      let end = index + 1;
      let depth = 1;
      for (; end < endIndex; end++) {
        const current = items[end];
        if (spelling(current) === close) depth--;
        else if (open !== close && spelling(current) === open) depth++;
        if (depth === 0) break;
      }
      if (end === endIndex || token === undefined) {
        args.push(
          Object.freeze({
            kind: "missing",
            ordinal,
            patternIndex,
            reason: "closing-delimiter",
            at: point(end),
          }),
        );
        fail(
          "unclosed-delimiter",
          byteSpan(token?.span.start ?? point(index).start, invocation.candidates.span.end),
          "The delimited argument has no matching close.",
        );
        break;
      }
      const closing = items[end];
      if (closing === undefined) throw new Error("matched delimiter is absent");
      const contents = items.slice(index + 1, end);
      if (hasResidue(contents)) {
        fail(
          "syntax-residue",
          byteSpan(token.span.start, closing.span.end),
          "The argument crosses syntax residue.",
          true,
        );
        break;
      }
      if (!spec.modifiers.includes("+") && hasParagraph(contents)) {
        fail(
          "paragraph-not-allowed",
          byteSpan(token.span.start, closing.span.end),
          "The delimited argument is short.",
        );
        break;
      }
      args.push(
        Object.freeze({
          kind: "source",
          ordinal,
          patternIndex,
          span: byteSpan(token.span.start, closing.span.end),
          contentSpan: byteSpan(token.span.end, closing.span.start),
        }),
      );
      take(end + 1);
    } else if (spec.code === "u") {
      const stops = spec.stop.kind === "group" ? spec.stop.children : [spec.stop];
      if (stops.length === 0 || stops.some((t) => t.kind === "group")) {
        fail(
          "invalid-argument-pattern",
          point(index),
          "An until delimiter must be a nonempty flat token sequence.",
          true,
        );
        break;
      }
      let end = index;
      for (; end + stops.length <= endIndex; end++) {
        if (stops.every((stop, offset) => spelling(items[end + offset]) === stop.spelling)) break;
      }
      if (end + stops.length > endIndex) {
        args.push(
          Object.freeze({
            kind: "missing",
            ordinal,
            patternIndex,
            reason: "closing-delimiter",
            at: point(endIndex),
          }),
        );
        fail(
          "unclosed-delimiter",
          byteSpan(point(index).start, invocation.candidates.span.end),
          "The complete until delimiter was not found.",
        );
        break;
      }
      const contents = items.slice(index, end);
      if (hasResidue(contents)) {
        fail(
          "syntax-residue",
          byteSpan(point(index).start, point(end).start),
          "The until argument crosses syntax residue.",
          true,
        );
        break;
      }
      if (!spec.modifiers.includes("+") && hasParagraph(contents)) {
        fail(
          "paragraph-not-allowed",
          byteSpan(point(index).start, point(end).start),
          "The until argument is short.",
        );
        break;
      }
      const closing = items[end + stops.length - 1];
      if (closing === undefined) throw new Error("until delimiter is absent");
      const contentSpan =
        contents.length === 1 && contents[0]?.kind === "group"
          ? contents[0].contentSpan
          : byteSpan(point(index).start, point(end).start);
      args.push(
        Object.freeze({
          kind: "source",
          ordinal,
          patternIndex,
          span: byteSpan(point(index).start, closing.span.end),
          contentSpan,
        }),
      );
      take(end + stops.length);
    } else if (spec.code === "e" || spec.code === "E") {
      const markers = spec.tokens.kind === "group" ? spec.tokens.children : [spec.tokens];
      if (
        markers.some((t) => t.kind === "group") ||
        new Set(markers.map((t) => t.spelling)).size !== markers.length
      ) {
        fail(
          "invalid-argument-pattern",
          point(index),
          "Embellishment tokens must be distinct single tokens.",
          true,
        );
        break;
      }
      const found = new Map<number, BoundArgument>();
      let next = index;
      while (next < endIndex) {
        const markerIndex = markers.findIndex((t) => t.spelling === spelling(items[next]));
        if (markerIndex < 0 || found.has(markerIndex)) break;
        const valueIndex = skipTrivia(next + 1, true);
        const result = sourceArgument(valueIndex, spec, patternIndex, ordinal + markerIndex);
        if (result === undefined) break;
        found.set(markerIndex, result.argument);
        take(result.next);
        next = skipTrivia(cursor, !spec.modifiers.includes("!") || laterRequired);
      }
      const defaults: readonly ArgumentToken[] =
        spec.code === "E"
          ? spec.defaults.kind === "group"
            ? spec.defaults.children
            : [spec.defaults]
          : [];
      for (let markerIndex = 0; markerIndex < markers.length; markerIndex++) {
        const argument = found.get(markerIndex);
        const fallback = defaults[markerIndex];
        args.push(
          argument ??
            (fallback === undefined
              ? Object.freeze({
                  kind: "absent",
                  ordinal: ordinal + markerIndex,
                  patternIndex,
                  at: point(next),
                  reason: "optional-not-present",
                })
              : Object.freeze({
                  kind: "default",
                  ordinal: ordinal + markerIndex,
                  patternIndex,
                  at: point(next),
                  reason: "optional-not-present",
                  value: fallback,
                })),
        );
      }
    } else {
      fail(
        "unsupported-argument-form",
        point(index),
        spec.code === "b"
          ? "Body arguments require an explicitly paired environment context."
          : "The inherited fixed-delimiter verbatim pattern is not an implemented LaTeX verbatim reader.",
        true,
      );
      break;
    }
    if (diagnostics.length > 0) break;
  }
  return Object.freeze({
    status,
    arguments: Object.freeze(args),
    examinedSpan: byteSpan(invocation.commandSpan.end, examinedEnd),
    ...(diagnostics.length === 0
      ? { hull: byteSpan(invocation.commandSpan.start, consumedEnd) }
      : {}),
    nextIndex: cursor,
    diagnostics: Object.freeze(diagnostics),
  });
}
