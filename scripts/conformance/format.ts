import { createHash } from "node:crypto";

export const SCHEMA = "1";
export const GENERATOR = "texdig-conformance 0.0.0";
export const CANON = "rows-v1";

export interface DigestRecord {
  readonly algorithm: "sha256";
  readonly value: string;
  readonly canon: "rows-v1";
  readonly count: number;
  readonly tier: "default" | "deep";
}

export interface ParsedFixture {
  readonly headers: ReadonlyMap<string, readonly string[]>;
  readonly rows: readonly (readonly string[])[];
  readonly rowTexts: readonly string[];
}

export interface FixtureDocument {
  readonly headers: readonly (readonly [string, string])[];
  readonly comments?: readonly string[];
  readonly rows?: Iterable<string>;
}

export function encodeBytes(bytes: Uint8Array): string {
  return bytes.length === 0
    ? "-"
    : Array.from(bytes, (value) => value.toString(16).padStart(2, "0").toUpperCase()).join(" ");
}

export function decodeBytes(text: string): Uint8Array {
  if (text === "-") {
    return new Uint8Array();
  }
  if (!/^[0-9A-F]{2}(?: [0-9A-F]{2})*$/.test(text)) {
    throw new SyntaxError(`invalid byte field: ${text}`);
  }
  return Uint8Array.from(text.split(" "), (pair) => Number.parseInt(pair, 16));
}

export function row(fields: readonly string[]): string {
  if (fields.length < 2 || fields.some((field) => field.length === 0 || field.includes(" ; "))) {
    throw new TypeError("a row needs at least two non-empty fields without separators");
  }
  decodeBytes(fields[0] ?? "");
  return fields.join(" ; ");
}

export function digestRows(rows: Iterable<string>): {
  readonly value: string;
  readonly count: number;
} {
  const hash = createHash("sha256");
  const pending: string[] = [];
  let pendingLength = 0;
  let count = 0;
  for (const text of rows) {
    const line = `${text}\n`;
    pending.push(line);
    pendingLength += line.length;
    if (pendingLength >= 256 * 1024) {
      hash.update(pending.join(""));
      pending.length = 0;
      pendingLength = 0;
    }
    count++;
  }
  if (pending.length > 0) hash.update(pending.join(""));
  return { value: hash.digest("hex"), count };
}

export function digestHeader(digest: DigestRecord): string {
  return `${digest.algorithm}:${digest.value} canon:${digest.canon} count:${String(digest.count)} tier:${digest.tier}`;
}

export function parseDigest(text: string): DigestRecord {
  const match = /^sha256:([0-9a-f]{64}) canon:(rows-v1) count:(\d+) tier:(default|deep)$/.exec(
    text,
  );
  if (match === null) {
    throw new SyntaxError(`invalid digest header: ${text}`);
  }
  const value = match[1] ?? "";
  const canon = match[2];
  const count = Number(match[3]);
  const tier = match[4];
  if (canon !== "rows-v1" || (tier !== "default" && tier !== "deep")) {
    throw new SyntaxError(`unsupported digest header: ${text}`);
  }
  return { algorithm: "sha256", value, canon, count, tier };
}

export function serializeFixture(document: FixtureDocument): string {
  const lines: string[] = document.headers.map(([key, value]) => `# ${key}: ${value}`);
  if (document.comments !== undefined) {
    for (const comment of document.comments) {
      lines.push(`# ${comment}`);
    }
  }
  if (document.rows !== undefined) {
    lines.push("");
    lines.push(...document.rows);
  }
  return `${lines.join("\n")}\n`;
}

export function parseFixture(text: string): ParsedFixture {
  const headers = new Map<string, string[]>();
  const rows: string[][] = [];
  const rowTexts: string[] = [];
  for (const rawLine of text.replaceAll("\r\n", "\n").split("\n")) {
    const header = /^# ([a-z][a-z0-9-]*): (.*)$/.exec(rawLine);
    if (header !== null) {
      const key = header[1] ?? "";
      const values = headers.get(key) ?? [];
      values.push(header[2] ?? "");
      headers.set(key, values);
      continue;
    }
    const content = rawLine.split("#", 1)[0]?.trim() ?? "";
    if (content.length === 0) {
      continue;
    }
    const fields = content.split(" ; ");
    if (fields.length < 2) {
      throw new SyntaxError(`invalid fixture row: ${rawLine}`);
    }
    decodeBytes(fields[0] ?? "");
    rows.push(fields);
    rowTexts.push(content);
  }
  const schema = headers.get("schema");
  if (schema?.length !== 1 || schema[0] !== SCHEMA) {
    throw new RangeError(`unsupported conformance schema: ${schema?.join(",") ?? "missing"}`);
  }
  return { headers, rows, rowTexts };
}
