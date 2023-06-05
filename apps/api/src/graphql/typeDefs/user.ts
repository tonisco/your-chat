import gql from "graphql-tag"

const typeDefs = gql`
  scalar DateTime

  type Query {
    getUser: User!
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

  type User {
    id: String!
    email: String
    username: String
    name: String
    image: String
  }

  type Message {
    message: String!
  }
`

export default typeDefs
