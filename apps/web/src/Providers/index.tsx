"use client"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

import ChakraProvider from "./ChakraProvider"

type Props = {
  children: React.ReactNode
}

function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <Toaster />
        {children}
      </ChakraProvider>
    </SessionProvider>
  )
}

export default Provider
