import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
} from "@apollo/client"
import React from "react"

import { useAuthContext } from "./AuthProvider"
import { env } from "../Utils/env"

type Props = {
  children: React.ReactNode
}

const ApolloProvider = ({ children }: Props) => {
  const { user } = useAuthContext()

  const client = new ApolloClient({
    uri: env.SERVER_URL,
    cache: new InMemoryCache(),
    headers: { authorization: `Bearer ${user?.token ?? ""}` },
  })

  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
