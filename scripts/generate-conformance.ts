import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildFamilies } from "./conformance/families/index.ts";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtureRoot = join(repositoryRoot, "fixtures", "conformance");

async function writeFamilies(root: string): Promise<void> {
  for (const family of buildFamilies()) {
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

async function check(): Promise<void> {
  const temporary = await mkdtemp(join(tmpdir(), "texdig-conformance-"));
  try {
    await writeFamilies(temporary);
    const expected = await listFiles(temporary);
    const actual = (await listFiles(fixtureRoot)).filter((path) => path !== "README.md");
    const differences: string[] = [];
    for (const path of new Set([...expected, ...actual])) {
      if (!expected.includes(path)) differences.push(`unexpected ${path}`);
      else if (!actual.includes(path)) differences.push(`missing ${path}`);
      else if (
        (await readFile(join(temporary, path), "utf8")) !==
        (await readFile(join(fixtureRoot, path), "utf8"))
      )
        differences.push(`changed ${path}`);
    }
    if (differences.length > 0)
      throw new Error(`conformance fixtures differ:\n${differences.join("\n")}`);
    process.stdout.write(`conformance fixtures match (${String(expected.length)} families)\n`);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (process.argv.includes("--check")) await check();
else {
  await writeFamilies(fixtureRoot);
  process.stdout.write("generated conformance fixtures\n");
}
