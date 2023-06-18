import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BiArrowBack } from "react-icons/bi"

import { Button, Divider, Flex, Stack, Text } from "@chakra-ui/react"

const MessageMembers = () => {
  const searchParams = useSearchParams()
  const members = searchParams.get("members")

  const router = useRouter()

  console.log(members)
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
        <Text>To :</Text>
        <Text textTransform={"capitalize"}>{members}</Text>
      </Flex>
      <Divider />
    </Stack>
  )
}

export default MessageMembers
