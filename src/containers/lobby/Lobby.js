import { useState } from 'react'
import Sketch from 'react-p5'
import {
    Flex,
    Center,
    Input,
    HStack,
    Spacer,
} from "@chakra-ui/react"
import socket from '../../store/socket'
import { ButtonSend } from '../home/Home'

const WIDTH = 1500;
const HEIGHT = 750;

function Lobby() {
    // player names
    var playerName1 = '';
    var playerName2 = '';
    var playerName3 = '';
    var playerName4 = '';
    var i = 0;

    const setup = (p5, canvasParentRef) => {
        var cnv = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
        var x = (p5.windowWidth - WIDTH) / 2;
        var y = (p5.windowHeight - HEIGHT) / 2;
        cnv.position(x, y);
        p5.background(255, 0, 200)
    }

    const windowResized = (p5) => {
        var cnv = p5.createCanvas(WIDTH, HEIGHT);
        var x = (p5.windowWidth - WIDTH) / 2;
        var y = (p5.windowHeight - HEIGHT) / 2;
        cnv.position(x, y);
        p5.background(255, 0, 200)
    }

    const draw = p5 => {
        i+=0.05;
        //bg
        p5.background(222,255,252);

        //arcs
        p5.strokeWeight(4);
        p5.noFill(); 

        //arcs player1
        p5.stroke(201,142,205,100);
        p5.arc(150,400,100,100,0+i, 180+i,true);
        p5.arc(150,400,50,100,25+i, Math.PI+25+i,true);
        p5.arc(150,400,100,50,0+i, 123+i,true);
        p5.arc(150,400,120,120,Math.PI+i, 150+i,true);
        //Player Name
        p5.fill (245, 236, 205,20);
        p5.textSize (24);
        p5.textFont ('sans-serif');
        p5.text ('5',190,440);

        //arcs player2
        p5.stroke(86,69,76,150);
        p5.arc(550,400,100,100,20+i, 120+i,true);
        p5.arc(550,400,50,100,40+i, Math.PI+25+i,true);
        p5.arc(550,400,100,50,0+i, 123+i,true);
        p5.arc(550,400,120,120,220+i, 150+i,true);

        //arcs player3
        p5.stroke(231,200,221,200);
        p5.arc(950,400,150,100,40+i, 180+i,true);
        p5.arc(950,400,50,100,60+i, Math.PI+25+i,true);
        p5.arc(950,400,100,50,5+i, 123+i,true);
        p5.arc(950,400,120,120,220+i, 150+i,true);

        //arcs player4
        p5.stroke(166,226,198, 200);
        p5.arc(1350,400,100,100,0+i, 180+i,true);
        p5.arc(1350,400,50,100,20+i, Math.PI+25+i,true);
        p5.arc(1350,400,150,40,220+i, 150+i,true);
    }

    return (
        <Flex
            minH="100vh"
            h="100vh"
            width="100vw"
            direction="column"
            justifyContent="center"
            alignItem="center"
            display="inline-block"
            bg="brand.400"
        >     
            <Sketch setup={setup} windowResized={windowResized} draw={draw} />
            <Flex 
                minH="100vh"
                h="100vh"
                width="100vw"
                justifyContent="center"
                alignItem="center"
            >
                <Flex direction="column">
                    <HStack m={5} spacing="30vw">
                        <ButtonSend text="Leave Lobby"  function={()=>socket.emit("leaveLobby")}/>
                        <ButtonSend text="Start Game" function={()=>socket.emit("starmGame")}/>
                    </HStack>
                    <Spacer />
                    <HStack m={5} spacing="5vw">
                        <Center>
                            <Input
                            placeholder="Enter your Nickname"
                            variant="unstyled"
                            bg="white"
                            p="3"
                            type="lobbyCode"
                            />
                        </Center>
                        <ButtonSend text="Set Name" function={()=>socket.emit("setName")}/>
                    </HStack>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Lobby