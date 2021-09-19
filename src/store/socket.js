import socketClient from "socket.io-client";

const SERVER = "http://192.168.1.171:8080";
const socket = socketClient(SERVER, {transports: ['websocket']});

export default socket;