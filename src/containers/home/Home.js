import { 
  Flex, 
  Center, 
  Text, 
  Button, 
  Input,
  HStack
} from "@chakra-ui/react"
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import socket from '../../store/socket'

export function ButtonSend(props) {
  const [pressed, setPressed] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    setPressed(true);
    props.function();
    history.push(props.destination);
  }

  return (
    <Center>
      <Button
        isLoading = {pressed}
        size="lg" 
        colorScheme="button" 
        color="white"
        onClick={handleClick}
      >
        {props.text}
      </Button>
    </Center>
  )
}

function Home() {
  const [roomCode, setRoomCode] = useState();

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

      <ButtonSend text="Create a Lobby!" destination="/lobby" function={()=>socket.emit("newGame")}/>

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
              value={roomCode}
              onChange={(event) => {setRoomCode(event.target.value)}}
            />
          </Center>
          <ButtonSend text="Join a Lobby!" destination="/lobby" function={() => socket.emit("joinGame", roomCode)}/>
        </HStack>
      </Flex>
    </Flex>
  )
}

export default Home