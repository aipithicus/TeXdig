import { describe, expect, it } from "vitest";

import { PARENT_ORACLE_CONTROL_CASES } from "../testkit/parent-oracles/control-cases.ts";
import {
  PARENT_ORACLE_EXPECTED_FILE_COUNT,
  PARENT_ORACLE_FILES,
} from "../testkit/parent-oracles/manifest.ts";
import { SourceSnapshot } from "../packages/texdig/src/source/snapshot.js";
import {
  MiniArticleStrictError,
  MiniArticleTimeoutError,
  parseMiniArticle,
  realizeMiniArticle,
} from "../packages/texdig/src/latex/mini-article.js";

describe("parent oracle inventory", () => {
  it("covers the complete 82-file snapshot population exactly once", () => {
    expect(PARENT_ORACLE_FILES).toHaveLength(PARENT_ORACLE_EXPECTED_FILE_COUNT);
    expect(new Set(PARENT_ORACLE_FILES.map((file) => file.id)).size).toBe(
      PARENT_ORACLE_EXPECTED_FILE_COUNT,
    );
    expect(PARENT_ORACLE_FILES.filter((file) => file.producer === "latex-utensils")).toHaveLength(
      5,
    );
    expect(PARENT_ORACLE_FILES.filter((file) => file.producer === "unified-latex")).toHaveLength(
      77,
    );
  });

  it("carries revision, license, lineage, correlation, and exact row provenance", () => {
    for (const file of PARENT_ORACLE_FILES) {
      expect(file.upstreamRevision).toMatch(/^[0-9a-f]{40}$/u);
      expect(file.license).toBe("MIT");
      expect(file.producerLineage).toBe(file.producer);
      expect(file.correlationLabel).toBe("parent-regression-correlated");
      expect(file.snapshotRevision).toBe("20260831_115026");
      expect(file.snapshotShard).toMatch(/^s\d{3}_[a-z-]+$/u);
      expect(file.snapshotContentStart).toBeGreaterThanOrEqual(0);
      expect(file.snapshotContentEndInclusive).toBeGreaterThanOrEqual(file.snapshotContentStart);
    }
  });

  it("retains the helper and benchmark rows instead of laundering them into tests", () => {
    expect(PARENT_ORACLE_FILES.filter((file) => file.role === "test-helper")).toHaveLength(1);
    expect(PARENT_ORACLE_FILES.filter((file) => file.role === "benchmark")).toHaveLength(1);
    expect(PARENT_ORACLE_FILES.filter((file) => file.role === "test")).toHaveLength(80);
  });

  it("anchors every executable control to independently inventoried parser sources", () => {
    const manifestIds = new Set(PARENT_ORACLE_FILES.map((file) => file.id));
    expect(PARENT_ORACLE_CONTROL_CASES.map((control) => control.facet).sort()).toEqual([
      "start-rule",
      "strict",
      "timeout",
    ]);
    for (const control of PARENT_ORACLE_CONTROL_CASES) {
      expect(control.correlationLabel).toBe("parent-regression-correlated");
      expect(control.parentOracleIds).toHaveLength(3);
      for (const parentOracleId of control.parentOracleIds) {
        expect(manifestIds.has(parentOracleId)).toBe(true);
      }
    }
  });

  it("executes start-rule, strict-mode, and timeout controls against TeXdig", () => {
    for (const control of PARENT_ORACLE_CONTROL_CASES) {
      const snapshot = new SourceSnapshot(Uint8Array.from(control.input), {
        sourceId: `parent-control/${control.id}.tex`,
        revision: 0,
      });
      switch (control.facet) {
        case "start-rule": {
          const document = parseMiniArticle(snapshot, { startRule: "document" });
          const fragment = parseMiniArticle(snapshot, { startRule: "fragment" });
          expect(document.tree.kind).toBe("document");
          expect(fragment.tree.kind).toBe("fragment");
          expect(realizeMiniArticle(document)).toEqual(Uint8Array.from(control.input));
          expect(realizeMiniArticle(fragment)).toEqual(Uint8Array.from(control.input));
          break;
        }
        case "strict":
          expect(() => parseMiniArticle(snapshot, { strict: true })).toThrow(
            MiniArticleStrictError,
          );
          break;
        case "timeout":
          expect(() => parseMiniArticle(snapshot, { timeoutMs: 0 })).toThrow(
            MiniArticleTimeoutError,
          );
          break;
      }
    }
  });
});
