import React from "react"
import { useSession } from "next-auth/react"
import { conversations } from "queries"
import { Query } from "queries/src/types"
import { toast } from "react-hot-toast"

import { useQuery } from "@apollo/client"
import { Stack, useColorModeValue } from "@chakra-ui/react"

import ConversationItem from "./ConversationItem"
import ConversationSkeleton from "./ConversationSkeleton"

const ConversationList = () => {
  const { data: session } = useSession()
  const scrollbarColor = useColorModeValue(
    "#EDF2F7",
    "rgba(255, 255, 255, 0.08)",
  )

  const { data, loading } = useQuery<Query>(conversations, {
    onError(error) {
      toast.error(error.message)
    },
  })

  const mouseEvents = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.type === "mouseenter")
      e.currentTarget.classList.add("scrollbar-visible")
    else if (e.type === "mouseleave")
      e.currentTarget.classList.remove("scrollbar-visible")
  }

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
      bgColor={""}
      onMouseEnter={mouseEvents}
      onMouseLeave={mouseEvents}
    >
      {loading && <ConversationSkeleton />}
      {data &&
        data.conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            session={session}
            conversation={conversation}
          />
        ))}
    </Stack>
  )
}

export default ConversationList
