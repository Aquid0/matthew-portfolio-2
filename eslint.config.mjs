import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "import/order": "off", // avoid conflicts
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^\\u0000"], // side effects
            [
              "^node:",
              "^(assert|buffer|child_process|crypto|dns|fs|http|https|net|os|path|stream|timers|tty|url|util|zlib)(/.*)?$",
            ],
            ["^@public(/.*)?$"], // your alias before externals
            ["^react$", "^react-?", "^@?\\w"], // externals
            ["^(@|src)(/.*)?$"], // internal absolute
            ["^\\.\\./", "^\\./"], // relatives
            ["\\.css$"], // styles
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },
];

export default eslintConfig;
