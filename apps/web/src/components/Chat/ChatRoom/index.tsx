"use client"

import React, { useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  markAsReadCache,
  markConversationAsRead,
  messages,
  messageSent,
} from "queries"
import { toast } from "react-hot-toast"

import { useMutation, useQuery } from "@apollo/client"
import { Stack } from "@chakra-ui/react"

import MessageInput from "./MessageInput"
import MessageMembers from "./MessageMembers"
import Messages from "./Messages"

const ChatRoom = () => {
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  const id = searchParams.get("id")

  const { data, loading, subscribeToMore } = useQuery(messages, {
    variables: { conversationId: id ?? "" },
    skip: id ? false : true,
    fetchPolicy: "network-only",
    onError(error) {
      toast.error(error.message)
    },
  })

  const [mark] = useMutation(markConversationAsRead, {})

  const readMessage = useCallback(
    () =>
      mark({
        variables: { conversationId: id ?? "" },
        update: (cache) => {
          markAsReadCache({
            cache,
            conversationId: id ?? "",
            userId: session?.user.id,
          })
        },
      }),
    [id, mark, session?.user.id],
  )

  const newMessageSub = useCallback(
    () =>
      subscribeToMore({
        document: messageSent,
        variables: { conversationId: id ?? "" },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev
          }

          const { message } = subscriptionData.data.messageSent

          if (message.sender.id !== session?.user.id) {
            readMessage()
          }

          return Object.assign({}, prev, {
            messages: [message, ...prev.messages],
          })
        },
      }),
    [subscribeToMore, id, session?.user.id, readMessage],
  )

  useEffect(() => newMessageSub(), [newMessageSub])

  return (
    <Stack
      flexGrow={"1"}
      display={id ? "flex" : "none"}
      height={"full"}
      justifyContent={"end"}
      gap={4}
    >
      <MessageMembers />

      <Messages
        messages={data?.messages}
        session={session}
        loading={loading}
        conversationId={id ?? ""}
      />

      <MessageInput conversationId={id ?? ""} />
    </Stack>
  )
}

export default ChatRoom
