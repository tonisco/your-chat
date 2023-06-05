import * as dotenv from "dotenv"
import { ConfigContext, ExpoConfig } from "expo/config"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../../.env") })

const defineConfig = (_ctx: ConfigContext): ExpoConfig => ({
  name: "YourChat Mobile",
  slug: "yourchat-mobile",
  version: "1.0.0",
  scheme: "com.tonisco.yourchat-mobile",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  // updates: {
  //   fallbackToCacheTimeout: 0,
  //   url: `https://u.expo.dev/${process.env.FOOD_PROJECT_ID as string}`,
  // },
  // runtimeVersion: {
  //   policy: "sdkVersion",
  // },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.tonisco.yourchat-mobile",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: process.env.MOBILE_PROJECT_ID,
    },
    MOBILE_CLIENT_ID: process.env.MOBILE_CLIENT_ID,
    SERVER_URL: process.env.SERVER_URL,
  },
})

export default defineConfig
