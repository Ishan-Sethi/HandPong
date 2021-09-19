import { useEffect, useState } from 'react'
import Sketch from 'react-p5'
import {
    Flex,
    Center,
    Input,
    Text,
    HStack,
    Spacer,
} from "@chakra-ui/react"
import { socket, GAME_CODE } from '../../store/socket'
import { ButtonSend } from '../home/Home'

const WIDTH = 1500;
const HEIGHT = 750;

function Lobby() {
    var [name, setName] = useState("");
    var [lobby, setLobby] = useState("");
    var [ani , setAni] = useState(0);

    useEffect(()=>{
        socket.on("recieve_state", (state)=>setLobby( JSON.parse(state) ))
    }, [])

    const setup = (p5, canvasParentRef) => {
        var cnv = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
        var x = (p5.windowWidth - WIDTH) / 2;
        var y = (p5.windowHeight - HEIGHT) / 2;
        cnv.position(x, y);
        p5.background(255, 0, 200)
    }

    const draw = p5 => {
        setAni(ani+=0.05);
        //bg
        p5.background(222,255,252);

        //Player1
        p5.stroke(201,142,205,100);
        p5.fill (230,230,250,50);
        p5.textSize (50);
        p5.textFont ('sans-serif');
        p5.text ('1',135,418);
        p5.textSize (32);
        if(lobby) {
            p5.text (lobby.players[0].username,100,500);
        }

        //Player2
        p5.stroke(21,21,21,50);
        p5.fill (151,151,151,50);
        p5.text ('2',535,418);

        //Player3
        p5.stroke(255,192,203,50);
        p5.fill (255,192,203,50);
        p5.text ('3',935,418);

        //Player4
        p5.stroke(152,251,152,50);
        p5.fill (152,251,152,50);
        p5.text ('4',1335,418);

        //arcs
        p5.strokeWeight(4);
        p5.noFill(); 

        //arcs player1
        p5.stroke(201,142,205,100);
        p5.arc(150,400,100,100,0+ani, 180+ani,true);
        p5.arc(150,400,50,100,25+ani, Math.PI+25+ani,true);
        p5.arc(150,400,100,50,0+ani, 123+ani,true);
        p5.arc(150,400,120,120,Math.PI+ani, 150+ani,true);

        //arcs player2
        p5.noFill(); 
        p5.stroke(86,69,76,150);
        p5.arc(550,400,100,100,20+ani, 120+ani,true);
        p5.arc(550,400,50,100,40+ani, Math.PI+25+ani,true);
        p5.arc(550,400,100,50,0+ani, 123+ani,true);
        p5.arc(550,400,120,120,220+ani, 150+ani,true);

        //arcs player3
        p5.noFill(); 
        p5.stroke(231,200,221,200);
        p5.arc(950,400,150,100,40+ani, 180+ani,true);
        p5.arc(950,400,50,100,60+ani, Math.PI+25+ani,true);
        p5.arc(950,400,100,50,5+ani, 123+ani,true);
        p5.arc(950,400,120,120,220+ani, 150+ani,true);

        //arcs player4
        p5.noFill(); 
        p5.stroke(166,226,198, 200);
        p5.arc(1350,400,100,100,0+ani, 180+ani,true);
        p5.arc(1350,400,50,100,20+ani, Math.PI+25+ani,true);
        p5.arc(1350,400,150,40,220+ani, 150+ani,true);
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
            <Flex 
                minH="100vh"
                h="100vh"
                width="100vw"
                justifyContent="center"
                alignItem="center"
            >
                <Flex direction="column">
                    <Sketch setup={setup} windowResize={setup} draw={draw} />
                    <HStack m={5} spacing="10vw">
                        <ButtonSend text="Leave Lobby" destination="/" function={()=>socket.emit("leaveLobby")}/>
                        <ButtonSend text="Start Game" function={()=>socket.emit("startGame")}/>
                    </HStack>
                    <Spacer />
                    <HStack m={5} spacing="5vw">
                        <Center>
                            <Input
                            placeholder="Enter your Nickname"
                            variant="unstyled"
                            bg="white"
                            p="3"
                            value={name}
                            onChange={(event)=>{setName(event.target.value)}}
                            />
                        </Center>
                        <ButtonSend text="Set Name" noLoad={true} function={()=>socket.emit("changeName", name)}/>
                    </HStack>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Lobby