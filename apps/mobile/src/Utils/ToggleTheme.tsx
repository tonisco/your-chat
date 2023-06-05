import { AntDesign } from "@expo/vector-icons"
import { Fab, Icon } from "native-base"
import React from "react"

const ToggleTheme = () => {
  return (
    <>
      <Fab
        renderInPortal={false}
        shadow={2}
        placement="top-right"
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="barchart" size="sm" />}
      >
        Hello
      </Fab>
      <AntDesign name="barchart" size={30} color="black" />
    </>
  )
}

export default ToggleTheme
