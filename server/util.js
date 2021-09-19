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
    for(let lobby in codes) {
        if (lobby == code) return false
    }
    return code
}

function initLobby() {
    var player = {
        username: "",
    }
    return {
        players: [player,player,player,player],
    }
}

function initPong(lobby) {
    var pongState = {
        players: [],
        ball: {x: 0, y: 0},
    }

    for(let i = 0; i < 4; i++) {
        pongState.players[i] = lobby.players[i];
        pongState.players[i].position = {x: 0, y: 0};
    } 

    return pongState;
}