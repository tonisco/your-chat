import { useNavigation, NavigationProp } from "@react-navigation/native"
import { formatRelative } from "date-fns"
import enUS from "date-fns/locale/en-US"
import {
  Box,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "native-base"
import { Conversation } from "queries/src/types"
import React from "react"

import MembersImages from "./MembersImages"
import { User } from "../../../Providers/AuthProvider"
import { ChatNavigatorScreen } from "../../../types/screen"

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
  const unreadNumber = useColorModeValue(
    "teal.100",
    "rgba(129, 230, 217, 0.16)",
  )
  const unreadNumberText = useColorModeValue("teal.800", "teal.200")

  const { navigate } =
    useNavigation<NavigationProp<ChatNavigatorScreen, "Home">>()

  const member = conversationMembers.find(
    (member) => member.user.id === user?.id,
  )

  const members = conversationMembers
    .filter((users) => users.user.id !== user?.id)
    .map(
      (users) =>
        users.user.username &&
        // capitalize first letter
        users.user.username?.charAt(0).toUpperCase() +
          users.user.username?.slice(1),
    )
    .join(", ")

  const subText = member?.hasReadlastMessage ? readText : undefined

  const showUsername =
    latestMessage?.type === "bot" &&
    (latestMessage.sender.id === user?.id
      ? "you"
      : latestMessage.sender.username)

  const goToChat = () => navigate("Details", { id: conversation.id, members })

  return (
    <Pressable onPress={goToChat}>
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
        <VStack alignItems="flex-end" space="1">
          <Text fontSize="sm" color={subText}>
            {formatRelative(new Date(updatedAt), new Date(), {
              locale: {
                ...enUS,
                formatRelative: (token) =>
                  formatRelativeLocale[token as keyof typeof formatRelative],
              },
            })}
          </Text>
          {member && member?.unreadMessageNumber > 0 && (
            <Box
              colorScheme="primary"
              py="1"
              px="2"
              bgColor={unreadNumber}
              rounded="full"
            >
              <Text color={unreadNumberText}>{member.unreadMessageNumber}</Text>
            </Box>
          )}
        </VStack>
      </HStack>
    </Pressable>
  )
}

export default ConversationItem
