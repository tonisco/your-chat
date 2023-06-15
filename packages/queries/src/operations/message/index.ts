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

gql`
  input createMessageInput {
    body: String!
    conversationId: String!
  }
`
