import gql from "graphql-tag"

const typeDefs = gql`
  type Query {
    conversations: [Conversation!]!
  }

  type Mutation {
    createConversation(
      input: [ConversationMemberId!]!
    ): createConversationReturn!
  }

  type Mutation {
    addNewMembers(conversationId: String!, members: [newMembers!]!): Boolean
  }

  type Mutation {
    markConversationAsRead(conversationId: String!): Boolean
  }

  type Subscription {
    conversationCreated: Conversation!
  }

  type Subscription {
    conversationUpdated: Conversation!
  }

  input ConversationMemberId {
    id: String!
  }

  input newMembers {
    id: String!
    username: String!
  }

  type createConversationReturn {
    message: String!
    conversationId: String
  }

  type Conversation {
    id: String!
    latestMessage: Message
    conversationMembers: [ConversationMembers!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ConversationMembers {
    id: String!
    hasReadlastMessage: Boolean!
    unreadMessageNumber: Int!
    user: User!
  }
`

export default typeDefs
