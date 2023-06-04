import React from "react"

import NativeBaseProvider from "./NativeBaseProvider"

type Props = {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return <NativeBaseProvider>{children}</NativeBaseProvider>
}

export default Providers
