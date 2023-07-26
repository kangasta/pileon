module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:svelte/recommended"],
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
    "svelte/valid-compile": "warn",
  },
};
