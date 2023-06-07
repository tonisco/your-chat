import { Stack, useColorModeValue } from "native-base"
import React from "react"

import CreateChat from "./CreateChat"

const Home = () => {
  const bg = useColorModeValue("brand.bg", "brand.bgDark")
  return (
    <Stack bgColor={bg} p="4" h="full">
      <CreateChat />
    </Stack>
  )
}

export default Home
