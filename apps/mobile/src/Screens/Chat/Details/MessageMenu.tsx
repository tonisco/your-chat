import { Box, Menu, Pressable, useColorModeValue } from "native-base"
import React, { useState } from "react"

import DeleteMessage from "./DeleteMessage"
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

  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  return (
    <Box alignItems="center">
      <Menu
        placement="left"
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
        <Menu.Item onPress={() => setEditModal(true)}>Edit Message</Menu.Item>
        <Menu.Item onPress={() => setDeleteModal(true)}>
          Delete Message
        </Menu.Item>
      </Menu>
      <EditMessage
        saveNewMessage={saveNewMessage}
        loading={editLoading}
        currMessage={currMessage}
        messageId={messageId}
        showModal={editModal}
        setShowModal={setEditModal}
      />
      <DeleteMessage
        cleanMessage={cleanMessage}
        currMessage={currMessage}
        deleteLoading={deleteLoading}
        messageId={messageId}
        showModal={deleteModal}
        setShowModal={setDeleteModal}
      />
    </Box>
  )
}

export default MessageMenu
