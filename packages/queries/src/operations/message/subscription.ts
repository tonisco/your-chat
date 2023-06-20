import { graphql } from "../../types/gql"

export const messageSent = graphql(`
  subscription messageSent($conversationId: String!) {
    messageSent(conversationId: $conversationId) {
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
`)

export const editedMessage = graphql(`
  subscription editedMessage {
    editedMessage {
      changeMessage {
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
      conversationId
      members {
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
    }
  }
`)

export const deletedMessage = graphql(`
  subscription deletedMessage {
    deletedMessage {
      changeMessage {
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
      conversationId
      members {
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
    }
  }
`)
