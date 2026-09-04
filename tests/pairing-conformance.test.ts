import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  PAIRING_CASE_COUNT,
  namedPairingRows,
  pairingRows,
} from "../scripts/conformance/families/pairing-strict-stack.ts";
import {
  decodeBytes,
  decodeDeclaredEncoding,
  digestRows,
  encodeBytes,
  encodeDeclaredEncoding,
  parseDigest,
  parseFixture,
  row,
} from "../scripts/conformance/format.ts";
import {
  OccurrenceBatchBuilder,
  OccurrenceSelection,
  PairingPolicy,
  SourceSnapshot,
  byteSpan,
  pairOccurrences,
  type OccurrenceBatch,
  type PairingResidue,
  type PairingResult,
} from "../packages/texdig/src/index.js";

const fixturePath = resolve(
  import.meta.dirname,
  "..",
  "fixtures",
  "conformance",
  "pairing",
  "strict-stack.txt",
);
const TOKEN_PRODUCER = Object.freeze({ id: "lexer", version: "1" });
const POLICY_PRODUCER = Object.freeze({ id: "pairing-oracle", version: "1" });

type PairingSymbol = "OA" | "OB" | "CA" | "CB";

interface PairingInputs {
  readonly openSource: SourceSnapshot;
  readonly closeSource: SourceSnapshot;
  readonly openBatch: OccurrenceBatch;
  readonly closeBatch: OccurrenceBatch;
  readonly opens: OccurrenceSelection;
  readonly closes: OccurrenceSelection;
}

function fixture(): ReturnType<typeof parseFixture> {
  return parseFixture(readFileSync(fixturePath, "utf8"));
}

function header(parsed: ReturnType<typeof parseFixture>, name: string): readonly string[] {
  const values = parsed.headers.get(name);
  if (values === undefined) throw new Error(`missing ${name} header`);
  return values;
}

function isPairingSymbol(value: string): value is PairingSymbol {
  return value === "OA" || value === "OB" || value === "CA" || value === "CB";
}

function parseWord(field: string): readonly PairingSymbol[] {
  if (field === "T:-") return [];
  if (!field.startsWith("T:")) throw new SyntaxError(`invalid pairing word: ${field}`);
  const symbols = field.slice(2).split(",");
  if (!symbols.every(isPairingSymbol)) throw new SyntaxError(`invalid pairing symbol: ${field}`);
  return symbols;
}

function buildInputs(
  bytes: Uint8Array,
  declaredEncoding: string,
  word: readonly PairingSymbol[],
): PairingInputs {
  const identity = { sourceId: "pairing-conformance.tex", revision: 0 };
  const openSource = new SourceSnapshot(bytes, { ...identity, declaredEncoding });
  const closeSource = new SourceSnapshot(bytes, {
    ...identity,
    declaredEncoding: "pairing-compatible-view",
  });
  const openBuilder = new OccurrenceBatchBuilder(openSource);
  const closeBuilder = new OccurrenceBatchBuilder(closeSource);
  for (let position = word.length - 1; position >= 0; position--) {
    const symbol = word[position];
    if (symbol === undefined) throw new RangeError("pairing word contains a gap");
    const role = symbol.startsWith("O") ? "open" : "close";
    const source = role === "open" ? openSource : closeSource;
    const builder = role === "open" ? openBuilder : closeBuilder;
    builder.add({
      snapshot: source,
      span: byteSpan(position * 2, position * 2 + 1),
      kind: role,
      producer: TOKEN_PRODUCER,
      priority: 0,
      ruleId: symbol.slice(1),
    });
  }
  const openBatch = openBuilder.freeze();
  const closeBatch = closeBuilder.freeze();
  return {
    openSource,
    closeSource,
    openBatch,
    closeBatch,
    opens: OccurrenceSelection.all(openBatch),
    closes: OccurrenceSelection.all(closeBatch),
  };
}

