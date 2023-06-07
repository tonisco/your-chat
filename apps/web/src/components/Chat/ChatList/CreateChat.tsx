"use client"
import { useQuery, useLazyQuery } from "@apollo/client"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Input,
  Text,
} from "@chakra-ui/react"
import { findUsers } from "queries"
import React, { useState } from "react"
import { toast } from "react-hot-toast"
import UserList from "./UserList"

const CreateChat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [username, setUsername] = useState("")

  const [query, { loading, data }] = useLazyQuery(findUsers, {
    onError(err) {
      toast.error(err.message)
    },
  })

  const find = (e: React.FormEvent) => {
    e.preventDefault()
    query({ variables: { username } })
  }

  return (
    <>
      <Button onClick={onOpen}>Create a New Chat</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader textAlign={"center"}>Create a Chat</ModalHeader>
          <ModalCloseButton />
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
            {data?.findUsers && <UserList users={data.findUsers} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateChat
