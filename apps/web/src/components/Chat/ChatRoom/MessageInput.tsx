import React, { useState } from "react"
import { sendMessage } from "queries"
import { toast } from "react-hot-toast"
import { BsSend } from "react-icons/bs"

import { useMutation } from "@apollo/client"
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"

type Props = {
  conversationId: string
}

const MessageInput = ({ conversationId }: Props) => {
  const [body, setBody] = useState("")

  const othersBg = useColorModeValue("blackAlpha.200", "whiteAlpha.200")

  const [send, { loading }] = useMutation(sendMessage, {
    onError(error) {
      toast.error(error.message)
    },
    onCompleted() {
      setBody("")
    },
  })

  const reply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loading) send({ variables: { body, conversationId } })
  }

  return (
    <Box px={"6"} pb={"6"}>
      <form onSubmit={reply}>
        <InputGroup>
          <Input
            placeholder="New message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <InputRightElement
            itemType="button"
            cursor={"pointer"}
            bgColor={othersBg}
          >
            {loading ? (
              <Spinner />
            ) : (
              <button type="submit">
                <BsSend />
              </button>
            )}
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  )
}

export default MessageInput