function keyPolicy(): PairingPolicy {
  return new PairingPolicy({
    name: "keys-equal",
    producer: POLICY_PRODUCER,
    compatible: (opener, closer) => opener.ruleId === closer.ruleId,
    expectedName: (opener) => opener.ruleId ?? opener.kind,
    foundName: (closer) => closer.ruleId ?? closer.kind,
  });
}

function field(prefix: string, values: readonly string[]): string {
  return `${prefix}:${values.length === 0 ? "-" : values.join(",")}`;
}

function ordinalField(prefix: string, selection: OccurrenceSelection): string {
  return field(prefix, Array.from(selection, String));
}

function mismatchToken(residue: Extract<PairingResidue, { readonly kind: "mismatch" }>): string {
  return `${String(residue.openOrdinal)}>${String(residue.closeOrdinal)}/${residue.expected}/${residue.found}`;
}

function danglingToken(
  residue: Extract<PairingResidue, { readonly kind: "dangling-close" }>,
): string {
  return `${String(residue.closeOrdinal)}@[${String(residue.span.start)},${String(residue.span.end)})`;
}

function unclosedToken(
  residue: Extract<PairingResidue, { readonly kind: "unclosed-open" }>,
): string {
  return `${String(residue.openOrdinal)}@${String(residue.position)}`;
}

function residueToken(residue: PairingResidue): string {
  if (residue.kind === "mismatch") return `X${mismatchToken(residue)}`;
  if (residue.kind === "dangling-close") return `D${danglingToken(residue)}`;
  return `U${unclosedToken(residue)}`;
}

function coverageField(result: PairingResult): string {
  const coverage = result.pairedRegions();
  if (coverage.snapshot !== result.opens.batch.snapshot) {
    throw new Error("PAIR5 paired coverage changed the open snapshot object");
  }
  return field(
    "V",
    Array.from(coverage, (span) => `[${String(span.start)},${String(span.end)})`),
  );
}

function requirePartition(
  input: OccurrenceSelection,
  matched: OccurrenceSelection,
  residue: OccurrenceSelection,
  law: string,
): void {
  if (!matched.intersect(residue).isEmpty) throw new Error(`${law} partition overlaps`);
  if (!matched.union(residue).equals(input)) throw new Error(`${law} partition is incomplete`);
}

