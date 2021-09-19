const { log } = require('console');
const { createLobbyCode, initLobby, initPong } = require('./util')
const { updateBallPosition } = require('./pong')

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

const state = {};
const clientRooms = {};
const FRAME_RATE = 60;

io.on('connection', client => {

    client.on('getState', handleGetState)

    client.on('newGame', handleNewGame);
    client.on('joinGame', handleJoinGame);

    client.on('changeName', handleChangeName);

    client.on('startGame', handleStartGame);
    client.on('movement', handleMovement);

    function handleGetState() {
        var lobbyCode = clientRooms[client.id];
        emitRecieveState(lobbyCode);
    }

    function handleNewGame() {
        var lobbyCode;
        do { lobbyCode = createLobbyCode(clientRooms) }
        while (!lobbyCode);

        clientRooms[client.id] = lobbyCode;

        state[lobbyCode] = initLobby();
        client.join(lobbyCode);
        client.number = 1;
        client.emit('init', lobbyCode);

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

        console.log(allUsers)

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
        client.emit("init", lobbyName);

        console.log(client.number)
    }

    function handleChangeName(name) {
        if (name.length > 10) return;

        var lobbyCode = clientRooms[client.id];
        var playerId = client.number;

        state[lobbyCode].players[playerId-1].username = name;

        emitRecieveState(lobbyCode);
    }

    function handleStartGame() {
        var lobbyCode = clientRooms[client.id];
        state[lobbyCode] = initPong(state[lobbyCode]);
        emitRecieveState(lobbyCode);
        startGameInterval(lobbyCode);
    }

    function handleMovement(pX) {
        var lobbyCode = clientRooms[client.id];
        var playerId = client.number;

        switch(playerId-1) {
            case 0:
                state[lobbyCode].players[0].pos[1] = pX;
            case 1:
                state[lobbyCode].players[1].pos[0] = -pX;
            case 2:
                state[lobbyCode].players[2].pos[1] = -pX;
            case 3:
                state[lobbyCode].players[3].pos[0] = pX;
        }

        emitRecieveState(lobbyCode);
    }
});

function startGameInterval(roomCode) {
    const intervalId = setInterval(() => {
        updateBallPosition(state[roomCode]);
        emitRecieveState(roomCode);
    }, 1000 / FRAME_RATE);
}

function emitRecieveState(roomCode) {
    io.sockets.in(roomCode)
        .emit("recieveState", JSON.stringify(state[roomCode]));
}

server.listen(PORT, () => { 
    console.log('listening on *:'+PORT);
});