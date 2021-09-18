var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const state = {};
const clientRooms = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

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

server.listen(port, () => { 
    console.log('listening on *:3000');
});