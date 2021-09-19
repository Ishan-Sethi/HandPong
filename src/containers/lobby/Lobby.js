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
import { ButtonSend } from '../home/Home'

function Lobby() {
    return (
        <Flex
            minH="100vh" //styling, react shortens, minimum height
            h="100vh" //height - 100 viewport height
            direction="column"
            justifyContent="center"
            bg="brand.600" //background colour
        >
            <HStack spacing="12px">
                <Center>
                    <Input
                    placeholder="Enter your Nickname"
                    variant="unstyled"
                    bg="white"
                    p="3"
                    type="lobbyCode"
                    />
                </Center>
                <ButtonSend text="Join a Lobby!" function={()=>socket.emit("joinGame")}/>
            </HStack>
        </Flex>
    )
}

export default Lobby