import { useLazyQuery, useMutation } from "@apollo/client"
import {
  Button,
  Center,
  Input,
  Modal,
  Stack,
  Text,
  Toast,
  useColorModeValue,
} from "native-base"
import { createConversation, findUsers } from "queries"
import { FoundUsers } from "queries/src/types"
import React, { useState } from "react"

import UserList from "./UserList"
import UsersInChat from "./UsersInChat"
import { useAuthContext } from "../../../Providers/AuthProvider"
import { ToastError, ToastSuccess } from "../../../Utils/Toast"

const CreateChat = () => {
  const { user } = useAuthContext()

  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState("")
  const [foundUsersData, setFoundUsersData] = useState<FoundUsers[] | null>(
    null,
  )
  const [selectedUsers, setSelectedUsers] = useState<FoundUsers[]>([])

  const addToChat = (user: FoundUsers) =>
    setSelectedUsers([...selectedUsers, user])

  const removeFromChat = (id: string) =>
    setSelectedUsers(selectedUsers.filter((member) => member.id !== id))

  const color = useColorModeValue("brand.text", "brand.textDark")
  const colorScheme = useColorModeValue("dark", "coolGray")
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const pressed = useColorModeValue("dark.700", "coolGray.700")
  const border = useColorModeValue("dark.500", "coolGray.500")

  const [find, { loading }] = useLazyQuery(findUsers, {
    onError(err) {
      Toast.show({
        render: () => <ToastError message={err.message} />,
        placement: "top",
      })
    },
    onCompleted(data) {
      setFoundUsersData(data.findUsers)
    },
  })

  const search = () => find({ variables: { username } })

  const clearData = () => {
    setFoundUsersData(null)
    setUsername("")
    setSelectedUsers([])
    setShowModal(false)
  }

  const [mutate, { loading: createLoading }] = useMutation(createConversation, {
    onError(err) {
      Toast.show({
        render: () => <ToastError message={err.message} />,
        placement: "top",
      })
    },
    onCompleted(data) {
      Toast.show({
        render: () => (
          <ToastSuccess message={data.createConversation.message} />
        ),
        placement: "top",
      })
      clearData()
    },
  })

  const create = () => {
    mutate({
      variables: {
        input: [
          { id: user?.id ?? "" },
          ...selectedUsers.map((members) => ({ id: members.id })),
        ],
      },
    })
  }

  return (
    <>
      <Button
        onPress={() => setShowModal(true)}
        colorScheme={colorScheme}
        _text={{ color }}
        rounded="lg"
      >
        Create a New Chat
      </Button>
      <Center>
        <Modal isOpen={showModal} onClose={clearData} size="lg">
          <Modal.Content bgColor={bg} maxH="4/5">
            <Modal.CloseButton />
            <Modal.Header bgColor={bg} alignSelf="center">
              Create a Chat
            </Modal.Header>
            <Modal.Body mb="6">
              <Stack>
                <Text fontSize="sm" color={color}>
                  Find Users
                </Text>
                <Input
                  _focus={{ backgroundColor: bg, borderColor: border }}
                  borderColor={border}
                  my="4"
                  rounded="lg"
                  fontSize="sm"
                  value={username}
                  onChangeText={setUsername}
                />
                <Button
                  colorScheme={colorScheme}
                  _text={{ color }}
                  rounded="lg"
                  _pressed={{ bgColor: pressed }}
                  isDisabled={username.length <= 2}
                  isLoading={loading}
                  isLoadingText="Finding"
                  onPress={search}
                >
                  Find
                </Button>
                {foundUsersData && (
                  <UserList
                    addToChat={addToChat}
                    removeFromChat={removeFromChat}
                    selectedUsers={selectedUsers}
                    users={foundUsersData}
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
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  )
}

export default CreateChat
