import { useRef, useState } from "react"
import { BsSend } from "react-icons/bs"

import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"

type FormProps = {
  body: string
  messageId: string
}

type Props = {
  message: string
  loading: boolean
  saveNewMessage: (props: FormProps) => Promise<void>
  messageId: string
}

const EditMessage = ({
  message,
  loading,
  saveNewMessage,
  messageId,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const othersBg = useColorModeValue("blackAlpha.200", "whiteAlpha.200")

  const [body, setBody] = useState("")

  const modalCloseButton = useRef<HTMLButtonElement | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await saveNewMessage({ body, messageId })
    modalCloseButton.current?.click()
  }

  return (
    <>
      <Text flex="1" onClick={onOpen}>
        Edit Message
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb="6">
          <ModalHeader textAlign={"center"}>Edit Message</ModalHeader>
          <ModalCloseButton ref={modalCloseButton} />
          <ModalBody>
            <Stack gap={"4"}>
              <Flex gap={"1"} alignItems={"flex-end"}>
                <Text fontSize={"sm"}>Current Message :</Text>
                <Text>{message}</Text>
              </Flex>
              <form onSubmit={onSubmit}>
                <InputGroup>
                  <Input
                    placeholder="New message"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                  />
                  <InputRightElement
                    itemType="button"
                    cursor={"pointer"}
                    bgColor={othersBg}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <button type="submit">
                        <BsSend />
                      </button>
                    )}
                  </InputRightElement>
                </InputGroup>
              </form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditMessage
