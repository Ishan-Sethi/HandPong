import { 
  Flex, 
  Center, 
  Text, 
  Button, 
  Input,
  HStack
} from "@chakra-ui/react"
import socketClient from "socket.io-client";
import { useState } from 'react';

const SERVER = "http://192.168.1.171:8080";
var socket = socketClient(SERVER, {transports: ['websocket']});

function ButtonSend(props) {
  const [pressed, setPressed] = useState(0);

  return (
    <Center>
      <Button
        isLoading = {pressed}
        size="lg" 
        colorScheme="button" 
        color="white"
        onClick={() => {
          setPressed(true);
          props.function();
        }}
      >
        {props.text}
      </Button>
    </Center>
  )
}

function Home() {
  return (
    <Flex 
      minH="100vh" 
      h="100vh"   
      direction="column" 
      justifyContent="center"
      bg="brand.500"
    >
      <Center>
        <Text fontSize="5xl" color="brand.900">TITLE TEXT IPSUM</Text>
      </Center>

      <ButtonSend text="Create a Lobby!" function={()=>socket.emit("newGame")}/>

      <Center>
        <Text fontSize="2xl" color="brand.900">or</Text>
      </Center>

      <Flex
        minW="100vw" 
        w="100vw" 
        justifyContent="center"
      >
        <HStack spacing="12px">
          <Center>
            <Input 
              placeholder="Place Your Code Here"
              variant="unstyled"
              bg="white"
              p="3"
              type="lobbyCode" 
            />
          </Center>
          <ButtonSend text="Join a Lobby!" function={()=>socket.emit("joinGame")}/>
        </HStack>
      </Flex>
    </Flex>
  )
}

export default Home