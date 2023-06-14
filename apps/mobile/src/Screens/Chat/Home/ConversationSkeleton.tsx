import { HStack, Skeleton, VStack } from "native-base"
import React from "react"

const ConversationSkeleton = () => {
  return (
    <HStack p="2" space="3" mt="2">
      <Skeleton w="10" rounded="full" />
      <VStack flex="1" space="3">
        <Skeleton rounded="lg" h="8" />
        <Skeleton rounded="lg" h="6" />
      </VStack>
      <Skeleton w="12" rounded="lg" h="6" />
    </HStack>
  )
}

export default ConversationSkeleton
