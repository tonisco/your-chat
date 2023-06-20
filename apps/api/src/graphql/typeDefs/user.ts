import gql from "graphql-tag"

const typeDefs = gql`
  scalar DateTime

  type Query {
    findUsers(username: String!): [FoundUsers!]!
  }

  type Mutation {
    createUsername(username: String!): MessageReturn!
  }

  type Query {
    findUsersNotInChat(
      username: String!
      conversationId: String!
    ): [FoundUsers!]!
  }

  type Mutation {
    loginUser(
      email: String!
      username: String
      name: String!
      image: String!
    ): UserWithToken!
  }

  type FoundUsers {
    id: String!
    username: String
    image: String
  }

  type UserWithToken {
    id: String!
    email: String
    username: String
    name: String
    image: String
    token: String!
  }

  type User {
    id: String!
    email: String
    username: String
    name: String
    image: String
  }

  type MessageReturn {
    message: String!
  }
`

export default typeDefs
