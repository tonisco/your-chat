import React, { useCallback, useEffect } from "react"
import { useSession } from "next-auth/react"
import { conversationCreated, conversations } from "queries"
import { Query, Subscription } from "queries/src/types"
import { toast } from "react-hot-toast"

import { useQuery } from "@apollo/client"
import { Stack, Text, useColorModeValue } from "@chakra-ui/react"

import ConversationItem from "./ConversationItem"
import ConversationSkeleton from "./ConversationSkeleton"

const ConversationList = () => {
  const { data: session } = useSession()
  const scrollbarColor = useColorModeValue(
    "#EDF2F7",
    "rgba(255, 255, 255, 0.08)",
  )

  const { data, loading, subscribeToMore } = useQuery<Query>(conversations, {
    onError(error) {
      toast.error(error.message)
    },
    fetchPolicy: "network-only",
  })

  const mouseEvents = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.type === "mouseenter")
      e.currentTarget.classList.add("scrollbar-visible")
    else if (e.type === "mouseleave")
      e.currentTarget.classList.remove("scrollbar-visible")
  }

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
    <Stack
      overflowY={"auto"}
      mt={"2"}
      mb={"14"}
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: scrollbarColor,
          borderRadius: "100px",
          visibility: "hidden",
        },
      }}
      onMouseEnter={mouseEvents}
      onMouseLeave={mouseEvents}
    >
      {loading &&
        Array.from({ length: 4 }, (_, i) => (
          <ConversationSkeleton key={i} length={4} index={i} />
        ))}

      {data?.conversations.length &&
        data.conversations.map((conversation, i) => (
          <ConversationItem
            key={conversation.id}
            session={session}
            conversation={conversation}
            index={i}
            length={data.conversations.length}
          />
        ))}

      {data?.conversations.length === 0 && (
        <Text textAlign={"center"}>You have no open conversations</Text>
      )}
    </Stack>
  )
}

export default ConversationList
