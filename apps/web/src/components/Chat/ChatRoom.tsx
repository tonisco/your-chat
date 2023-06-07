"use client"
import { Box, Text } from "@chakra-ui/react"
import { useSearchParams } from "next/navigation"
import React from "react"

const ChatRoom = () => {
  const searchParams = useSearchParams()

  const id = searchParams.get("id")

  return (
    <Box flexGrow={"1"} display={{ base: id ? "flex" : "none", md: "flex" }}>
      <Text>Chat Room</Text>
    </Box>
  )
}

export default ChatRoom
