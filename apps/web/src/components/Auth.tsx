"use client"
import {
  Button,
  Center,
  Stack,
  Text,
  Image,
  useColorModeValue,
  Input,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { Session } from "next-auth"

type Props = {
  session: Session | null
}

const Auth = ({ session }: Props) => {
  const [username, setUsername] = useState("")

  const bg = useColorModeValue("gray.600", "brand.darkGray")
  const color = useColorModeValue("brand.darkGray", "brand.white")
  const buttonBg = useColorModeValue("white", "whiteAlpha.400")
  const buttonBg1 = useColorModeValue("gray.900", "whiteAlpha.400")
  const logo = useColorModeValue("brand.green", "brand.darkGreen")
  console.log(session)

  const click = () => {
    console.log("clicked")
  }

  if (!session)
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
            bg={buttonBg1}
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

  return (
    <Center height="100vh">
      <Stack spacing={6}>
        <Text fontSize={"3xl"} textColor={color}>
          Create a Username
        </Text>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
        <Button
          bg={buttonBg}
          textColor={color}
          _hover={{ bg: buttonBg }}
          className="scale"
          shadow={"lg"}
          isDisabled={username.length <= 2}
          onClick={click}
        >
          Create
        </Button>
      </Stack>
    </Center>
  )
}

export default Auth
