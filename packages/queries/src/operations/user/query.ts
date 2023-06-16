import { graphql } from "../../types/gql"

export const findUsers = graphql(`
  query findUsers($username: String!) {
    findUsers(username: $username) {
      id
      username
      image
    }
  }
`)
