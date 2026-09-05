import { spawnSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

interface GrammarSpecification {
  readonly source: string;
  readonly outputStem: string;
  readonly allowedStartRules: readonly string[];
  readonly returnTypes: Readonly<Record<string, string>>;
}

const WORKSPACE_ROOT = resolve(import.meta.dirname, "..");
const SOURCE_GENERATED = resolve(WORKSPACE_ROOT, "packages/texdig/src/generated");
const DIST_GENERATED = resolve(WORKSPACE_ROOT, "packages/texdig/dist/generated");
const TEMP_ROOT = resolve(WORKSPACE_ROOT, "temp");
const PEGGY_CLI = fileURLToPath(import.meta.resolve("peggy/bin/peggy.js"));

const GRAMMARS: readonly GrammarSpecification[] = Object.freeze([
  Object.freeze({
    source: "packages/texdig/src/latex/grammars/latex.peggy",
    outputStem: "latex",
    allowedStartRules: Object.freeze(["Document", "Fragment"]),
    returnTypes: Object.freeze({ Document: "unknown", Fragment: "unknown" }),
  }),
  ...["argspec", "alignment", "glue", "tabular", "xcolor", "pgfkeys", "tikz", "bibtex"].map(
    (name) =>
      Object.freeze({
        source: `packages/texdig/src/latex/grammars/${name}.peggy`,
        outputStem: name,
        allowedStartRules: Object.freeze([
          name === "tikz" ? "Path" : name === "bibtex" ? "Bibliography" : "Start",
        ]),
        returnTypes: Object.freeze({
          [name === "tikz" ? "Path" : name === "bibtex" ? "Bibliography" : "Start"]: "unknown",
        }),
      }),
  ),
]);

function expectedArtifacts(specification: GrammarSpecification): readonly string[] {
  return Object.freeze([`${specification.outputStem}.js`, `${specification.outputStem}.d.ts`]);
}

function validateSpecification(specification: GrammarSpecification): void {
  if (specification.allowedStartRules.length === 0) {
    throw new Error(`${specification.source} must expose at least one start rule`);
  }
  for (const rule of specification.allowedStartRules) {
    if (specification.returnTypes[rule] === undefined) {
      throw new Error(`${specification.source} has no declared return type for start rule ${rule}`);
    }
  }
}

async function generateInto(outputDirectory: string): Promise<void> {
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  for (const specification of GRAMMARS) {
    validateSpecification(specification);
    const output = join(outputDirectory, `${specification.outputStem}.js`);
    const source = resolve(WORKSPACE_ROOT, specification.source);
    const result = spawnSync(
      process.execPath,
      [
        PEGGY_CLI,
        "--format",
        "es",
        "--dts",
        "--allowed-start-rules",
        specification.allowedStartRules.join(","),
        "--return-types",
        JSON.stringify(specification.returnTypes),
        "--output",
        output,
        source,
      ],
      { cwd: WORKSPACE_ROOT, encoding: "utf8", windowsHide: true },
    );

    if (result.error !== undefined) {
      throw result.error;
    }
    if (result.status !== 0) {
      const detail = [result.stdout, result.stderr].filter((value) => value.length > 0).join("\n");
      throw new Error(
        `Peggy failed for ${specification.source} with exit code ${String(result.status)}${detail.length === 0 ? "" : `\n${detail}`}`,
      );
    }
  }
}

async function compareGenerated(left: string, right: string): Promise<void> {
  for (const specification of GRAMMARS) {
    for (const artifact of expectedArtifacts(specification)) {
      const [leftBytes, rightBytes] = await Promise.all([
        readFile(join(left, artifact)),
        readFile(join(right, artifact)),
      ]);
      if (!leftBytes.equals(rightBytes)) {
        throw new Error(`nondeterministic Peggy output: ${artifact}`);
      }
    }
  }
}

async function materializeGenerated(source: string, destination: string): Promise<void> {
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });
  for (const specification of GRAMMARS) {
    for (const artifact of expectedArtifacts(specification)) {
      const target = join(destination, artifact);
      await mkdir(dirname(target), { recursive: true });
      await copyFile(join(source, artifact), target);
    }
  }
}

async function withScratchDirectory<T>(
  prefix: string,
  action: (path: string) => Promise<T>,
): Promise<T> {
  await mkdir(TEMP_ROOT, { recursive: true });
  const path = await mkdtemp(join(TEMP_ROOT, prefix));
  try {
    return await action(path);
  } finally {
    await rm(path, { recursive: true, force: true });
  }
}

async function generateCanonical(): Promise<void> {
  await withScratchDirectory("grammars-generate-", async (temporary) => {
    await generateInto(temporary);
    await materializeGenerated(temporary, SOURCE_GENERATED);
  });
  console.log(
    `Generated ${String(GRAMMARS.length)} grammar(s) into packages/texdig/src/generated.`,
  );
}

async function checkDeterminism(): Promise<void> {
  await withScratchDirectory("grammars-check-", async (temporary) => {
    const first = join(temporary, "first");
    const second = join(temporary, "second");
    await generateInto(first);
    await generateInto(second);
    await compareGenerated(first, second);
    await materializeGenerated(first, SOURCE_GENERATED);
  });
  console.log(
    `Verified ${String(GRAMMARS.length)} grammar(s); both generated artifacts are byte-deterministic.`,
  );
}

async function main(): Promise<void> {
  const arguments_ = process.argv.slice(2);
  const unknown = arguments_.filter((argument) => argument !== "--check" && argument !== "--copy");
  if (unknown.length > 0) {
    throw new Error(`unknown argument(s): ${unknown.join(", ")}`);
  }
  if (arguments_.includes("--check") && arguments_.includes("--copy")) {
    throw new Error("--check and --copy are mutually exclusive");
  }
  if (arguments_.includes("--copy")) {
    await materializeGenerated(SOURCE_GENERATED, DIST_GENERATED);
    console.log("Copied generated Peggy artifacts into packages/texdig/dist/generated.");
    return;
  }
  if (arguments_.includes("--check")) {
    await checkDeterminism();
    return;
  }
  await generateCanonical();
}

await main();
