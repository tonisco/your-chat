import { useMutation } from "@apollo/client"
import {
  Button,
  Center,
  Input,
  KeyboardAvoidingView,
  Stack,
  Text,
  useColorModeValue,
} from "native-base"
import { createUsername } from "queries"
import React from "react"
import { Keyboard } from "react-native"

import { User, useAuthContext } from "../../Providers/AuthProvider"

type Props = {
  user: User
}

const CreateUsername = ({}: Props) => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const color = useColorModeValue("brand.text", "brand.textDark")

  const { saveUser } = useAuthContext()

  return (
    <Center bg={bg} height="full">
      <Stack space={6}>
        <Text fontSize="3xl" display="flex" color={color}>
          Create Username
        </Text>
        <Input
          rounded="lg"
          _focus={{ backgroundColor: bg, borderColor: color }}
          borderColor={color}
          color={color}
        />
        <Center>
          <Button
            isLoadingText="Creating"
            //   onPress={() => {
            //     promptAsync()
            //   }}
            //   isLoading={loading}
            size="lg"
            outlineColor={color}
            px="6"
            rounded="md"
            color="red.500"
            _text={{ color }}
            _spinner={{ color, marginRight: "4" }}
            _pressed={{ backgroundColor: bg, opacity: ".6" }}
            bg={bg}
            shadow="5"
          >
            Create
          </Button>
        </Center>
      </Stack>
    </Center>
  )
}

export default CreateUsername
