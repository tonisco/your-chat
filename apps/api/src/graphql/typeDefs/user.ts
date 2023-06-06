import gql from "graphql-tag"

const typeDefs = gql`
  scalar DateTime

  type Query {
    findUsers(username: String!): [FoundUsers]
  }

  type Mutation {
    createUsername(username: String!): Message!
  }

  type Mutation {
    loginUser(
      email: String!
      username: String
      name: String!
      image: String!
    ): User!
  }

  type FoundUsers {
    id: String!
    username: String
  }

  type User {
    id: String!
    email: String
    username: String
    name: String
    image: String
    token: String!
  }

  type Message {
    message: String!
  }
`

export default typeDefs
