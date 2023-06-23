import {
  Button,
  Center,
  HStack,
  Modal,
  Stack,
  Text,
  useColorModeValue,
} from "native-base"
import React from "react"

type Props = {
  currMessage: string
  messageId: string
  cleanMessage: (messageId: string) => Promise<void>
  deleteLoading: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  showModal: boolean
}

const DeleteMessage = ({
  cleanMessage,
  deleteLoading,
  currMessage,
  messageId,
  setShowModal,
  showModal,
}: Props) => {
  const color = useColorModeValue("brand.text", "brand.textDark")
  const colorScheme = useColorModeValue("dark", "coolGray")
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const pressed = useColorModeValue("dark.700", "coolGray.700")

  const clean = async () => {
    await cleanMessage(messageId)
    setShowModal(false)
  }

  return (
    <>
      <Center>
        <Modal isOpen={showModal} size="lg" onClose={() => setShowModal(false)}>
          <Modal.Content bgColor={bg} maxH="4/5">
            <Modal.CloseButton />
            <Modal.Header bgColor={bg} alignSelf="center">
              Delete Message
            </Modal.Header>
            <Modal.Body mb="6">
              <Stack space="4">
                <Text color={color}>
                  Are you sure you want to delete this message?
                </Text>
                <Text fontSize="sm" color={color}>
                  Current message: {currMessage}
                </Text>
                <HStack alignSelf="flex-end" space="4">
                  <Button
                    colorScheme="red"
                    rounded="lg"
                    _pressed={{ bgColor: pressed }}
                    isLoading={deleteLoading}
                    isLoadingText="Changing"
                    onPress={clean}
                  >
                    Yes
                  </Button>
                  <Button
                    _text={{ color }}
                    colorScheme={colorScheme}
                    onPress={() => setShowModal(false)}
                  >
                    No
                  </Button>
                </HStack>
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  )
}

export default DeleteMessage
