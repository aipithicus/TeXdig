/**
 * TeXdig engine entry point.
 *
 * Subpath exports (`texdig/source`, `texdig/latex`, …) are added as each tier lands.
 * See docs/architecture/overview.md for the tier layout.
 */
export * from "./source/index.js";
export * from "./regions/index.js";
