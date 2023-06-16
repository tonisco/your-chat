import { useQuery } from "@apollo/client"
import {
  Stack,
  Toast,
  FlatList,
  useColorModeValue,
  Divider,
  Text,
} from "native-base"
import { conversationCreated, conversations } from "queries"
import React, { useCallback, useEffect } from "react"

import ConversationItem from "./ConversationItem"
import ConversationSkeleton from "./ConversationSkeleton"
import { useAuthContext } from "../../../Providers/AuthProvider"
import { ToastError } from "../../../Utils/Toast"

const ConversationList = () => {
  const { user } = useAuthContext()

  const color = useColorModeValue("light.200", "dark.200")

  const { data, loading, subscribeToMore } = useQuery(conversations, {
    onError(error) {
      Toast.show({
        placement: "top",
        render: () => <ToastError message={error.message} />,
      })
    },
    fetchPolicy: "network-only",
  })

  const subscribe = useCallback(
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

  useEffect(() => {
    subscribe()
  }, [subscribe])

  return (
    <Stack overflowY="auto" mt="2" mb="14">
      {loading && (
        <FlatList
          data={Array.from({ length: 4 })}
          renderItem={() => <ConversationSkeleton />}
          keyExtractor={(_, i) => i.toString()}
          ItemSeparatorComponent={() => <Divider bgColor={color} />}
        />
      )}

      {data?.conversations.length && (
        <FlatList
          data={data.conversations}
          renderItem={({ item }) => (
            <ConversationItem user={user} conversation={item} />
          )}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <Divider bgColor={color} />}
        />
      )}

      {data?.conversations.length === 0 && (
        <Text textAlign="center" mt="4">
          You have no open conversation
        </Text>
      )}
    </Stack>
  )
}

export default ConversationList
