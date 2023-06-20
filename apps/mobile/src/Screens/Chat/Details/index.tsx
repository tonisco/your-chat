import { useQuery } from "@apollo/client"
import { Stack, Toast, useColorModeValue } from "native-base"
import { messages } from "queries"
import React from "react"

import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { useAuthContext } from "../../../Providers/AuthProvider"
import { ToastError } from "../../../Utils/Toast"
import { DetailsScreenProps } from "../../../types/screen"

type Props = DetailsScreenProps

const Details = ({ route }: Props) => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")

  const { id } = route.params
  const { user } = useAuthContext()

  const { data, loading } = useQuery(messages, {
    variables: { conversationId: id ?? "" },
    fetchPolicy: "network-only",
    onError(error) {
      Toast.show({
        render: () => <ToastError message={error.message} />,
        placement: "top",
      })
    },
  })

  return (
    <Stack bgColor={bg} h="full">
      <Messages loading={loading} messages={data?.messages} user={user} />
      <MessageInput conversationId={id} />
    </Stack>
  )
}

export default Details
