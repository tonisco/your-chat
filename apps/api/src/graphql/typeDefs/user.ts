import gql from "graphql-tag"

const typeDefs = gql`
  scalar DateTime

  type Query {
    getUser: UserDetails!
  }

  type Mutation {
    createUsername(username: String!): Message!
  }

  type UserDetails {
    id: String!
    email: String!
    username: String!
  }

  type Message {
    message: String!
  }
`

export default typeDefs
