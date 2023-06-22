import React, { useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  addedToConversation,
  conversationCreated,
  conversations,
  conversationUpdated,
  deletedMessage,
  editedMessage,
  messages,
  removeFromConversation,
} from "queries"
import {
  ConversationsQuery,
  ConversationsQueryVariables,
} from "queries/src/types"

import { SubscribeToMoreFunction, useSubscription } from "@apollo/client"
import { cloneDeep } from "@apollo/client/utilities"

type SubToMore = SubscribeToMoreFunction<
  ConversationsQuery,
  ConversationsQueryVariables
>

type Props = {
  children: React.ReactNode
  subscribeToMore: SubToMore
}

const SubscriptionsWrapper = ({ children, subscribeToMore }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get("id")

  const conversationCreatedSub = useCallback(
    () =>
      subscribeToMore({
        document: conversationCreated,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          return Object.assign({}, prev, {
            conversations: [
              subscriptionData.data.conversationCreated,
              ...prev.conversations,
            ],
          })
        },
      }),
    [subscribeToMore],
  )

  useEffect(() => conversationCreatedSub(), [conversationCreatedSub])

  const conversationUpdateSub = useCallback(
    () =>
      subscribeToMore({
        document: conversationUpdated,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const data = subscriptionData.data.conversationUpdated
          const prevData = cloneDeep(prev.conversations)

          const i = prevData.findIndex((item) => item.id === data.id)

          prevData[i] = data

          const sortedData = prevData.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )

          return Object.assign({}, prev, { conversations: sortedData })
        },
      }),
    [subscribeToMore],
  )

  useEffect(() => conversationUpdateSub(), [conversationUpdateSub])

  useSubscription(addedToConversation, {
    onData({ client, data }) {
      if (!data.data?.addedToConversation) return

      const prevCon = client.cache.readQuery({ query: conversations })

      if (!prevCon?.conversations) return

      client.cache.writeQuery({
        data: {
          conversations: [
            data.data.addedToConversation.conversation,
            ...prevCon.conversations,
          ],
        },
        query: conversations,
      })
    },
  })

  useSubscription(removeFromConversation, {
    onData({ client, data }) {
      if (!data.data?.removeFromConversation) return

      const prevCon = client.cache.readQuery({ query: conversations })

      if (!prevCon?.conversations) return

      const { conversationId } = data.data.removeFromConversation

      if (id && id === conversationId) router.replace("/")

      client.cache.writeQuery({
        data: {
          conversations: prevCon.conversations.filter(
            (prev) => prev.id !== conversationId,
          ),
        },
        query: conversations,
      })
    },
  })

  useSubscription(editedMessage, {
    onData({ client, data }) {
      if (!data.data?.editedMessage) return

      const { conversationId, changeMessage } = data.data.editedMessage

      const cachedMessages = client.cache.readQuery({
        query: messages,
        variables: { conversationId },
      })

      if (!cachedMessages) return

      const newMessage = cloneDeep(cachedMessages.messages)

      const index = newMessage.findIndex((mess) => mess.id === changeMessage.id)

      if (index === -1) return

      newMessage[index] = changeMessage

      client.writeQuery({
        data: { messages: newMessage },
        query: messages,
      })
    },
  })

  useSubscription(deletedMessage, {
    onData({ client, data }) {
      if (!data.data?.deletedMessage) return

      const { conversationId, changeMessage } = data.data.deletedMessage

      const cachedMessages = client.cache.readQuery({
        query: messages,
        variables: { conversationId },
      })

      if (!cachedMessages) return

      const newMessage = cloneDeep(cachedMessages.messages)

      const index = newMessage.findIndex((mess) => mess.id === changeMessage.id)

      if (index === -1) return

      newMessage[index] = changeMessage

      client.writeQuery({
        data: { messages: newMessage },
        query: messages,
      })
    },
  })

  return <>{children}</>
}

export default SubscriptionsWrapper
