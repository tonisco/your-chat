import gql from "graphql-tag"

const typeDefs = gql`
  type Query {
    getUser: UserDetails!
  }

  type UserDetails {
    id: String!
    email: String!
    username: String!
  }

  type Query {
    saveUser: Boolean!
  }

  type Query {
    deleteUser: Boolean!
  }

  type Mutation {
    editUser(something: String!): String!
  }
`

export default typeDefs
