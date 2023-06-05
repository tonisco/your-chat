import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
} from "@apollo/client"
import React from "react"

import { env } from "../Utils/env"

type Props = {
  children: React.ReactNode
}
const client = new ApolloClient({
  uri: env.SERVER_URL,
  cache: new InMemoryCache(),
})

const ApolloProvider = ({ children }: Props) => {
  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
