import type { SourceInput } from "./source-manifest.ts";
export const MATH_TOOLS_SOURCE = {
  repository: "https://github.com/latex3/mathtools",
  revision: "23e4b518e825f1afc60985b137c6fc17b870cac9",
  inputs: [
    {
      path: "mathtools.dtx",
      sha256: "b279ceb33ca9e9a6bd354d76b12c942b0d86998a8696728beb4d2dd87a8db7f1",
      license: "LPPL-1.3c-or-later",
    },
  ],
};
export const TEX_SOURCE = {
  repository: "https://github.com/TeX-Live/texlive-source",
  revision: "bb984049b0b66e1be0370ad161c57db1f09ba585",
  inputs: [
    {
      path: "texk/web2c/tex.web",
      sha256: "c62ab513ef167e93f71a23bd34f311e243210afd7c7a0f9b779614b71e398324",
      license: "LicenseRef-Knuth-tex-web",
    },
  ],
};
export const CURATED_SOURCE: {
  readonly repository: string;
  readonly revision: string;
  readonly inputs: readonly SourceInput[];
} = {
  repository: "https://github.com/latex3/latex2e",
  revision: "20a58e9da170677b33916b27cdfa71f7768a93f4",
  inputs: [
    {
      path: "required/amsmath/amsopn.dtx",
      sha256: "5d3afcd3828f9a1fe14b8aa7fa43f1cd37e0919057b97e9c95431aa605cd0237",
      license: "LPPL-1.3c-or-later",
    },
    {
      path: "base/ltdefns.dtx",
      sha256: "c04db7f93f0962398d856164052ad0229b153220e9cd4956b7ff75aae2625925",
      license: "LPPL-1.3c-or-later",
    },
    {
      path: "base/ltclass.dtx",
      sha256: "05232c3c927f65f62ca2c92e721fd70524ad098aa295708a7cbead2f8df64a2f",
      license: "LPPL-1.3c-or-later",
    },
    {
      path: "base/ltcmd.dtx",
      sha256: "cbfe40c229c716afdb478a534dcbc3716fe35dff1dc9f8dc1b2ee2562620f067",
      license: "LPPL-1.3c-or-later",
    },
    {
      path: "base/ltthm.dtx",
      sha256: "5fac1a0873d8569f100295e62bff6b2ed5bfa506b213c3ee3234fe2784c062da",
      license: "LPPL-1.3c-or-later",
    },
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
