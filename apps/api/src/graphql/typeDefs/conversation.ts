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

  type Subscription {
    conversationCreated: Conversation!
  }

  input ConversationMemberId {
    id: String!
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

// model Conversation {
//     id
//     admin
//     adminId
//     conversationMembers
//     conversationMembersNumber
//     messages
//     latestMessage
//     latestMessageId
//     createdAt
//     updatedAt
// }

// model ConversationMember {
//     id
//     hasReadlastMessage
//     unreadMessageNumber
//     user
//     userId
//     conversation
//     conversationId
//     createdAt
//     updatedAt
// }
