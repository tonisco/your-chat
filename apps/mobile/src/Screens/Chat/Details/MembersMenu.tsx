import { Box, Menu, Pressable, useColorModeValue } from "native-base"
import React from "react"

import AddMembers from "./AddMembers"
import ThreeDotsIcon from "../../../Utils/ThreeDotIcon"

type Props = {
  conversationId: string
  members: string
}

const MembersMenu = ({ conversationId, members }: Props) => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const icon = useColorModeValue("black", "white")

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
              <ThreeDotsIcon color={icon} />
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

export default MembersMenu
