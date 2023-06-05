"use client"

import { Button, Icon, useColorMode } from "@chakra-ui/react"
import React from "react"
import { FaSun, FaMoon } from "react-icons/fa"

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  if (colorMode === "dark")
    return (
      <Button
        pos={"fixed"}
        top={6}
        right={20}
        bg={"transparent"}
        cursor={"pointer"}
        onClick={toggleColorMode}
      >
        <Icon as={FaSun} w={6} h={6} color={"yellow.300"} />
      </Button>
    )

  return (
    <Button
      pos={"fixed"}
      top={6}
      right={20}
      bg={"transparent"}
      cursor={"pointer"}
      onClick={toggleColorMode}
    >
      <Icon as={FaMoon} w={6} h={6} color={"brand.bgDark"} />
    </Button>
  )
}

export default ThemeToggle
