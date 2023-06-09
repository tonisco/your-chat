import { gql } from "graphql-tag"

const typeDefs = gql`
  enum MessageType {
    user
    bot
  }

  type LatestMessage {
    id: String
    body: String
    sender: User
    type: MessageType
    createdAt: DateTime
    updatedAt: DateTime
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
