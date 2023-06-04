import React, { createContext, useContext, useState } from "react"
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider as Provider,
} from "react-native-paper"

export type ThemeType = "dark" | "light"

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    bg: "#fafafa",
    liteBg: "#edf7f3",
    green: "#28c073",
    tabGreen: "35c579",
    red: "#ca4152",
    text: "#39374a",
    listText: "#403f48",
    listTextSm: "#85848a",
  },
}

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    bg: "#343244",
    liteBg: "#3a374c",
    green: "#35c579",
    tabGreen: "35c579",
    red: "#ca4152",
    text: "#fafafa",
    listText: "#edf7f3",
    listTextSm: "#9ea6aa",
  },
}

export type Theme = typeof lightTheme | typeof darkTheme

export interface ThemeContextValue {
  theme: Theme
  themeType: ThemeType
  toggleThemeType: () => void
}
const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  themeType: "light",
  toggleThemeType: () => {},
})

type Props = {
  children: React.ReactNode
}

const PaperProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(lightTheme)
  const [themeType, setThemeType] = useState<ThemeType>("light")

  const toggleThemeType = () => {
    if (themeType === "light") {
      setThemeType("dark")
      setTheme(darkTheme)
    } else {
      setThemeType("light")
      setTheme(lightTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleThemeType }}>
      <Provider theme={theme}>{children}</Provider>
    </ThemeContext.Provider>
  )
}

export default PaperProvider

export const usePaperTheme = () => {
  const { theme, themeType, toggleThemeType } = useContext(ThemeContext)
  return { theme, themeType, toggleThemeType }
}
