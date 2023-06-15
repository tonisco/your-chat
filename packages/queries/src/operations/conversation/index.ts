import { gql } from "@apollo/client"
import fragments from "../fragments"
import { graphql } from "../../types/gql"

export const createConversation = gql`
  mutation createConversation($input: [ConversationMemberId!]!) {
    createConversation(input: $input) {
      message
      conversationId
    }
  }
`

export const conversations = gql`
  query conversations {
    conversations {
      ...ConversationFields
    }
  }
  ${fragments}
`

export const conversationCreated = gql`
  subscription conversationCreated {
    conversationCreated {
      ...ConversationFields
    }
  }
  ${fragments}
`
export const conversationUpdated = gql`
  subscription conversationUpdated {
    conversationUpdated {
      ...ConversationFields
    }
  }
  ${fragments}
`

/**
 *  INPUTS
 */
gql`
  input ConversationMemberId {
    id: String!
  }
`
