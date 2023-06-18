import React, { useCallback } from "react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import { formatRelative } from "date-fns"
import enUS from "date-fns/locale/en-US"
import { markConversationAsRead } from "queries"
import { Conversation, ConversationMembers } from "queries/src/types"

import { gql, useMutation } from "@apollo/client"
import { cloneDeep } from "@apollo/client/utilities"
import {
  Box,
  Divider,
  Flex,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

import MembersImages from "./MembersImages"

type Props = {
  conversation: Conversation
  session: Session | null
  index: number
  length: number
}

const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy",
}

const ConversationItem = ({ conversation, session, index, length }: Props) => {
  const { conversationMembers, updatedAt, latestMessage } = conversation
  const readText = useColorModeValue("darkgray", "whiteAlpha.600")
  const activeBg = useColorModeValue("blackAlpha.200", "whiteAlpha.200")

  const { push } = useRouter()

  const member = conversationMembers.find(
    (member) => member.user.id === session?.user.id,
  )

  const subText = member?.hasReadlastMessage ? readText : undefined

  const showUsername =
    latestMessage?.type === "bot" &&
    (latestMessage.sender.id === session?.user.id
      ? "you"
      : latestMessage.sender.username)

  const members = conversationMembers
    .filter((user) => user.user.id !== session?.user.id)
    .map((users) => users.user.username)
    .join(", ")

  const [mark] = useMutation(markConversationAsRead, {})

  const markMessage = useCallback(
    () =>
      mark({
        variables: { conversationId: conversation.id },
        update: (cache) => {
          const currentData: {
            conversationMembers: ConversationMembers[]
          } | null = cache.readFragment({
            id: `Conversation:${conversation.id}`,
            fragment: gql`
              fragment ConversationMembers on Conversation {
                conversationMembers {
                  user {
                    id
                    username
                  }
                  hasReadlastMessage
                  unreadMessageNumber
                }
              }
            `,
          })

          console.log(currentData)

          if (!currentData) return

          const conversationMembers = cloneDeep(currentData.conversationMembers)

          const idx = conversationMembers.findIndex(
            (data) => data.user.id === session?.user.id,
          )

          if (idx === -1) return

          conversationMembers[idx].hasReadlastMessage = true
          conversationMembers[idx].unreadMessageNumber = 0

          console.log(conversationMembers[idx])

          cache.writeFragment({
            id: `Conversation:${conversation.id}`,
            data: { conversationMembers },
            fragment: gql`
              fragment updateMembers on Conversation {
                conversationMembers
              }
            `,
          })
        },
      }),
    [conversation.id, mark, session?.user.id],
  )

  const goToChat = () => {
    markMessage()

    const params = new URLSearchParams({
      id: conversation.id,
      members,
    }).toString()

    push(`/?${params}`)
  }

  return (
    <>
      <Flex
        gap={2}
        py="3"
        px="3"
        _hover={{ backgroundColor: activeBg }}
        rounded={"md"}
        cursor={"pointer"}
        alignItems={"center"}
        onClick={goToChat}
      >
        <MembersImages
          conversationMembers={conversationMembers}
          session={session}
          hasReadlastMessage={member?.hasReadlastMessage}
        />
        <Flex alignItems={"center"} gap={2} w="full">
          <Stack gap={2} flex={1}>
            <Text
              flex={"1"}
              textOverflow={"ellipsis"}
              overflowX={"hidden"}
              whiteSpace={"nowrap"}
              textTransform={"capitalize"}
            >
              {members}
            </Text>

            <Text
              textOverflow={"ellipsis"}
              overflowX={"hidden"}
              whiteSpace={"nowrap"}
              fontSize={"xs"}
              _firstLetter={{ textTransform: "capitalize" }}
              color={subText}
            >
              {showUsername} {latestMessage?.body}
            </Text>
          </Stack>
          <Stack gap="2">
            <Text fontSize={"xs"} color={subText}>
              {formatRelative(new Date(updatedAt), new Date(), {
                locale: {
                  ...enUS,
                  formatRelative: (token) =>
                    formatRelativeLocale[token as keyof typeof formatRelative],
                },
              })}
            </Text>

            <Box>
              {member && member.unreadMessageNumber > 0 && (
                <Tag colorScheme="teal">{member.unreadMessageNumber}</Tag>
              )}
            </Box>
          </Stack>
        </Flex>
      </Flex>
      {length - 1 !== index && <Divider />}
    </>
  )
}

export default ConversationItem
