import { gql } from "graphql-tag"

const typeDefs = gql`
  type Query {
    messages(conversationId: String!): [Message!]!
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
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`

// Message {
//     id             String        @id @default(cuid())
//     body           String
//     isLatest       Conversation? @relation(name: "latestMessage")
//     sender         User          @relation(fields: [senderId], references: [id])
//     senderId       String
//     type           MessageType
//     conversation   Conversation  @relation(fields: [conversationId], references: [id], onDelete: Cascade)
//     conversationId String
//     createdAt      DateTime      @default(now())
//     updatedAt      DateTime      @updatedAt
// }

export default typeDefs
