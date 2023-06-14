import React from "react"

import { Divider, Flex, Skeleton, Stack } from "@chakra-ui/react"

type Props = {
  length: number
  index: number
}

const ConversationSkeleton = ({ index, length }: Props) => {
  return (
    <>
      <Flex p="2" gap="3" mt="2" alignItems={"center"}>
        <Skeleton w="10" h={"10"} rounded="full" />
        <Stack flex="1" gap="3">
          <Skeleton rounded="lg" h="8" />
          <Skeleton rounded="lg" h="6" />
        </Stack>
        <Skeleton w="12" rounded="lg" h="6" />
      </Flex>
      {length - 1 !== index && <Divider />}
    </>
  )
}

export default ConversationSkeleton
