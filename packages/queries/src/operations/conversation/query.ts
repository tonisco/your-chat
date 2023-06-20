import { graphql } from "../../types/gql"

export const conversations = graphql(`
  query conversations {
    conversations {
      id
      createdAt
      updatedAt
      conversationMembers {
        id
        hasReadlastMessage
        unreadMessageNumber
        user {
          id
          email
          username
          name
          image
        }
      }
      latestMessage {
        id
        body
        type
        createdAt
        isDeleted
        conversationId
        updatedAt
        sender {
          id
          email
          username
          name
          image
        }
      }
    }
  }
`)
