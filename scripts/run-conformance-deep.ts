import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const vitest = resolve(import.meta.dirname, "..", "node_modules", "vitest", "vitest.mjs");
const result = spawnSync(process.execPath, [vitest, "run", "tests/conformance.test.ts"], {
  stdio: "inherit",
  env: { ...process.env, TEXDIG_CONFORMANCE_DEEP: "1" },
});
if (result.error !== undefined) throw result.error;
process.exitCode = result.status ?? 1;
