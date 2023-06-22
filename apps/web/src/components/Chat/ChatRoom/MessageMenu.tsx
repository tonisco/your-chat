import React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

import EditMessage from "./EditMessage"

type Props = {
  body: string
}

const MessageMenu = ({ body }: Props) => {
  return (
    <Menu>
      <MenuButton>
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <EditMessage message={body} />
        </MenuItem>
        <MenuItem>Delete Message</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MessageMenu
