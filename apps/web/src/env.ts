import * as z from "zod"

const variables = z.object({
  CLIENT_SECRET: z.string(),
  CLIENT_ID: z.string(),
  NEXTAUTH_SECRET: z.string(),
})

const getVariables = variables.safeParse(process.env)

if (!getVariables.success) {
  throw Error("error")
}

export const env = getVariables.data
