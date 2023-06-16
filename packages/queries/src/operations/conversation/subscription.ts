import { graphql } from "../../types/gql"

export const conversationCreated = graphql(`
  subscription conversationCreated {
    conversationCreated {
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

export const conversationUpdated = graphql(`
  subscription conversationUpdated {
    conversationUpdated {
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
        conversationId
        createdAt
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
