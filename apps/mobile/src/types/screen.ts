import { StackNavigationProp } from "@react-navigation/stack"

export type ChatNavigatorScreen = {
  Home: undefined
  Details: { id: string }
}

export type HomeNavigator = StackNavigationProp<ChatNavigatorScreen, "Home">
export type DetailsNavigator = StackNavigationProp<
  ChatNavigatorScreen,
  "Details"
>
