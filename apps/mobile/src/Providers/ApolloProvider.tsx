import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
  HttpLink,
  from,
  split,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws"
import React from "react"

import { useAuthContext } from "./AuthProvider"
import { SERVER_URL, WS_URL } from "../Utils/env"

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
    uri: SERVER_URL,
    headers: { authorization: `Bearer ${user?.token ?? ""}` },
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: WS_URL,
      connectionParams: {
        session: { expires: "", user },
      },
    }),
  )

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      )
    },
    wsLink,
    httpLink,
  )

  const client = new ApolloClient({
    link: from([errorLink, splitLink]),
    cache: new InMemoryCache(),
  })

  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
