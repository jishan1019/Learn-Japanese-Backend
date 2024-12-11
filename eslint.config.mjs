import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },

  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-console": "warn",
      "prefer-const": "error",
    },
    ignores: ["**/node_modules", ".dist/"],
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
