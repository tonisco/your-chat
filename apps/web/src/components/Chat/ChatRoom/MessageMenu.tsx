import React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

import EditMessage from "./EditMessage"

type FormProps = {
  body: string
  messageId: string
}

type Props = {
  body: string
  loading: boolean
  saveNewMessage: (props: FormProps) => Promise<void>
  messageId: string
}

const MessageMenu = ({ body, loading, saveNewMessage, messageId }: Props) => {
  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <EditMessage
            loading={loading}
            saveNewMessage={saveNewMessage}
            message={body}
            messageId={messageId}
          />
        </MenuItem>
        <MenuItem>Delete Message</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MessageMenu
