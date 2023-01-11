// Common Selectors
const resetScoresButton = document.querySelector("#reset-scores-button")
const newGameButton = document.querySelector("#new-game-button")
const gameBoard = document.querySelector("#board")
const gameTiles = document.querySelectorAll(".gametile")
const responseToPlayer = document.querySelector("#response-text")
const tieCounter = document.querySelector(`#Tie`)
const scoreCounters = document.querySelectorAll(".score-counter")
const muteIcon = document.querySelector("#mute-button")

// Variables
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let clickedTile = new Audio("../Audio/TilePlacement.mp3")
let newGameSound = new Audio("../Audio/newGameSound.mp3")

// Initaite Page Event Listeners
window.addEventListener("load", retrieveLocalStorage)
window.addEventListener("load", selectStartingPlayer)
resetScoresButton.addEventListener("click", resetScores)
newGameButton.addEventListener("click", newGame)
gameTiles.forEach(tile => tile.addEventListener("click", tileClicked))
muteIcon.addEventListener("click", toggleMute)

// Resets the board and alternates the starting player. 
function newGame() {
    playAudio(newGameSound)
    resetBoard()
    selectStartingPlayer()
    newGameButton.classList.remove("buttonglow")
}

// Resets game scores and updateLocalStorage
function resetScores() {
    [...scoreCounters].forEach(score => score.innerHTML = 0)
    savePageToLocalStorage()
}

// On a gametile click, executes a turn and determines the turn outcome. 
function tileClicked(e) {
    if ((gameBoard.getAttribute("gamestate") === "on") && (e.target.innerHTML === "")) {
        playAudio(clickedTile)
        updateTileValue(e)
        let currentBoard = [...gameTiles].map(tile => tile.innerHTML)
        performTurnOutcome(currentBoard)       
    }
}

// Identifies the result of the turn and initiates corect outcome
function performTurnOutcome(currentBoard) {
   let currentGameState = returnCurrentGameState(currentBoard)
    if ((currentGameState === "Winner") || (currentGameState === "Tie")) {
        endGame(currentGameState, currentBoard)
    } else {
        nextTurn()
    }
}

// Initiates the next turn
function nextTurn() {
    changePlayer('player')
    updateResponseToPlayer(`Player ${gameBoard.getAttribute("player")} turn`)
}

// Initiates the end game sequence
function endGame(gameResult, endBoard) {
    toggleBoardInteractionStatus("off")
    updateScores(gameResult, endBoard)
    updateResponseToPlayer(gameResult)
    savePageToLocalStorage()
}

// Returns a string variable of the current result of the game, Won/Tie/Continue
function returnCurrentGameState(currentGameBoard) {
    return winConditionMet(currentGameBoard) ? "Winner"
        : drawConditionMet(currentGameBoard) ? "Tie"
        : `Continue`
}

// Updates the result depedning on the result. If there is a winner it intiiates the winVisual
function updateScores(result, endBoard) {
    if (result === "Winner") {
        displayWinVisual(endBoard)
        +document.querySelector(`#${gameBoard.getAttribute("player")}`).innerHTML++
    } else {
        +tieCounter.innerHTML++
    }
}

// Identifies the three winning tiles and makes them flash
function displayWinVisual(endBoard) {
    let winningIndex = winConditions.findIndex(winArray => allEqualAndNotBlank([...winArray.map(index => endBoard[index])]))
    winConditions[winningIndex].forEach(winningTile => document.querySelector(`#tile${winningTile}`).classList.toggle("win-glow"))
}

// Removes all win animations from the tiles and allows players to interact with the board again 
function resetBoard() {
    gameTiles.forEach(tile => {tile.innerHTML = ""; tile.classList.remove("no-interactions", "win-glow")})
    toggleBoardInteractionStatus("on")
}

// Returns a bool: True if the game is drawn
function drawConditionMet(currentGameBoard) {
    return currentGameBoard.every((tile) => tile !== "")
}

// Returns a bool: True is game is won
function winConditionMet(currentGameBoard) {
    return winConditions.some(condition => allEqualAndNotBlank([...condition.map(index => currentGameBoard[index])]))
}

// Returns true if the given array is all equal and the array doesn't contain any blanks
function allEqualAndNotBlank(arr) {
    return arr.every(val => val === arr[0] && val !== "");
}

// Updates response to player with provided String
function updateResponseToPlayer(response) {
    responseToPlayer.innerText  = response
}

// Adds the token of the current player on the clicked tile
function updateTileValue(e) {
    e.target.innerHTML = gameBoard.getAttribute("player")
    e.target.classList.add("noInteractions")
}

//  Toggles the board 
function toggleBoardInteractionStatus(status) {
    gameBoard.setAttribute("gamestate", `${status}`)
    if (status=== "off") {
        newGameButton.classList.add("button-glow")
        gameTiles.forEach(tile => {tile.classList.add("no-interactions")})
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
    savePageToLocalStorage()
}

function selectStartingPlayer() {
    let response = `Player ${gameBoard.getAttribute("startingPlayer")} turn`
    gameBoard.setAttribute("player", gameBoard.getAttribute("startingPlayer"))
    updateResponseToPlayer(response)
    changePlayer("startingPlayer")
}

function retrieveLocalStorage() {
    const retrievedGame = JSON.parse(window.localStorage.getItem('savedObject'));
    [...scoreCounters].forEach( (counter, i) => counter.innerHTML = retrievedGame['scores'][i])
    if (retrievedGame['muted']) {
        toggleMute()
    }
}

function savePageToLocalStorage() {
    const currentGame = {
        scores: [...[...scoreCounters].map(score => score.innerHTML)],
        muted: (!muteIcon.classList.contains("muted")) ? false : true,
    }
    window.localStorage.setItem("savedObject", JSON.stringify(currentGame))
}
// Helper Functions
function log(input) {
    console.log(input)
}