import { Box, useColorModeValue } from "native-base"
import React from "react"

type Props = {
  message: string
}

const Toast = ({ message }: Props) => {
  const green = useColorModeValue("brand.green", "brand.greenDark")

  return (
    <Box
      bg={green}
      px="4"
      py="2"
      rounded="sm"
      mb={5}
      _text={{
        fontSize: "md",
        color: "brand.textDark",
        textTransform: "capitalize",
      }}
    >
      {message}
    </Box>
  )
}

export default Toast
