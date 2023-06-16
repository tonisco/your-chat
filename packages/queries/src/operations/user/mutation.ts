import { graphql } from "../../types/gql"

export const createUsername = graphql(`
  mutation createUsername($username: String!) {
    createUsername(username: $username) {
      message
    }
  }
`)

export const loginUser = graphql(`
  mutation loginUser(
    $email: String!
    $username: String
    $name: String!
    $image: String!
  ) {
    loginUser(email: $email, username: $username, name: $name, image: $image) {
      id
      email
      username
      name
      image
      token
    }
  }
`)
