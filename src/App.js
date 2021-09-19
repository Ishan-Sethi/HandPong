import { useEffect, useState } from "react"
import { ChakraProvider , extendTheme } from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './containers/home/Home'
import Handtrack from './containers/handtrack/Handtrack'
import Lobby from './containers/lobby/Lobby'

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
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/handtrack">
            <Handtrack />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}