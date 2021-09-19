import socketClient from "socket.io-client";

const SERVER = "http://192.168.1.171:8080";

export const socket = socketClient(SERVER, {transports: ['websocket']});
export var GAME_CODE = "";

socket.on("init", (code)=>{
    GAME_CODE = code;
});
