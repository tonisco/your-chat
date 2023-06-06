import * as SplashScreen from "expo-splash-screen"
import { View } from "native-base"
import { useCallback, useEffect, useState } from "react"

import Providers from "./Providers"
import AuthProvider, { useAuthContext } from "./Providers/AuthProvider"
import ModeProvider from "./Providers/ModeProvider"
import Auth from "./Screens/Auth"
import ToggleTheme from "./Utils/ToggleTheme"

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  const { getUser } = useAuthContext()

  useEffect(() => {
    const getAppReady = async () => {
      await SplashScreen.preventAutoHideAsync()
      await getUser()
    }

    getAppReady()
      .then(() => setAppIsReady(true))
      .catch(() => console.error("Failed to start app"))
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <Providers>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <ToggleTheme />
        <Auth />
      </View>
    </Providers>
  )
}

export default function () {
  return (
    <AuthProvider>
      <ModeProvider>
        <App />
      </ModeProvider>
    </AuthProvider>
  )
}
