import React from 'react'
import Sketch from 'react-p5'

function Game() {
    const WIDTH = 800;
    const HEIGHT = 500;
    
    var ballXVel = 5;
    var ballYVel = 5;
    var ballXPos = 0;
    var ballYPos = 0;

    function updateBallPosition() {
        if (ballXPos > WIDTH || ballXPos < 0){
            ballXVel *= -1;
        }
        if (ballYPos > HEIGHT || ballYPos < 0){
            ballYVel *= -1;
        }
        ballXPos += ballXVel;
        ballYPos += ballYVel;
    }

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
    }

    const draw = p5 => {
        p5.background(255, 130, 20);
        p5.ellipse(ballXPos, ballYPos, 100);
        updateBallPosition();
        console.log(ballXPos + " " + ballYPos);
    }


    return (
        <div style={{
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItem: "center"
        }}>
            <Sketch setup={setup} draw={draw} />
        </div>
    )
}

export default Game

