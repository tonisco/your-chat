import Constants from "expo-constants"
import * as z from "zod"

export const formatErrors = (
  errors: z.ZodFormattedError<Map<string, string>, string>,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        // eslint-disable-next-line no-underscore-dangle
        return `${name}: ${value._errors.join(", ")}\n`
      // eslint-disable-next-line no-useless-return, consistent-return
      return
    })
    .filter(Boolean)

const variables = z.object({
  MOBILE_CLIENT_ID: z.string(),
  SERVER_URL: z.string(),
})

const extra = Constants.manifest?.extra

const getVariables = variables.safeParse(extra)

if (!getVariables.success) {
  // eslint-disable-next-line no-console
  console.error(
    "Environment Variables missing:\n",
    ...formatErrors(getVariables.error.format()),
  )
  throw new Error("Invalid Environment Variables")
}

export const env = getVariables.data
