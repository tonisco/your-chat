import { useMutation } from "@apollo/client"
import {
  Button,
  Center,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "native-base"
import { createUsername } from "queries"
import React, { useState } from "react"
import { Alert, ScrollView } from "react-native"

import { useAuthContext } from "../../Providers/AuthProvider"
import { ToastSuccess } from "../../Utils/Toast"

const CreateUsername = () => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  const color = useColorModeValue("brand.text", "brand.textDark")
  const border = useColorModeValue("dark.500", "coolGray.500")

  const toast = useToast()

  const [username, setUsername] = useState("")

  const { updateUsername } = useAuthContext()

  const [create, { loading }] = useMutation(createUsername, {
    async onCompleted(data) {
      await updateUsername(username)
      toast.show({
        render: () => <ToastSuccess message={data.createUsername.message} />,
        placement: "top",
      })
    },

    onError(err) {
      Alert.alert("Failed to Create Username", err.message)
    },
  })

  const saveUsername = () => create({ variables: { username } })

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Center bg={bg} height="full">
        <Stack space={6}>
          <Text fontSize="3xl" display="flex" color={color}>
            Create Username
          </Text>
          <Input
            rounded="lg"
            _focus={{ backgroundColor: bg, borderColor: border }}
            borderColor={border}
            color={color}
            value={username}
            onChangeText={(e) => setUsername(e)}
          />
          <Center>
            <Button
              isLoadingText="Creating"
              onPress={saveUsername}
              isLoading={loading}
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
              isDisabled={username.length <= 2}
            >
              Create
            </Button>
          </Center>
        </Stack>
      </Center>
    </ScrollView>
  )
}

export default CreateUsername
