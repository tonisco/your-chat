import { Avatar, Button, HStack, Stack, Text } from "native-base"
import { FoundUsers } from "queries/src/types"
import React from "react"

type Props = {
  users: FoundUsers[]
}

const UserList = ({ users }: Props) => {
  if (users.length === 0)
    return (
      <Stack mt={6} alignItems="center">
        <Text>No user found </Text>
      </Stack>
    )

  return (
    <Stack mt="4" space="4">
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
          <Button size="sm">Select</Button>
        </HStack>
      ))}
    </Stack>
  )
}

export default UserList
