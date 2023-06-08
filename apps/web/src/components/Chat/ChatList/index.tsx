import React from "react"
import { useSearchParams } from "next/navigation"
import { signOut } from "next-auth/react"

import { Button, Stack, useColorModeValue } from "@chakra-ui/react"

import CreateChat from "./CreateChat"

const ChatList = () => {
  const searchParams = useSearchParams()

  const id = searchParams.get("id")

  const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

  return (
    <Stack
      width={{ base: "full", md: "xs", lg: "md" }}
      display={{ base: id ? "none" : "flex", md: "flex" }}
      bgColor={bg}
      justifyContent={"space-between"}
      height="100vh"
      p={"6"}
    >
      <CreateChat />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </Stack>
  )
}

export default ChatList
