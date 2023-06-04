import React from "react"

import PaperProvider from "./PaperProvider"

type Props = {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return <PaperProvider>{children}</PaperProvider>
}

export default Providers
