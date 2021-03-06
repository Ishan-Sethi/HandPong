import Sketch from 'react-p5'
import React, { useRef, useState, useEffect } from "react";
import styles from './game.css';
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam"

import { socket, GAME_CODE } from '../../store/socket'

const WIDTH = 600;
const HEIGHT = 600;

var gameState = {};
socket.emit("getState")
socket.on("recieveState", (state)=>{
    gameState=JSON.parse(state)
    console.log(gameState)
})

function Game() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
    }

    const draw = p5 => {
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
        p5.ellipse(gameState.ball.pos[0], gameState.ball.pos[1], 20);

        //player paddles
        p5.rect(gameState.players[0].pos[0], gameState.players[0].pos[1], 10, 100, 10);
        p5.rect(gameState.players[1].pos[0], gameState.players[1].pos[1], 10, 100, 10);
        p5.rect(gameState.players[2].pos[0], gameState.players[2].pos[1], 100, 10, 10);
        p5.rect(gameState.players[3].pos[0], gameState.players[3].pos[1], 100, 10, 10);
    }

    // Running hand tracking model
    const runHandpose = async() =>{
        const net = await handpose.load();
        console.log('Handpose model loaded'); 
        setInterval( () => {detect(net)}, 50);
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
          /*
          // Loop through each prediction
          predictions.forEach((prediction) => {
            const landmarks = prediction.landmarks;
            // Drawing a point on each landmark
            for (let i = 0; i < landmarks.length; i++) {
              ctx.beginPath();
              ctx.fillStyle = "red";
              ctx.arc(landmarks[i][0], landmarks[i][1], 5, 0, 3 * Math.PI);
              ctx.fill();
            }
          });*/
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.arc(Math.abs(640-predictions[0].landmarks[0][0]), predictions[0].landmarks[0][1], 5, 0, 3 * Math.PI);
          ctx.fill();

          let pX = Math.abs(640-predictions[0].landmarks[0][0]) - 100;
          socket.emit("movement", pX);
        }
    }
    runHandpose();

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

