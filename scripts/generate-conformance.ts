import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildFamilies } from "./conformance/families/index.ts";
import { UTF8_CLASS_DEEP_COUNT } from "./conformance/families/utf8-classes.ts";
import { parseDigest, type DigestRecord } from "./conformance/format.ts";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtureRoot = join(repositoryRoot, "fixtures", "conformance");

async function writeFamilies(root: string, includeDeep: boolean): Promise<void> {
  for (const family of buildFamilies(includeDeep)) {
    const destination = join(root, family.path);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, family.content, "utf8");
  }
}

async function listFiles(root: string): Promise<readonly string[]> {
  const output: string[] = [];
  async function visit(directory: string): Promise<void> {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile()) output.push(relative(root, path).replaceAll("\\", "/"));
    }
  }
  await visit(root);
  return output.sort();
}

interface TierView {
  readonly content: string;
  readonly deepDigests: readonly DigestRecord[];
}

function defaultTierView(content: string): TierView {
  const lines: string[] = [];
  const deepDigests: DigestRecord[] = [];
  for (const line of content.split("\n")) {
    const match = /^# digest: (.*)$/.exec(line);
    if (match !== null) {
      const digest = parseDigest(match[1] ?? "");
      if (digest.tier === "deep") {
        deepDigests.push(digest);
        continue;
      }
    }
    lines.push(line);
  }
  return { content: lines.join("\n"), deepDigests };
}

function validateRetainedDeepDigest(
  path: string,
  digests: readonly DigestRecord[],
): string | undefined {
  const expectedCount = path === "utf8/classes.txt" ? UTF8_CLASS_DEEP_COUNT : undefined;
  if (expectedCount === undefined)
    return digests.length === 0 ? undefined : `unexpected deep digest in ${path}`;
  if (digests.length !== 1) return `expected one retained deep digest in ${path}`;
  return digests[0]?.count === expectedCount ? undefined : `deep digest count differs in ${path}`;
}

async function check(includeDeep: boolean): Promise<void> {
  const temporary = await mkdtemp(join(tmpdir(), "texdig-conformance-"));
  try {
    await writeFamilies(temporary, includeDeep);
    const expected = await listFiles(temporary);
    const actual = (await listFiles(fixtureRoot)).filter((path) => path !== "README.md");
    const differences: string[] = [];
    for (const path of new Set([...expected, ...actual])) {
      if (!expected.includes(path)) differences.push(`unexpected ${path}`);
      else if (!actual.includes(path)) differences.push(`missing ${path}`);
      else {
        const expectedContent = await readFile(join(temporary, path), "utf8");
        const actualContent = await readFile(join(fixtureRoot, path), "utf8");
        if (includeDeep) {
          if (expectedContent !== actualContent) differences.push(`changed ${path}`);
        } else {
          const expectedView = defaultTierView(expectedContent);
          const actualView = defaultTierView(actualContent);
          const deepProblem = validateRetainedDeepDigest(path, actualView.deepDigests);
          if (deepProblem !== undefined) differences.push(deepProblem);
          if (expectedView.content !== actualView.content) differences.push(`changed ${path}`);
        }
      }
    }
    if (differences.length > 0)
      throw new Error(`conformance fixtures differ:\n${differences.join("\n")}`);
    const qualifier = includeDeep ? "including deep digests" : "default tier; deep digest retained";
    process.stdout.write(
      `conformance fixtures match (${String(expected.length)} families, ${qualifier})\n`,
    );
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (process.argv.includes("--check")) await check(process.argv.includes("--deep"));
else {
  await writeFamilies(fixtureRoot, true);
  process.stdout.write("generated conformance fixtures\n");
}
