import { formatRelative } from "date-fns"
import enUS from "date-fns/locale/en-US"
import {
  Box,
  HStack,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "native-base"
import { Conversation } from "queries/src/types"
import React from "react"

import MembersImages from "./MembersImages"
import { User } from "../../../Providers/AuthProvider"

type Props = {
  conversation: Conversation
  user: User | null
}

const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy",
}

const ConversationItem = ({ conversation, user }: Props) => {
  const { conversationMembers, updatedAt, latestMessage } = conversation
  const readText = useColorModeValue("darkgray", "gray.400")

  const member = conversationMembers.find(
    (member) => member.user.id === user?.id,
  )

  const subText = member?.hasReadlastMessage ? readText : undefined

  const showUsername =
    latestMessage?.type === "bot" &&
    (latestMessage.sender.id === user?.id
      ? "you"
      : latestMessage.sender.username)

  return (
    <HStack space={2} py="3" px="3" rounded="md" alignItems="center">
      <MembersImages conversationMembers={conversationMembers} user={user} />
      <Stack space={1} flex={1}>
        <HStack alignItems="center" space={2}>
          <Text flex="1" fontSize="md" isTruncated textTransform="capitalize">
            {conversationMembers
              .filter((member) => member.user.id !== user?.id)
              .map((member) => member.user.username)
              .join(", ")}
          </Text>
          <VStack justifyContent="space-between" alignItems="flex-end">
            <Text fontSize="sm" color={subText}>
              {formatRelative(new Date(updatedAt), new Date(), {
                locale: {
                  ...enUS,
                  formatRelative: (token) =>
                    formatRelativeLocale[token as keyof typeof formatRelative],
                },
              })}
            </Text>
            {!member?.hasReadlastMessage && (
              <Box w="2" h="2" rounded="full" bgColor="green.500" />
            )}
          </VStack>
        </HStack>
        <HStack>
          <Text textTransform="capitalize" fontSize="sm" color={subText}>
            {showUsername}
          </Text>
          <Text isTruncated fontSize="sm" color={subText}>
            {" "}
            {latestMessage?.body}
          </Text>
        </HStack>
      </Stack>
    </HStack>
  )
}

export default ConversationItem
