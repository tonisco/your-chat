import { Stack, useColorModeValue } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import React from "react"
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
      p={"6"}
    >
      <CreateChat />
    </Stack>
  )
}

export default ChatList
