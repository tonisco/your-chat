"use client"
import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./theme"
import ThemeToggle from "./ThemeToggle"

type Props = {
  children: React.ReactNode
}

function Provider({ children }: Props) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ThemeToggle />
        {children}
        <ColorModeScript initialColorMode={"light"} />
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Provider
