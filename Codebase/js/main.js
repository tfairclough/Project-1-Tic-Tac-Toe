// Reset Game
// Button with event listener to restart game
    // Resets the board to orginal state
    // Tracks and Alternates who goes first
    // resets tiles that can be clicked

document.querySelector("#newGameButton").addEventListener('click', newGame)

function newGame() {
    document.querySelectorAll(".gametile").forEach(tile => tile.innerHTML = '')
    updateResponse("")
}

// Reset Scores
    // Button with event listener to reset the player scores
    // Set wins/loses/ties to zero 

document.querySelector("#resetScoresButton").addEventListener('click', resetScores)

function resetScores() {
    log('linked2')
}

// BoardGame

document.querySelectorAll(".gametile").forEach(tile => tile.addEventListener('click', tileClicked))
    // Event listener on each tile 
    // Alteternates what character is added to the tile
    // Cannot click a till that is already clicked/contains a charcter until reset
    // Once clicked add the charcter to innertext
    // Once succcessfully clicked change turns
    // Check win condition
        // Check all possible three directions for same matches
    // Update Response to indicate player turn
    // If there have been 9 turns and no winner, declare tie

function tileClicked(e) {
    if (e.target.innerHTML === '')
        updateTileValue(e)
        respondToPlayer()
    

}



function respondToPlayer() {
    let repsonse = chooseResponse()
    updateResponse('OK')
}

function updateResponse(response) {
    document.querySelector("#responseToPlayer").innerHTML  = response
}

// Must be a better way to toggle between players
function updateTileValue(e) {
        e.target.innerHTML = document.querySelector(".gameboard").getAttribute("player")
        changePlayer()
}



function changePlayer() {
    let gameboardPlayer =  document.querySelector(".gameboard")
    if (gameboardPlayer.getAttribute('player') === 'X') {
        gameboardPlayer.setAttribute("player", 'O')
    } else {
        gameboardPlayer.setAttribute("player", 'X')
    }

}


// Helper Functions
function log(input) {
    console.log(input)
}
