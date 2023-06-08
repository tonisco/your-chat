import React from "react"
import { FoundUsers } from "queries/src/types"

import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react"

type Props = {
  users: FoundUsers[]
  addToChat: (user: FoundUsers) => void
  selectedUsers: FoundUsers[]
  removeFromChat: (id: string) => void
}

const UserList = ({
  users,
  addToChat,
  selectedUsers,
  removeFromChat,
}: Props) => {
  if (users.length === 0)
    return (
      <Flex mt={6} justify={"center"}>
        <Text>No user found </Text>
      </Flex>
    )

  return (
    <Stack mt="4">
      {users.map((user) => (
        <Flex
          key={user.id}
          p="2"
          rounded={"lg"}
          justify={"space-between"}
          align={"center"}
        >
          <Flex gap={"4"}>
            <Avatar size={"sm"} src={user.image ?? undefined} />
            <Text textTransform={"capitalize"}>{user.username}</Text>
          </Flex>
          {selectedUsers.find((member) => member.id === user.id) ? (
            <Button
              bgColor={"red.800"}
              _hover={{ bgColor: "red.800" }}
              _active={{ bgColor: "red.700" }}
              textColor={"white"}
              onClick={() => removeFromChat(user.id)}
              size={"sm"}
            >
              Remove
            </Button>
          ) : (
            <Button onClick={() => addToChat(user)} size={"sm"}>
              Select
            </Button>
          )}
        </Flex>
      ))}
    </Stack>
  )
}

export default UserList
