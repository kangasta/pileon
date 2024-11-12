import js from "@eslint/js";
import import_ from "eslint-plugin-import";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import ts from "typescript-eslint";

export default [
  { ignores: ["dist/"] },
  js.configs.recommended,
  import_.flatConfigs.recommended,
  import_.flatConfigs.typescript,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".svelte"],
      },
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "no-console": "error",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_$",
        },
      ],
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "always",
        },
      ],
    },
  },
];
