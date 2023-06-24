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
        isDeleted
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
        isDeleted
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

export const addedToConversation = graphql(`
  subscription addedToConversation {
    addedToConversation {
      conversation {
        id
        latestMessage {
          id
          body
          sender {
            id
            email
            username
            name
            image
          }
          type
          isDeleted
          conversationId
          createdAt
          updatedAt
        }
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
        createdAt
        updatedAt
      }
      members {
        id
        username
      }
    }
  }
`)

export const removeFromConversation = graphql(`
  subscription removeFromConversation {
    removeFromConversation {
      conversationId
      members {
        id
        username
      }
    }
  }
`)
