"use client"
import {
  Button,
  Center,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { signIn } from "next-auth/react"
import { Session } from "next-auth"

type Props = {
  session: Session | null
}

const Auth = ({ session }: Props) => {
  const bg = useColorModeValue("gray.100", "brand.darkGray")
  const color = useColorModeValue("brand.darkGray", "brand.white")
  const buttonBg = useColorModeValue("white", "whiteAlpha.400")
  const logo = useColorModeValue("brand.green", "brand.darkGreen")

  return (
    <Center height="100vh" bg={bg}>
      <Stack spacing={6} alignItems={"center"}>
        <Center gap={2}>
          <Text fontSize={"3xl"} display={"flex"} color={color}>
            Welcome to
          </Text>
          <Text fontSize={"3xl"} fontWeight={"semibold"} textColor={logo}>
            Your-Chat
          </Text>
        </Center>
        <Button
          onClick={() => signIn("google")}
          bg={buttonBg}
          textColor={color}
          _hover={{ bg: buttonBg }}
          className="scale"
          shadow={"lg"}
          leftIcon={
            <Image src="/images/google.png" height="20px" alt="google" />
          }
        >
          Continue with Google
        </Button>
      </Stack>
    </Center>
  )
}

export default Auth
