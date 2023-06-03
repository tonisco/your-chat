import dotenv from "dotenv"
import path from "path"
import * as z from "zod"

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

const variables = z.object({
  CLIENT_SECRET: z.string(),
  CLIENT_ID: z.string(),
  NEXTAUTH_SECRET: z.string(),
  API_URL: z.string(),
})

const getVariables = variables.safeParse(process.env)

if (!getVariables.success) {
  throw Error("error")
}

export const env = getVariables.data
