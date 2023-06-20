import { gql } from "@apollo/client"
import { ConversationMembers } from "../types"
import { cloneDeep } from "@apollo/client/utilities"

type markArgs = {
  cache: any
  conversationId: string
  userId: string | null | undefined
}

export const markAsReadCache = ({
  cache,
  conversationId,
  userId,
}: markArgs) => {
  const currentData: {
    conversationMembers: ConversationMembers[]
  } | null = cache.readFragment({
    id: `Conversation:${conversationId}`,
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

  if (!currentData) return

  const conversationMembers = cloneDeep(currentData.conversationMembers)

  const idx = conversationMembers.findIndex((data) => data.user.id === userId)

  if (idx === -1) return

  conversationMembers[idx].hasReadlastMessage = true
  conversationMembers[idx].unreadMessageNumber = 0

  cache.writeFragment({
    id: `Conversation:${conversationId}`,
    data: { conversationMembers },
    fragment: gql`
      fragment updateMembers on Conversation {
        conversationMembers
      }
    `,
  })
}
