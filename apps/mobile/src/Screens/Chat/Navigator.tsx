import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ChatNavigatorScreen } from "../../types/screen"
import Home from "./Home"
import Details from "./Details"

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
