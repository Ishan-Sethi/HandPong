module.exports = {
    updateBallPosition,
}

function updateBallPosition(state) {
    //redundant code later, will be replaced with score
    if (state.ball.pos[0] > state.canvasSize.width-10 || state.ball.pos[0] < 10){
        state.ball.vel[0] *= -1;
    }
    if (state.ball.pos[1] > state.canvasSize.height-10 || state.ball.pos[1] < 0){
        state.ball.vel[1] *= -1;
    }

    for(let i = 0; i < 4; i++) {
        checkCollision(state, i);
    }

    state.ball.pos[0] += state.ball.vel[0];
    state.ball.pos[1] += state.ball.vel[1];
}

function checkCollision(state, playerId) {
    if (playerId == 4 || playerId == 2) {
        return (state.ball.pos[0] <= (state.players[playerId].pos[0] + 100) 
         && state.ball.pos[0] >= state.players[playerId].pos[0] 
         && state.ball.pos[1] <= (state.players[playerId].pos[1] + 10) 
         && state.ball.pos[1] >= state.players[playerId].pos[1] )
    }  else {
        return (state.ball.pos[1] <= (state.players[playerId].pos[0] + 100) 
         && state.ball.pos[1] >= state.players[playerId].pos[0] 
         && state.ball.pos[0] <= (state.players[playerId].pos[1] + 10) 
         && state.ball.pos[0] >= state.players[playerId].pos[1] )
    } 
}

function checkForWinner() {

}