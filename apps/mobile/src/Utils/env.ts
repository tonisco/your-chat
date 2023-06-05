import Constants from "expo-constants"
import * as z from "zod"

const variables = z.object({
  MOBILE_CLIENT_ID: z.string(),
  API_URL: z.string(),
})

const extra = Constants.manifest?.extra

const getVariables = variables.safeParse(extra)

if (!getVariables.success) {
  throw new Error("Invalid variables")
}

export const env = getVariables.data
