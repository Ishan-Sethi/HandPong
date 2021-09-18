import { Flex, Center, Text } from "@chakra-ui/react"

export default function Home() {
  return (
    <Flex minH="100vh" height="100vh" color="brand.700">
      <Center minH="100vh" height="100vh" w="20%" bg="brand.400" >
        <Text>Test 1</Text>
      </Center>
      <Center minH="100vh" height="100vh" w="50%" bg="brand.500" >
        <Text>Test 2</Text>
      </Center>
      <Center minH="100vh" height="100vh" w="30%" bg="brand.600" >
        <Text>Test 3</Text>
      </Center>
    </Flex>
  )
}
