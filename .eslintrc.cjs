module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended"
  ],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true
    }
  },
  plugins: [
    "@typescript-eslint"
  ],
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  rules: {
    'no-console': 'error',
    'no-undef': 'off',
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_$"
      }
    ],
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc"
        },
        "newlines-between": "always"
      }
    ]
  },
};
