"use client"
import React, { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { createConversation, findUsers } from "queries"
import { FoundUsers, Query } from "queries/src/types"
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

import UserList from "./UserList"
import UsersInChat from "./UsersInChat"

const CreateChat = () => {
  const { data: userSession } = useSession()

  const modalCloseButton = useRef<HTMLButtonElement | null>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [username, setUsername] = useState("")
  const [foundUsersData, setFoundUsersData] = useState<FoundUsers[] | null>(
    null,
  )
  const [selectedUsers, setSelectedUsers] = useState<FoundUsers[]>([])

  const addToChat = (user: FoundUsers) =>
    setSelectedUsers([...selectedUsers, user])

  const removeFromChat = (id: string) =>
    setSelectedUsers(selectedUsers.filter((member) => member.id !== id))

  const [query, { loading }] = useLazyQuery<Query>(findUsers, {
    onError(err) {
      toast.error(err.message)
    },
    fetchPolicy: "network-only",
    onCompleted(data) {
      setFoundUsersData(data.findUsers)
    },
  })

  const find = (e: React.FormEvent) => {
    e.preventDefault()
    query({ variables: { username } })
  }

  const clearData = () => {
    setFoundUsersData(null)
    setUsername("")
    setSelectedUsers([])
  }

  const [mutate, { loading: createLoading }] = useMutation(createConversation, {
    onError(err) {
      toast.error(err.message)
    },
    onCompleted(data) {
      toast.success(data.createConversation.message)
      clearData()
      modalCloseButton.current?.click()
    },
  })

  const create = () => {
    mutate({
      variables: {
        input: [
          { id: userSession?.user.id ?? "" },
          ...selectedUsers.map((members) => ({ id: members.id })),
        ],
      },
    })
  }

  return (
    <>
      <Button onClick={onOpen}>Create a New Chat</Button>
      <Modal isOpen={isOpen} onCloseComplete={clearData} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader textAlign={"center"}>Create a Chat</ModalHeader>
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
                  isDisabled={username.length <= 2}
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
                create={create}
                loading={createLoading}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateChat
