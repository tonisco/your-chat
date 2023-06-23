import { Center, IIconProps, Icon } from "native-base"
import React from "react"
import { Path } from "react-native-svg"

const ThreeDotsIcon = (props: IIconProps) => {
  return (
    <Center>
      <Icon viewBox="0 0 16 16" {...props}>
        <Path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </Icon>
    </Center>
  )
}

export default ThreeDotsIcon
