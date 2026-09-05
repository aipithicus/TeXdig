import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import ts from "typescript";
import {
  compareRegistryText,
  registryValueKey,
} from "../../packages/texdig/src/registry/catalog.ts";
import { emitRecords, RECEIPT_PATH } from "./emit-records.ts";
import {
  normalizeRecords,
  validateFamilyInventory,
  type NormalizedFamily,
} from "./normalize-records.ts";
import { emitReceipt, familyCounts, sha256, type HarvestReceipt } from "./receipt.ts";
import { SOURCE_FAMILIES, SOURCE_ID, SOURCE_INPUTS, type SourceFamily } from "./source-manifest.ts";

export const WORKSPACE_ROOT: string = resolve(import.meta.dirname, "../..");

export async function withRegistryScratch<T>(action: (path: string) => Promise<T>): Promise<T> {
  const parent = join(WORKSPACE_ROOT, "temp");
  await mkdir(parent, { recursive: true });
  const owned = await mkdtemp(join(parent, "registry-"));
  if (dirname(resolve(owned)) !== resolve(parent))
    throw new Error("registry scratch containment failure");
  try {
    return await action(owned);
  } finally {
    await rm(owned, { recursive: true, force: true });
  }
}

export function gitSource(root: string, args: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...args], { encoding: "utf8", windowsHide: true }).trim();
}

export async function verifySource(root: string): Promise<void> {
  if (gitSource(root, ["status", "--porcelain=v1", "--untracked-files=all"]) !== "")
    throw new Error("production registry source must be a clean Git checkout");
  if (gitSource(root, ["rev-parse", "HEAD"]) !== SOURCE_ID.commit)
    throw new Error("source revision does not match the manifest");
  const base = "packages/unified-latex-ctan/package";
  const actual: string[] = [];
  for (const entry of await readdir(join(root, base), { withFileTypes: true })) {
    if (
      entry.isDirectory() &&
      (await readdir(join(root, base, entry.name))).includes("provides.ts")
    )
      actual.push(entry.name);
  }
  validateFamilyInventory(
    SOURCE_FAMILIES.map((family) => family.family),
    actual,
  );
  for (const input of SOURCE_INPUTS) {
    const bytes = await readFile(join(root, input.path));
    if (sha256(bytes) !== input.sha256)
      throw new Error(`source input digest mismatch: ${input.path}`);
    // Compare the worktree bytes with the exact Git blob, independently of clean-status filters.
    const blob = execFileSync("git", ["-C", root, "show", `${SOURCE_ID.commit}:${input.path}`], {
      windowsHide: true,
    });
    if (!bytes.equals(blob))
      throw new Error(
        `source bytes differ from pinned Git blob: ${input.path}; check line-ending filters`,
      );
  }
}

export async function harvestSource(
  root: string,
  order: readonly SourceFamily[] = SOURCE_FAMILIES,
): Promise<readonly NormalizedFamily[]> {
  await verifySource(root);
  validateFamilyInventory(
    SOURCE_FAMILIES.map((family) => family.family),
    order.map((family) => family.family),
  );
  const families: NormalizedFamily[] = [];
  for (const family of order) {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(
      await readFile(join(root, family.path)),
    );
    families.push(
      normalizeRecords(
        family,
        text,
        {
          kind: "parent-source",
          repository: SOURCE_ID.repository,
          revision: SOURCE_ID.commit,
          license: SOURCE_ID.license,
          path: family.path,
          inputDigest: family.sha256,
        },
        SOURCE_FAMILIES.map((item) => item.provider),
      ),
    );
  }
  return families.sort((a, b) => compareRegistryText(a.family, b.family));
}

export async function generationBytes(
  families: readonly NormalizedFamily[],
): Promise<ReadonlyMap<string, string>> {
  const outputs = new Map(await emitRecords(families));
  const receipt: HarvestReceipt = {
    format: "texdig-registry/1",
    generator: { version: "1", typescript: ts.version },
    repository: SOURCE_ID.repository,
    revision: SOURCE_ID.commit,
    license: SOURCE_ID.license,
    inputs: [...SOURCE_INPUTS].sort((a, b) => compareRegistryText(a.path, b.path)),
    outputs: [...outputs]
      .map(([path, bytes]) => ({ path, sha256: sha256(bytes) }))
      .sort((a, b) => compareRegistryText(a.path, b.path)),
    families: families.map(familyCounts).sort((a, b) => compareRegistryText(a.family, b.family)),
    diagnostics: families
      .flatMap((family) => family.diagnostics)
      .sort((a, b) => compareRegistryText(registryValueKey(a), registryValueKey(b))),
  };
  outputs.set(RECEIPT_PATH, await emitReceipt(receipt));
  return outputs;
}

export async function writeGeneration(
  root: string,
  outputs: ReadonlyMap<string, string>,
): Promise<void> {
  for (const [path, bytes] of outputs) {
    const target = resolve(root, path);
    const within = relative(resolve(root), target);
    if (within.startsWith(`..${sep}`) || within === ".." || resolve(root) === target)
      throw new Error("output escaped its root");
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, bytes, "utf8");
  }
}

export async function compareGeneration(
  root: string,
  outputs: ReadonlyMap<string, string>,
): Promise<void> {
  for (const [path, bytes] of outputs) {
    if (!(await readFile(join(root, path))).equals(Buffer.from(bytes)))
      throw new Error(`registry output differs: ${path}`);
  }
}

export function compareByteSets(
  left: ReadonlyMap<string, string>,
  right: ReadonlyMap<string, string>,
): void {
  if (
    registryValueKey([...left].sort(([a], [b]) => compareRegistryText(a, b))) !==
    registryValueKey([...right].sort(([a], [b]) => compareRegistryText(a, b)))
  )
    throw new Error("registry generation is not deterministic");
}

export async function sourceRootOperation(
  root: string,
  check: boolean,
): Promise<string | undefined> {
  return withRegistryScratch(async (first) =>
    withRegistryScratch(async (second) => {
      const left = await generationBytes(await harvestSource(root));
      await writeGeneration(first, left);
      const right = await generationBytes(
        await harvestSource(root, [...SOURCE_FAMILIES].reverse()),
      );
      await writeGeneration(second, right);
      compareByteSets(left, right);
      await compareGeneration(first, right);
      await compareGeneration(second, left);
      // Every run verifies the complete set, including the tracked receipt.
      if (check) await compareGeneration(WORKSPACE_ROOT, left);
      else await writeGeneration(WORKSPACE_ROOT, left);
      if (!check) return undefined;
      const reportDirectory = join(WORKSPACE_ROOT, "artifacts/registry");
      await mkdir(reportDirectory, { recursive: true });
      const report = join(reportDirectory, `${first.split(sep).pop() ?? "run"}.json`);
      await writeFile(
        report,
        JSON.stringify(
          {
            sourceRoot: resolve(root),
            repository: SOURCE_ID.repository,
            observedRemotes: gitSource(root, ["remote", "-v"]),
            commit: SOURCE_ID.commit,
            clean: true,
            generatedTwice: true,
            distinctScratchRoots: [first, second],
            reversedFamilyOrder: true,
            matchedTree: true,
            outputs: [...left].map(([path, bytes]) => ({ path, sha256: sha256(bytes) })),
          },
          null,
          2,
        ) + "\n",
      );
      return report;
    }),
  );
}
