import {
  NativeBaseProvider as Provider,
  extendTheme,
  ITheme,
} from "native-base"
import React from "react"

import { useMode } from "./ModeProvider"

// TODO: look for fix, mode not using default or previous value

const customTheme: ITheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
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

export type CustomThemeType = typeof customTheme

type Props = {
  children: React.ReactNode
}

const NativeBaseProvider = ({ children }: Props) => {
  const { mode } = useMode()

  console.log(mode)

  const theme: ITheme = {
    ...customTheme,
    config: { ...customTheme.config, initialColorMode: mode },
  }

  return <Provider theme={theme}>{children}</Provider>
}

export default NativeBaseProvider
