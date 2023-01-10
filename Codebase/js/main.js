// Common Selectors
const resetScoresButton = document.querySelector("#resetScoresButton")
const newGameButton = document.querySelector("#newGameButton")
const gameBoard = document.querySelector("#board")
const gameTiles = document.querySelectorAll(".gametile")
const responseToPlayer = document.querySelector("#responseText")
const tieCounter = document.querySelector(`#Tie`)
const scoreCounters = document.querySelectorAll(".scoreCounter")
const muteIcon = document.querySelector("#muteButton")

// Variables 
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let clickedTile = new Audio("../Audio/TilePlacement.mp3")
let newGameSound = new Audio("../Audio/NewGameSound.mp3")

// Event Listeners
window.addEventListener("load", selectStartingPlayer)
resetScoresButton.addEventListener("click", resetScores)
newGameButton.addEventListener("click", newGame)
gameTiles.forEach(tile => tile.addEventListener("click", tileClicked))
muteIcon.addEventListener("click", toggleMute)


// Need to track player who went first and chnage it on new game
function newGame() {
    playAudio(newGameSound)
    resetBoard()
    selectStartingPlayer()
    newGameButton.classList.remove("buttonglow")
}

// Sets all scores back to zero
function resetScores() {
    [...scoreCounters].forEach(score => score.innerHTML = 0)
}

// When a player clicks a tile this will:
//1. Determine if the board and tile were active
//2. Update the tile with the players token
//3. Check the result of the turn
//4. Change Player
function tileClicked(e) {
    if ((gameBoard.getAttribute("gamestate") === "on") && (e.target.innerHTML === "")) {
        playAudio(clickedTile)
        updateTileValue(e)
        checkTurnResult()       
    }
}


function checkTurnResult() {
   let gameState = currentGameState([...gameTiles].map(tile => tile.innerHTML))
    if ((gameState === "Winner") || (gameState === "Tie")) {
        endGame(gameState)
    } else {
        nextTurn()
    }
}


function nextTurn() {
    changePlayer('player')
    updateResponse(`Player ${gameBoard.getAttribute("player")} turn`)
}

function endGame(gameState) {
    toggleBoardInteraction("off")
    updateScores(gameState)
    updateResponse(gameState)
}

function currentGameState(currentGameBoard) {
    return winConditionMet(currentGameBoard) ? "Winner"
        : drawConditionMet(currentGameBoard) ? "Tie"
        : `Continue`
}


function updateScores(result) {
    if (result === "Winner") {
        displayWinVisual()
        +document.querySelector(`#${gameBoard.getAttribute("player")}`).innerHTML++
    } else {
        +tieCounter.innerHTML++
    }
}


function displayWinVisual() {
    let winningIndex = winConditions.findIndex(condition => allEqualAndNotBlank([...condition.map(index => [...gameTiles].map(tile => tile.innerHTML)[index])]))
    winConditions[winningIndex].forEach(winningTile => document.querySelector(`#tile${winningTile}`).classList.toggle("winGlow"))
}


function resetBoard() {
    gameTiles.forEach(tile => {tile.innerHTML = ""; tile.classList.remove("noInteractions", "winGlow")})
    toggleBoardInteraction("on")
}


function drawConditionMet(currentGameBoard) {
    return currentGameBoard.every((tile) => tile !== "")
}


function winConditionMet(currentGameBoard) {
    return winConditions.some(condition => allEqualAndNotBlank([...condition.map(index => currentGameBoard[index])]))
}


function allEqualAndNotBlank(arr) {
    return arr.every(val => val === arr[0] && val !== "");
}


function updateResponse(response) {
    responseToPlayer.innerText  = response
}


function updateTileValue(e) {
    e.target.innerHTML = gameBoard.getAttribute("player")
    e.target.classList.add("noInteractions")
}


function toggleBoardInteraction(status) {
    gameBoard.setAttribute("gamestate", `${status}`)
    if (status=== "off") {
        newGameButton.classList.add("buttonglow")
        gameTiles.forEach(tile => {tile.classList.add("noInteractions")})
    }
}

function changePlayer(attributeSelector) {
    if (gameBoard.getAttribute(attributeSelector) === "X") {
        gameBoard.setAttribute(attributeSelector, "O")
    } else {
        gameBoard.setAttribute(attributeSelector, "X")
    }
}

function playAudio(sound) {
    if (!muteIcon.classList.contains("muted"))
        sound.play()
}

function toggleMute(e) {
    muteIcon.classList.toggle("muted")
}

function selectStartingPlayer() {
    let response = `Player ${gameBoard.getAttribute("startingPlayer")} turn`
    gameBoard.setAttribute("player", gameBoard.getAttribute("startingPlayer"))
    updateResponse(response)
    changePlayer("startingPlayer")
}



// Helper Functions
function log(input) {
    console.log(input)
}