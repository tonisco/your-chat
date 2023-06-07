import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Input,
  Text,
} from "@chakra-ui/react"
import React from "react"

const CreateChat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Create a New Chat</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader textAlign={"center"}>Create a Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody mt={"2"}>
            <Stack spacing={4}>
              <Text>Find Users</Text>
              <Input
                placeholder="Enter a username"
                _focus={{ borderColor: "" }}
              />
              <Button>Find </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateChat
