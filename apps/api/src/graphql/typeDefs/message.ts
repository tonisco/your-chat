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

  type Mutation {
    deleteMessage(conversationId: String!, messageId: String!): Boolean
  }

  type Subscription {
    messageSent(conversationId: String!): Message!
  }

  type Subscription {
    editedMessage: SubMessageReturn!
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

  type SubMessageReturn {
    changeMessage: Message!
    conversationId: String!
    members: [ConversationMembers!]!
  }
`

export default typeDefs
