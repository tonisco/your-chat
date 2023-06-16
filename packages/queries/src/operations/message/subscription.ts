import { graphql } from "../../types/gql"

export const messageSent = graphql(`
  subscription messageSent($conversationId: String!) {
    messageSent(conversationId: $conversationId) {
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
`)
