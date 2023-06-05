import { useMutation } from "@apollo/client"
import { makeRedirectUri } from "expo-auth-session"
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"
import {
  Center,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Button,
} from "native-base"
import { loginUser } from "queries"
import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, Image as Img, Alert } from "react-native"

import { useAuthContext } from "../../Providers/AuthProvider"
import { env } from "../../Utils/env"

type GetInfoResponse = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

WebBrowser.maybeCompleteAuthSession()

const GoogleLogin = () => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const color = useColorModeValue("brand.text", "brand.textDark")
  const logo = useColorModeValue("brand.green", "brand.greenDark")

  const { saveUser } = useAuthContext()

  const [userLogin] = useMutation(loginUser, {
    async onCompleted(data) {
      const { id, email, image, name, username, token } = data.loginUser
      await saveUser({
        id,
        token,
        email: email ?? null,
        image: image ?? null,
        name: name ?? null,
        username: username ?? null,
      })
      setLoading(false)
    },
    onError(err) {
      Alert.alert("Login Error", err.message)
      setLoading(false)
    },
  })

  const [loading, setLoading] = useState(false)

  const redirectUri = makeRedirectUri({
    scheme: "com.tonisco.yourchat-mobile",
    path: "/oauth2",
    preferLocalhost: true, // also tried false
  })

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: env.MOBILE_CLIENT_ID,
    redirectUri,
    scopes: ["profile", "email"],
  })

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      getUserInfo(response.authentication.accessToken)
    }
  }, [response])

  const getUserInfo = useCallback(async (token: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const user = (await response.json()) as GetInfoResponse
      const { email, name, picture } = user
      await userLogin({ variables: { email, image: picture, name } })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      Alert.alert("Login Failed", "Failed to fetch user info")
    }
  }, [])

  return (
    <Center bg={bg} height="full">
      <Stack space={8}>
        <HStack space={2}>
          <Text fontSize="3xl" display="flex" color={color}>
            Welcome to
          </Text>
          <Text fontSize="3xl" fontWeight="semibold" color={logo}>
            Your-Chat
          </Text>
        </HStack>
        <Center>
          <Button
            isLoadingText="Logging In"
            disabled={!request}
            onPress={() => {
              promptAsync()
            }}
            isLoading={loading}
            size="lg"
            rounded="lg"
            color="red.500"
            width="56"
            _text={{ color }}
            _spinner={{ color, marginRight: "4" }}
            _pressed={{ backgroundColor: bg, opacity: ".6" }}
            bg={bg}
            shadow="5"
            leftIcon={
              <Img
                alt="google image"
                source={require("../../../assets/images/google.png")}
                style={styles.googleImage}
                resizeMode="contain"
              />
            }
          >
            Continue with Google
          </Button>
        </Center>
      </Stack>
    </Center>
  )
}

export default GoogleLogin

const styles = StyleSheet.create({
  googleImage: { height: 25, width: 25, marginRight: 15 },
})
