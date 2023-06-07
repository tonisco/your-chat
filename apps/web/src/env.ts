import dotenv from "dotenv"
import path from "path"
import * as z from "zod"

// dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

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
  CLIENT_SECRET: z.string(),
  CLIENT_ID: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXT_PUBLIC_API_URL: z.string(),
})

const getVariables = variables.safeParse(process.env)

if (!getVariables.success) {
  // eslint-disable-next-line no-console
  console.error(
    "Environment Variables missing:\n",
    ...formatErrors(getVariables.error.format()),
  )
  throw new Error("Invalid Environment Variables")
}

export const env = getVariables.data
