import { useLazyQuery, useMutation } from "@apollo/client"
import { NavigationProp, useNavigation } from "@react-navigation/native"
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
import { addNewMembers, findUsersNotInChat } from "queries"
import { FoundUsers } from "queries/src/types"
import React, { useState } from "react"

import { ToastError, ToastSuccess } from "../../../Utils/Toast"
import { ChatNavigatorScreen } from "../../../types/screen"
import UserList from "../Home/UserList"
import UsersInChat from "../Home/UsersInChat"

type Props = {
  conversationId: string
  members: string
}

const AddMembers = ({ conversationId, members }: Props) => {
  const { setParams } =
    useNavigation<NavigationProp<ChatNavigatorScreen, "Details">>()

  const [showModal, setShowModal] = useState(false)

  const color = useColorModeValue("brand.text", "brand.textDark")
  const colorScheme = useColorModeValue("dark", "coolGray")
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const pressed = useColorModeValue("dark.700", "coolGray.700")
  const border = useColorModeValue("dark.500", "coolGray.500")

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
      Toast.show({
        render: () => <ToastError message={err.message} />,
        placement: "top",
      })
    },
    fetchPolicy: "network-only",
    onCompleted(data) {
      setFoundUsersData(data.findUsersNotInChat)
    },
  })

  const find = () => {
    query({ variables: { username, conversationId } })
  }

  const clearData = () => {
    setFoundUsersData(null)
    setUsername("")
    setSelectedUsers([])
    setShowModal(false)
  }

  const [add, { loading: addLoading }] = useMutation(addNewMembers, {
    onError(err) {
      Toast.show({
        render: () => <ToastError message={err.message} />,
        placement: "top",
      })
    },
    onCompleted(data) {
      Toast.show({
        render: () => <ToastSuccess message={data.addNewMembers?.message} />,
        placement: "top",
      })
      clearData()
      let newNames = selectedUsers
        .map((user) => user.username?.toUpperCase())
        .join(", ")

      newNames = [newNames, members].join(", ")

      setParams({ id: conversationId, members: newNames })
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
                  onPress={find}
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
                    create={addNew}
                    loading={addLoading}
                    buttonText="Add to Chat"
                    buttonTextLoading="Adding to Chat"
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

export default AddMembers
