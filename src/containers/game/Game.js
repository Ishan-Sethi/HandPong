import { color } from '@chakra-ui/styled-system';
import Sketch from 'react-p5'
import React, {useEffect, useRef, useState} from "react";
import styles from './game.css';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam"


function Game(params) {
    // Webcam things
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    // Running hand tracking model
    const runHandpose = async() =>{
        const net = await handpose.load();
        console.log('Handpose model loaded'); 
        setInterval(()=>{detect(net)}, 100);
      }

    // Checking for the hand position
    const detect = async(net) => {
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4){
            // Setting up camera properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
            // Setting up canvas properties
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            // Model predictions
            const hand = await net.estimateHands(video);
            console.log(hand);
            // Drawing hand
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
        }
    }
    const drawHand = (predictions, ctx) => {
        // Check if we have predictions
        if (predictions.length > 0) {
          
          // Loop through each prediction
          predictions.forEach((prediction) => {
            const landmarks = prediction.landmarks;
            // Drawing a point on each landmark
            for (let i = 0; i < landmarks.length; i++) {
              ctx.beginPath();
              ctx.fillStyle = "#yadefffc";
              ctx.arc(Math.abs(640 - landmarks[i][0]), landmarks[i][1], 5, 0, 3 * Math.PI);
              ctx.fill();
            }
          });
          /*
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.arc(Math.abs(640-predictions[0].landmarks[0][0]), predictions[0].landmarks[0][1], 5, 0, 3 * Math.PI);
          ctx.fill();
          */
          p4X = Math.abs(640-predictions[0].landmarks[0][0]) - 100;
        }
    }
    runHandpose();

    //width and height of monitor
    const WIDTH = 600;
    const HEIGHT = 600;
    
    //background variables
    var c1,c2

    //ball varaibles
    var ballXVel = 12;
    var ballYVel = 12;
    var ballXPos = WIDTH/2 - 5;
    var ballYPos = 100;

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

    var p1Score = 5;
    var p2Score = 5;
    var p3Score = 5;
    var p4Score = 5;

    function resetBall() {
        //ball varaibles
         ballXVel = 12;
         ballYVel = 12;
         ballXPos = WIDTH/2 - 5;
         ballYPos = 100;
    }

    function updateBallPosition() {
        ballXPos += ballXVel;
        ballYPos += ballYVel;
        // Top Player
        if (ballYVel < 0 && ballYPos < 150 + (100 * (Math.random() - 0.5)))
            if(p3X + 50 < ballXPos) {
               p3X += 20 * Math.random();
            } else {
                p3X -= 20 * Math.random();
            }
        p3X += (5 * (Math.random() - 0.5));

        // Right Player
        if (ballXVel > 0 && ballXPos > 450 + (100 * (Math.random() - 0.5)))
            if(p2Y + 50 < ballYPos) {
               p2Y += 20 * Math.random();
            } else {
                p2Y -= 20 * Math.random();
            }
        p2Y += (5 * (Math.random() - 0.5));

        // Left Player
        if (ballXVel < 0 && ballXPos < 150 + (100 * (Math.random() - 0.5)))
            if(p1Y + 50 < ballYPos) {
               p1Y += 20 * Math.random();
            } else {
                p1Y -= 20 * Math.random();
            }
        p1Y += (5 * (Math.random() - 0.5));
        if (ballXPos > WIDTH){
            p2Score--;
            resetBall();
        }
        if (ballXPos < 0) {
            p1Score--;
            resetBall();
        }
        if (ballYPos > HEIGHT-10){
            p4Score--;
            resetBall();
        } 
        if(ballYPos < 10){
            p3Score--;
            resetBall();
        }
    }

    function checkCollision() {
        // Bottom Player Collision
        if (ballXPos <= (p4X + 100) && ballXPos >= p4X && ballYPos <= (p4Y + 10) && ballYPos >= p4Y ){
            ballYVel *= -1;
            if (ballYVel < 0) {
                ballYVel = -1 * Math.random() * 12;
            } else {
                ballYVel = Math.random() * 12;
            }
            if ((ballXPos > p4X + 50 && ballXVel < 0) || (ballXPos < p4X + 50 && ballXVel > 0)){
                ballXVel *= -1;
            }
        } 
        // Top Player Collision
        else if (ballXPos <= (p3X + 100) && ballXPos >= p3X && ballYPos <= (p3Y + 10) && ballYPos >= p3Y) {
            ballYVel *= -1;
            if (ballYVel < 0) {
                ballYVel = -1 * Math.random() * 12;
            } else {
                ballYVel = Math.random() * 12;
            }
            if ((ballXPos > p3X + 50 && ballXVel < 0) || (ballXPos < p3X + 50 && ballXVel > 0)){
                ballXVel *= -1;
            }
        } 
        // Right Player Collision
        else if (ballYPos <= (p2Y + 100) && ballYPos >= p2Y && ballXPos <= (p2X + 10) && ballXPos >= p2X) {
            ballXVel *= -1;
            if (ballXVel < 0) {
                ballXVel = -1 * Math.random() * 12;
            } else {
                ballXVel = Math.random() * 12;
            }
            if ((ballYPos > p2Y + 50 && ballYVel < 0) || (ballYPos < p2Y + 50 && ballXVel > 0)){
                ballYVel *= -1;
            }
        }
        // Left Player Collision
        else if (ballYPos <= (p1Y + 100) && ballYPos >= p1Y && ballXPos <= (p1X + 10) && ballXPos >= p1X) {
            ballXVel *= -1;
            if (ballXVel < 0) {
                ballXVel = -1 * Math.random() * 12;
            } else {
                ballXVel = Math.random() * 12;
            }
            if ((ballYPos > p1Y + 50 && ballYVel < 0) || (ballYPos < p1Y + 50 && ballYVel > 0)){
                ballYVel *= -1;
            }
        }
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

        //Score for player playing 
         p5.fill (245, 236, 205,20);
         p5.textFont ('sans-serif');

         // Bottom Player 
         p5.textSize (100);
         p5.text ('' + p4Score,270,550);
         p5.textSize (48);
         p5.text ('Ishan',245,465);

         // Left Player 
         p5.textSize (100);
         p5.text ('' + p1Score,50,340);
         p5.textSize (48);
         p5.text ('Ryan',25,255);

         // Right Player 
         p5.textSize (100);
         p5.text ('' + p2Score,490,340);
         p5.textSize (48);
         p5.text ('Aryan',450,255);

         // Top Player 
         p5.textSize (100);
         p5.text ('' + p3Score,270,150);
         p5.textSize (48);
         p5.text ('Min',260,75);

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
        checkCollision();
        updateBallPosition();
    }


    return (
        <div>
            <div style={{
                margin: 20,
                display: "flex",
                justifyContent: "center",
                alignItem: "center"
            }}>
                <Sketch setup={setup} draw={draw} />
            </div>
            <div className={styles.container}>
                <Webcam ref={webcamRef} mirrored={true} style={{
                    position:"absolute",
                    marginLeft:"auto",
                    marginRight:"auto",
                    left:0,
                    right:0,
                    textAlign:"center",
                    zIndex:9,
                    width:320,
                    height:240
                }}></Webcam>
                <canvas ref={canvasRef} style={{
                    position:"absolute",
                    marginLeft:"auto",
                    marginRight:"auto",
                    left:0,
                    right:0,
                    textAlign:"center",
                    zIndex:9,
                    width:320,
                    height:240
                }}></canvas>
            </div>
        </div>
    )
}

export default Game

