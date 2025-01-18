import { FlatCompat } from "@eslint/eslintrc";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),
  {
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "import/order": "off",
      "consistent-return": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-duplicate-imports": ["error", { includeExports: true }],
      "tailwindcss/classnames-order": "off",
    },
    settings: {
      tailwindcss: {
        callees: ["cn"],
      },
    },
  },
];

export default eslintConfig;
