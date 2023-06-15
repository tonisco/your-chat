import { gql } from "@apollo/client"
import fragments from "../fragments"

export const messages = gql`
  query messages($conversationId: String!) {
    messages(conversationId: $conversationId) {
      ...MessageField
    }
  }
  ${fragments}
`

export const sendMessage = gql`
  mutation sendMessage($input: createMessageInput!) {
    sendMessage(input: $input)
  }
`

export const messageSent = gql`
  subscription messageSent($conversationId: String!) {
    messageSent(conversationId: $conversationId) {
      ...MessageField
    }
  }
  ${fragments}
`

gql`
  input createMessageInput {
    body: String!
    conversationId: String!
  }
`
