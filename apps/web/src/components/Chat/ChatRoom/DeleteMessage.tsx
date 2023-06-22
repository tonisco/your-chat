import React, { useRef } from "react"

import {
  Button,
  Flex,
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

type Props = {
  message: string
  messageId: string
  cleanMessage: (messageId: string) => Promise<void>
  deleteLoading: boolean
}

const DeleteMessage = ({
  message,
  cleanMessage,
  deleteLoading,
  messageId,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const modalCloseButton = useRef<HTMLButtonElement | null>(null)

  const clean = async () => {
    await cleanMessage(messageId)
    modalCloseButton.current?.click()
  }

  return (
    <>
      <Text flex="1" onClick={onOpen}>
        Delete Message
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb="6">
          <ModalHeader textAlign={"center"}>Delete Message</ModalHeader>
          <ModalCloseButton ref={modalCloseButton} />
          <ModalBody>
            <Stack gap={"4"}>
              <Flex gap={"1"} alignItems={"flex-end"}>
                <Text fontSize={"sm"}>Current Message :</Text>
                <Text>{message}</Text>
              </Flex>
              <Text>Are you sure you want to delete this message</Text>
              <Flex gap={"2"}>
                <Button isLoading={deleteLoading} onClick={clean}>
                  Yes
                </Button>
                <Button isLoading={deleteLoading} onClick={onClose}>
                  No
                </Button>
              </Flex>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteMessage
