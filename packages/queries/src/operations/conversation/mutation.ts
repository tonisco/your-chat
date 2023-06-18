import { graphql } from "../../types/gql"

export const createConversation = graphql(`
  mutation createConversation($input: [ConversationMemberId!]!) {
    createConversation(input: $input) {
      message
      conversationId
    }
  }

  input ConversationMemberId {
    id: String!
  }
`)

export const markConversationAsRead = graphql(`
  mutation markConversationAsRead($conversationId: String!) {
    markConversationAsRead(conversationId: $conversationId)
  }
`)
