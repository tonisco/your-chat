import { Avatar, HStack } from "native-base"
import { ConversationMembers } from "queries/src/types"
import React from "react"

import { User } from "../../../Providers/AuthProvider"

type Props = {
  conversationMembers: ConversationMembers[]
  user: User | null
}

const MembersImages = ({ conversationMembers, user }: Props) => {
  return (
    <HStack space={2} alignItems="center">
      <HStack w="12">
        {conversationMembers
          .filter((member) => member.user.id !== user?.id)
          .slice(0, 2)
          .map((_, i) => (
            <Avatar
              key={i}
              size="sm"
              ml={`-${i && 16}px`}
              source={{ uri: conversationMembers[i].user.image ?? undefined }}
            />
          ))}
      </HStack>
    </HStack>
  )
}

export default MembersImages
