import { graphql } from "../../types/gql"

export const sendMessage = graphql(`
  mutation sendMessage($body: String!, $conversationId: String!) {
    sendMessage(body: $body, conversationId: $conversationId)
  }
`)
