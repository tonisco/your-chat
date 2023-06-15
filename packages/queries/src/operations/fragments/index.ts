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
      ...MessageField
    }
  }

  fragment UserFields on User {
    id
    email
    username
    name
    image
  }

  fragment MessageField on Message {
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
