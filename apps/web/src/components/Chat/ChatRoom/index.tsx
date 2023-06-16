"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { messages } from "queries"

import { useQuery } from "@apollo/client"
import { Stack } from "@chakra-ui/react"

import Messages from "./Messages"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import MessageInput from "./MessageInput"

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
      p={"6"}
      flexGrow={"1"}
      display={id ? "flex" : "none"}
      height={"full"}
      justifyContent={"end"}
      gap={8}
    >
      {data?.messages && (
        <Messages messages={data.messages} session={session} />
      )}
      <MessageInput conversationId={id ?? ""} />
    </Stack>
  )
}

export default ChatRoom