function checkPairingLaws(result: PairingResult, inputs: PairingInputs): void {
  if (
    result.opens !== inputs.opens ||
    result.closes !== inputs.closes ||
    result.policy.name !== "keys-equal" ||
    result.policy.producer.id !== POLICY_PRODUCER.id ||
    result.policy.producer.version !== POLICY_PRODUCER.version
  ) {
    throw new Error("PAIR4/PAIR6 did not retain exact inputs and policy provenance");
  }
  if (
    result.opens.batch !== inputs.openBatch ||
    result.closes.batch !== inputs.closeBatch ||
    result.opens.batch === result.closes.batch ||
    inputs.openSource === inputs.closeSource ||
    !inputs.openSource.isCompatibleWith(inputs.closeSource)
  ) {
    throw new Error("PAIR4 did not exercise distinct compatible occurrence bases");
  }

  requirePartition(result.opens, result.matchedOpens, result.faults.openResidue, "PAIR3 opens");
  requirePartition(result.closes, result.matchedCloses, result.faults.closeResidue, "PAIR3 closes");
  if (
    result.matches.length !== result.matchedOpens.count ||
    result.matches.length !== result.matchedCloses.count
  ) {
    throw new Error("PAIR3 match projections are not one-to-one");
  }

  const openOrdinals = new Set<number>();
  const closeOrdinals = new Set<number>();
  const envelopes: { readonly start: number; readonly end: number }[] = [];
  for (const match of result.matches) {
    const opener = result.opens.batch.at(match.openOrdinal);
    const closer = result.closes.batch.at(match.closeOrdinal);
    if (
      openOrdinals.has(match.openOrdinal) ||
      closeOrdinals.has(match.closeOrdinal) ||
      opener.span.end > closer.span.start
    ) {
      throw new Error("PAIR3 matches are not unique forward edges");
    }
    openOrdinals.add(match.openOrdinal);
    closeOrdinals.add(match.closeOrdinal);
    envelopes.push({ start: opener.span.start, end: closer.span.end });
  }
  for (let left = 0; left < envelopes.length; left++) {
    const first = envelopes[left];
    if (first === undefined) throw new Error("PAIR3 envelope table contains a gap");
    for (let right = left + 1; right < envelopes.length; right++) {
      const second = envelopes[right];
      if (second === undefined) throw new Error("PAIR3 envelope table contains a gap");
      const crosses =
        (first.start < second.start && second.start < first.end && first.end < second.end) ||
        (second.start < first.start && first.start < second.end && second.end < first.end);
      if (crosses) throw new Error("PAIR3 strict-stack matches cross");
    }
  }

  let sawBoundaryResidue = false;
  let previousConsumingStart = -1;
  let previousUnclosedStart = Number.POSITIVE_INFINITY;
  for (const residue of result.faults.residue) {
    if (residue.kind === "unclosed-open") {
      sawBoundaryResidue = true;
      const opener = result.opens.batch.at(residue.openOrdinal);
      if (
        residue.position !== inputs.openSource.byteLength ||
        opener.span.start >= previousUnclosedStart
      ) {
        throw new Error("PAIR2 unclosed residue is not inner-first at EOF");
      }
      previousUnclosedStart = opener.span.start;
      continue;
    }
    if (sawBoundaryResidue) throw new Error("PAIR2 consuming residue follows EOF residue");
    const closer = result.closes.batch.at(residue.closeOrdinal);
    if (closer.span.start < previousConsumingStart) {
      throw new Error("PAIR2 consuming residue is not in source order");
    }
    previousConsumingStart = closer.span.start;
    if (residue.kind === "dangling-close") {
      if (residue.span.start !== closer.span.start || residue.span.end !== closer.span.end) {
        throw new Error("PAIR2 dangling close lost its consuming span");
      }
    } else {
      const opener = result.opens.batch.at(residue.openOrdinal);
      if (residue.expected !== opener.ruleId || residue.found !== closer.ruleId) {
        throw new Error("PAIR2/PAIR6 mismatch lost expected or found names");
      }
    }
  }
}

function sourceRow(expected: string): string {
  const fields = expected.split(" ; ");
  if (fields.length !== 12) throw new SyntaxError(`invalid pairing row: ${expected}`);
  const bytes = decodeBytes(fields[0] ?? "");
  const declaredEncoding = decodeDeclaredEncoding(fields[1] ?? "");
  const word = parseWord(fields[2] ?? "");
  if (bytes.length !== word.length * 2) throw new SyntaxError("pairing carrier has wrong length");
  if (fields[3] !== "P:keys-equal/pairing-oracle@1") {
    throw new SyntaxError(`invalid pairing policy field: ${fields[3] ?? ""}`);
  }
  const inputs = buildInputs(bytes, declaredEncoding, word);
  const policy = keyPolicy();
  const result = pairOccurrences(inputs.opens, inputs.closes, policy);
  checkPairingLaws(result, inputs);

  return row([
    encodeBytes(bytes),
    encodeDeclaredEncoding(declaredEncoding),
    field("T", word),
    `P:${policy.name}/${policy.producer.id}@${policy.producer.version}`,
    field(
      "M",
      result.matches.map((match) => `${String(match.openOrdinal)}>${String(match.closeOrdinal)}`),
    ),
    field("R", result.faults.residue.map(residueToken)),
    field("X", result.faults.mismatches.map(mismatchToken)),
    field("D", result.faults.danglingCloses.map(danglingToken)),
    field("U", result.faults.unclosedOpens.map(unclosedToken)),
    ordinalField("O", result.faults.openResidue),
    ordinalField("C", result.faults.closeResidue),
    coverageField(result),
  ]);
}

function* checkedPairingRows(): Generator<string> {
  for (const expected of pairingRows()) {
    const actual = sourceRow(expected);
    if (actual !== expected) {
      throw new Error(`fixture/source disagreement\nfixture: ${expected}\nsource:  ${actual}`);
    }
    yield expected;
  }
}

