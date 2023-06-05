"use client"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"
import ChakraProvider from "./ChakraProvider"

type Props = {
  children: React.ReactNode
}

// TODO: provider file

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
