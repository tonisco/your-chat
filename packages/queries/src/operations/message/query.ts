import { graphql } from "../../types/gql"

export const messages = graphql(`
  query messages($conversationId: String!) {
    messages(conversationId: $conversationId) {
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
