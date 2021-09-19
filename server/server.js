var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

const state = {};
const clientRooms = {};

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('newGame', handleNewGame);
    socket.on('joinGame', handleJoinGame);

    function handleNewGame() {
        console.log("test")
    }
    function handleJoinGame() {
        console.log("test2")
    }
});

server.listen(PORT, () => { 
    console.log('listening on *:'+PORT);
});