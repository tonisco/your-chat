import React from "react"
import { useSearchParams } from "next/navigation"
import { signOut } from "next-auth/react"

import { Box, Button, Stack, useColorModeValue } from "@chakra-ui/react"

import ConversationList from "./ConversationList"
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
      height="100vh"
      p={"6"}
      position={"relative"}
      flexShrink={0}
    >
      <CreateChat />
      <ConversationList />
      <Box position={"absolute"} bottom="0" p={"6"} w="full" left={"0"}>
        <Button onClick={() => signOut()} w={"100%"}>
          Sign Out
        </Button>
      </Box>
    </Stack>
  )
}

export default ChatList
