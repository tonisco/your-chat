import { useQuery } from "@apollo/client"
import { Stack, Toast, FlatList, useColorModeValue, Divider } from "native-base"
import { conversationCreated, conversations } from "queries"
import { Query, Subscription } from "queries/src/types"
import React, { useCallback, useEffect } from "react"

import ConversationItem from "./ConversationItem"
import ConversationSkeleton from "./ConversationSkeleton"
import { useAuthContext } from "../../../Providers/AuthProvider"
import { ToastError } from "../../../Utils/Toast"

const ConversationList = () => {
  const { user } = useAuthContext()

  const color = useColorModeValue("light.200", "dark.200")

  const { data, loading, subscribeToMore } = useQuery<Query>(conversations, {
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
      subscribeToMore<Subscription>({
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
      {loading && <ConversationSkeleton />}
      {data?.conversations && (
        <FlatList
          data={data.conversations}
          renderItem={({ item }) => (
            <ConversationItem user={user} conversation={item} />
          )}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <Divider bgColor={color} />}
        />
      )}
    </Stack>
  )
}

export default ConversationList
