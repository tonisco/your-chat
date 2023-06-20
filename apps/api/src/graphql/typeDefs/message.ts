import { gql } from "graphql-tag"

const typeDefs = gql`
  type Query {
    messages(conversationId: String!): [Message!]!
  }

  type Mutation {
    sendMessage(body: String!, conversationId: String!): Boolean
  }

  type Mutation {
    editMessage(
      body: String!
      conversationId: String!
      messageId: String!
    ): Boolean
  }

  type Subscription {
    messageSent(conversationId: String!): Message!
  }

  enum MessageType {
    user
    bot
  }

  type Message {
    id: String!
    body: String!
    sender: User!
    type: MessageType!
    isDeleted: Boolean
    conversationId: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input createMessageInput {
    body: String!
    conversationId: String!
  }
`

export default typeDefs
