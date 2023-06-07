import {
  Button,
  Center,
  Input,
  Modal,
  Stack,
  Text,
  useColorModeValue,
} from "native-base"
import React, { useState } from "react"

const CreateChat = () => {
  const [showModal, setShowModal] = useState(false)

  const color = useColorModeValue("brand.text", "brand.textDark")
  const colorScheme = useColorModeValue("dark", "coolGray")
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const pressed = useColorModeValue("dark.700", "coolGray.700")
  const border = useColorModeValue("dark.500", "coolGray.500")

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
          <Modal.Content bgColor={bg}>
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
                />
                <Button
                  colorScheme={colorScheme}
                  _text={{ color }}
                  rounded="lg"
                  _pressed={{ bgColor: pressed }}
                  //   isDisabled={true}
                >
                  Find
                </Button>
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  )
}

export default CreateChat
