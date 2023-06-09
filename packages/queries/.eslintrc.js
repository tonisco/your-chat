/** @type {import('eslint').Linter.Config} */

module.exports = {
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["src/**/__generated__/**/*.*"],
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      processor: "@graphql-eslint/graphql",
      plugins: ["prettier"],
      extends: ["plugin:prettier/recommended"],
      rules: {
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
          },
        ],
      },
    },
    {
      files: ["*.graphql"],
      parser: "@graphql-eslint/eslint-plugin",
      parserOptions: {
        schea: "schema.gql",
      },
      plugins: ["@graphql-eslint"],
      rules: {
        "@graphql-eslint/no-anonymous-operations": "error",
      },
    },
  ],
}
