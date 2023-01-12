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
let clickedTile = new Audio("Audio/TilePlacement.mp3")
let newGameSound = new Audio("Audio/newGameSound.mp3")

// Initilaise the page event listeners
// createBoard()
initialiseEventListeners()

// Initaite Page Event Listeners
function initialiseEventListeners() {
    window.addEventListener("load", retrieveLocalStorage)
    window.addEventListener("load", selectStartingPlayer)
    resetScoresButton.addEventListener("click", resetButtonClicked)
    newGameButton.addEventListener("click", newGameButtonClicked)
    gameTiles.forEach(tile => tile.addEventListener("click", tileClicked))
    muteIcon.addEventListener("click", muteButtonClicked)
}


// Resets game scores and saves LocalStorage 
function resetButtonClicked() {
    resetScores()
    savePageToLocalStorage()
}

// Initites a new game by calling the set of required functions
function newGameButtonClicked() {
    playAudio(newGameSound)
    resetBoard()
    stopNewGameButtonAnimation()
    selectStartingPlayer()
}


// On a gametile click, checks it is a valid turn and initiates the outcome functions
function tileClicked(e) {
    if ((gameBoard.getAttribute("gamestate") === "on") && (e.target.innerHTML === "")) {
        playAudio(clickedTile)
        updateTileValue(e)
        let currentBoard = returnCurrentGameBoardArray()
        checkTurnResultAndPerformOutcome(currentBoard)       
    }
}

// Toggles game sound on and off
function muteButtonClicked() {
    toggleMute()
    savePageToLocalStorage()
}



// Identifies the result of the turn and initiates correct outcome
function checkTurnResultAndPerformOutcome(currentBoard) {
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
    toggleBoardInteraction("off")
    startNewGameButtonAnimation()
    stopTileAnimations()
    updateScores(gameResult, endBoard)
    updateResponseToPlayer(gameResult)
    savePageToLocalStorage()
}

// Returns a string variable of the current result of the game, Won/Tie/Continue
function returnCurrentGameState(currentGameBoard) {
    return winConditionMet(currentGameBoard) ? "Winner"
        : drawConditionMet(currentGameBoard) ? "Tie"
        : `Next Turn`
}

// Updates the ScoreCounter depedning on the result. If there is a winner it intiiates the winVisual
function updateScores(result, endBoard) {
    if (result === "Winner") {
        displayWinVisual(endBoard)
        +document.querySelector(`#${gameBoard.getAttribute("player")}`).innerHTML++
    } else {
        +tieCounter.innerHTML++
    }
}

// Identifies the index of three winning tiles and makes them flash
function displayWinVisual(endBoard) {
    let winningIndex = winConditions.findIndex(winArray => allEqualAndNotBlank([...winArray.map(index => endBoard[index])]))
    winConditions[winningIndex].forEach(winningTile => document.querySelector(`#tile${winningTile}`).classList.toggle("win-glow"))
}

// Removes all win animations from the tiles and allows players to interact with the board again 
function resetBoard() {
    gameTiles.forEach(tile => {tile.innerHTML = ""; tile.classList.remove("no-interactions", "win-glow")})
    toggleBoardInteraction("on")
}

// Returns the current gameBoard as an array
function returnCurrentGameBoardArray() {
    return [...gameTiles].map(tile => tile.innerHTML)
}

// Returns a bool: true if the game is drawn
function drawConditionMet(currentGameBoard) {
    return currentGameBoard.every((tile) => tile !== "")
}

// Returns a bool: true is game is won
function winConditionMet(currentGameBoard) {
    return winConditions.some(condition => allEqualAndNotBlank([...condition.map(index => currentGameBoard[index])]))
}

// Returns a bool: true if the given array is all equal and the array doesn't contain any blanks
function allEqualAndNotBlank(arr) {
    return arr.every(val => val === arr[0] && val !== "");
}

// Updates response to player with provided string
function updateResponseToPlayer(response) {
    responseToPlayer.innerText  = response
}

// Adds the token of the current player on the clicked tile
function updateTileValue(e) {
    e.target.innerHTML = gameBoard.getAttribute("player")
    e.target.classList.add("no-interactions")
}

// Toggels mute on and off
function toggleMute() {
    muteIcon.classList.toggle("muted")
}

//  Toggles entire board interactivity ('on', 'off'). If off, flag new game button to user
function toggleBoardInteraction(status) {
    gameBoard.setAttribute("gamestate", `${status}`)
}

// Changes player between X and O
function changePlayer(attributeSelector) {
    if (gameBoard.getAttribute(attributeSelector) === "X") {
        gameBoard.setAttribute(attributeSelector, "O")
    } else {
        gameBoard.setAttribute(attributeSelector, "X")
    }
}

// Remove glow from the NewGame Button
function stopNewGameButtonAnimation() {
    newGameButton.classList.remove("button-glow")
}

// Resets scores to zero
function resetScores() {
    [...scoreCounters].forEach(score => score.innerHTML = 0)
}

// Makes the New Game Button Glow 
function startNewGameButtonAnimation() {
    newGameButton.classList.add("button-glow")
}

// Disables gametile animations
function stopTileAnimations() {
    gameTiles.forEach(tile => { tile.classList.add("no-interactions") })
}

// Plays provided audio clip if game is not muted
function playAudio(sound) {
    if (!muteIcon.classList.contains("muted"))
        sound.play()
}

// Selects starting player and displays it to the user. Updates starting player for next game
function selectStartingPlayer() {
    let response = `Player ${gameBoard.getAttribute("startingPlayer")} turn`
    gameBoard.setAttribute("player", gameBoard.getAttribute("startingPlayer"))
    updateResponseToPlayer(response)
    changePlayer("startingPlayer")
}

// Retrives local storage file and updates scores and mute history
function retrieveLocalStorage() {
    const retrievedGame = JSON.parse(window.localStorage.getItem('savedObject'));
    [...scoreCounters].forEach( (counter, i) => counter.innerHTML = retrievedGame['scores'][i])
    if (retrievedGame['muted']) {
        muteButtonClicked()
    }
}

// Saves scores and mute selection to localstorage
function savePageToLocalStorage() {
    const currentGame = {
        scores: [...[...scoreCounters].map(score => score.innerHTML)],
        muted: (!muteIcon.classList.contains("muted")) ? false : true,
    }
    window.localStorage.setItem("savedObject", JSON.stringify(currentGame))
}
