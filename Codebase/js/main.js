// Common Selectors
const resetScoresButton = document.querySelector("#resetScoresButton")
const newGameButton = document.querySelector("#newGameButton")
const gameBoard = document.querySelector("#gameboard")
const gameTiles = document.querySelectorAll(".gametile")
const responseToPlayer = document.querySelector("#responseToPlayer")
const tieCounter = document.querySelector(`#Tie`)
const scoreCounters = document.querySelectorAll(".scoreCounter")

// Variables 
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

// Event Listeners
resetScoresButton.addEventListener('click', resetScores)
newGameButton.addEventListener('click', newGame)
gameTiles.forEach(tile => tile.addEventListener('click', tileClicked))


// Need to track player who went first and chnage it on new game
function newGame() {
    resetBoard()
    updateResponse("")
}


function resetScores() {
    [...scoreCounters].forEach(score => score.innerHTML = 0)
}


function tileClicked(e) {
    if ((gameBoard.getAttribute("gamestate") === "on") && (e.target.innerHTML === '')) {
        updateTileValue(e)
        let gameState = checkGameState()
        updateResponse(gameState)
        if ((gameState === 'Winner') || (gameState === 'Tie')) {
            toggleBoardActive('off')
            updateScores(gameState)
        } else {
            changePlayer()
        }
    }
}

function updateScores(result) {
    if (result === "Winner") {
        +document.querySelector(`#${gameBoard.getAttribute('player')}`).innerHTML++
    } else {
        +tieCounter.innerHTML++
    }
}

function checkGameState() {
    let currentGameBoard = [...gameTiles].map(tile => tile.innerHTML)
    return winConditionMet(currentGameBoard) ? "Winner"
    : drawConditionMet(currentGameBoard) ? "Tie"
    : `Player ${gameBoard.getAttribute('player')} turn`
}

function resetBoard() {
    gameTiles.forEach(tile => tile.innerHTML = '')
    toggleBoardActive('on')
}

function drawConditionMet(currentGameBoard) {
    return currentGameBoard.every((tile) => tile !== '')
}


function winConditionMet(currentGameBoard) {
    return winConditions.some(condition => allEqualAndNotBlank([...condition.map(index => currentGameBoard[index])]))
}


function allEqualAndNotBlank(arr) {
    return arr.every(val => val === arr[0] && val !== '');
}


function updateResponse(response) {
    responseToPlayer.innerHTML  = response
}


function updateTileValue(e) {
    e.target.innerHTML = gameBoard.getAttribute("player")
}


function toggleBoardActive(status) {
    gameBoard.setAttribute("gamestate", `${status}`)

}

function changePlayer() {
    if (gameBoard.getAttribute('player') === 'X') {
        gameBoard.setAttribute("player", 'O')
    } else {
        gameBoard.setAttribute("player", 'X')
    }

}






// Helper Functions
function log(input) {
    console.log(input)
}



// Reset Game
// Button with event listener to restart game
    // Resets the board to orginal state
    // Tracks and Alternates who goes first
    // resets tiles that can be clicked


// Reset Scores
    // Button with event listener to reset the player scores
    // Set wins/loses/ties to zero 



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