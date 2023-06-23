import { useMutation } from "@apollo/client"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import {
  Center,
  Modal,
  Stack,
  Text,
  Toast,
  useColorModeValue,
} from "native-base"
import { removeMembers } from "queries"
import { FoundUsers } from "queries/src/types"
import React, { useState } from "react"

import { ToastError, ToastSuccess } from "../../../Utils/Toast"
import { ChatNavigatorScreen } from "../../../types/screen"
import UserList from "../Home/UserList"
import UsersInChat from "../Home/UsersInChat"

type Props = {
  conversationId: string
  members: FoundUsers[]
}

const RemoveMembers = ({ conversationId, members }: Props) => {
  const { setParams } =
    useNavigation<NavigationProp<ChatNavigatorScreen, "Details">>()

  const [showModal, setShowModal] = useState(false)

  const color = useColorModeValue("brand.text", "brand.textDark")
  const bg = useColorModeValue("brand.bg", "brand.bgDark")

  const [selectedUsers, setSelectedUsers] = useState<FoundUsers[]>([])

  const addToChat = (user: FoundUsers) =>
    setSelectedUsers([...selectedUsers, user])

  const removeFromChat = (id: string) =>
    setSelectedUsers(selectedUsers.filter((member) => member.id !== id))

  const clearData = () => {
    setSelectedUsers([])
    setShowModal(false)
  }

  const [remove, { loading: removeLoading }] = useMutation(removeMembers, {
    onError(err) {
      Toast.show({
        render: () => <ToastError message={err.message} />,
        placement: "top",
      })
    },
    onCompleted(data) {
      Toast.show({
        render: () => <ToastSuccess message={data.removeMembers.message} />,
        placement: "top",
      })
      clearData()
      const selectedUsernames = selectedUsers.map(
        (users) => users.username ?? "",
      )
      const newMembers = members
        .filter((mem) => !selectedUsernames.includes(mem.username!))
        .join(", ")

      setParams({ id: conversationId, members: newMembers })
    },
  })

  const removeUsers = () => {
    const members = selectedUsers.map((user) => ({
      id: user.id,
      username: user.username!,
    }))

    remove({ variables: { members, conversationId } })
  }

  return (
    <>
      <Text onPress={() => setShowModal(true)} color={color} flex={1}>
        Add Members
      </Text>
      <Center>
        <Modal isOpen={showModal} onClose={clearData} size="lg">
          <Modal.Content bgColor={bg} maxH="4/5">
            <Modal.CloseButton />
            <Modal.Header bgColor={bg} alignSelf="center">
              Add Members
            </Modal.Header>
            <Modal.Body mb="6">
              <Stack>
                <Text fontSize="sm" color={color}>
                  Remove Users
                </Text>

                <UserList
                  addToChat={addToChat}
                  removeFromChat={removeFromChat}
                  selectedUsers={selectedUsers}
                  users={members}
                />

                {selectedUsers.length > 0 && (
                  <UsersInChat
                    removeFromChat={removeFromChat}
                    inChat={selectedUsers}
                    create={removeUsers}
                    loading={removeLoading}
                    buttonText="Remove from Chat"
                    buttonTextLoading="Removing from Chat"
                  />
                )}
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  )
}

export default RemoveMembers
