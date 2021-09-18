import { 
  Flex, 
  Center, 
  Text, 
  Button, 
  Input,
  HStack
} from "@chakra-ui/react"
import { io } from "socket.io-client";

const socket = io();

function ButtonSend(props) {
  return (
    <Center>
      <Button 
        isLoading = {false} //edit this later seeing if it was pressed
        size="lg" 
        colorScheme="button" 
        color="white"
        onClick={props.function}
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

      <ButtonSend text="Create a Lobby!" function={()=>socket.emit("newRoom")}/>

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
          <ButtonSend text="Join a Lobby!"/>
        </HStack>
      </Flex>
    </Flex>
  )
}

export default Home