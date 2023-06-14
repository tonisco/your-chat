import {
  Button,
  VStack,
  CloseIcon,
  useColorModeValue,
  HStack,
  Text,
  Pressable,
} from "native-base"
import { FoundUsers } from "queries/src/types"
import React from "react"

type Props = {
  removeFromChat: (id: string) => void
  inChat: FoundUsers[]
  create: () => void
  loading: boolean
}

const UsersInChat = ({ removeFromChat, inChat, create, loading }: Props) => {
  const color = useColorModeValue("brand.text", "brand.textDark")
  const colorScheme = useColorModeValue("dark", "coolGray")
  const pressed = useColorModeValue("dark.700", "coolGray.700")
  const bg = useColorModeValue("gray.300", "dark.300")

  return (
    <VStack mt="4" space="5">
      <HStack space={2} flexWrap="wrap">
        {inChat.map((val) => (
          <Pressable key={val.id} onPress={() => removeFromChat(val.id)} mb="2">
            <HStack
              rounded="md"
              bgColor={bg}
              space={2}
              py="1"
              px="2"
              alignItems="center"
            >
              <Text fontSize="xs" color={color} textTransform="capitalize">
                {val.username}
              </Text>
              <CloseIcon color={color} size="xs" />
            </HStack>
          </Pressable>
        ))}
      </HStack>
      <Button
        isDisabled={inChat.length < 1}
        isLoading={loading}
        isLoadingText="Starting Chat"
        onPress={create}
        colorScheme={colorScheme}
        _text={{ color }}
        _pressed={{ bgColor: pressed }}
      >
        Start Chat
      </Button>
    </VStack>
  )
}

export default UsersInChat
