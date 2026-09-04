import { inputFields, row } from "./format.ts";
import { bitmapIntervals, spanSetBitmap } from "./span-set-oracle.ts";

export type OraclePairingSymbol = "OA" | "OB" | "CA" | "CB";

interface OraclePairingToken {
  readonly role: "open" | "close";
  readonly key: "A" | "B";
  readonly ordinal: number;
  readonly start: number;
  readonly end: number;
}

interface OraclePairingMatch {
  readonly openOrdinal: number;
  readonly closeOrdinal: number;
  readonly start: number;
  readonly end: number;
}

interface OraclePairingMismatch {
  readonly kind: "mismatch";
  readonly openOrdinal: number;
  readonly closeOrdinal: number;
  readonly expected: "A" | "B";
  readonly found: "A" | "B";
}

interface OracleDanglingClose {
  readonly kind: "dangling-close";
  readonly closeOrdinal: number;
  readonly start: number;
  readonly end: number;
}

interface OracleUnclosedOpen {
  readonly kind: "unclosed-open";
  readonly openOrdinal: number;
  readonly position: number;
}

type OraclePairingResidue = OraclePairingMismatch | OracleDanglingClose | OracleUnclosedOpen;

interface OraclePairingResult {
  readonly matches: readonly OraclePairingMatch[];
  readonly residue: readonly OraclePairingResidue[];
  readonly mismatches: readonly OraclePairingMismatch[];
  readonly danglingCloses: readonly OracleDanglingClose[];
  readonly unclosedOpens: readonly OracleUnclosedOpen[];
}

function tokenFor(
  symbol: OraclePairingSymbol,
  position: number,
  openOrdinal: number,
  closeOrdinal: number,
): OraclePairingToken {
  const role = symbol.startsWith("O") ? "open" : "close";
  return Object.freeze({
    role,
    key: symbol.endsWith("A") ? "A" : "B",
    ordinal: role === "open" ? openOrdinal : closeOrdinal,
    start: position * 2,
    end: position * 2 + 1,
  });
}

function pairingTokens(word: readonly OraclePairingSymbol[]): readonly OraclePairingToken[] {
  const tokens: OraclePairingToken[] = [];
  let openOrdinal = word.filter((symbol) => symbol.startsWith("O")).length - 1;
  let closeOrdinal = word.filter((symbol) => symbol.startsWith("C")).length - 1;
  for (let position = 0; position < word.length; position++) {
    const symbol = word[position];
    if (symbol === undefined) throw new RangeError("pairing oracle word contains a gap");
    const token = tokenFor(symbol, position, openOrdinal, closeOrdinal);
    tokens.push(token);
    if (token.role === "open") openOrdinal--;
    else closeOrdinal--;
  }
  return tokens;
}

function pairOracle(word: readonly OraclePairingSymbol[]): OraclePairingResult {
  const tokens = pairingTokens(word);
  const stack: OraclePairingToken[] = [];
  const matches: OraclePairingMatch[] = [];
  const residue: OraclePairingResidue[] = [];
  const mismatches: OraclePairingMismatch[] = [];
  const danglingCloses: OracleDanglingClose[] = [];
  const unclosedOpens: OracleUnclosedOpen[] = [];
  for (const token of tokens) {
    if (token.role === "open") {
      stack.push(token);
      continue;
    }
    const opener = stack.pop();
    if (opener === undefined) {
      const dangling: OracleDanglingClose = Object.freeze({
        kind: "dangling-close",
        closeOrdinal: token.ordinal,
        start: token.start,
        end: token.end,
      });
      danglingCloses.push(dangling);
      residue.push(dangling);
      continue;
    }
    if (opener.key === token.key) {
      matches.push(
        Object.freeze({
          openOrdinal: opener.ordinal,
          closeOrdinal: token.ordinal,
          start: opener.start,
          end: token.end,
        }),
      );
    } else {
      const mismatch: OraclePairingMismatch = Object.freeze({
        kind: "mismatch",
        openOrdinal: opener.ordinal,
        closeOrdinal: token.ordinal,
        expected: opener.key,
        found: token.key,
      });
      mismatches.push(mismatch);
      residue.push(mismatch);
    }
  }
  while (stack.length > 0) {
    const opener = stack.pop();
    if (opener === undefined) throw new Error("pairing oracle stack lost an opener");
    const unclosed: OracleUnclosedOpen = Object.freeze({
      kind: "unclosed-open",
      openOrdinal: opener.ordinal,
      position: word.length * 2,
    });
    unclosedOpens.push(unclosed);
    residue.push(unclosed);
  }
  return { matches, residue, mismatches, danglingCloses, unclosedOpens };
}

function field(prefix: string, values: readonly string[]): string {
  return `${prefix}:${values.length === 0 ? "-" : values.join(",")}`;
}

function ordinalField(prefix: string, ordinals: readonly number[]): string {
  return field(prefix, ordinals.map(String));
}

function matchToken(match: OraclePairingMatch): string {
  return `${String(match.openOrdinal)}>${String(match.closeOrdinal)}`;
}

function mismatchToken(mismatch: OraclePairingMismatch): string {
  return `${String(mismatch.openOrdinal)}>${String(mismatch.closeOrdinal)}/${mismatch.expected}/${mismatch.found}`;
}

function danglingToken(dangling: OracleDanglingClose): string {
  return `${String(dangling.closeOrdinal)}@[${String(dangling.start)},${String(dangling.end)})`;
}

function unclosedToken(unclosed: OracleUnclosedOpen): string {
  return `${String(unclosed.openOrdinal)}@${String(unclosed.position)}`;
}

function residueToken(residue: OraclePairingResidue): string {
  if (residue.kind === "mismatch") return `X${mismatchToken(residue)}`;
  if (residue.kind === "dangling-close") return `D${danglingToken(residue)}`;
  return `U${unclosedToken(residue)}`;
}

function uniqueSorted(ordinals: readonly number[]): readonly number[] {
  return [...new Set(ordinals)].sort((left, right) => left - right);
}

function coverageField(inputLength: number, matches: readonly OraclePairingMatch[]): string {
  const bitmap = spanSetBitmap(
    inputLength,
    matches.map((match) => ({ start: match.start, end: match.end })),
  );
  const intervals = bitmapIntervals(bitmap);
  return field(
    "V",
    intervals.map((interval) => `[${String(interval.start)},${String(interval.end)})`),
  );
}

export function pairingOracleRow(word: readonly OraclePairingSymbol[]): string {
  const result = pairOracle(word);
  const openResidue = uniqueSorted([
    ...result.mismatches.map((item) => item.openOrdinal),
    ...result.unclosedOpens.map((item) => item.openOrdinal),
  ]);
  const closeResidue = uniqueSorted([
    ...result.mismatches.map((item) => item.closeOrdinal),
    ...result.danglingCloses.map((item) => item.closeOrdinal),
  ]);
  const input = new Uint8Array(word.length * 2);
  return row([
    ...inputFields(input),
    field("T", word),
    "P:keys-equal/pairing-oracle@1",
    field("M", result.matches.map(matchToken)),
    field("R", result.residue.map(residueToken)),
    field("X", result.mismatches.map(mismatchToken)),
    field("D", result.danglingCloses.map(danglingToken)),
    field("U", result.unclosedOpens.map(unclosedToken)),
    ordinalField("O", openResidue),
    ordinalField("C", closeResidue),
    coverageField(input.length, result.matches),
  ]);
}
