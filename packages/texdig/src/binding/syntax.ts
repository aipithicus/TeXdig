import type { LatexCstNode, LatexParseResult } from "../latex/index.js";
import { SourceTopology, byteSpan, type ByteSpan } from "../source/index.js";
import type { BindingSyntax, BindingToken, InvocationView } from "./types.js";

/** The decoder is used only on syntax spans already known to contain valid UTF-8. */
export function syntaxText(parse: LatexParseResult, span: ByteSpan): string {
  return new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(
    parse.snapshot.copyBytes(span),
  );
}

export function createBindingSyntax(parse: LatexParseResult): BindingSyntax {
  const topology = SourceTopology.of(parse.snapshot);
  function sequence(nodes: readonly LatexCstNode[]): readonly BindingToken[] {
    const items: BindingToken[] = [];
    for (const node of nodes) {
      if (node.kind === "recovered-group") {
        items.push(
          Object.freeze({ kind: "residue", span: node.span, children: sequence(node.children) }),
        );
      } else if (node.kind === "residue") {
        items.push(Object.freeze({ kind: "residue", span: node.span }));
      } else if (node.kind === "group") {
        const open = parse.tokens[node.openTokenIndex];
        const close = parse.tokens[node.closeTokenIndex];
        if (open === undefined || close === undefined)
          throw new Error("CST group has no delimiter token");
        items.push(
          Object.freeze({
            kind: "group",
            span: node.span,
            contentSpan: byteSpan(open.span.end, close.span.start),
            children: sequence(node.children),
          }),
        );
      } else if (node.kind === "trivia") {
        const trivia = parse.trivia[node.triviaIndex];
        if (trivia === undefined) throw new Error("CST trivia index is missing");
        const spelling = syntaxText(parse, node.span);
        const lineNormalized = spelling.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
        items.push(
          Object.freeze({
            kind:
              trivia.kind === "comment"
                ? "comment"
                : /\n[\t ]*\n/u.test(lineNormalized)
                  ? "paragraph"
                  : "space",
            span: node.span,
            spelling,
          }),
        );
      } else {
        const token = parse.tokens[node.tokenIndex];
        if (token === undefined) throw new Error("CST token index is missing");
        if (
          token.kind === "control-word" ||
          token.kind === "control-symbol" ||
          token.kind === "paragraph" ||
          token.kind === "verbatim"
        ) {
          items.push(
            Object.freeze({
              kind:
                token.kind === "paragraph"
                  ? "paragraph"
                  : token.kind === "verbatim"
                    ? "verbatim"
                    : "command",
              span: token.span,
              spelling: syntaxText(parse, token.span),
              controlWord: token.kind === "control-word",
            }),
          );
        } else {
          const atoms = topology.byteSpanToAtom(token.span, "atoms");
          for (let index = atoms.start; index < atoms.end; index++) {
            const atom = topology.atomAt(index);
            items.push(
              Object.freeze({
                kind: "character",
                span: atom.span,
                spelling: String.fromCodePoint(atom.value),
              }),
            );
          }
        }
      }
    }
    return Object.freeze(items);
  }
  const items = sequence(parse.tree.children);
  const invocations: InvocationView[] = [];
  const pending: {
    items: readonly BindingToken[];
    scope: ByteSpan;
    scopeStatus: "complete" | "recovered";
  }[] = [{ items, scope: parse.tree.span, scopeStatus: "complete" }];
  while (pending.length > 0) {
    const frame = pending.pop();
    if (frame === undefined) break;
    for (const [index, token] of frame.items.entries()) {
      if (token.kind === "group")
        pending.push({
          items: token.children,
          scope: token.contentSpan,
          scopeStatus: frame.scopeStatus,
        });
      if (token.kind === "residue" && token.children !== undefined)
        pending.push({ items: token.children, scope: token.span, scopeStatus: "recovered" });
      if (token.kind !== "command" && !(token.kind === "paragraph" && token.spelling === "\\par"))
        continue;
      invocations.push(
        Object.freeze({
          id: `${parse.snapshot.identity.sourceId}:${parse.snapshot.identity.contentHash}:${String(parse.snapshot.identity.revision)}:${String(token.span.start)}`,
          snapshot: parse.snapshot,
          commandSpan: token.span,
          name: token.spelling.slice(1),
          escapeToken: "\\",
          controlWord: token.kind === "command" ? token.controlWord : true,
          scope: frame.scope,
          scopeStatus: frame.scopeStatus,
          candidates: Object.freeze({
            items: frame.items,
            startIndex: index + 1,
            endIndex: frame.items.length,
            span: byteSpan(token.span.end, frame.scope.end),
          }),
        }),
      );
    }
  }
  invocations.sort((a, b) => a.commandSpan.start - b.commandSpan.start);
  return Object.freeze({ parse, items, invocations: Object.freeze(invocations) });
}
