import type { SourceInput } from "./source-manifest.ts";
export const CURATED_SOURCE: {
  readonly repository: string;
  readonly revision: string;
  readonly inputs: readonly SourceInput[];
} = {
  repository: "https://github.com/latex3/latex2e",
  revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
  inputs: [
    {
      path: "base/ltmiscen.dtx",
      sha256: "71df65b4448c0cbcfd3a8fde917feb700cb9889acab7a03750fca5fc193bf0fb",
      license: "LPPL-1.3c-or-later",
    },
    {
      path: "base/classes.dtx",
      sha256: "7d2add3d0c5f4deff4aaae06e61c0332aef89b19e56be26c105cb8bc34189a41",
      license: "LPPL-1.3c-or-later",
    },
    {
      path: "base/legal.txt",
      sha256: "a258aa1193a2012f9deb25c7c09507b0744b97875cc80ddf11a975919fa0ce20",
      license: "LPPL-1.3c-or-later",
    },
    {
      path: "base/lppl.txt",
      sha256: "ca3227f672053cb608959d7e1d476c7a13efea11be3f6e53758a68b650c918e8",
      license: "LPPL-1.3c-or-later",
    },
  ],
};
