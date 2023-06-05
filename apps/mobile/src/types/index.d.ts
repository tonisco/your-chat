import { CustomThemeType } from "../Providers/NativeBaseProvider"

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
