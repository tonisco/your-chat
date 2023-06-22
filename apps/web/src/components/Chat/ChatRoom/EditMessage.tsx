import { useState } from "react"
import { BsSend } from "react-icons/bs"

import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"

type Props = {
  message: string
}

const EditMessage = ({ message }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const othersBg = useColorModeValue("blackAlpha.200", "whiteAlpha.200")

  const [body, setBody] = useState("")
  let loading = false

  return (
    <>
      <Text flex="1" onClick={onOpen}>
        Edit Message
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb="6">
          <ModalHeader textAlign={"center"}>Edit Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={"4"}>
              <Flex gap={"1"} alignItems={"flex-end"}>
                <Text fontSize={"sm"}>Current Message :</Text>
                <Text>{message}</Text>
              </Flex>
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
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditMessage
