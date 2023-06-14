import { Stack, useColorModeValue } from "native-base"
import React from "react"

import ConversationList from "./ConversationList"
import CreateChat from "./CreateChat"

const Home = () => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  return (
    <Stack bgColor={bg} p="4" h="full">
      <CreateChat />
      <ConversationList />
    </Stack>
  )
}

export default Home
