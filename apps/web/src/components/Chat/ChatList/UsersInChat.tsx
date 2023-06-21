import React from "react"
import { FoundUsers } from "queries/src/types"

import {
  Button,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from "@chakra-ui/react"

type Props = {
  removeFromChat: (id: string) => void
  inChat: FoundUsers[]
  create: () => void
  loading: boolean
  buttonText?: string
}

const UsersInChat = ({
  removeFromChat,
  inChat,
  create,
  loading,
  buttonText,
}: Props) => {
  return (
    <Stack mt="4" spacing="4">
      <Wrap>
        {inChat.map((val) => (
          <Tag key={val.id} size={"md"}>
            <TagLabel textTransform={"capitalize"}>{val.username}</TagLabel>
            <TagCloseButton onClick={() => removeFromChat(val.id)} />
          </Tag>
        ))}
      </Wrap>
      <Button
        isDisabled={inChat.length < 1}
        isLoading={loading}
        loadingText="Starting Chat"
        onClick={create}
      >
        {buttonText ? buttonText : "Start Chat"}
      </Button>
    </Stack>
  )
}

export default UsersInChat
