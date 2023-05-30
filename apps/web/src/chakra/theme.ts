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
      liteGreen: "#edf7f3",
      green: "#28c073",
      darkGreen: "#35c579",
      white: "#fdfdfd",
      darkGray: "#343244",
      liteGray: "#3a374c",
      red: "#ca4152",
    },
  },
})

export default theme
