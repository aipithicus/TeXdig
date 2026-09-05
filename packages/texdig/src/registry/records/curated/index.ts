import { immutableRegistryValue } from "../../catalog.js";
import type { RegistryAssertion } from "../../types.js";
import { CURATED_RECORDS as KERNEL_RECORDS } from "./kernel.js";
import { SEMANTIC_RECORDS } from "./semantics.js";
import { PREFIX_RECORDS } from "./prefixes.js";
export const CURATED_RECORDS: readonly RegistryAssertion[] = immutableRegistryValue([
  ...KERNEL_RECORDS,
  ...SEMANTIC_RECORDS,
  ...PREFIX_RECORDS,
]);
