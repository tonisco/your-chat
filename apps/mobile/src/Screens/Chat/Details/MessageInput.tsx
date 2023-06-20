import { useMutation } from "@apollo/client"
import {
  Input,
  InputGroup,
  InputRightAddon,
  Pressable,
  Spinner,
  Stack,
  Toast,
  useColorModeValue,
} from "native-base"
import { sendMessage } from "queries"
import React, { useState } from "react"

import SendIcon from "../../../Utils/SendIcon"
import { ToastError } from "../../../Utils/Toast"

type Props = {
  conversationId: string
}

const MessageInput = ({ conversationId }: Props) => {
  const [body, setBody] = useState("")

  const othersBg = useColorModeValue(
    "rgba(0, 0, 0, 0.08)",
    "rgba(255, 255, 255, 0.08)",
  )
  const spinner = useColorModeValue("dark.400", "light.400")

  const [send, { loading }] = useMutation(sendMessage, {
    onError(error) {
      Toast.show({
        placement: "top",
        render: () => <ToastError message={error.message} />,
      })
    },
    onCompleted() {
      setBody("")
    },
  })

  const reply = () => {
    if (!loading && body.length > 0)
      send({ variables: { body, conversationId } })
  }

  return (
    <Stack px="6" py="4">
      <InputGroup>
        <Input
          placeholder="New message"
          value={body}
          onChangeText={(e) => setBody(e)}
          rounded="lg"
          borderColor="gray.600"
          flex={1}
          _focus={{ backgroundColor: "transparent", borderColor: "gray.400" }}
        />
        <Pressable _pressed={{ opacity: 0.5 }} onPress={reply}>
          <InputRightAddon
            borderColor="gray.600"
            backgroundColor={othersBg}
            children={loading ? <Spinner color={spinner} /> : <SendIcon />}
            borderTopRightRadius="lg"
            borderBottomRightRadius="lg"
            p="3"
          />
        </Pressable>
      </InputGroup>
    </Stack>
  )
}

export default MessageInput
