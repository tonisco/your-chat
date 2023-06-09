import { graphql } from "../../types/gql/gql"

export const createConversation = graphql(`
  mutation createConversation($input: [ConversationMemberId!]!) {
    createConversation(input: $input) {
      message
    }
  }
`)

export const conversations = graphql(`
  query conversations {
    conversations {
      ...ConversationFields
      conversationMembers {
        ...ConversationMembersFields
        user {
          ...UserFields
        }
      }
      latestMessage {
        ...LatestMessageFields
        sender {
          ...UserFields
        }
      }
    }
  }
`)

/**
 *  FRAGMENTS
 */
graphql(`
  fragment ConversationMembersFields on ConversationMembers {
    id
    hasReadlastMessage
    unreadMessageNumber
  }

  fragment ConversationFields on Conversation {
    id
    createdAt
    updatedAt
  }
`)

/**
 *  INPUTS
 */
graphql(`
  input ConversationMemberId {
    id: String!
  }
`)
