import { color } from '@chakra-ui/styled-system';
import React from 'react'
import Sketch from 'react-p5'

function Game() {
    //width and height of monitor
    const WIDTH = 700;
    const HEIGHT = 700;
    
    //background variables
    var c1,c2

    //ball varaibles
    var ballXVel = 5;
    var ballYVel = 5;
    var ballXPos = WIDTH/2;
    var ballYPos = HEIGHT/2;

    //player1 variables
    var p1X=10;
    var p1Y=350;

    //player2 variables


    //player3 variables


    //player4 variables



    function updateBallPosition() {
        if (ballXPos > WIDTH-10 || ballXPos < 10){
            ballXVel *= -1;
        }
        if (ballYPos > HEIGHT-10 || ballYPos < 0){
            ballYVel *= -1;
        }
        ballXPos += ballXVel;
        ballYPos += ballYVel;
    }

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
    }

    const draw = p5 => {
        //bg
        p5.noStroke();
        p5.background(222,255,252);

        p5.rect(10, 200, 50,50);

        //ball
        p5.ellipse(ballXPos, ballYPos, 20);

        //player1 paddle
        p5.rect(p1X,p1Y, 10,100);

        //movement
        updateBallPosition();
        console.log(ballXPos + " " + ballYPos);
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

export default Game

