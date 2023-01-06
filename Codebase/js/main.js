// Reset Game
// Button with event listener to restart game
    // Resets the board to orginal state
    // Tracks and Alternates who goes first
    // resets tiles that can be clicked

document.querySelector("#newGameButton").addEventListener('click', resetScores)

function resetScores() {
    console.log('linked')
}

// Reset Scores
    // Button with event listener to reset the player scores
    // Set wins/loses/ties to zero 

document.querySelector("#resetScoresButton").addEventListener('click', resetScores)

function resetScores() {
    console.log('linked2')
}
// BoardGame
    // Event listener on each tile 
    // Alteternates what character is added to the tile
    // Cannot click a till that is already clicked/contains a charcter until reset
    // Once clicked add the charcter to innertext
    // Once succcessfully clicked change turns
    // Check win condition
        // Check all possible three directions for same matches
    // Update Response to indicate player turn
    // If there have been 9 turns and no winner, declare tie
