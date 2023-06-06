import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useContext, createContext, useState } from "react"

type Mode = "light" | "dark"

type ModeContext = {
  mode: Mode
  setMode: (mode: Mode) => Promise<void>
  getMode: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ModeContext = createContext<ModeContext>({
  getMode: async () => {},
  mode: "dark",
  setMode: async () => {},
})

type Props = {
  children: React.ReactNode
}

const ModeProvider = ({ children }: Props) => {
  const [mode, changeMode] = useState<Mode>("dark")

  const setMode = async (modeValue: Mode) => {
    await AsyncStorage.setItem("mode", modeValue)
    changeMode(modeValue)
  }

  const getMode = async () => {
    const item = await AsyncStorage.getItem("mode")
    if (item) changeMode(JSON.parse(item))
  }
  return (
    <ModeContext.Provider value={{ getMode, mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export default ModeProvider

export const useMode = () => useContext(ModeContext)
