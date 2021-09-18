import { color } from '@chakra-ui/styled-system';
import React from 'react'
import Sketch from 'react-p5'

function Game() {
    //width and height of monitor
    const WIDTH = 600;
    const HEIGHT = 600;
    
    //background variables
    var c1,c2

    //ball varaibles
    var ballXVel = 5;
    var ballYVel = 5;
    var ballXPos = WIDTH/2;
    var ballYPos = HEIGHT/2;

    //player1 variables
    var p1X=10;
    var p1Y=250;

    //player2 variables
    var p2X=580;
    var p2Y=250;

    //player3 variables
    var p3X=250;
    var p3Y=10;

    //player4 variables
    var p4X=250;
    var p4Y=580;



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
        p5.background(126, 90, 155);

        //background gradient
        for (let i = 0; i <175; i++) {
            p5.fill (i+25,i+25,20,65);
            p5.rect(0,4*i,600,4);
        }

        //Score for player playing **DELETE WHEN DONE
        //MAKE SURE TO MAKE THIS VISIBLE FOR EACH PALYER
        //FOR THEIR OWN INDIVIDUAL SCORE**
         p5.fill (245, 236, 205,20);
         p5.textSize (400);
         p5.textFont ('sans-serif');
         p5.text ('5',190,440);


        //ball and paddle colors
        p5.fill(255,255,255);

        //ball
        p5.ellipse(ballXPos, ballYPos, 20);

        //player1 paddle
        p5.rect(p1X,p1Y, 10,100, 10);

        //player2 paddle
        p5.rect(p2X,p2Y, 10,100, 10);

        //player3 paddle
        p5.rect(p3X,p3Y, 100,10, 10);

        //player4 paddle
        p5.rect(p4X,p4Y, 100,10, 10);

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

