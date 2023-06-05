import * as z from "zod"

const variables = z.object({
  CLIENT_URL: z.string(),
  PORT: z.string(),
  JWT_SECRET: z.string(),
})

const getVariables = variables.safeParse(process.env)

if (!getVariables.success) {
  throw Error("error")
}

export const env = getVariables.data
