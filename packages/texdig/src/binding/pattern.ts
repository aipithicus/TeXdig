import {
  parseArgspec,
  type SublanguageNode,
  type SublanguageValue,
} from "../latex/sublanguages/checkpoints.js";
import { SourceSnapshot } from "../source/index.js";
import type { ArgumentPattern, ArgumentToken } from "../registry/types.js";

export function argumentToken(spelling: string): ArgumentToken {
  if (!spelling.startsWith("{") || !spelling.endsWith("}") || spelling.length < 2)
    return { kind: "token", spelling };
  const children: ArgumentToken[] = [];
  let offset = 1;
  while (offset < spelling.length - 1) {
    const start = offset;
    if (spelling[offset] === "{") {
      let depth = 1;
      offset++;
      while (offset < spelling.length - 1 && depth > 0) {
        const char = spelling[offset++];
        if (char === "\\") {
          if (/[a-zA-Z]/u.test(spelling[offset] ?? ""))
            while (/[a-zA-Z]/u.test(spelling[offset] ?? "")) offset++;
          else offset++;
        } else if (char === "{") depth++;
        else if (char === "}") depth--;
      }
      if (depth !== 0) throw new Error("unbalanced structured argspec group");
    } else if (spelling[offset] === "\\") {
      offset++;
      if (/[a-zA-Z]/u.test(spelling[offset] ?? ""))
        while (/[a-zA-Z]/u.test(spelling[offset] ?? "")) offset++;
      else offset++;
    } else {
      offset += (spelling.codePointAt(offset) ?? 0) > 0xffff ? 2 : 1;
    }
    children.push(argumentToken(spelling.slice(start, offset)));
  }
  return { kind: "group", spelling, children };
}

function isNode(value: SublanguageValue): value is SublanguageNode {
  return (
    typeof value === "object" &&
    value !== null &&
    "kind" in value &&
    "fields" in value &&
    "span" in value
  );
}

export function normalizeArgumentPattern(spelling: string): readonly ArgumentPattern[] {
  const result = parseArgspec(
    new SourceSnapshot(new TextEncoder().encode(spelling), {
      sourceId: "argument-pattern",
      revision: 0,
    }),
    { strict: true },
  );
  const specs = result.value?.fields.specs;
  if (!Array.isArray(specs)) throw new Error("argspec root has no argument sequence");
  return specs.map((value: SublanguageValue): ArgumentPattern => {
    if (!isNode(value)) throw new Error("argspec sequence contains a non-node");
    const fields = value.fields;
    const get = (field: string): string => {
      const found = fields[field];
      if (typeof found !== "string") throw new Error(`argspec argument has no string ${field}`);
      return found;
    };
    const token = (field: string): ArgumentToken => argumentToken(get(field));
    const code = get("code");
    const modifiers = get("modifiers");
    switch (code) {
      case "m":
      case "b":
      case "s":
      case "o":
        return { code, modifiers };
      case "v":
        return { code, modifiers, delimiter: token("delimiter") };
      case "t":
        return { code, modifiers, token: token("token") };
      case "u":
        return { code, modifiers, stop: token("stop") };
      case "O":
        return { code, modifiers, defaultValue: token("defaultValue") };
      case "d":
      case "r":
        return { code, modifiers, open: token("open"), close: token("close") };
      case "D":
      case "R":
        return {
          code,
          modifiers,
          open: token("open"),
          close: token("close"),
          defaultValue: token("defaultValue"),
        };
      case "e":
        return { code, modifiers, tokens: token("tokens") };
      case "E":
        return { code, modifiers, tokens: token("tokens"), defaults: token("defaults") };
      default:
        throw new Error(`unhandled argspec code: ${code}`);
    }
  });
}
