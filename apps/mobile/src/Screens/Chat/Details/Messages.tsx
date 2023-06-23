import { useMutation } from "@apollo/client"
import { FlatList, Toast, VStack } from "native-base"
import { deleteMessage, editMessage } from "queries"
import { Message as MessageType } from "queries/src/types"
import React from "react"

import Message from "./Message"
import MessageLoading from "./MessageLoading"
import { User } from "../../../Providers/AuthProvider"
import { ToastError, ToastSuccess } from "../../../Utils/Toast"

type FormProps = {
  body: string
  messageId: string
}

type Props = {
  messages: MessageType[] | undefined
  user: User | null
  loading: boolean
  conversationId: string
}

const Messages = ({ messages, user, loading, conversationId }: Props) => {
  const [edit, { loading: editLoading }] = useMutation(editMessage, {
    onError(err) {
      Toast.show({ render: () => <ToastError message={err.message} /> })
    },
    onCompleted() {
      Toast.show({
        render: () => (
          <ToastSuccess message="Message has been successfully changed" />
        ),
      })
    },
  })

  const saveNewMessage = async (props: FormProps) => {
    const { body, messageId } = props

    await edit({ variables: { body, conversationId, messageId } })
  }

  const [removeMessage, { loading: deleteLoading }] = useMutation(
    deleteMessage,
    {
      onError(err) {
        Toast.show({ render: () => <ToastError message={err.message} /> })
      },
      onCompleted() {
        Toast.show({
          render: () => <ToastSuccess message="Message has been deleted" />,
        })
      },
    },
  )

  const cleanMessage = async (messageId: string) => {
    await removeMessage({ variables: { conversationId, messageId } })
  }

  return (
    <VStack flex={1} space={4}>
      {loading && (
        <FlatList
          keyExtractor={(_, i) => i.toString()}
          data={Array.from({ length: 8 })}
          renderItem={({ index }) => <MessageLoading index={index} />}
          inverted
          contentContainerStyle={{ gap: 20 }}
        />
      )}

      {messages && (
        <FlatList
          data={messages}
          inverted
          renderItem={({ item }) => (
            <Message
              message={item}
              user={user}
              saveNewMessage={saveNewMessage}
              editLoading={editLoading}
              deleteLoading={deleteLoading}
              cleanMessage={cleanMessage}
            />
          )}
          contentContainerStyle={{ gap: 20, paddingBottom: 60 }}
          padding="6"
        />
      )}
    </VStack>
  )
}

export default Messages
