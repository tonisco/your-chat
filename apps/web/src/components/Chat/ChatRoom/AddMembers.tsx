"use client"
import React, { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { addNewMembers, findUsersNotInChat } from "queries"
import { FoundUsers } from "queries/src/types"
import { toast } from "react-hot-toast"

import { useLazyQuery, useMutation } from "@apollo/client"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
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
  navigate: NavigateProps
}

const AddMembers = ({ conversationId, navigate }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const modalCloseButton = useRef<HTMLButtonElement | null>(null)

  const [username, setUsername] = useState("")
  const [foundUsersData, setFoundUsersData] = useState<FoundUsers[] | null>(
    null,
  )
  const [selectedUsers, setSelectedUsers] = useState<FoundUsers[]>([])

  const addToChat = (user: FoundUsers) =>
    setSelectedUsers([...selectedUsers, user])

  const removeFromChat = (id: string) =>
    setSelectedUsers(selectedUsers.filter((member) => member.id !== id))

  const [query, { loading }] = useLazyQuery(findUsersNotInChat, {
    onError(err) {
      toast.error(err.message)
    },
    fetchPolicy: "network-only",
    onCompleted(data) {
      setFoundUsersData(data.findUsersNotInChat)
    },
  })

  const find = (e: React.FormEvent) => {
    e.preventDefault()
    query({ variables: { username, conversationId } })
  }

  const clearData = () => {
    setFoundUsersData(null)
    setUsername("")
    setSelectedUsers([])
  }

  const [add, { loading: addLoading }] = useMutation(addNewMembers, {
    onError(err) {
      toast.error(err.message)
    },
    onCompleted(data) {
      toast.success(data.addNewMembers?.message)
      clearData()
      modalCloseButton.current?.click()
      navigate(
        "add",
        selectedUsers.map((users) => users.username ?? ""),
      )
    },
  })

  const addNew = () => {
    const members = selectedUsers.map((user) => ({
      id: user.id,
      username: user.username!,
    }))

    add({ variables: { members, conversationId } })
  }

  return (
    <>
      <Text onClick={onOpen} flex={"1"}>
        Add Members
      </Text>
      <Modal isOpen={isOpen} onCloseComplete={clearData} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader textAlign={"center"}>Add Members</ModalHeader>
          <ModalCloseButton ref={modalCloseButton} />
          <ModalBody mt={"2"}>
            <form onSubmit={find}>
              <Stack spacing={4}>
                <Text>Find Users</Text>
                <Input
                  placeholder="Enter a username"
                  _focus={{ borderColor: "" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  isLoading={loading}
                  loadingText={"Finding Users"}
                  isDisabled={username.length <= 1}
                  type="submit"
                >
                  Find
                </Button>
              </Stack>
            </form>
            {foundUsersData && (
              <UserList
                users={foundUsersData}
                selectedUsers={selectedUsers}
                addToChat={addToChat}
                removeFromChat={removeFromChat}
              />
            )}

            {selectedUsers.length > 0 && (
              <UsersInChat
                removeFromChat={removeFromChat}
                inChat={selectedUsers}
                create={addNew}
                loading={addLoading}
                buttonText="Add Users"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddMembers
