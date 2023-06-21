"use client"
import React, { useRef, useState } from "react"
import { removeMembers } from "queries"
import { FoundUsers } from "queries/src/types"
import { toast } from "react-hot-toast"

import { useMutation } from "@apollo/client"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import UserList from "../ChatList/UserList"
import UsersInChat from "../ChatList/UsersInChat"

type NavigateProps = (
  method: "remove" | "add",
  memberUsername: string[],
) => void

type Props = {
  conversationId: string
  members: FoundUsers[]
  navigate: NavigateProps
}

const RemoveMembers = ({ conversationId, members, navigate }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const modalCloseButton = useRef<HTMLButtonElement | null>(null)

  const [selectedUsers, setSelectedUsers] = useState<FoundUsers[]>([])

  const addToChat = (user: FoundUsers) =>
    setSelectedUsers([...selectedUsers, user])

  const removeFromChat = (id: string) =>
    setSelectedUsers(selectedUsers.filter((member) => member.id !== id))

  const clearData = () => {
    setSelectedUsers([])
  }

  const [remove, { loading: removeLoading }] = useMutation(removeMembers, {
    onError(err) {
      toast.error(err.message)
    },
    onCompleted(data) {
      toast.success(data.removeMembers.message)
      clearData()
      modalCloseButton.current?.click()
      navigate(
        "remove",
        selectedUsers.map((users) => users.username ?? ""),
      )
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
      <Text onClick={onOpen} flex={"1"}>
        Remove Users
      </Text>
      <Modal isOpen={isOpen} onCloseComplete={clearData} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader textAlign={"center"}>Remove Users</ModalHeader>
          <ModalCloseButton ref={modalCloseButton} />
          <ModalBody mt={"2"}>
            <UserList
              users={members}
              selectedUsers={selectedUsers}
              addToChat={addToChat}
              removeFromChat={removeFromChat}
            />

            {selectedUsers.length > 0 && (
              <UsersInChat
                removeFromChat={removeFromChat}
                inChat={selectedUsers}
                create={removeUsers}
                loading={removeLoading}
                buttonText="Remove Users"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RemoveMembers
