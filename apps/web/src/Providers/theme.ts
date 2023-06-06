"use client"
import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "dark",
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      bg: "#fafafa",
      bgDark: "#343244",
      liteBg: "#edf7f3",
      liteBgDark: "#3a374c",
      tabGreen: "35c579",
      green: "#28c073",
      greenDark: "#28c073",
      text: "#39374a",
      listText: "#403f48",
      listTextSm: "#85848a",
      textDark: "#fafafa",
      listTextDark: "#edf7f3",
      listTextSmDark: "#9ea6aa",
      red: "#ca4152",
    },
  },
})

export default theme
