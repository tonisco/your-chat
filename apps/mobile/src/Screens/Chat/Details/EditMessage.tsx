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

type FormProps = {
  body: string
  messageId: string
}

type Props = {
  currMessage: string
  loading: boolean
  saveNewMessage: (props: FormProps) => Promise<void>
  messageId: string
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  showModal: boolean
}

const EditMessage = ({
  currMessage,
  loading,
  messageId,
  saveNewMessage,
  showModal,
  setShowModal,
}: Props) => {
  const color = useColorModeValue("brand.text", "brand.textDark")
  const colorScheme = useColorModeValue("dark", "coolGray")
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const pressed = useColorModeValue("dark.700", "coolGray.700")
  const border = useColorModeValue("dark.500", "coolGray.500")

  const [message, setMessage] = useState("")

  const clearData = () => {
    setMessage("")
    setShowModal(false)
  }

  const submit = async () => {
    await saveNewMessage({ body: message, messageId })
    setShowModal(false)
  }

  return (
    <>
      <Center>
        <Modal isOpen={showModal} onClose={clearData} size="lg">
          <Modal.Content bgColor={bg} maxH="4/5">
            <Modal.CloseButton />
            <Modal.Header bgColor={bg} alignSelf="center">
              Edit Message
            </Modal.Header>
            <Modal.Body mb="6">
              <Stack space="2">
                <Text fontSize="sm" color={color}>
                  Current message: {currMessage}
                </Text>
                <Input
                  _focus={{ backgroundColor: bg, borderColor: border }}
                  placeholder="New Message"
                  borderColor={border}
                  my="4"
                  rounded="lg"
                  fontSize="sm"
                  value={message}
                  onChangeText={setMessage}
                  onSubmitEditing={submit}
                />
                <Button
                  colorScheme={colorScheme}
                  _text={{ color }}
                  rounded="lg"
                  _pressed={{ bgColor: pressed }}
                  isDisabled={message.length <= 2}
                  isLoading={loading}
                  isLoadingText="Changing"
                  onPress={submit}
                >
                  Change Message
                </Button>
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  )
}

export default EditMessage
