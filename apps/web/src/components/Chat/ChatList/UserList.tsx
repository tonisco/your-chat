import {
  Avatar,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { FoundUsers } from "queries/src/types"
import React from "react"

type Props = {
  users: FoundUsers[]
}

const UserList = ({ users }: Props) => {
  const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

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
          <Button size={"sm"}>Select</Button>
        </Flex>
      ))}
    </Stack>
  )
}

export default UserList
