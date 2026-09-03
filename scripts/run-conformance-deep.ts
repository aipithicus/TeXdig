import { spawn, type ChildProcess } from "node:child_process";
import { availableParallelism } from "node:os";
import { resolve } from "node:path";

import { UTF8_CLASS_DEEP_COUNT } from "./conformance/families/utf8-classes.ts";

const vitest = resolve(import.meta.dirname, "..", "node_modules", "vitest", "vitest.mjs");
const generator = resolve(import.meta.dirname, "generate-conformance.ts");
const active = new Set<ChildProcess>();

function workerCount(): number {
  const requested = process.env.TEXDIG_CONFORMANCE_WORKERS;
  if (requested !== undefined) {
    const value = Number(requested);
    if (!Number.isSafeInteger(value) || value < 1 || value > 64)
      throw new RangeError("TEXDIG_CONFORMANCE_WORKERS must be an integer from 1 through 64");
    return value;
  }
  return Math.max(1, Math.min(8, availableParallelism() - 1));
}

function run(
  label: string,
  arguments_: readonly string[],
  environment: NodeJS.ProcessEnv,
): Promise<void> {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(process.execPath, arguments_, {
      stdio: "inherit",
      env: { ...process.env, ...environment },
    });
    active.add(child);
    child.once("error", (error) => {
      rejectPromise(new Error(`${label} could not start`, { cause: error }));
    });
    child.once("close", (code, signal) => {
      active.delete(child);
      if (code === 0) resolvePromise();
      else
        rejectPromise(
          new Error(
            `${label} failed${code === null ? "" : ` with exit ${String(code)}`}${signal === null ? "" : ` after ${signal}`}`,
          ),
        );
    });
  });
}

const workers = workerCount();
process.stdout.write(
  `deep conformance: ${String(workers)} source shards plus full fixture regeneration\n`,
);
const tasks = [
  run("deep fixture check", [generator, "--check", "--deep"], {}),
  ...Array.from({ length: workers }, (_, index) =>
    run(
      `deep source shard ${String(index + 1)}/${String(workers)}`,
      [
        vitest,
        "run",
        "tests/conformance.test.ts",
        "--testNamePattern",
        "validates its assigned length-five class shard",
        "--maxWorkers",
        "1",
        "--no-file-parallelism",
      ],
      {
        TEXDIG_CONFORMANCE_DEEP: "1",
        TEXDIG_CONFORMANCE_SHARD_COUNT: String(workers),
        TEXDIG_CONFORMANCE_SHARD_INDEX: String(index),
      },
    ),
  ),
];

try {
  await Promise.all(tasks);
  process.stdout.write(
    `deep conformance passed (${String(UTF8_CLASS_DEEP_COUNT)} source cases, all fixture digests)\n`,
  );
} catch (error) {
  for (const child of active) child.kill();
  await Promise.allSettled(tasks);
  throw error;
}
