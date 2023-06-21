"use client"

import React from "react"
import { FaMoon, FaSun } from "react-icons/fa"

import { Button, Icon, useColorMode } from "@chakra-ui/react"

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
        zIndex={"modal"}
      >
        <Icon as={FaSun} w={6} h={6} color={"yellow.300"} />
      </Button>
    )

  return (
    <Button
      pos={"fixed"}
      zIndex={"modal"}
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
