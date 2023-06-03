"use client"
import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Toaster } from "react-hot-toast"
import theme from "./theme"
import ThemeToggle from "./ThemeToggle"
import { SessionProvider } from "next-auth/react"

type Props = {
  children: React.ReactNode
}

// TODO: provider file

function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <ThemeToggle />
          <Toaster />
          {children}
          <ColorModeScript
            initialColorMode={theme.config.initialColorMode}
            type="localStorage"
          />
        </ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

export default Provider
