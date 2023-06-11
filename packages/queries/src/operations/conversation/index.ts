import { graphql } from "../../types/gql/gql"
import { gql } from "@apollo/client"
import fragments from "../fragments"

export const createConversation = graphql(`
  mutation createConversation($input: [ConversationMemberId!]!) {
    createConversation(input: $input) {
      message
    }
  }
`)

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

/**
 *  INPUTS
 */
graphql(`
  input ConversationMemberId {
    id: String!
  }
`)
