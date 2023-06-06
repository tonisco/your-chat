/** @type {import('eslint').Linter.Config} */

module.exports = {
  extends: ["next/core-web-vitals"],
  plugins: ["simple-import-sort", "prettier"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // `react` first, `next` second, then packages starting with a character
              ["^react$", "^next", "^[a-z]"],
              // Packages starting with `@`
              ["^@"],
              // Packages starting with `~`
              ["^~"],
              // Imports starting with `../`
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Imports starting with `./`
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports
              ["^.+\\.s?css$"],
              // Side effect imports
              ["^\\u0000"],
            ],
          },
        ],
      },
    },
  ],
  rules: {
    "import/prefer-default-export": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  ignorePatterns: [".eslintrc.js", "node_modules"],
}
