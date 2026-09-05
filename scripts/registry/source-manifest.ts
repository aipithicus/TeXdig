import type { Provider } from "../../packages/texdig/src/registry/types.ts";

export interface SourceFamily {
  readonly family: string;
  readonly provider: Provider;
  readonly path: string;
  readonly sha256: string;
  readonly tables: readonly string[];
}
export interface SourceInput {
  readonly path: string;
  readonly sha256: string;
  readonly license: string;
}

/** Exact clean source identity; roots are always supplied by the caller. */
export const SOURCE_ID = {
  repository: "https://github.com/siefkenj/unified-latex.git",
  commit: "3c1350edbc8f13ccfbbd5d96919391fefa4d268d",
  clean: true,
  license: "MIT",
};
export const SOURCE_FAMILIES: readonly SourceFamily[] = [
  {
    family: "latex2e",
    provider: {
      id: "kernel:latex2e",
      kind: "kernel",
      name: "latex2e",
    },
    path: "packages/unified-latex-ctan/package/latex2e/provides.ts",
    sha256: "bc90ee4ee6d23307fcf5ac98f97e71cc9d4ee9a256cabd781e12a12407b113ad",
    tables: ["macros", "environments"],
  },
  {
    family: "amsart",
    provider: {
      id: "class:amsart",
      kind: "class",
      name: "amsart",
    },
    path: "packages/unified-latex-ctan/package/amsart/provides.ts",
    sha256: "c520c5a371a6c71626f6fda639094e2fb7b928ec10db623896c2ede8073825f8",
    tables: ["macros", "environments"],
  },
  {
    family: "beamer",
    provider: {
      id: "class:beamer",
      kind: "class",
      name: "beamer",
    },
    path: "packages/unified-latex-ctan/package/beamer/provides.ts",
    sha256: "34273a87cfa9677fe64cfeeb3a0b2404c1d8f91eaca16c09acee1266cc06219f",
    tables: ["macros", "environments"],
  },
  {
    family: "cleveref",
    provider: {
      id: "package:cleveref",
      kind: "package",
      name: "cleveref",
    },
    path: "packages/unified-latex-ctan/package/cleveref/provides.ts",
    sha256: "a2a29196ddf402162968d84065c92187133a36936e4440080a695bb829ded956",
    tables: ["macros", "environments"],
  },
  {
    family: "exam",
    provider: {
      id: "class:exam",
      kind: "class",
      name: "exam",
    },
    path: "packages/unified-latex-ctan/package/exam/provides.ts",
    sha256: "c052d8defbfe78ec6ae5b2ee6bb08cb34ad41a60a628f2463fba4e4d43843ae8",
    tables: ["macros", "environments"],
  },
  {
    family: "geometry",
    provider: {
      id: "package:geometry",
      kind: "package",
      name: "geometry",
    },
    path: "packages/unified-latex-ctan/package/geometry/provides.ts",
    sha256: "8710bf9959009bd424c9acea7ec0879dd0cca4b8505033d31ed6ee652f209e5d",
    tables: ["macros", "environments"],
  },
  {
    family: "hyperref",
    provider: {
      id: "package:hyperref",
      kind: "package",
      name: "hyperref",
    },
    path: "packages/unified-latex-ctan/package/hyperref/provides.ts",
    sha256: "bdd09ed8d12f837527130ca3df0b924b883281f669f70d9b1b2c24baaa21d22c",
    tables: ["macros", "environments"],
  },
  {
    family: "listings",
    provider: {
      id: "package:listings",
      kind: "package",
      name: "listings",
    },
    path: "packages/unified-latex-ctan/package/listings/provides.ts",
    sha256: "d54f4489e9947363545b560cce52390c8f244b14f2a92cf5dabac4365377cacf",
    tables: ["macros", "environments"],
  },
  {
    family: "makeidx",
    provider: {
      id: "package:makeidx",
      kind: "package",
      name: "makeidx",
    },
    path: "packages/unified-latex-ctan/package/makeidx/provides.ts",
    sha256: "ba35c1f73d343b4bd5c52f91f45f5a97983913321850c4fc6dc2c824dcf0c1b0",
    tables: ["macros", "environments"],
  },
  {
    family: "mathtools",
    provider: {
      id: "package:mathtools",
      kind: "package",
      name: "mathtools",
    },
    path: "packages/unified-latex-ctan/package/mathtools/provides.ts",
    sha256: "582c78be4a6aff984b8fca4b003fefd503ebf8b4f4b8a77ccc81dbe51349c0da",
    tables: ["macros", "environments"],
  },
  {
    family: "minted",
    provider: {
      id: "package:minted",
      kind: "package",
      name: "minted",
    },
    path: "packages/unified-latex-ctan/package/minted/provides.ts",
    sha256: "d99b3a816b59042df81070aa54d23b920839feb0ab858cba3c0628d66fc294f6",
    tables: ["macros", "environments"],
  },
  {
    family: "multicol",
    provider: {
      id: "package:multicol",
      kind: "package",
      name: "multicol",
    },
    path: "packages/unified-latex-ctan/package/multicol/provides.ts",
    sha256: "481986b3163ac8d4d857717742022ebd6d71f3668f2ad5304d9efe4e4b19d58d",
    tables: ["macros", "environments"],
  },
  {
    family: "nicematrix",
    provider: {
      id: "package:nicematrix",
      kind: "package",
      name: "nicematrix",
    },
    path: "packages/unified-latex-ctan/package/nicematrix/provides.ts",
    sha256: "bd3d0a4d813fe18b9e5e7631ff5a7518ea0624643e743b9696c3ace63f1d02c4",
    tables: ["macros", "environments"],
  },
  {
    family: "systeme",
    provider: {
      id: "package:systeme",
      kind: "package",
      name: "systeme",
    },
    path: "packages/unified-latex-ctan/package/systeme/provides.ts",
    sha256: "fb46a6140b4dacef4190a5f7865b4748e1d545925c9dee5e3f5d53a086dc3fb2",
    tables: ["macros", "environments"],
  },
  {
    family: "tabularx",
    provider: {
      id: "package:tabularx",
      kind: "package",
      name: "tabularx",
    },
    path: "packages/unified-latex-ctan/package/tabularx/provides.ts",
    sha256: "566d5dad57dc8e23eb1234c35775258e6771c34c702b1b937ec4d598be349574",
    tables: ["macros", "environments"],
  },
  {
    family: "tikz",
    provider: {
      id: "package:tikz",
      kind: "package",
      name: "tikz",
    },
    path: "packages/unified-latex-ctan/package/tikz/provides.ts",
    sha256: "b629d91ada14c1419a0b0648c86a22f070b6bcb50673a55bf25f7822ae6a7fa9",
    tables: ["macros", "environments", "conditionalMacros"],
  },
  {
    family: "xcolor",
    provider: {
      id: "package:xcolor",
      kind: "package",
      name: "xcolor",
    },
    path: "packages/unified-latex-ctan/package/xcolor/provides.ts",
    sha256: "7c345645c766511238f8c42eebc5ee23ffb66e5abcdd346487d781392db6488f",
    tables: ["macros", "environments"],
  },
  {
    family: "xparse",
    provider: {
      id: "package:xparse",
      kind: "package",
      name: "xparse",
      versionCondition: {
        kind: "unknown",
      },
    },
    path: "packages/unified-latex-ctan/package/xparse/provides.ts",
    sha256: "63a41c342b6b8e0a9d97e231d11cceeddf026ead52798a9fc1245a44329f0879",
    tables: ["macros", "environments"],
  },
];
export const SOURCE_INPUTS: readonly SourceInput[] = [
  {
    path: "packages/unified-latex-ctan/package/latex2e/provides.ts",
    sha256: "bc90ee4ee6d23307fcf5ac98f97e71cc9d4ee9a256cabd781e12a12407b113ad",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/amsart/provides.ts",
    sha256: "c520c5a371a6c71626f6fda639094e2fb7b928ec10db623896c2ede8073825f8",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/beamer/provides.ts",
    sha256: "34273a87cfa9677fe64cfeeb3a0b2404c1d8f91eaca16c09acee1266cc06219f",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/cleveref/provides.ts",
    sha256: "a2a29196ddf402162968d84065c92187133a36936e4440080a695bb829ded956",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/exam/provides.ts",
    sha256: "c052d8defbfe78ec6ae5b2ee6bb08cb34ad41a60a628f2463fba4e4d43843ae8",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/geometry/provides.ts",
    sha256: "8710bf9959009bd424c9acea7ec0879dd0cca4b8505033d31ed6ee652f209e5d",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/hyperref/provides.ts",
    sha256: "bdd09ed8d12f837527130ca3df0b924b883281f669f70d9b1b2c24baaa21d22c",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/listings/provides.ts",
    sha256: "d54f4489e9947363545b560cce52390c8f244b14f2a92cf5dabac4365377cacf",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/makeidx/provides.ts",
    sha256: "ba35c1f73d343b4bd5c52f91f45f5a97983913321850c4fc6dc2c824dcf0c1b0",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/mathtools/provides.ts",
    sha256: "582c78be4a6aff984b8fca4b003fefd503ebf8b4f4b8a77ccc81dbe51349c0da",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/minted/provides.ts",
    sha256: "d99b3a816b59042df81070aa54d23b920839feb0ab858cba3c0628d66fc294f6",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/multicol/provides.ts",
    sha256: "481986b3163ac8d4d857717742022ebd6d71f3668f2ad5304d9efe4e4b19d58d",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/nicematrix/provides.ts",
    sha256: "bd3d0a4d813fe18b9e5e7631ff5a7518ea0624643e743b9696c3ace63f1d02c4",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/systeme/provides.ts",
    sha256: "fb46a6140b4dacef4190a5f7865b4748e1d545925c9dee5e3f5d53a086dc3fb2",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/tabularx/provides.ts",
    sha256: "566d5dad57dc8e23eb1234c35775258e6771c34c702b1b937ec4d598be349574",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/tikz/provides.ts",
    sha256: "b629d91ada14c1419a0b0648c86a22f070b6bcb50673a55bf25f7822ae6a7fa9",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/xcolor/provides.ts",
    sha256: "7c345645c766511238f8c42eebc5ee23ffb66e5abcdd346487d781392db6488f",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package/xparse/provides.ts",
    sha256: "63a41c342b6b8e0a9d97e231d11cceeddf026ead52798a9fc1245a44329f0879",
    license: "MIT",
  },
  {
    path: "LICENSE",
    sha256: "8945d330ddb16e332fedabf1dfe1ab5c7b371a6c0864ccc0c8663281685fae0b",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/package.json",
    sha256: "384607da46ed95857d966c76e4f7b090059e5750270ab26a80a51ce3bcaf309c",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-ctan/index.ts",
    sha256: "e8027475ab5af0ca1a29eaeeef9311cc73957512bc61c980e1ff0a7ed736e1e5",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-types/libs/info-specs.ts",
    sha256: "fd2771d451177bae7a8a07bd09556448af475efc0d718d793a9e7c3aa36d95cd",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-util-pegjs/grammars/xparse-argspec.pegjs",
    sha256: "84a51e3afc7c3ff0884ca588377153d740fd16a517e327d56b51a31a32ad85c8",
    license: "MIT",
  },
  {
    path: "packages/unified-latex-util-argspec/tests/argspec-parser.test.ts",
    sha256: "07afac815fbdee7f75eb646ab3827a61dd3fe790f350874b88704b1863155a96",
    license: "MIT",
  },
];
