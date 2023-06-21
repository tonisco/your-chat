import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  addedToConversation,
  conversations,
  removeFromConversation,
} from "queries"

import { useSubscription } from "@apollo/client"

type Props = {
  children: React.ReactNode
}

const SubscriptionsWrapper = ({ children }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get("id")

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

  useSubscription(removeFromConversation, {
    onData({ client, data }) {
      console.log("time")
      if (!data.data?.removeFromConversation) return

      const prevCon = client.cache.readQuery({ query: conversations })

      if (!prevCon?.conversations) return

      const { conversationId } = data.data.removeFromConversation

      if (id && id === conversationId) router.replace("/")
      console.log(id)
      console.log(conversationId)
      client.cache.writeQuery({
        data: {
          conversations: prevCon.conversations.filter(
            (prev) => prev.id !== conversationId,
          ),
        },
        query: conversations,
      })
    },
  })

  return <>{children}</>
}

export default SubscriptionsWrapper
