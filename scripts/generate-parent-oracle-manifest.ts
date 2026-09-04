import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

interface Arguments {
  readonly tree: string;
  readonly snapshotRevision: string;
  readonly latexUtensilsRevision: string;
  readonly unifiedLatexRevision: string;
  readonly output: string;
}

interface SnapshotFile {
  readonly path: string;
  readonly shard: string;
  readonly contentStart: number;
  readonly contentEndInclusive: number;
}

interface OracleFile extends SnapshotFile {
  readonly producer: "latex-utensils" | "unified-latex";
  readonly sourcePath: string;
  readonly role: "test" | "benchmark" | "test-helper";
}

const DEFAULT_OUTPUT = resolve(import.meta.dirname, "../testkit/parent-oracles/manifest.ts");
const EXPECTED_COUNT = 82;

function requiredFlag(arguments_: readonly string[], flag: string): string {
  const index = arguments_.indexOf(flag);
  const value = index < 0 ? undefined : arguments_[index + 1];
  if (value === undefined || value.startsWith("--")) {
    throw new Error("missing required " + flag + " value");
  }
  return value;
}

function optionalFlag(arguments_: readonly string[], flag: string, fallback: string): string {
  const index = arguments_.indexOf(flag);
  if (index < 0) {
    return fallback;
  }
  const value = arguments_[index + 1];
  if (value === undefined || value.startsWith("--")) {
    throw new Error("missing " + flag + " value");
  }
  return value;
}

function parseArguments(arguments_: readonly string[]): Arguments {
  return Object.freeze({
    tree: resolve(requiredFlag(arguments_, "--tree")),
    snapshotRevision: requiredFlag(arguments_, "--snapshot-revision"),
    latexUtensilsRevision: requiredFlag(arguments_, "--latex-utensils-revision"),
    unifiedLatexRevision: requiredFlag(arguments_, "--unified-latex-revision"),
    output: resolve(optionalFlag(arguments_, "--output", DEFAULT_OUTPUT)),
  });
}

function indentation(line: string): number {
  const match = /^( *)/u.exec(line);
  const spaces = match?.[1]?.length ?? 0;
  if (spaces % 4 !== 0) {
    throw new Error("tree indentation is not a multiple of four: " + line);
  }
  return spaces / 4;
}

function parseInteger(value: string, field: string): number {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw new Error("invalid " + field + ": " + value);
  }
  return parsed;
}

function parseTree(source: string): readonly SnapshotFile[] {
  const files: SnapshotFile[] = [];
  let directories: string[] = [];
  let inTree = false;

  for (const line of source.split(/\r?\n/u)) {
    const trimmed = line.trim();
    if (!inTree) {
      if (trimmed === "unified-latex-utensils") {
        inTree = true;
        directories = [trimmed];
      }
      continue;
    }
    if (trimmed === String.fromCharCode(96).repeat(3)) {
      break;
    }
    if (trimmed.length === 0) {
      continue;
    }

    const depth = indentation(line);
    const fields = trimmed.split("\t");
    if (fields.length === 1) {
      directories = [...directories.slice(0, depth), trimmed];
      continue;
    }
    if (fields.length !== 6) {
      throw new Error("unexpected tree row: " + line);
    }

    const [name, shard, , , contentStart, contentEnd] = fields;
    if (
      name === undefined ||
      shard === undefined ||
      contentStart === undefined ||
      contentEnd === undefined
    ) {
      throw new Error("incomplete tree row: " + line);
    }
    const parents = directories.slice(1, depth);
    files.push(
      Object.freeze({
        path: [...parents, name].join("/"),
        shard,
        contentStart: parseInteger(contentStart, "content start"),
        contentEndInclusive: parseInteger(contentEnd, "content end"),
      }),
    );
  }
  return Object.freeze(files);
}

