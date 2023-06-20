import React from "react"

import { HStack, Skeleton, Stack } from "native-base"

type Props = {
  index: number
}

const MessageLoading = ({ index }: Props) => {
  if (index % 2 === 0)
    return (
      <HStack maxW={"70%"} space={"2"} alignItems={"flex-end"}>
        <Skeleton rounded={"full"} size={"10"} w="10" />
        <Stack space="2" w="full">
          <Skeleton height={"8"} rounded={"lg"} w="32" />
          <Skeleton w={"full"} height={"8"} rounded={"lg"} />
        </Stack>
      </HStack>
    )

  return (
    <HStack justifyContent={"flex-end"}>
      <Skeleton maxW={"70%"} w={"full"} height={"8"} rounded={"lg"} />
    </HStack>
  )
}

export default MessageLoading
