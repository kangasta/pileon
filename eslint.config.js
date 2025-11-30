import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import import_ from "eslint-plugin-import";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import { configs as tsConfigs, parser as tsParser} from "typescript-eslint";

export default defineConfig([
  { ignores: ["dist/"] },
  js.configs.recommended,
  import_.flatConfigs.recommended,
  import_.flatConfigs.typescript,
  ...tsConfigs.recommended,
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
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
]);
