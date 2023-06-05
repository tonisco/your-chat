import React from "react"

import ApolloProvider from "./ApolloProvider"
import NativeBaseProvider from "./NativeBaseProvider"

type Props = {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <ApolloProvider>
      <NativeBaseProvider>{children}</NativeBaseProvider>
    </ApolloProvider>
  )
}

export default Providers
