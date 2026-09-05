import ts from "typescript";
import type { AuthorityLocation } from "../../packages/texdig/src/registry/types.ts";

export interface HarvestDiagnostic {
  readonly code:
    | "unsupported-expression"
    | "duplicate-key"
    | "invalid-shape"
    | "symbolic-callback"
    | "unavailable-strategy";
  readonly path: string;
  readonly location: AuthorityLocation;
  readonly field: string;
  readonly detail: string;
  readonly related?: readonly AuthorityLocation[];
}

export interface StaticProperty {
  readonly name: string;
  readonly location: AuthorityLocation;
  readonly value: StaticValue;
}
export type StaticValue =
  | { readonly kind: "literal"; readonly value: string | boolean | number | null }
  | { readonly kind: "array"; readonly items: readonly StaticValue[] }
  | { readonly kind: "object"; readonly properties: readonly StaticProperty[] }
  | {
      readonly kind: "expression";
      readonly text: string;
      readonly location: AuthorityLocation;
      readonly importedFrom?: string;
      readonly importedName?: string;
    };

export interface ParentTable {
  readonly name: string;
  readonly entries: readonly StaticProperty[];
}
export interface ParentReadResult {
  readonly tables: readonly ParentTable[];
  readonly diagnostics: readonly HarvestDiagnostic[];
}

/** No import, transpilation, evaluation, property access, or callback invocation of input. */
export function readParentRecords(path: string, text: string): ParentReadResult {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const diagnostics: HarvestDiagnostic[] = [];
  const tables: ParentTable[] = [];
  const imports = new Map<string, { importedFrom: string; importedName: string }>();
  function location(node: ts.Node): AuthorityLocation {
    const start = node.getStart(source);
    const point = source.getLineAndCharacterOfPosition(start);
    return {
      byteStart: Buffer.byteLength(text.slice(0, start)),
      byteEnd: Buffer.byteLength(text.slice(0, node.end)),
      line: point.line + 1,
      utf16Column: point.character + 1,
    };
  }
  function diagnostic(
    code: HarvestDiagnostic["code"],
    node: ts.Node,
    field: string,
    detail: string,
    related?: readonly AuthorityLocation[],
  ): void {
    diagnostics.push({
      code,
      path,
      location: location(node),
      field,
      detail,
      ...(related === undefined ? {} : { related }),
    });
  }
  function expression(node: ts.Node, field: string): StaticValue {
    diagnostic("unsupported-expression", node, field, ts.SyntaxKind[node.kind]);
    const imported = ts.isIdentifier(node) ? imports.get(node.text) : undefined;
    return {
      kind: "expression",
      text: node.getText(source),
      location: location(node),
      ...imported,
    };
  }
  function read(node: ts.Expression, field: string): StaticValue {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
      return { kind: "literal", value: node.text };
    if (ts.isNumericLiteral(node)) return { kind: "literal", value: Number(node.text) };
    if (node.kind === ts.SyntaxKind.TrueKeyword) return { kind: "literal", value: true };
    if (node.kind === ts.SyntaxKind.FalseKeyword) return { kind: "literal", value: false };
    if (node.kind === ts.SyntaxKind.NullKeyword) return { kind: "literal", value: null };
    if (ts.isArrayLiteralExpression(node))
      return {
        kind: "array",
        items: node.elements.map((item, i) => read(item, `${field}[${String(i)}]`)),
      };
    if (ts.isObjectLiteralExpression(node)) {
      const properties: StaticProperty[] = [];
      const seen = new Map<string, AuthorityLocation[]>();
      for (const property of node.properties) {
        if (
          !ts.isPropertyAssignment(property) ||
          !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
        ) {
          expression(property, field);
          continue;
        }
        const name = property.name.text;
        const previous = seen.get(name) ?? [];
        if (previous.length > 0)
          diagnostic(
            "duplicate-key",
            property,
            `${field}.${name}`,
            "explicit adjudication required; all entries retained",
            previous,
          );
        seen.set(name, [...previous, location(property)]);
        properties.push({
          name,
          location: location(property),
          value: read(property.initializer, `${field}.${name}`),
        });
      }
      return { kind: "object", properties };
    }
    return expression(node, field);
  }
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      const clause = statement.importClause;
      const bindings = clause?.namedBindings;
      if (
        clause?.phaseModifier !== ts.SyntaxKind.TypeKeyword &&
        bindings !== undefined &&
        ts.isNamedImports(bindings)
      ) {
        for (const item of bindings.elements) {
          if (!item.isTypeOnly)
            imports.set(item.name.text, {
              importedFrom: statement.moduleSpecifier.text,
              importedName: item.propertyName?.text ?? item.name.text,
            });
        }
      }
      continue;
    }
    if (!ts.isVariableStatement(statement)) {
      diagnostic(
        "unsupported-expression",
        statement,
        "module",
        "non-table declaration is retained as a diagnostic and never executed",
      );
      continue;
    }
    if (
      !(statement.declarationList.flags & ts.NodeFlags.Const) ||
      !statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      diagnostic("invalid-shape", statement, "module", "table must be an exported const");
      continue;
    }
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.initializer === undefined) {
        diagnostic("invalid-shape", declaration, "module", "named table initializer required");
        continue;
      }
      const value = read(declaration.initializer, declaration.name.text);
      if (value.kind !== "object")
        diagnostic(
          "invalid-shape",
          declaration,
          declaration.name.text,
          "table must be an object literal",
        );
      else tables.push({ name: declaration.name.text, entries: value.properties });
    }
  }
  // SourceFile's public type omits parseDiagnostics; use a no-emit Program for the
  // supported diagnostic API without executing input or resolving its imports.
  const options: ts.CompilerOptions = {
    noEmit: true,
    noLib: true,
    noResolve: true,
    target: ts.ScriptTarget.Latest,
  };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (fileName) => (fileName === path ? source : undefined);
  const program = ts.createProgram([path], options, host);
  for (const error of program.getSyntacticDiagnostics(source)) {
    const start = error.start;
    const point = source.getLineAndCharacterOfPosition(start);
    diagnostics.push({
      code: "invalid-shape",
      path,
      location: {
        byteStart: Buffer.byteLength(text.slice(0, start)),
        byteEnd: Buffer.byteLength(text.slice(0, start + error.length)),
        line: point.line + 1,
        utf16Column: point.character + 1,
      },
      field: "module",
      detail: ts.flattenDiagnosticMessageText(error.messageText, "\n"),
    });
  }
  return { tables, diagnostics };
}
