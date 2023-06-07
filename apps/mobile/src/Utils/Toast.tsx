import { Box, useColorModeValue } from "native-base"
import React from "react"

type Props = {
  message: string
}

export const ToastSuccess = ({ message }: Props) => {
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

export const ToastError = ({ message }: Props) => {
  return (
    <Box
      bg="red.600"
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
