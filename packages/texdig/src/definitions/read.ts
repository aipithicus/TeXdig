import { bindArguments } from "../binding/argspec.js";
import { normalizeArgumentPattern, argumentToken } from "../binding/pattern.js";
import type {
  BindingToken,
  BoundArgument,
  InvocationBinding,
  InvocationView,
} from "../binding/types.js";
import type { SemanticDiagnostic, SourceLocation } from "../evidence/types.js";
import type { ArgumentPattern, DefinitionForm, RegistrySubject } from "../registry/types.js";
import { byteSpan, type ByteSpan } from "../source/index.js";
import type { DocumentDefinition } from "./types.js";

export function diagnostic(
  invocation: InvocationView,
  code: SemanticDiagnostic["code"],
  message: string,
  span: ByteSpan = invocation.commandSpan,
): SemanticDiagnostic {
  return Object.freeze({
    code,
    message,
    location: Object.freeze({ snapshot: invocation.snapshot, span }),
  });
}
export function textAt(invocation: InvocationView, span: ByteSpan): string {
  return new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(
    invocation.snapshot.copyBytes(span),
  );
}
export function location(invocation: InvocationView, span: ByteSpan): SourceLocation {
  return Object.freeze({ snapshot: invocation.snapshot, span });
}
export function sourceArgument(
  arg: BoundArgument | undefined,
  invocation: InvocationView,
): SourceLocation | undefined {
  return arg?.kind === "source" ? location(invocation, arg.contentSpan) : undefined;
}
export function literalSubject(
  value: SourceLocation | undefined,
  environment: boolean,
  invocation: InvocationView,
): RegistrySubject | undefined {
  if (value === undefined) return undefined;
  const text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true })
    .decode(value.snapshot.copyBytes(value.span))
    .trim();
  if (environment)
    return /^[a-zA-Z0-9@*:_-]+$/u.test(text)
      ? Object.freeze({ kind: "environment", name: text })
      : undefined;
  const pending = [...invocation.candidates.items];
  const material: BindingToken[] = [];
  while (pending.length > 0) {
    const token = pending.pop();
    if (
      token === undefined ||
      token.span.end <= value.span.start ||
      token.span.start >= value.span.end
    )
      continue;
    if (token.kind === "group") {
      for (const child of token.children) pending.push(child);
    } else if (token.kind !== "space" && token.kind !== "comment") material.push(token);
  }
  const token = material[0];
  return material.length === 1 && token?.kind === "command"
    ? Object.freeze({ kind: "command", name: token.spelling.slice(1), escapeToken: "\\" })
    : undefined;
}
function nextMaterial(items: readonly BindingToken[], from: number): number {
  while (items[from]?.kind === "space" || items[from]?.kind === "comment") from++;
  return from;
}
function replacementDiagnostics(
  invocation: InvocationView,
  body: SourceLocation,
  parameterCount: number,
): readonly SemanticDiagnostic[] {
  const pending = [...invocation.candidates.items];
  const tokens: BindingToken[] = [];
  while (pending.length > 0) {
    const token = pending.pop();
    if (
      token === undefined ||
      token.span.end <= body.span.start ||
      token.span.start >= body.span.end
    )
      continue;
    if (token.kind === "group") for (const child of token.children) pending.push(child);
    else tokens.push(token);
  }
  tokens.sort((a, b) => a.span.start - b.span.start);
  const diagnostics: SemanticDiagnostic[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token?.kind === "residue" || token?.kind === "verbatim")
      diagnostics.push(
        diagnostic(
          invocation,
          "syntax-residue",
          "Replacement text contains an uncertain lexical region.",
          token.span,
        ),
      );
    if (token?.kind !== "character" || token.spelling !== "#") continue;
    const next = tokens[++i];
    if (
      next?.kind !== "character" ||
      (next.spelling !== "#" &&
        (!/^[1-9]$/u.test(next.spelling) || Number(next.spelling) > parameterCount))
    )
      diagnostics.push(
        diagnostic(
          invocation,
          "unsupported-definition",
          "Replacement parameter is outside this definition's declared parameters.",
          token.span,
        ),
      );
  }
  return diagnostics;
}
export interface DefinitionRead {
  readonly subject?: RegistrySubject;
  readonly pattern?: readonly ArgumentPattern[];
  readonly span: ByteSpan;
  readonly prefix: readonly BindingToken[];
  readonly parameterText?: SourceLocation;
  readonly body?: SourceLocation;
  readonly endBody?: SourceLocation;
  readonly aliasSubject?: RegistrySubject;
  readonly defaults: DocumentDefinition["defaults"];
  readonly diagnostics: readonly SemanticDiagnostic[];
}
/** Read declarations using their licensed form; discovery does not install them. */
export function readDefinition(header: InvocationBinding, form: DefinitionForm): DefinitionRead {
  const invocation = header.invocation;
  const { items, startIndex, endIndex } = invocation.candidates;
  const diagnostics: SemanticDiagnostic[] = [];
  const observation =
    header.arguments.length === 0 && header.pattern !== undefined
      ? bindArguments(invocation, header.pattern, {
          classicBrackets:
            form.family === "classic-command" || form.family === "classic-environment",
        })
      : undefined;
  const args = observation?.arguments ?? header.arguments;
  const base = {
    span: header.hull ?? observation?.examinedSpan ?? invocation.commandSpan,
    prefix: Object.freeze([]),
    defaults: Object.freeze([]),
    diagnostics,
  };
  if (form.family === "primitive" || form.family === "alias") {
    const nameIndex = nextMaterial(items, startIndex);
    const name = items[nameIndex];
    if (name?.kind !== "command")
      return {
        ...base,
        diagnostics: [
          diagnostic(
            invocation,
            "dynamic-definition-name",
            "A primitive definition requires a literal control sequence.",
          ),
        ],
      };
    const subject: RegistrySubject = Object.freeze({
      kind: "command",
      name: name.spelling.slice(1),
      escapeToken: "\\",
    });
    let cursor =
      name.controlWord || form.family === "alias"
        ? nextMaterial(items, nameIndex + 1)
        : nameIndex + 1;
    if (form.family === "alias") {
      const equals = items[cursor];
      if (equals?.kind === "character" && equals.spelling === "=")
        cursor = nextMaterial(items, cursor + 1);
      const target = items[cursor];
      if (target?.kind === "command")
        return {
          ...base,
          subject,
          span: byteSpan(invocation.commandSpan.start, target.span.end),
          aliasSubject: Object.freeze({
            kind: "command",
            name: target.spelling.slice(1),
            escapeToken: "\\",
          }),
        };
      if (target?.kind === "character")
        return {
          ...base,
          subject,
          pattern: [],
          body: location(invocation, target.span),
          span: byteSpan(invocation.commandSpan.start, target.span.end),
        };
      return {
        ...base,
        subject,
        diagnostics: [
          diagnostic(
            invocation,
            "unsupported-definition",
            "This alias target is not a statically supported token.",
          ),
        ],
      };
    }
    const parameterStart = cursor;
    while (
      cursor < endIndex &&
      items[cursor]?.kind !== "group" &&
      items[cursor]?.kind !== "residue"
    )
      cursor++;
    const body = items[cursor];
    if (body?.kind !== "group")
      return {
        ...base,
        subject,
        diagnostics: [
          diagnostic(
            invocation,
            "unsupported-definition",
            "No complete primitive definition body was found.",
          ),
        ],
      };
    const parameters = items.slice(parameterStart, cursor);
    const pattern: ArgumentPattern[] = [];
    const prefix: BindingToken[] = [];
    let number = 0;
    let delimiter: BindingToken[] = prefix;
    const finishParameter = (): void => {
      if (number === 0) return;
      pattern.push(
        delimiter.length === 0
          ? { code: "m", modifiers: "" }
          : {
              code: "u",
              modifiers: "",
              stop: {
                kind: "group",
                spelling: `{${delimiter.map((t) => ("spelling" in t ? t.spelling : "")).join("")}}`,
                children: delimiter.map((t) => argumentToken("spelling" in t ? t.spelling : "")),
              },
            },
      );
    };
    for (let i = 0; i < parameters.length; i++) {
      const token = parameters[i];
      if (token?.kind === "character" && token.spelling === "#") {
        const digit = parameters[++i];
        if (
          digit?.kind !== "character" ||
          !/^[1-9]$/u.test(digit.spelling) ||
          Number(digit.spelling) !== number + 1
        ) {
          diagnostics.push(
            diagnostic(
              invocation,
              "unsupported-definition",
              "Primitive parameters must be consecutive #1 through #9.",
              token.span,
            ),
          );
          break;
        }
        finishParameter();
        number++;
        delimiter = [];
      } else if (token?.kind === "character" || token?.kind === "command") delimiter.push(token);
      else {
        diagnostics.push(
          diagnostic(
            invocation,
            "unsupported-definition",
            "Whitespace or uncertain tokens in primitive parameter text require a different reader.",
          ),
        );
        break;
      }
    }
    finishParameter();
    diagnostics.push(
      ...replacementDiagnostics(invocation, location(invocation, body.contentSpan), number),
    );
    return {
      ...base,
      subject,
      span: byteSpan(invocation.commandSpan.start, body.span.end),
      prefix: Object.freeze(prefix),
      parameterText: location(invocation, byteSpan(name.span.end, body.span.start)),
      body: location(invocation, body.contentSpan),
      ...(diagnostics.length === 0 ? { pattern: Object.freeze(pattern) } : {}),
      diagnostics,
    };
  }
  const classic = form.family === "classic-command" || form.family === "classic-environment";
  const environment =
    form.family === "classic-environment" || form.family === "document-environment";
  const nameOrdinal = classic ? 1 : 0;
  const subject = literalSubject(
    sourceArgument(args[nameOrdinal], invocation),
    environment,
    invocation,
  );
  if (form.family === "declaration") {
    const first =
      args.length === 0
        ? bindArguments(invocation, [{ code: "m", modifiers: "" }]).arguments
        : args;
    const name = literalSubject(
      sourceArgument(first[form.target?.nameArgument ?? 0], invocation),
      form.target?.kind !== "command",
      invocation,
    );
    return {
      ...base,
      ...(name === undefined ? {} : { subject: name }),
      diagnostics: [
        diagnostic(
          invocation,
          "unsupported-definition",
          "The declaration is located; its runtime constructor is not implemented.",
        ),
      ],
    };
  }
  if (subject === undefined)
    diagnostics.push(
      diagnostic(
        invocation,
        "dynamic-definition-name",
        "The declaration name is not a literal supported control sequence or environment name.",
      ),
    );
  if (
    form.family === "classic-command" &&
    subject?.kind === "command" &&
    (subject.name.startsWith("end") || subject.name === "relax")
  )
    diagnostics.push(
      diagnostic(
        invocation,
        "definition-precondition",
        "Classic command declarations reserve end-prefixed names and relax.",
      ),
    );
  const body = sourceArgument(args[classic ? 4 : 2], invocation);
  const endBody = environment ? sourceArgument(args[classic ? 5 : 3], invocation) : undefined;
  const defaults: { ordinal: number; location: SourceLocation }[] = [];
  let pattern: readonly ArgumentPattern[] | undefined;
  if (header.status === "resolved") {
    try {
      if (classic) {
        const countArg = args[2];
        const countText =
          countArg?.kind === "source" ? textAt(invocation, countArg.contentSpan).trim() : "0";
        if (!/^[0-9]$/u.test(countText))
          throw new Error("The classic argument count is not an integer from 0 to 9.");
        const count = Number(countText);
        const fallback = sourceArgument(args[3], invocation);
        if (fallback !== undefined && count === 0)
          throw new Error("An optional default requires at least one parameter.");
        const star = args[0];
        const modifiers = star?.kind === "boolean" && star.value ? "" : "+";
        const specs: ArgumentPattern[] = [];
        for (let ordinal = 0; ordinal < count; ordinal++) {
          if (ordinal === 0 && fallback !== undefined) {
            specs.push({
              code: "O",
              modifiers,
              defaultValue: argumentToken(`{${textAt(invocation, fallback.span)}}`),
            });
            defaults.push({ ordinal, location: fallback });
          } else specs.push({ code: "m", modifiers });
        }
        pattern = Object.freeze(specs);
      } else {
        const spec = sourceArgument(args[1], invocation);
        if (spec === undefined)
          throw new Error("The document-command argument specification is missing.");
        pattern = normalizeArgumentPattern(textAt(invocation, spec.span));
      }
    } catch (error) {
      diagnostics.push(
        diagnostic(
          invocation,
          "unsupported-definition",
          error instanceof Error ? error.message : String(error),
        ),
      );
    }
  }
  if (body !== undefined && pattern !== undefined) {
    const count = pattern.reduce(
      (sum, p) =>
        sum +
        (p.code === "e" || p.code === "E"
          ? p.tokens.kind === "group"
            ? p.tokens.children.length
            : 1
          : 1),
      0,
    );
    diagnostics.push(...replacementDiagnostics(invocation, body, count));
    if (endBody !== undefined)
      diagnostics.push(...replacementDiagnostics(invocation, endBody, classic ? 0 : count));
  }
  return {
    ...base,
    ...(subject === undefined ? {} : { subject }),
    ...(body === undefined ? {} : { body }),
    ...(endBody === undefined ? {} : { endBody }),
    ...(pattern === undefined ? {} : { pattern }),
    defaults: Object.freeze(defaults),
    diagnostics,
  };
}
