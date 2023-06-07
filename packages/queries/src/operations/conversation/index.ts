import { gql } from "@apollo/client"

import { graphql } from "../../types/gql/gql"

const ConversationMemberId = gql`
  input ConversationMemberId {
    id: String!
  }
`

export const createConversation = graphql(/* GraphQL */ `
  mutation createConversation($input: [ConversationMemberId!]!) {
    createConversation(input: $input) {
      message
    }
  }
`)

export const na = ""
