const FRAME_RATE = 60;

function updateBallPosition(state) {
    //redundant code later, will be replaced with score
    if (state.ball.pos[0] > state.canvasSize.width-10 || state.ball.pos[0] < 10){
        state.ball.vel[0] *= -1;
    }
    if (state.ball.pos[1] > state.canvasSize.height-10 || state.ball.pos[0] < 0){
        state.ball.vel[1] *= -1;
    }

    for(let i = 0; i < 4; i++) {
        checkCollision(i)
    }

    state.ball.pos[0] += state.ball.vel[0];
    state.ball.pos[1] += state.ball.vel[1];
}

function checkCollision(state, playerNum) {
    if (playerNum == 4 || playerNum == 2) {
        return (state.ball.pos[0] <= (state.players[playerNum].pos[0] + 100) 
         && state.ball.pos[0] >= state.players[playerNum].pos[0] 
         && state.ball.pos[1] <= (state.players[playerNum].pos[1] + 10) 
         && state.ball.pos[1] >= state.players[playerNum].pos[1] )
    }  else {
        return (state.ball.pos[1] <= (state.players[playerNum].pos[0] + 100) 
         && state.ball.pos[1] >= state.players[playerNum].pos[0] 
         && state.ball.pos[0] <= (state.players[playerNum].pos[1] + 10) 
         && state.ball.pos[0] >= state.players[playerNum].pos[1] )
    } 
}
    