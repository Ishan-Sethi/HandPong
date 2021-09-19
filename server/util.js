const TEXTS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

module.exports = {
    createLobbyCode,
    initLobby,
    initPong
}

function createLobbyCode(codes) {
    var code = ""
    for(let i = 0; i < 5; i++) {
        code += TEXTS[ Math.floor(Math.random() * TEXTS.length) ];
    }
    for(let lobby in Object.values(codes)) {
        if (lobby == code) return false
    }
    return code
}

function initLobby() {
    return {
        players: [{username: ""}, {username: ""}, {username: ""}, {username: ""}],
    }
}

function initPong(lobby) {
    var pongState = {
        players: [],
        canvasSize: {width: 600, height: 600},
        ball: {pos: [300, 300], vel: [1, 1]}, //change vel later
    }

    for(let i = 0; i < 4; i++) {
        pongState.players[i] = lobby.players[i];
        pongState.players[i].score = 0;
    } 

    pongState.players[0].pos = [10, 250];
    pongState.players[1].pos = [580, 250];
    pongState.players[2].pos = [250, 10];
    pongState.players[3].pos = [250, 580];

    return pongState;
}