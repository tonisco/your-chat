import gql from "graphql-tag"

const typeDefs = gql`
  type Mutation {
    createConversation(input: [ConversationMemberId!]!): Message!
  }

  input ConversationMemberId {
    id: String!
  }
`

export default typeDefs
