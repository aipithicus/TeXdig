import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      texdig: fileURLToPath(new URL("./packages/texdig/src/index.ts", import.meta.url)),
    },
  },
  test: {
    include: ["packages/*/src/**/*.test.ts", "tests/**/*.test.ts", "scripts/registry/**/*.test.ts"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      include: ["packages/*/src/**"],
      exclude: ["**/*.test.ts", "**/src/generated/**"],
    },
  },
});
