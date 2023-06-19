import { NavigationProp } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type ChatNavigatorScreen = {
  Home: undefined
  Details: { id: string; members: string }
}

export type HomeNavigator = NavigationProp<ChatNavigatorScreen, "Home">
export type DetailsNavigator = NavigationProp<ChatNavigatorScreen, "Details">
export type DetailsScreenProps = NativeStackScreenProps<
  ChatNavigatorScreen,
  "Details"
>
