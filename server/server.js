const { log } = require('console');
const { createLobbyCode, initLobby, initPong } = require('./util')

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

const state = {};
const clientRooms = {};

io.on('connection', client => {

    client.on('newGame', handleNewGame);
    client.on('joinGame', handleJoinGame);

    client.on('changeName', handleChangeName);

    client.on('startGame', handleStartGame);
    client.on('movement', handleMovement);

    function handleNewGame() {
        var lobbyCode;
        do { lobbyCode = createLobbyCode(clientRooms) }
        while (!lobbyCode);

        clientRooms[client.id] = lobbyCode;

        state[lobbyCode] = initLobby();
        client.join(lobbyCode);
        client.number = 1;
        client.emit('init', 1);

        console.log(state[lobbyCode])
    }
    
    function handleJoinGame(lobbyName) {
        console.log(io.sockets.adapter.rooms)
        console.log(lobbyName)
        
        const room = io.sockets.adapter.rooms.get(lobbyName);

        let allUsers;
        if (room) { 
            allUsers = room;
        }

        let numClients = 0;
        if (allUsers) {
            numClients = allUsers.size;
        }

        if (numClients === 0) {
            client.emit("unknown code");
            return;
        }
        else if (numClients > 3) {
            client.emit("room full");
            return;
        }
        
        clientRooms[client.id] = lobbyName;

        client.join(lobbyName);
        client.number = numClients+1;
        client.emit("init", client.number);

        console.log(client.number)
    }

    function handleChangeName(name) {
        if (name.length > 10) return;

        var lobbyCode = clientRooms[client.id];
        var playerId = client.number;

        state[lobbyCode].players[playerId].username = name;
        client.emit("recieve_state", JSON.stringify(state[lobbyCode]) );

        console.log(state[lobbyCode].players[playerId].username)
    }

    function handleStartGame(type) {
        switch(type) {
            case "pong":
                state[lobbyCode] = initPong(state[lobbyCode]);
                startGameInterval(lobbyCode);
            default:
                console.log("can't start");
                return;
        }
    }

    function handleMovement() {

    }
});

function startGameInterval(roomCode) {
    const intervalId = setInterval(() => {
        switch( state[roomCode].game ) {
            case "pong":
                updateBallPosition();
            default:
                return;
        }
    }, 1000 / FRAME_RATE);
}

server.listen(PORT, () => { 
    console.log('listening on *:'+PORT);
});