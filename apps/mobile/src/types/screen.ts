import { NavigationProp } from "@react-navigation/native"

export type ChatNavigatorScreen = {
  Home: undefined
  Details: { id: string; members: string }
}

export type HomeNavigator = NavigationProp<ChatNavigatorScreen, "Home">
export type DetailsNavigator = NavigationProp<ChatNavigatorScreen, "Details">
