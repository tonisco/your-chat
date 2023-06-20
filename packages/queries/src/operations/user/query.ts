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

export const findUsersNotInChat = graphql(`
  query findUsersNotInChat($username: String!, $conversationId: String!) {
    findUsersNotInChat(username: $username, conversationId: $conversationId) {
      id
      username
      image
    }
  }
`)
