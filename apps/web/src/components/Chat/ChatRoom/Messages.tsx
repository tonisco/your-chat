import React from "react"
import { Session } from "next-auth"
import { Message as MessageType } from "queries/src/types"

import { Stack, useColorModeValue } from "@chakra-ui/react"

import Message from "./Message"
import MessageLoading from "./MessageLoading"

type Props = {
  messages: MessageType[] | undefined
  session: Session | null
  loading: Boolean
}

const Messages = ({ messages, session, loading }: Props) => {
  const scrollbarColor = useColorModeValue(
    "#EDF2F7",
    "rgba(255, 255, 255, 0.08)",
  )

  const mouseEvents = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.type === "mouseenter")
      e.currentTarget.classList.add("scrollbar-visible")
    else if (e.type === "mouseleave")
      e.currentTarget.classList.remove("scrollbar-visible")
  }

  return (
    <Stack
      p={"6"}
      overflow={"auto"}
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
      flex={1}
      gap={4}
      flexDirection={"column-reverse"}
      onMouseEnter={mouseEvents}
      onMouseLeave={mouseEvents}
    >
      {loading &&
        Array.from({ length: 8 }).map((_, i) => (
          <MessageLoading key={i} index={i} />
        ))}

      {messages?.map((message) => (
        <Message message={message} key={message.id} session={session} />
      ))}
    </Stack>
  )
}

export default Messages
