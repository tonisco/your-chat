import { graphql } from "../../types/gql"

export const sendMessage = graphql(`
  mutation sendMessage($body: String!, $conversationId: String!) {
    sendMessage(body: $body, conversationId: $conversationId)
  }
`)

export const editMessage = graphql(`
  mutation editMessage(
    $body: String!
    $conversationId: String!
    $messageId: String!
  ) {
    editMessage(
      body: $body
      conversationId: $conversationId
      messageId: $messageId
    )
  }
`)

export const deleteMessage = graphql(`
  mutation deleteMessage($conversationId: String!, $messageId: String!) {
    deleteMessage(conversationId: $conversationId, messageId: $messageId)
  }
`)
