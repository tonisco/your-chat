import { FlatList, VStack } from "native-base"
import { Message as MessageType } from "queries/src/types"
import React from "react"

import Message from "./Message"
import MessageLoading from "./MessageLoading"
import { User } from "../../../Providers/AuthProvider"

type Props = {
  messages: MessageType[] | undefined
  user: User | null
  loading: boolean
}

const Messages = ({ messages, user, loading }: Props) => {
  return (
    <VStack flex={1} space={4}>
      {loading && (
        <FlatList
          keyExtractor={(_, i) => i.toString()}
          data={Array.from({ length: 8 })}
          renderItem={({ index }) => <MessageLoading index={index} />}
          inverted
          contentContainerStyle={{ gap: 20 }}
        />
      )}

      {messages && (
        <FlatList
          data={messages}
          inverted
          renderItem={({ item }) => <Message message={item} user={user} />}
          contentContainerStyle={{ gap: 20, paddingBottom: 60 }}
          padding="6"
        />
      )}
    </VStack>
  )
}

export default Messages
