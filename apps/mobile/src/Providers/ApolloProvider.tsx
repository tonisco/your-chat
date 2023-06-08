import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import React from "react"

import { useAuthContext } from "./AuthProvider"
import { env } from "../Utils/env"

type Props = {
  children: React.ReactNode
}

const ApolloProvider = ({ children }: Props) => {
  const { user, logoutUser } = useAuthContext()

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        if (message === "Not authorized") logoutUser()
      })
    }
  })

  const httpLink = new HttpLink({
    uri: env.SERVER_URL,
    headers: { authorization: `Bearer ${user?.token ?? ""}` },
  })

  const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  })

  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
