import { gql, useMutation, useQuery } from "@apollo/client"
import { Stack, Toast, useColorModeValue } from "native-base"
import { markConversationAsRead, messageSent, messages } from "queries"
import React, { useCallback, useEffect } from "react"

import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { useAuthContext } from "../../../Providers/AuthProvider"
import { ToastError } from "../../../Utils/Toast"
import { DetailsScreenProps } from "../../../types/screen"
import { ConversationMembers } from "queries/src/types"
import { cloneDeep } from "@apollo/client/utilities"

type Props = DetailsScreenProps

const Details = ({ route }: Props) => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")

  const { id } = route.params
  const { user } = useAuthContext()

  const [mark] = useMutation(markConversationAsRead, {})

  const readMessage = useCallback(
    () =>
      mark({
        variables: { conversationId: id },
        update: (cache) => {
          const currentData: {
            conversationMembers: ConversationMembers[]
          } | null = cache.readFragment({
            id: `Conversation:${id}`,
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
            (data) => data.user.id === user?.id,
          )

          if (idx === -1) return

          conversationMembers[idx].hasReadlastMessage = true
          conversationMembers[idx].unreadMessageNumber = 0

          cache.writeFragment({
            id: `Conversation:${id}`,
            data: { conversationMembers },
            fragment: gql`
              fragment updateMembers on Conversation {
                conversationMembers
              }
            `,
          })
        },
      }),
    [id, mark, user?.id],
  )

  const { data, loading, subscribeToMore } = useQuery(messages, {
    variables: { conversationId: id },
    fetchPolicy: "network-only",
    onError(error) {
      Toast.show({
        render: () => <ToastError message={error.message} />,
        placement: "top",
      })
    },
  })

  const newMessageSub = useCallback(
    () =>
      subscribeToMore({
        document: messageSent,
        variables: { conversationId: id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev
          }

          if (subscriptionData.data.messageSent.sender.id !== user?.id) {
            readMessage()
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
    <Stack bgColor={bg} h="full">
      <Messages loading={loading} messages={data?.messages} user={user} />
      <MessageInput conversationId={id} />
    </Stack>
  )
}

export default Details
