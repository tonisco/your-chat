import { gql } from "@apollo/client"

const fragments = gql`
  fragment ConversationMembersFields on ConversationMembers {
    id
    hasReadlastMessage
    unreadMessageNumber
    user {
      ...UserFields
    }
  }

  fragment ConversationFields on Conversation {
    id
    createdAt
    updatedAt
    conversationMembers {
      ...ConversationMembersFields
    }
    latestMessage {
      ...LatestMessageFields
    }
  }

  fragment UserFields on User {
    id
    email
    username
    name
    image
  }

  fragment LatestMessageFields on LatestMessage {
    id
    body
    type
    createdAt
    updatedAt
    sender {
      ...UserFields
    }
  }
`

export default fragments
