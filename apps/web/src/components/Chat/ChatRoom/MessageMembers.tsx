import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BiArrowBack } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"

import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react"

import AddMembers from "./AddMembers"

const MessageMembers = () => {
  const searchParams = useSearchParams()
  const members = searchParams.get("members")
  const id = searchParams.get("id")

  const router = useRouter()

  return (
    <Stack pt={"6"} px="6" gap={"2"}>
      <Flex gap={"4"} alignItems={"center"}>
        <Button
          display={{ base: "inline-flex", md: "none" }}
          px="2"
          py="1"
          onClick={() => router.push("/")}
        >
          <BiArrowBack />
        </Button>
        <Flex gap={"2"} flex={"1"}>
          <Text>To :</Text>
          <Text isTruncated textTransform={"capitalize"}>
            {members}
          </Text>
        </Flex>
        <Menu>
          <MenuButton as={Button}>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <AddMembers conversationId={id ?? ""} title="Add Members" />
            </MenuItem>
            <MenuItem>Remove Members</MenuItem>
            <MenuItem>Delete Chat</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Divider />
    </Stack>
  )
}

export default MessageMembers
