import { 
  Flex, 
  Center, 
  Text, 
  Button, 
  FormControl, 
  Input,
  HStack
} from "@chakra-ui/react"

function ButtonSend(props) {
  return (
    <Center>
      <Button 
        isLoading = {false} //edit this later seeing if it was pressed
        size="lg" 
        colorScheme="button" 
        color="white"
      >
        {props.text}
      </Button>  
    </Center>
  )
}

export default function Home() {
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

      <ButtonSend text="Create a Lobby!"/>

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
