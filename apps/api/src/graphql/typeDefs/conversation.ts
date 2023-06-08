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
