"use client"
import { Button, Center, Stack, Text, Image } from "@chakra-ui/react"
import React from "react"

type Props = {}

const Auth = ({}: Props) => {
  return (
    <Center height="100vh" bg="brand.white">
      <Stack spacing={6} alignItems={"center"}>
        <Center gap={2}>
          <Text fontSize={"3xl"} display={"flex"}>
            Welcome to
          </Text>
          <Text
            fontSize={"3xl"}
            fontWeight={"semibold"}
            textColor={"green.500"}
          >
            Your-Chat
          </Text>
        </Center>
        <Button
          bg={"white"}
          textColor={"gray.900"}
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
