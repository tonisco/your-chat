import { gql } from "@apollo/client"

export const createUsername = gql`
  mutation createUsername($username: String!) {
    createUsername(username: $username) {
      message
    }
  }
`

export const loginUser = gql`
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
`

export const findUsers = gql`
  query findUsers($username: String!) {
    findUsers(username: $username) {
      id
      username
      image
    }
  }
`
