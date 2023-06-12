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
  console.log(hasReadlastMessage)
  return (
    <Flex minW={"10"} maxWidth={"14"} pos={"relative"}>
      {conversationMembers
        .filter((member) => member.user.id !== session?.user.id)
        .slice(0, 3)
        .map((_, i) => (
          <Avatar
            key={i}
            size={"sm"}
            css={{ transform: `translateX(-${i * 50}%)` }}
            src={conversationMembers[i].user.image ?? undefined}
          />
        ))}
      {!hasReadlastMessage && (
        <Box
          position={"absolute"}
          bottom={"1"}
          left={"0"}
          w={"2"}
          h="2"
          rounded={"full"}
          bgColor={"green"}
        />
      )}
    </Flex>
  )
}

export default MembersImages
