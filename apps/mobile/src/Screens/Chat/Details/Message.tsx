import { formatRelative } from "date-fns"
import enUS from "date-fns/locale/en-US"
import {
  Avatar,
  Box,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "native-base"
import { Message as MessageType } from "queries/src/types"
import React from "react"

import MessageMenu from "./MessageMenu"
import { User } from "../../../Providers/AuthProvider"

type FormProps = {
  body: string
  messageId: string
}

type Props = {
  message: MessageType
  user: User | null
  editLoading: boolean
  saveNewMessage: (props: FormProps) => Promise<void>
  cleanMessage: (messageId: string) => Promise<void>
  deleteLoading: boolean
}

const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy",
}

const Message = ({
  message,
  user,
  cleanMessage,
  deleteLoading,
  editLoading,
  saveNewMessage,
}: Props) => {
  const othersBg = useColorModeValue(
    "rgba(0, 0, 0, 0.08)",
    "rgba(255, 255, 255, 0.08)",
  )
  const date = useColorModeValue("darkgray", "lightText")
  const mineBg = useColorModeValue("brand.greenDark", "brand.green")

  const capitalize = (word: string | undefined) => {
    if (word && word.length > 1) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }

    return word
  }

  const username = capitalize(message.sender.username as string | undefined)

  const showUsername = message.sender.id === user?.id ? "You" : username

  if (message.type === "bot")
    return (
      <Box
        alignSelf="center"
        py="2"
        px="3"
        bgColor="warmGray.600"
        rounded="2xl"
        maxWidth="70%"
      >
        <Text fontStyle="italic" fontSize="sm">
          {showUsername} {message.body}
        </Text>
      </Box>
    )

  if (message.sender.id !== user?.id)
    return (
      <HStack space={3} maxWidth="70%" flex={1} alignItems="flex-end">
        <Avatar size="sm" source={{ uri: message.sender.image ?? undefined }} />
        <VStack space={2} alignItems="flex-start">
          <HStack space={2} alignItems="flex-end" textTransform="capitalize">
            <Text color={date}>{username} </Text>

            <Text fontSize="xs" color={date}>
              {formatRelative(new Date(message.createdAt), new Date(), {
                locale: {
                  ...enUS,
                  formatRelative: (token) =>
                    formatRelativeLocale[token as keyof typeof formatRelative],
                },
              })}
            </Text>
          </HStack>
          <Box py="2" px="3" bgColor={othersBg} rounded="2xl">
            <Text>{message.body}</Text>
          </Box>
        </VStack>
      </HStack>
    )

  return (
    <HStack alignSelf="flex-end" alignItems="center" maxWidth="70%" space="1">
      <Box py="2" px="3" bgColor={mineBg} rounded="2xl">
        <Text color="#f5f5f5" fontSize="sm">
          {message.body}
        </Text>
      </Box>
      <MessageMenu
        currMessage={message.body}
        saveNewMessage={saveNewMessage}
        editLoading={editLoading}
        deleteLoading={deleteLoading}
        cleanMessage={cleanMessage}
        messageId={message.id}
      />
    </HStack>
  )
}

export default Message
