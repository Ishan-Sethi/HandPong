import React, {useEffect, useRef, useState} from "react";
import styles from './handtrack.css';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam"

export default function Handtrack() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [handPos, setHandPos] = useState(null);

  const runHandpose = async() =>{
    const net = await handpose.load();
    console.log('Handpose model loaded'); 
    setInterval(()=>{detect(net)}, 250);
  }

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
      setHandPos(hand);
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

      
    }
  };


  runHandpose();

  return (
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
  )
}
