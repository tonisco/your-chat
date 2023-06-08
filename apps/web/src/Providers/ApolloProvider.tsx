"use client"

import { getSession } from "next-auth/react"
import { createClient } from "graphql-ws"

import {
  ApolloClient,
  ApolloLink,
  DocumentNode,
  HttpLink,
  split,
  SuspenseCache,
} from "@apollo/client"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr"

import { env } from "../env"

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
  })

  const wsLink =
    typeof window !== undefined
      ? new GraphQLWsLink(
          createClient({
            url: process.env.NEXT_PUBLIC_WS_URL ?? "",
            connectionParams: { session: getSession() },
          }),
        )
      : null

  // app router fix
  const apolloLink = ApolloLink.from([
    new SSRMultipartLink({ stripDefer: true }),
    httpLink,
  ])

  const linkType = ({ query }: { query: DocumentNode }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  }

  const splitLink =
    typeof window !== "undefined" && wsLink
      ? split(linkType, wsLink, httpLink)
      : apolloLink

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: splitLink,
  })
}

const makeSuspenseCache = () => {
  return new SuspenseCache()
}

const ApolloWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  )
}

export default ApolloWrapper
