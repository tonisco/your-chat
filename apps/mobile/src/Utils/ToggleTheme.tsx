import { Fab, SunIcon, MoonIcon, useColorMode } from "native-base"
import React from "react"

const ToggleTheme = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  if (colorMode === "dark")
    return (
      <Fab
        renderInPortal={false}
        shadow={2}
        placement="top-right"
        top="1"
        size="sm"
        mr="8"
        bgColor="brand.liteBgDark"
        icon={<SunIcon color="yellow.300" size="sm" />}
        onPress={toggleColorMode}
      >
        Hello
      </Fab>
    )

  return (
    <Fab
      renderInPortal={false}
      shadow={2}
      placement="top-right"
      size="sm"
      mr="8"
      bgColor="white"
      top="1"
      icon={<MoonIcon color="brand.bgDark" size="sm" />}
      onPress={toggleColorMode}
    >
      Hello
    </Fab>
  )
}

export default ToggleTheme
