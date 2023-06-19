import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

import Details from "./Details"
import Home from "./Home"
import { ChatNavigatorScreen } from "../../types/screen"

const Navigator = createNativeStackNavigator<ChatNavigatorScreen>()

const ChatNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator.Navigator screenOptions={{ animation: "slide_from_right" }}>
        <Navigator.Screen name="Home" component={Home} />
        <Navigator.Screen name="Details" component={Details} />
      </Navigator.Navigator>
    </NavigationContainer>
  )
}

export default ChatNavigator
