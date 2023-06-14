import React from "react"
import { Session } from "next-auth"
import { ConversationMembers } from "queries/src/types"

import { Avatar, Box, Flex } from "@chakra-ui/react"

type Props = {
  conversationMembers: ConversationMembers[]
  session: Session | null
  hasReadlastMessage: Boolean | undefined
}

const MembersImages = ({
  conversationMembers,
  session,
  hasReadlastMessage,
}: Props) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      {!hasReadlastMessage && (
        <Box w={"2"} h="2" rounded={"full"} bgColor={"green"} />
      )}
      <Flex>
        {conversationMembers
          .filter((member) => member.user.id !== session?.user.id)
          .slice(0, 3)
          .map((_, i) => (
            <Avatar
              key={i}
              size={"sm"}
              ml={`-${i && 16}px`}
              src={conversationMembers[i].user.image ?? undefined}
            />
          ))}
      </Flex>
    </Flex>
  )
}

export default MembersImages
