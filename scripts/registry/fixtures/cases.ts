/** Authored synthetic source strings, never imported as executable upstream code. */
export const VALID_SOURCE = `
import { argumentParser } from "./libs/argument-parser";
export const macros = {
  custom: { argumentParser: argumentParser },
  mixed: {
    signature: "+m !O{{nested}\\macro} d{} u{END} v|",
    renderInfo: { namedArguments: ["body", "default", null, null, null], inMathMode: true, pgfkeysArgs: true, breakAround: true }
  },
  absent: {},
  denied: { targetCapability: { target: "synthetic-renderer", version: "1", status: "Not supported" } }
};
export const environments = { table: { signature: "m o m", renderInfo: { alignContent: true } } };
`;

export const DUPLICATE_SOURCE = `export const macros = {
  textbullet: { signature: "m" },
  textbullet: { signature: "o" }
}; export const environments = {};`;

export const HOSTILE_SOURCE = `import { data } from "untrusted-input";
export const macros = {
  safe: { signature: "m" },
  computed: { signature: data.name },
  invoked: (() => { throw new Error("INPUT EXECUTED"); })(),
  ...data,
  [data.name]: { signature: "m" },
  callback: { argumentParser: () => { throw new Error("CALLBACK EXECUTED"); } }
}; export const environments = {};`;
