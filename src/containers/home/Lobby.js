import { color } from '@chakra-ui/styled-system';
import React from 'react'
import Sketch from 'react-p5'

function Lobby() {
    //width and height of monitor
    const WIDTH = 1500;
    const HEIGHT = 750;

    var i = 0;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
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
        <div style={{
            margin: 20,
            display: "flex",
            justifyContent: "center",
            alignItem: "center"
        }}>
            <Sketch setup={setup} draw={draw} />
        </div>
    )
}

export default Lobby