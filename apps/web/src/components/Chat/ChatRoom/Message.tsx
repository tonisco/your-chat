import {
  Avatar,
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { formatRelative } from "date-fns"
import enUS from "date-fns/locale/en-US"
import { Session } from "next-auth"
import { Message as MessageType } from "queries/src/types"
import React from "react"

type Props = {
  message: MessageType
  session: Session | null
}

const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy",
}

const Message = ({ message, session }: Props) => {
  const othersBg = useColorModeValue("blackAlpha.200", "whiteAlpha.200")
  const date = useColorModeValue("darkgray", "whiteAlpha.600")

  const showUsername =
    message.sender.id === session?.user.id ? "you" : message.sender.username

  // if (message.type === "bot")
  //   return (
  //     <Box
  //       alignSelf={"center"}
  //       py="2"
  //       px="3"
  //       bgColor={othersBg}
  //       rounded={"2xl"}
  //     >
  //       <Text
  //         _firstLetter={{ textTransform: "uppercase" }}
  //         fontStyle={"italic"}
  //          fontSize={"sm"}
  //       >
  //         {showUsername} {message.body}
  //       </Text>
  //     </Box>
  //   )

  return (
    <>
      <Flex gap={2} alignItems={"end"}>
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
    </>
  )
}

export default Message
