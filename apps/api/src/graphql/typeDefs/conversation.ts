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
    addNewMembers(conversationId: String!, members: [Members!]!): Boolean
  }

  type Mutation {
    removeMembers(conversationId: String!, members: [Members!]!): Boolean
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

  type Subscription {
    addedToConversation: addedToConversationReturn!
  }

  type Subscription {
    removeFromConversation: RemoveConversationReturn!
  }

  input ConversationMemberId {
    id: String!
  }

  input Members {
    id: String!
    username: String!
  }

  type newMembersList {
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

  type addedToConversationReturn {
    conversation: Conversation!
    members: [newMembersList!]!
  }

  type RemoveConversationReturn {
    conversationId: String!
    members: [newMembersList!]!
  }
`

export default typeDefs
