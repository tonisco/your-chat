import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  config: { enumsAsTypes: true },
  generates: {
    "src/types/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
}

export default config
