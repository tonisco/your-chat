import { Message as MessageType } from "queries/src/types"
import React from "react"
import Message from "./Message"
import { Stack, useColorModeValue } from "@chakra-ui/react"
import { Session } from "next-auth"

type Props = {
  messages: MessageType[]
  session: Session | null
}

const Messages = ({ messages, session }: Props) => {
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
      {messages.map((message) => (
        <Message message={message} session={session} />
      ))}
    </Stack>
  )
}

export default Messages
