import {
  Box,
  Menu,
  Pressable,
  ThreeDotsIcon,
  useColorModeValue,
} from "native-base"
import React from "react"

import AddMembers from "./AddMembers"

type Props = {
  conversationId: string
  members: string
}

const MessageMenu = ({ conversationId, members }: Props) => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")

  return (
    <Box alignItems="center">
      <Menu
        bgColor={bg}
        trigger={(triggerProps) => {
          return (
            <Pressable
              style={{ transform: "rotate(90deg)" }}
              accessibilityLabel="More options menu"
              {...triggerProps}
            >
              <ThreeDotsIcon color="white" />
            </Pressable>
          )
        }}
      >
        <Menu.Item>
          <AddMembers members={members} conversationId={conversationId} />
        </Menu.Item>
        <Menu.Item>Remove Members</Menu.Item>
      </Menu>
    </Box>
  )
}

export default MessageMenu
