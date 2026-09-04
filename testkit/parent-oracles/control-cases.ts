/** Executable controls derived from independently recorded parent parser surfaces. */

export type ParentControlFacet = "start-rule" | "strict" | "timeout";

export interface ParentControlCase {
  readonly id: string;
  readonly facet: ParentControlFacet;
  readonly input: readonly number[];
  readonly parentOracleIds: readonly string[];
  readonly correlationLabel: "parent-regression-correlated";
}

const PARSER_ORACLES = Object.freeze([
  "latex-utensils:test/test_latex_parser.ts",
  "unified-latex:packages/unified-latex-util-parse/tests/parse-basic.test.ts",
  "unified-latex:packages/unified-latex-util-parse/tests/parse.test.ts",
]);

export const PARENT_ORACLE_CONTROL_CASES: readonly ParentControlCase[] = Object.freeze([
  Object.freeze({
    id: "document-and-fragment-start-rules",
    facet: "start-rule",
    input: Object.freeze([...new TextEncoder().encode("a{b}")]),
    parentOracleIds: PARSER_ORACLES,
    correlationLabel: "parent-regression-correlated",
  }),
  Object.freeze({
    id: "strict-rejects-recorded-residue",
    facet: "strict",
    input: Object.freeze([0xff]),
    parentOracleIds: PARSER_ORACLES,
    correlationLabel: "parent-regression-correlated",
  }),
  Object.freeze({
    id: "zero-budget-timeout",
    facet: "timeout",
    input: Object.freeze([...new TextEncoder().encode("x")]),
    parentOracleIds: PARSER_ORACLES,
    correlationLabel: "parent-regression-correlated",
  }),
]);
