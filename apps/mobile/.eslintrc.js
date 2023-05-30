/** @type {import('eslint').Linter.Config} */

module.exports = {
  extends: ["universe/native", "universe/shared/typescript-analysis"],
  parser: "@typescript-eslint/parser", // should be already existing
  parserOptions: {
    // add this object
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  ignorePatterns: [".eslint*"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
}
