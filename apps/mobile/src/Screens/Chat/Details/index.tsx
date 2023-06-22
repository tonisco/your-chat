import { useMutation, useQuery } from "@apollo/client"
import { Stack, Toast, useColorModeValue } from "native-base"
import {
  markAsReadCache,
  markConversationAsRead,
  messageSent,
  messages,
} from "queries"
import React, { useCallback, useEffect } from "react"

import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { useAuthContext } from "../../../Providers/AuthProvider"
import { ToastError } from "../../../Utils/Toast"
import { DetailsScreenProps } from "../../../types/screen"

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
          markAsReadCache({ cache, conversationId: id, userId: user?.id })
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

          const { message } = subscriptionData.data.messageSent

          if (message.sender.id !== user?.id) {
            readMessage()
          }

          return Object.assign({}, prev, {
            messages: [message, ...prev.messages],
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
