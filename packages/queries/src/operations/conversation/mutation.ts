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

export const addNewMembers = graphql(`
  mutation addNewMembers($conversationId: String!, $members: [Members!]!) {
    addNewMembers(conversationId: $conversationId, members: $members)
  }

  input Members {
    id: String!
    username: String!
  }
`)

export const removeMembers = graphql(`
  mutation removeMembers($conversationId: String!, $members: [Members!]!) {
    removeMembers(conversationId: $conversationId, members: $members)
  }

  input Members {
    id: String!
    username: String!
  }
`)
