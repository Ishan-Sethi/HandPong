import socketClient from "socket.io-client";
import { Redirect } from 'react-router-dom'

const SERVER = "http://192.168.1.171:8080";
var socket = socketClient(SERVER, {transports: ['websocket']});

socket.on("init", playerNum => {
    window.location.replace('../lobby')
})
export default socket;