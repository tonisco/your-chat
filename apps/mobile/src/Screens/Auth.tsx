import {
  Center,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Button,
} from "native-base"
import React from "react"
import { StyleSheet, Image as Img } from "react-native"

const Auth = () => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const color = useColorModeValue("brand.text", "brand.textDark")
  const buttonBg = useColorModeValue("white", "brand.bgDark")
  const logo = useColorModeValue("brand.green", "brand.greenDark")

  return (
    <Center bg={bg} height="full">
      <Stack space={8}>
        <HStack space={2}>
          <Text fontSize={"3xl"} display={"flex"} color={color}>
            Welcome to
          </Text>
          <Text fontSize={"3xl"} fontWeight={"semibold"} color={logo}>
            Your-Chat
          </Text>
        </HStack>
        <Center>
          <Button
            isLoadingText="Logging In"
            // isLoading={true}
            size={"lg"}
            color={"red.500"}
            width={"56"}
            _text={{ color }}
            _spinner={{ color, marginRight: "4" }}
            _pressed={{ backgroundColor: bg, opacity: ".6" }}
            bg={bg}
            shadow="5"
            leftIcon={
              <Img
                alt="google image"
                source={require("../../assets/images/google.png")}
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

export default Auth

const styles = StyleSheet.create({
  googleImage: { height: 25, width: 25, marginRight: 15 },
})
