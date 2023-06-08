import { Avatar, Button, HStack, Stack, Text } from "native-base"
import { FoundUsers } from "queries/src/types"
import React from "react"

type Props = {
  users: FoundUsers[]
  addToChat: (user: FoundUsers) => void
  selectedUsers: FoundUsers[]
  removeFromChat: (id: string) => void
}

const UserList = ({
  users,
  addToChat,
  removeFromChat,
  selectedUsers,
}: Props) => {
  if (users.length === 0)
    return (
      <Stack mt={6} alignItems="center">
        <Text>No user found </Text>
      </Stack>
    )

  return (
    <Stack mt="6" space="4">
      {users.map((user) => (
        <HStack
          key={user.id}
          p="2"
          rounded="lg"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack space="4" alignItems="center">
            <Avatar size="sm" source={{ uri: user.image ?? undefined }} />
            <Text fontSize="md" textTransform="capitalize">
              {user.username}
            </Text>
          </HStack>
          {selectedUsers.find((member) => member.id === user.id) ? (
            <Button
              bgColor="red.800"
              onPress={() => removeFromChat(user.id)}
              size="sm"
            >
              Remove
            </Button>
          ) : (
            <Button onPress={() => addToChat(user)} size="sm">
              Select
            </Button>
          )}
        </HStack>
      ))}
    </Stack>
  )
}

export default UserList
