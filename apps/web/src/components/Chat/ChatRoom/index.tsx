"use client"

import React, { useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { markConversationAsRead, messages, messageSent } from "queries"
import { ConversationMembers } from "queries/src/types"
import { toast } from "react-hot-toast"

import { gql, useMutation, useQuery } from "@apollo/client"
import { cloneDeep } from "@apollo/client/utilities"
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
          const currentData: {
            conversationMembers: ConversationMembers[]
          } | null = cache.readFragment({
            id: `Conversation:${id ?? ""}`,
            fragment: gql`
              fragment ConversationMembers on Conversation {
                conversationMembers {
                  user {
                    id
                    username
                  }
                  hasReadlastMessage
                  unreadMessageNumber
                }
              }
            `,
          })

          if (!currentData) return

          const conversationMembers = cloneDeep(currentData.conversationMembers)

          const idx = conversationMembers.findIndex(
            (data) => data.user.id === session?.user.id,
          )

          if (idx === -1) return

          conversationMembers[idx].hasReadlastMessage = true
          conversationMembers[idx].unreadMessageNumber = 0

          cache.writeFragment({
            id: `Conversation:${id ?? ""}`,
            data: { conversationMembers },
            fragment: gql`
              fragment updateMembers on Conversation {
                conversationMembers
              }
            `,
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

          if (
            subscriptionData.data.messageSent.sender.id !== session?.user.id
          ) {
            readMessage()
          }

          return Object.assign({}, prev, {
            messages: [subscriptionData.data.messageSent, ...prev.messages],
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
      gap={8}
    >
      <MessageMembers />
      {data?.messages && (
        <Messages messages={data.messages} session={session} />
      )}
      <MessageInput conversationId={id ?? ""} />
    </Stack>
  )
}

export default ChatRoom
