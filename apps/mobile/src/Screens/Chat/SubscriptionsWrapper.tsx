import { ApolloCache, useSubscription } from "@apollo/client"
import { cloneDeep } from "@apollo/client/utilities"
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import {
  addedToConversation,
  conversationCreated,
  conversationUpdated,
  conversations,
  deletedMessage,
  editedMessage,
  messages,
  removeFromConversation,
} from "queries"
import { Conversation } from "queries/src/types"
import React from "react"

import { ChatNavigatorScreen } from "../../types/screen"

type Props = {
  children: React.ReactNode
}

const SubscriptionsWrapper = ({ children }: Props) => {
  const { name, params } = useRoute<RouteProp<ChatNavigatorScreen>>()
  const { navigate } = useNavigation<NavigationProp<ChatNavigatorScreen>>()

  const newConversation = (
    conversation: Conversation,
    cache: ApolloCache<any>,
  ) => {
    const prevCon = cache.readQuery({ query: conversations })

    if (!prevCon?.conversations) return

    cache.writeQuery({
      data: {
        conversations: [conversation, ...prevCon.conversations],
      },
      query: conversations,
    })
  }

  useSubscription(conversationCreated, {
    onData({ client, data }) {
      if (!data.data?.conversationCreated) return

      newConversation(data.data.conversationCreated, client.cache)
    },
  })

  useSubscription(conversationUpdated, {
    onData({ client, data }) {
      if (!data.data?.conversationUpdated) return

      const cachedConversations = client.cache.readQuery({
        query: conversations,
      })

      if (!cachedConversations?.conversations) return

      const newConversation = cloneDeep(cachedConversations.conversations)

      const updatedConversation = data.data.conversationUpdated

      const index = newConversation.findIndex(
        (mess) => mess.id === updatedConversation.id,
      )

      if (index === -1) return

      newConversation[index] = updatedConversation

      client.writeQuery({
        data: { conversations: newConversation },
        query: conversations,
      })
    },
  })

  useSubscription(addedToConversation, {
    onData({ client, data }) {
      if (!data.data?.addedToConversation) return

      newConversation(data.data.addedToConversation.conversation, client.cache)
    },
  })

  useSubscription(removeFromConversation, {
    onData({ client, data }) {
      if (!data.data?.removeFromConversation) return

      const { conversationId } = data.data.removeFromConversation

      const cachedConversations = client.cache.readQuery({
        query: conversations,
      })

      if (!cachedConversations) return

      const clonedConversations = cloneDeep(cachedConversations.conversations)

      const newConversations = clonedConversations.filter(
        (convo) => convo.id !== conversationId,
      )

      client.writeQuery({
        data: { conversations: newConversations },
        query: conversations,
      })

      if (name === "Details" && params?.id === conversationId) {
        navigate("Home")
      }
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
