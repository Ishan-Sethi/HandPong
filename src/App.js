import * as React from "react"
import { ChakraProvider , extendTheme } from "@chakra-ui/react"

import Home from './components/Home/Home'

const theme = extendTheme({
  colors: {
    brand: {
      400: "#defffc",
      500: "#e2e4f6",
      600: "#e7c8dd",
      700: "#dbafc1",
      800: "#c98ecd",
      900: "#86626e",
    },
    button: {
      500: "#c98ecd",
      600: "#e7c8dd",
      700: "#e7c8dd",
    },
  },
})


export default function App({ Component }) {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  )
}