import { graphql } from "../../types/gql/gql"

/**
 *  FRAGMENTS
 */
graphql(`
  fragment LatestMessageFields on LatestMessage {
    id
    body
    type
    createdAt
    updatedAt
  }
`)
