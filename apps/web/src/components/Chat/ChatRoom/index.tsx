"use client"

import React, { useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { messages, messageSent } from "queries"
import { toast } from "react-hot-toast"

import { useQuery } from "@apollo/client"
import { Stack } from "@chakra-ui/react"

import MessageInput from "./MessageInput"
import Messages from "./Messages"

const ChatRoom = () => {
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  const id = searchParams.get("id")

  const { data, loading, subscribeToMore } = useQuery(messages, {
    variables: { conversationId: id ?? "" },
    skip: id ? false : true,
    onError(error) {
      toast.error(error.message)
    },
  })

  const newMessageSub = useCallback(
    () =>
      subscribeToMore({
        document: messageSent,
        variables: { conversationId: id ?? "" },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev
          }

          return Object.assign({}, prev, {
            messages: [subscriptionData.data.messageSent, ...prev.messages],
          })
        },
      }),
    [subscribeToMore, id],
  )

  useEffect(() => newMessageSub(), [newMessageSub])

  return (
    <Stack
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
