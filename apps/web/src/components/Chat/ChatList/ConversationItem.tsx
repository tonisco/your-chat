import React from "react"
import { Session } from "next-auth"
import { formatRelative } from "date-fns"
import enUS from "date-fns/locale/en-US"
import { Conversation } from "queries/src/types"

import { Divider, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"

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

  const member = conversationMembers.find(
    (member) => member.user.id === session?.user.id,
  )

  const subText = member?.hasReadlastMessage ? readText : undefined

  const showUsername =
    latestMessage?.type === "bot" &&
    (latestMessage.sender.id === session?.user.id
      ? "you"
      : latestMessage.sender.username)

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
      >
        <MembersImages
          conversationMembers={conversationMembers}
          session={session}
          hasReadlastMessage={member?.hasReadlastMessage}
        />
        <Stack gap={2} flex={1}>
          <Flex alignItems={"center"} gap={2}>
            <Text
              flex={"1"}
              textOverflow={"ellipsis"}
              overflowX={"hidden"}
              whiteSpace={"nowrap"}
              textTransform={"capitalize"}
            >
              {conversationMembers
                .filter((user) => user.user.id !== session?.user.id)
                .map((users) => users.user.username)
                .join(", ")}
            </Text>

            <Text fontSize={"xs"} color={subText}>
              {formatRelative(new Date(updatedAt), new Date(), {
                locale: {
                  ...enUS,
                  formatRelative: (token) =>
                    formatRelativeLocale[token as keyof typeof formatRelative],
                },
              })}
            </Text>
          </Flex>

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
      </Flex>
      {length - 1 !== index && <Divider />}
    </>
  )
}

export default ConversationItem
