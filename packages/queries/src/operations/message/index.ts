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
