import { useLazyQuery } from "@apollo/client"
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
import { findUsers } from "queries"
import React, { useState } from "react"

import UserList from "./UserList"
import { ToastError } from "../../../Utils/Toast"

const CreateChat = () => {
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState("")

  const color = useColorModeValue("brand.text", "brand.textDark")
  const colorScheme = useColorModeValue("dark", "coolGray")
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const pressed = useColorModeValue("dark.700", "coolGray.700")
  const border = useColorModeValue("dark.500", "coolGray.500")

  const [find, { data, loading }] = useLazyQuery(findUsers, {
    onError(err) {
      Toast.show({
        render: () => <ToastError message={err.message} />,
        placement: "top",
      })
    },
  })

  const search = () => find({ variables: { username } })

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
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
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
                {data?.findUsers && <UserList users={data.findUsers} />}
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  )
}

export default CreateChat