function toOracleFile(file: SnapshotFile): OracleFile | undefined {
  if (file.path.startsWith("latex-utensils-tests/")) {
    const name = file.path.slice("latex-utensils-tests/".length);
    if (!/^(?:assert_partially|test_.*)\.ts$/u.test(name)) {
      return undefined;
    }
    return Object.freeze({
      ...file,
      producer: "latex-utensils",
      sourcePath: "test/" + name,
      role: name === "assert_partially.ts" ? "test-helper" : "test",
    });
  }

  if (!file.path.startsWith("unified-latex-packages/")) {
    return undefined;
  }
  const name = file.path.slice("unified-latex-packages/".length);
  if (!name.endsWith(".test.ts") && !name.endsWith(".bench.ts")) {
    return undefined;
  }
  return Object.freeze({
    ...file,
    producer: "unified-latex",
    sourcePath: "packages/" + name,
    role: name.endsWith(".bench.ts") ? "benchmark" : "test",
  });
}

function quoted(value: string): string {
  return JSON.stringify(value);
}

function renderManifest(files: readonly OracleFile[], arguments_: Arguments): string {
  const lines = [
    "/**",
    " * GENERATED FILE. DO NOT EDIT BY HAND.",
    " *",
    " * Source: authoritative archaeology tree unified-latex-utensils_tree.md.",
    " * Regenerate with scripts/generate-parent-oracle-manifest.ts and the pinned",
    " * snapshot and producer revisions recorded in README.md.",
    " */",
    "",
    'export type ParentOracleProducer = "latex-utensils" | "unified-latex";',
    'export type ParentOracleRole = "test" | "benchmark" | "test-helper";',
    'export type ParentOracleCorrelationLabel = "parent-regression-correlated";',
    "",
    "export interface ParentOracleFile {",
    "  readonly id: string;",
    "  readonly producer: ParentOracleProducer;",
    "  readonly producerLineage: ParentOracleProducer;",
    "  readonly upstreamRevision: string;",
    "  readonly sourcePath: string;",
    '  readonly license: "MIT";',
    "  readonly role: ParentOracleRole;",
    "  readonly correlationLabel: ParentOracleCorrelationLabel;",
    "  readonly snapshotRevision: string;",
    "  readonly snapshotShard: string;",
    "  readonly snapshotContentStart: number;",
    "  readonly snapshotContentEndInclusive: number;",
    "}",
    "",
    "export const PARENT_ORACLE_EXPECTED_FILE_COUNT = " + String(EXPECTED_COUNT) + ";",
    "",
    "export const PARENT_ORACLE_FILES: readonly ParentOracleFile[] = Object.freeze([",
  ];

  for (const file of files) {
    const upstreamRevision =
      file.producer === "latex-utensils"
        ? arguments_.latexUtensilsRevision
        : arguments_.unifiedLatexRevision;
    lines.push(
      "  Object.freeze({",
      "    id: " + quoted(file.producer + ":" + file.sourcePath) + ",",
      "    producer: " + quoted(file.producer) + ",",
      "    producerLineage: " + quoted(file.producer) + ",",
      "    upstreamRevision: " + quoted(upstreamRevision) + ",",
      "    sourcePath: " + quoted(file.sourcePath) + ",",
      '    license: "MIT",',
      "    role: " + quoted(file.role) + ",",
      '    correlationLabel: "parent-regression-correlated",',
      "    snapshotRevision: " + quoted(arguments_.snapshotRevision) + ",",
      "    snapshotShard: " + quoted(file.shard) + ",",
      "    snapshotContentStart: " + String(file.contentStart) + ",",
      "    snapshotContentEndInclusive: " + String(file.contentEndInclusive) + ",",
      "  }),",
    );
  }
  lines.push("]);", "");
  return lines.join("\n");
}

const arguments_ = parseArguments(process.argv.slice(2));
const tree = await readFile(arguments_.tree, "utf8");
const files = parseTree(tree).flatMap((file) => {
  const oracle = toOracleFile(file);
  return oracle === undefined ? [] : [oracle];
});
if (files.length !== EXPECTED_COUNT) {
  throw new Error(
    "expected " + String(EXPECTED_COUNT) + " parent test files, found " + String(files.length),
  );
}
await mkdir(dirname(arguments_.output), { recursive: true });
await writeFile(arguments_.output, renderManifest(files, arguments_), "utf8");
console.log(
  "Wrote " + String(files.length) + " parent oracle records to " + arguments_.output + ".",
);
