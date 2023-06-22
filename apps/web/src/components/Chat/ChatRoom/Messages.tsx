import React from "react"
import { Session } from "next-auth"
import { deleteMessage, editMessage } from "queries"
import { Message as MessageType } from "queries/src/types"
import { toast } from "react-hot-toast"

import { useMutation } from "@apollo/client"
import { Stack, useColorModeValue } from "@chakra-ui/react"

import Message from "./Message"
import MessageLoading from "./MessageLoading"

type Props = {
  messages: MessageType[] | undefined
  session: Session | null
  loading: Boolean
  conversationId: string
}

type FormProps = {
  body: string
  messageId: string
}

const Messages = ({ messages, session, loading, conversationId }: Props) => {
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

  const [edit, { loading: editLoading }] = useMutation(editMessage, {
    onError(err) {
      toast.error(err.message)
    },
    onCompleted() {
      toast.success("Message has been successfully changed")
    },
  })

  const saveNewMessage = async (props: FormProps) => {
    const { body, messageId } = props

    await edit({ variables: { body, conversationId, messageId } })
  }

  const [removeMessage, { loading: deleteLoading }] = useMutation(
    deleteMessage,
    {
      onError(err) {
        toast.error(err.message)
      },
      onCompleted() {
        toast.success("Message has been successfully changed")
      },
    },
  )

  const cleanMessage = async (messageId: string) => {
    await removeMessage({ variables: { conversationId, messageId } })
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
        <Message
          message={message}
          key={message.id}
          session={session}
          saveNewMessage={saveNewMessage}
          editLoading={editLoading}
          deleteLoading={deleteLoading}
          cleanMessage={cleanMessage}
        />
      ))}
    </Stack>
  )
}

export default Messages
