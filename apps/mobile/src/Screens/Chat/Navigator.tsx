import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useColorModeValue } from "native-base"
import React from "react"

import Details from "./Details"
import Home from "./Home"
import { ChatNavigatorScreen } from "../../types/screen"

const Navigator = createNativeStackNavigator<ChatNavigatorScreen>()

const ChatNavigator = () => {
  const bg = useColorModeValue("#fafafa", "#343244")
  const header = useColorModeValue("black", "white")
  return (
    <NavigationContainer>
      <Navigator.Navigator
        screenOptions={{
          animation: "slide_from_right",
          headerShadowVisible: true,
          headerStyle: { backgroundColor: bg },
          headerTintColor: header,
        }}
      >
        <Navigator.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: "YourChat" }}
        />
        <Navigator.Screen
          name="Details"
          component={Details}
          options={({ route }) => ({
            headerTitle: route.params.members,
          })}
        />
      </Navigator.Navigator>
    </NavigationContainer>
  )
}

export default ChatNavigator
