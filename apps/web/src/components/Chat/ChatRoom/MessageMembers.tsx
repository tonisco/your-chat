import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { getConversationsMembers } from "queries"
import { BiArrowBack } from "react-icons/bi"
import { BsThreeDotsVertical } from "react-icons/bs"

import { useQuery } from "@apollo/client"
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
import RemoveMembers from "./RemoveMembers"

type NavigateProps = (
  method: "remove" | "add",
  memberUsername: string[],
) => void

const MessageMembers = () => {
  const { data: session } = useSession()

  const searchParams = useSearchParams()
  const membersText = searchParams.get("members")
  const id = searchParams.get("id")

  const router = useRouter()

  const navigate: NavigateProps = (method, memberUsername) => {
    let members = membersText!

    if (method === "add") {
      members = [...memberUsername, members].join(", ")
    } else {
      members = members
        .split(", ")
        .filter((mem) => !memberUsername.includes(mem))
        .join(", ")
    }

    const params = new URLSearchParams({ id: id ?? "", members })

    router.push(`/?${params}`)
  }

  const { data } = useQuery(getConversationsMembers, {
    variables: { conversationId: id ?? "" },
  })

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
            {membersText}
          </Text>
        </Flex>
        <Menu>
          <MenuButton as={Button}>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <AddMembers conversationId={id ?? ""} navigate={navigate} />
            </MenuItem>
            {data &&
              (data?.getConversationsMembers.length < 3 ? (
                <MenuItem isDisabled>Remove Members</MenuItem>
              ) : (
                <MenuItem>
                  <RemoveMembers
                    conversationId={id ?? ""}
                    members={data.getConversationsMembers.filter(
                      (mem) => mem.id !== session?.user.id,
                    )}
                    navigate={navigate}
                  />
                </MenuItem>
              ))}
            <MenuItem>Delete Chat</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Divider />
    </Stack>
  )
}

export default MessageMembers
