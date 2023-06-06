import * as SplashScreen from "expo-splash-screen"
import { View } from "native-base"
import { useCallback, useEffect, useState } from "react"

import Providers from "./Providers"
import AuthProvider, { useAuthContext } from "./Providers/AuthProvider"
import ModeProvider from "./Providers/ModeProvider"
import Auth from "./Screens/Auth"
import ChatNavigator from "./Screens/Chat/Navigator"
import ToggleTheme from "./Utils/ToggleTheme"

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  const { getUser, user } = useAuthContext()

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

  console.log(JSON.stringify(user))

  return (
    <Providers>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <ToggleTheme />
        {user?.username ? <ChatNavigator /> : <Auth />}
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
