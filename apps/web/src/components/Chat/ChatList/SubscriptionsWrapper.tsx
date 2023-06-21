import React from "react"
import { addedToConversation, conversations } from "queries"

import { useSubscription } from "@apollo/client"

type Props = {
  children: React.ReactNode
}

const SubscriptionsWrapper = ({ children }: Props) => {
  useSubscription(addedToConversation, {
    onData({ client, data }) {
      if (!data.data?.addedToConversation) return

      const prevCon = client.cache.readQuery({ query: conversations })

      if (!prevCon?.conversations) return

      client.cache.writeQuery({
        data: {
          conversations: [
            data.data.addedToConversation.conversation,
            ...prevCon.conversations,
          ],
        },
        query: conversations,
      })
    },
  })

  return <>{children}</>
}

export default SubscriptionsWrapper
