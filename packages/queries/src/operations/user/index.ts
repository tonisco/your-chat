import { graphql } from "../../types/gql/gql"
import { gql } from "@apollo/client"

export const createUsername = graphql(/* GraphQL */ `
  mutation createUsername($username: String!) {
    createUsername(username: $username) {
      message
    }
  }
`)

export const loginUser = graphql(/* GraphQL */ `
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
