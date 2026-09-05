import { resolve } from "node:path";
import { sourceRootOperation } from "./registry/generate.ts";
import { checkRegistry } from "./registry/check.ts";

const args = process.argv.slice(2).filter((argument) => argument !== "--");
const check = args.includes("--check");
const rootIndex = args.indexOf("--source-root");
const root = rootIndex < 0 ? undefined : args[rootIndex + 1];
const allowed = new Set(["--check", "--source-root", ...(root === undefined ? [] : [root])]);
if (
  args.some((argument) => !allowed.has(argument)) ||
  (rootIndex >= 0 && (root === undefined || root.startsWith("--")))
)
  throw new Error("expected [--check] --source-root <clean-pinned-checkout>");
if (!check && root === undefined) throw new Error("generation requires an explicit --source-root");
if (check) await checkRegistry();
if (root !== undefined) {
  const report = await sourceRootOperation(resolve(root), check);
  console.log(
    check
      ? `Registry source check passed. Receipt: ${report ?? "none"}`
      : "Generated all eighteen registry families and the tracked receipt.",
  );
} else
  console.log("Registry custody, catalog invariants, and synthetic two-run determinism passed.");
