import { buildSliceLaws } from "./slice-laws.ts";
import { buildSnapshotIdentity } from "./snapshot-identity.ts";
import { buildSpanPredicates } from "./span-predicates.ts";
import { buildTopologyConversions } from "./topology-conversions.ts";
import { buildTopologyLines } from "./topology-lines.ts";
import type { GeneratedFamily } from "./types.ts";
import { buildUtf8Classes } from "./utf8-classes.ts";
import { buildUtf8Named } from "./utf8-named.ts";
import { buildUtf8Random } from "./utf8-random.ts";

export function buildFamilies(): readonly GeneratedFamily[] {
  return [
    buildUtf8Named(),
    buildUtf8Classes(),
    buildUtf8Random(),
    buildSpanPredicates(),
    buildTopologyLines(),
    buildTopologyConversions(),
    buildSnapshotIdentity(),
    buildSliceLaws(),
  ];
}
