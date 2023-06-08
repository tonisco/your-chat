"use client"

import React from "react"

import { Flex } from "@chakra-ui/react"

import ChatList from "./ChatList"
import ChatRoom from "./ChatRoom"

type Props = {}

const Chat = (props: Props) => {
  return (
    <Flex height={"100vh"}>
      <ChatList />
      <ChatRoom />
    </Flex>
  )
}

export default Chat
