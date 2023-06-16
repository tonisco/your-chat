"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { messages } from "queries"

import { useQuery } from "@apollo/client"
import { Stack } from "@chakra-ui/react"

import Messages from "./Messages"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"

const ChatRoom = () => {
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  const id = searchParams.get("id")

  const { data, loading } = useQuery(messages, {
    variables: { conversationId: id ?? "" },
    skip: id ? false : true,
    onError(error) {
      toast.error(error.message)
    },
  })

  return (
    <Stack
      p={"4"}
      flexGrow={"1"}
      display={{ base: id ? "flex" : "none", md: "flex" }}
      height={"full"}
      justifyContent={"end"}
      gap={4}
    >
      {data?.messages && (
        <Messages messages={data.messages} session={session} />
      )}
    </Stack>
  )
}

export default ChatRoom
