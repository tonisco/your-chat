import { Box, Menu, Pressable, useColorModeValue } from "native-base"
import React from "react"

import EditMessage from "./EditMessage"
import ThreeDotsIcon from "../../../Utils/ThreeDotIcon"

type FormProps = {
  body: string
  messageId: string
}

type Props = {
  currMessage: string
  editLoading: boolean
  saveNewMessage: (props: FormProps) => Promise<void>
  cleanMessage: (messageId: string) => Promise<void>
  deleteLoading: boolean
  messageId: string
}

const MessageMenu = ({
  currMessage,
  cleanMessage,
  deleteLoading,
  editLoading,
  saveNewMessage,
  messageId,
}: Props) => {
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
          <EditMessage
            saveNewMessage={saveNewMessage}
            loading={editLoading}
            currMessage={currMessage}
            messageId={messageId}
          />
        </Menu.Item>
        <Menu.Item>Delete Message</Menu.Item>
      </Menu>
    </Box>
  )
}

export default MessageMenu
