import React from "react"

import CreateUsername from "./CreateUsername"
import GoogleLogin from "./GoogleLogin"
import { useAuthContext } from "../../Providers/AuthProvider"

const Auth = () => {
  const { user } = useAuthContext()

  if (!user) return <GoogleLogin />

  return <CreateUsername />
}

export default Auth
