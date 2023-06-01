import gql from "graphql-tag"

const typeDefs = gql`
  scalar DateTime

  type Query {
    getUser: UserDetails!
  }

  type UserDetails {
    id: String!
    email: String!
    username: String!
  }

  type Mutation {
    createUserName(username: String!): String
  }
`

export default typeDefs
