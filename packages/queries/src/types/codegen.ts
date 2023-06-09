import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  documents: "src/operations/**/*.ts",
  config: { enumsAsTypes: true },
  generates: {
    "src/types/gql/": {
      preset: "client",
      plugins: [],
    },
  },
}

export default config
