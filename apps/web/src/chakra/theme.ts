"use client"
import { ThemeConfig, extendTheme } from "@chakra-ui/react"

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "system",
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      white: "#fdfdfd",
    },
  },
})

export default theme
