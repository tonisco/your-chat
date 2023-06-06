"use client"
import React, { useState } from "react"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"
import { createUsername } from "queries"
import toast from "react-hot-toast"

import { useMutation } from "@apollo/client"
import {
  Button,
  Center,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

type Props = {
  session: Session | null
  // updateSession: () => Promise<Session | null>
}

const Auth = ({ session }: Props) => {
  const [username, setUsername] = useState("")

  // const { update } = useSession()

  const bg = useColorModeValue("gray.bg", "brand.bgDark")
  const color = useColorModeValue("brand.text", "brand.textDark")
  const buttonBg = useColorModeValue("white", "whiteAlpha.400")
  const buttonBg1 = useColorModeValue("gray.900", "whiteAlpha.400")
  const logo = useColorModeValue("brand.green", "brand.greenDark")

  const [create, { loading }] = useMutation(createUsername, {
    onError(error) {
      toast.error(error.message)
    },
    onCompleted(data) {
      toast.success(data.createUsername.message)
      // update()

      // used due to session not updating
      location.reload()
    },
  })

  const click = async () => {
    if (username.length <= 2) return

    return await create({ variables: { username } })
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
          isLoading={loading}
        >
          Create
        </Button>
      </Stack>
    </Center>
  )
}

export default Auth
