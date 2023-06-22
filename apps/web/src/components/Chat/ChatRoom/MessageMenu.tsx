import React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

import DeleteMessage from "./DeleteMessage"
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
  cleanMessage: (messageId: string) => Promise<void>
  deleteLoading: boolean
}

const MessageMenu = ({
  body,
  loading,
  saveNewMessage,
  messageId,
  cleanMessage,
  deleteLoading,
}: Props) => {
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
        <MenuItem>
          <DeleteMessage
            deleteLoading={deleteLoading}
            cleanMessage={cleanMessage}
            messageId={messageId}
            message={body}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MessageMenu
