const { createLobbyCode, initLobby, initPong } = require('./util')

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

const state = {};
const clientRooms = [];

io.on('connection', client => {
    client.on('newGame', handleNewGame);
    client.on('joinGame', handleJoinGame);
    client.on('startGame', handleJoinGame);
    
    client.on('movement', handleJoinGame);

    function handleNewGame() {
        var lobbyCode;
        do { lobbyCode = createLobbyCode(clientRooms) }
        while (!lobbyCode);

        state[lobbyCode] = initLobby();
        client.join(lobbyCode);
        client.number = 1;
        client.emit('init', 1);
    }
    function handleJoinGame(lobbyName) {
        const room = io.sockets.adapter.rooms[lobbyName];

        let allUsers;
        if (room) {
            allUsers = room.sockets;
        }

        let numClients = 0;
        if (allUsers) {
            numClients = Object.keys(allUsers).length;
        }

        if (numClients === 0) {
            client.emit("unknown code");
            return;
        }
        else if (numClients > 3) {
            client.emit("room full");
            return;
        }
        
        client.join(lobbyName);
        client.number = numClients+1;
        client.emit("init", client.number);
    }
});

server.listen(PORT, () => { 
    console.log('listening on *:'+PORT);
});