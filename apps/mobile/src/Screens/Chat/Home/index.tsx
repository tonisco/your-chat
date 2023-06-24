import { Stack, useColorModeValue } from "native-base"
import React from "react"

import ConversationList from "./ConversationList"
import CreateChat from "./CreateChat"
import SubscriptionsWrapper from "../SubscriptionsWrapper"

const Home = () => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  return (
    <SubscriptionsWrapper>
      <Stack bgColor={bg} p="4" h="full">
        <CreateChat />
        <ConversationList />
      </Stack>
    </SubscriptionsWrapper>
  )
}

export default Home
