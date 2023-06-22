import React from "react"
import { Session } from "next-auth"
import { formatRelative } from "date-fns"
import enUS from "date-fns/locale/en-US"
import { Message as MessageType } from "queries/src/types"

import {
  Avatar,
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

import MessageMenu from "./MessageMenu"

type FormProps = {
  body: string
  messageId: string
}

type Props = {
  message: MessageType
  session: Session | null
  editLoading: boolean
  saveNewMessage: (props: FormProps) => Promise<void>
}

const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy",
}

const Message = ({ message, session, editLoading, saveNewMessage }: Props) => {
  const othersBg = useColorModeValue("blackAlpha.200", "whiteAlpha.200")
  const date = useColorModeValue("darkgray", "whiteAlpha.600")
  const userText = useColorModeValue("brand.greenDark", "brand.green")

  const showUsername =
    message.sender.id === session?.user.id ? "you" : message.sender.username

  if (message.type === "bot")
    return (
      <Box
        alignSelf={"center"}
        py="2"
        px="3"
        bgColor={othersBg}
        rounded={"2xl"}
        maxWidth={"65%"}
      >
        <Text
          _firstLetter={{ textTransform: "uppercase" }}
          fontStyle={"italic"}
          fontSize={"sm"}
        >
          {showUsername} {message.body}
        </Text>
      </Box>
    )

  if (message.sender.id !== session?.user.id)
    return (
      <Flex gap={2} alignItems={"end"} maxWidth={"65%"}>
        <Avatar size={"sm"} src={message.sender.image ?? undefined} />
        <Stack gap={1}>
          <Flex gap={2} alignItems={"end"} textTransform={"capitalize"}>
            <Text>{message.sender.username} </Text>

            <Text fontSize={"xs"} color={date}>
              {formatRelative(new Date(message.createdAt), new Date(), {
                locale: {
                  ...enUS,
                  formatRelative: (token) =>
                    formatRelativeLocale[token as keyof typeof formatRelative],
                },
              })}
            </Text>
          </Flex>
          <Box
            alignSelf={"start"}
            py="2"
            px="3"
            bgColor={othersBg}
            rounded={"2xl"}
            fontSize={"sm"}
          >
            <Text>{message.body}</Text>
          </Box>
        </Stack>
      </Flex>
    )

  return (
    <Flex maxWidth={"65%"} alignSelf={"end"} gap="1">
      <Box flex={"1"} py="2" px="3" bgColor={userText} rounded={"2xl"}>
        <Text color={"whitesmoke"} fontSize={"sm"}>
          {message.body}
        </Text>
      </Box>
      <Box alignSelf="center" cursor="pointer">
        <MessageMenu
          loading={editLoading}
          saveNewMessage={saveNewMessage}
          body={message.body}
          messageId={message.id}
        />
      </Box>
    </Flex>
  )
}

export default Message
