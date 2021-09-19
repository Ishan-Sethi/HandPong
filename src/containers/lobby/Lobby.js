import {
    Flex,
    Center,
    Text,
    Button,
    Input,
    HStack,
    Textarea,
    Box
} from "@chakra-ui/react"
import { useState } from 'react';
import socket from '../../store/socket'

export default function Lobby() {
    return (
        <Flex
            minH="100vh" //styling, react shortens, minimum height
            h="100vh" //height - 100 viewport height
            direction="column"
            justifyContent="center"
            bg="brand.500" //background colour
        >
            <Box bg="brand.900" w="50%" p={10} colour="white">
                <Textarea Title="HANDPONG" />
            </Box>

            <Center bg="tomato" w="50" h="100px" color="white">
                <Textarea Title="HANDPONG" />
            </Center>
        </Flex>
    )


}