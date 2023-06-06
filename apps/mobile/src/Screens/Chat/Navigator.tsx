import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"

import Details from "./Details"
import Home from "./Home"
import { ChatNavigatorScreen } from "../../types/screen"

const Navigator = createStackNavigator<ChatNavigatorScreen>()

const ChatNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator.Navigator>
        <Navigator.Screen name="Home" component={Home} />
        <Navigator.Screen name="Details" component={Details} />
      </Navigator.Navigator>
    </NavigationContainer>
  )
}

export default ChatNavigator