function requireError(operation: () => unknown, law: string): void {
  try {
    operation();
  } catch (error: unknown) {
    if (error instanceof Error) return;
    throw error;
  }
  throw new Error(`${law} did not reject the invalid operation`);
}

describe("strict-stack pairing conformance", () => {
  it("matches every explicit strict-stack and typed-residue row", () => {
    const parsed = fixture();
    expect(header(parsed, "family")).toEqual(["pairing/strict-stack"]);
    expect(header(parsed, "laws")).toEqual(["PAIR1 PAIR2 PAIR3 PAIR4 PAIR5 PAIR6"]);
    expect(parsed.rowTexts).toEqual([...namedPairingRows()]);
    expect(parsed.rows).toHaveLength(6);
    for (const expected of parsed.rowTexts) expect(sourceRow(expected)).toBe(expected);
  });

  it("re-enumerates all 5,461 words through source and the independent naive stack", () => {
    const parsed = fixture();
    const expected = parseDigest(header(parsed, "digest")[0] ?? "");
    expect(expected.tier).toBe("default");
    expect(expected.count).toBe(PAIRING_CASE_COUNT);
    expect(digestRows(checkedPairingRows())).toEqual({
      value: expected.value,
      count: expected.count,
    });
  });

  it("enforces role, geometry, compatibility, and policy boundaries", () => {
    const source = new SourceSnapshot(new Uint8Array(4), {
      sourceId: "pairing-boundaries.tex",
      revision: 0,
    });
    const sharedBuilder = new OccurrenceBatchBuilder(source);
    sharedBuilder.add({
      snapshot: source,
      span: byteSpan(0, 1),
      kind: "delimiter",
      producer: TOKEN_PRODUCER,
      priority: 0,
      ruleId: "A",
    });
    const shared = OccurrenceSelection.all(sharedBuilder.freeze());
    requireError(() => pairOccurrences(shared, shared, keyPolicy()), "PAIR4 shared role");

    const overlapOpenBuilder = new OccurrenceBatchBuilder(source);
    overlapOpenBuilder.add({
      snapshot: source,
      span: byteSpan(0, 3),
      kind: "open",
      producer: TOKEN_PRODUCER,
      priority: 0,
      ruleId: "A",
    });
    const overlapCloseBuilder = new OccurrenceBatchBuilder(source);
    overlapCloseBuilder.add({
      snapshot: source,
      span: byteSpan(2, 4),
      kind: "close",
      producer: TOKEN_PRODUCER,
      priority: 0,
      ruleId: "A",
    });
    const overlapOpenBatch = overlapOpenBuilder.freeze();
    const overlapCloseBatch = overlapCloseBuilder.freeze();
    requireError(
      () =>
        pairOccurrences(
          OccurrenceSelection.all(overlapOpenBatch),
          OccurrenceSelection.all(overlapCloseBatch),
          keyPolicy(),
        ),
      "PAIR4 overlapping geometry",
    );

    const foreign = new SourceSnapshot(new Uint8Array(4), {
      sourceId: "foreign.tex",
      revision: 0,
    });
    const foreignCloseBuilder = new OccurrenceBatchBuilder(foreign);
    foreignCloseBuilder.add({
      snapshot: foreign,
      span: byteSpan(2, 3),
      kind: "close",
      producer: TOKEN_PRODUCER,
      priority: 0,
      ruleId: "A",
    });
    requireError(
      () =>
        pairOccurrences(
          OccurrenceSelection.all(overlapOpenBatch),
          OccurrenceSelection.all(foreignCloseBuilder.freeze()),
          keyPolicy(),
        ),
      "PAIR4 incompatible snapshots",
    );
    requireError(
      () =>
        new PairingPolicy({
          name: " ",
          producer: POLICY_PRODUCER,
          compatible: () => true,
          expectedName: () => "A",
          foundName: () => "A",
        }),
      "PAIR6 blank policy name",
    );
  });
});
