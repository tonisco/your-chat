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
  WS_URL: z.string(),
  NODE_ENV: z.string().optional(),
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

let { MOBILE_CLIENT_ID, NODE_ENV, SERVER_URL, WS_URL } = getVariables.data

if (NODE_ENV === "development") {
  if (Constants.manifest?.debuggerHost) {
    const devHost = Constants.manifest.debuggerHost.split(":")[0]

    SERVER_URL = SERVER_URL.split("localhost").join(devHost)

    WS_URL = WS_URL.split("localhost").join(devHost)
  } else {
    console.error(
      "Cannot get the development host, You will have to configure it manually",
    )
    throw new Error("Invalid host url")
  }
}

export { MOBILE_CLIENT_ID, SERVER_URL, WS_URL }
