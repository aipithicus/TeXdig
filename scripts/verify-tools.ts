/**
 * Verifies the external executables recorded in tools/tools.json.
 *
 * Exit codes:
 *   0 — every tool present on this machine matches its pinned SHA-256; absent tools are reported, not failed
 *   1 — a present tool's hash differs from the manifest, or the manifest is malformed
 */
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

interface ToolRecord {
  readonly name: string;
  readonly version: string;
  readonly path: string;
  readonly platform: string;
  readonly sha256: string;
  readonly source: string;
  readonly role: string;
}

function isToolRecord(value: unknown): value is ToolRecord {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>; // narrowed to object above; keys are checked individually below
  return ["name", "version", "path", "platform", "sha256", "source", "role"].every(
    (key) => typeof record[key] === "string",
  );
}

function readManifest(text: string): readonly ToolRecord[] {
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null || !("tools" in parsed)) {
    throw new Error("tools.json: expected an object with a `tools` array");
  }
  const tools: unknown = parsed.tools;
  if (!Array.isArray(tools) || !tools.every(isToolRecord)) {
    throw new Error(
      "tools.json: every entry needs string fields name, version, path, platform, sha256, source, role",
    );
  }
  return tools;
}

async function sha256(file: string): Promise<string> {
  return createHash("sha256")
    .update(await readFile(file))
    .digest("hex");
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = readManifest(await readFile(path.join(root, "tools", "tools.json"), "utf8"));

let failed = false;
for (const tool of manifest) {
  const file = path.join(root, tool.path);
  let present = true;
  try {
    await stat(file);
  } catch {
    present = false;
  }
  if (!present) {
    console.log(
      `${tool.name} ${tool.version}: absent (${tool.path}) — not installed on this machine`,
    );
    continue;
  }
  const actual = await sha256(file);
  if (actual === tool.sha256.toLowerCase()) {
    console.log(`${tool.name} ${tool.version}: ok`);
  } else {
    console.error(`${tool.name}: sha256 mismatch\n  expected ${tool.sha256}\n  actual   ${actual}`);
    failed = true;
  }
}

process.exitCode = failed ? 1 : 0;
