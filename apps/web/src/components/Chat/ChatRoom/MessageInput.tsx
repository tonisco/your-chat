import { useMutation } from "@apollo/client"
import {
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react"
import { sendMessage } from "queries"
import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { BsSend } from "react-icons/bs"

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
  })

  const reply = (e: React.FormEvent) => {
    e.preventDefault()
    send({ variables: { body, conversationId } })
    setBody("")
  }

  return (
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
          <button type="submit">
            <BsSend />
          </button>
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

export default MessageInput
