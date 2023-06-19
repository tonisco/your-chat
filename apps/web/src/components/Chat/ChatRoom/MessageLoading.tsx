import React from "react"

import { Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react"

type Props = {
  index: number
}

const MessageLoading = ({ index }: Props) => {
  if (index % 2 === 0)
    return (
      <Flex maxW={"65%"} gap={"2"} alignItems={"flex-end"}>
        <SkeletonCircle size={"10"} w="10" />
        <Stack gap="2" w="full">
          <Skeleton height={"8"} rounded={"lg"} w="32" />
          <Skeleton w={"full"} height={"8"} rounded={"lg"} />
        </Stack>
      </Flex>
    )

  return (
    <Flex justifyContent={"flex-end"}>
      <Skeleton maxW={"65%"} w={"full"} height={"8"} rounded={"lg"} />
    </Flex>
  )
}

export default MessageLoading
