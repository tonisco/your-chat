import { graphql } from "../../types/gql/gql"
import { gql } from "@apollo/client"

export const createUsername = graphql(/* GraphQL */ `
  mutation createUsername($username: String!) {
    createUsername(username: $username) {
      message
    }
  }
`)
