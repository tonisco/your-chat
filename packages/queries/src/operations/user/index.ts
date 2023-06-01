import { graphql } from "../../types/gql/gql"

export const createUsername = graphql(/* GraphQL */ `
  mutation createUsername($username: String!) {
    createUsername(username: $username) {
      message
    }
  }
`)
