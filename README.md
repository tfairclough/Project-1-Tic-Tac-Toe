# Project-1-Tic-Tac-Toe
---

Developer: Tom Fairclough <br>
Technologies: HTML/CSS/JavaScript


## Description
- - -

This is my first project using HTML/CSS/JavaScript as part of the SEI GeneralAssembly Course. The task was to create a dynamic web application based on the interactive game TicTacToe that met the requirements of a provided specification.

## Deployment Link
- - - 
https://tfairclough.github.io/Project-1-Tic-Tac-Toe/

## Technologies
- - -
This project utilised the following:
- **Code Editor:** VSCode
- **Programming Languages:** HTML, CSS & JavaScript
- **Version Control:** Git & Git Hub Source Control
- **Design:** Wireframe.cc
- **Image Editors:** GNU Image Manipulation Programme

## Brief
- - - 

A tick denotes that the requirement has been delivered in this project release: 
### Goals
- &#x2611; Build a web application from scratch, without a starter codebase
- &#x2611; Use your programming skills to work out the game logic for a simple game like Tic Tac Toe
- &#x2611; Separate HTML, CSS, and JavaScript files in your application
- &#x2611; Build a dynamic game that allows two players to compete from the same computer

### Technical Requirements
- &#x2611; As a user, I should be able to start a new tic tac toe game
- &#x2611; As a user, I should be able to click on a square to add X first and then O, and so on
- &#x2611; As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
- &#x2611; As a user, I should not be able to click the same square twice
- &#x2611; As a user, I should be shown a message when I win, lose or tie
- &#x2611; As a user, I should not be able to continue playing once I win, lose, or tie
- &#x2611; As a user, I should be able to play the game again without refreshing the page

### Optional Extras: 
- &#x2611; Keep track of multiple game rounds with a win, lose and tie counter
- &#x2611; Get inventive with your styling e.g. use hover effects or animations
- &#x2611; Use localStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity
- &#x2611; Make your site fully responsive so that it is playable from a mobile phone
- &#x2611; Involve Audio in your game
- Create an AI opponent: teach JavaScript to play an unbeatable game against you
- Allow players to customize their tokens (X, O, name, picture, etc)
- Allow 2 players to play online with each other using any means such as WebSockets, Firebase, or other 3rd-party services.



## Planning
- - -

I wanted a classic design that was intuitive to navigate and easy to interact with. I produced a wireframe to plan the HTML & CSS and wrote out pseudocode to help structure the Javascript. 

With one week for the project I focused on delivering the core technical requirements while ensuring the page and code could scale to the optional extras. I reserved time for both refactoring and documentation

### Wireframe

![alt text](/Images/Wireframe.png)

### Pseudocode 

![alt text](/Images/Pseudocode.png)

##  Build Process

- - -
In this section I step through the build process, highlighting extracts from the code base:

- Created the core elements of the HTML. Added placeholders for core game functionalities and added some basic formatting.

- Added EventListners, using array methods where appropriate, to allow the player to interact wih the game:
    1. New Game
    2. Reset Score
    3. Tile Click 
    4. Mute Icon
    5. Save/Retrieve LocalStorage

    ```JavaScript
    gameTiles.forEach(tile => tile.addEventListener("click", tileClicked))
    ```

- Created the game result logic. The function would return true if any winCondition was met when all values were equal and not blank. Simillarly, for the draw condition we can check if no tile was empty.

    ```JavaScript
    const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    function winConditionMet(currentGameBoard) {
        return winConditions.some(condition => allEqualAndNotBlank([...condition.map(index => currentGameBoard[index])]))
    }
    ```

- Controlled various game elemnents using element tags to avoid global variables. This included tracking player turns and board.

- Added CSS styling to the board using a classic look including shadows to give depth and a custom frame around the board.

- Added tactical animations to improve user experience and make the interface intuitive i.e. effects to clearly indicate if a section was interactive, sound on click, winner animations and animation prompts(start a new game). 

    ```CSS
    .button:hover {
        transition-duration: 0.1s;
        opacity: 0.8;
        transform: scale(1.1);
    }

    .win-glow { 
    animation: winning 1000ms 3;
    }

    @keyframes winning {
        50% {font-size: 100px;}
    }
    ```

- Saved a game file object to LocalStorage to allow a play to close and reopen the page. On load this savefile was restored.
    ```JavaScript
    function savePageToLocalStorage() {
        const currentGame = {
            scores: [...[...scoreCounters].map(score => score.innerHTML)],
            muted: (!muteIcon.classList.contains("muted")) ? false : true,
        }
        window.localStorage.setItem("savedObject", JSON.stringify(currentGame))
    }
    ```

- Allowed the player to toggle sound using an interactive mute button that was respected on page close and re-load.

- Made the page fully responive to screen sizes and mobile screens using adpating the layout below a minimum screen size.


## Challenges
- - -

- Structuring a more complex script: <br>
    I paid particular attention to this throughout the project. Wherever possible I would try to refactor code to make it succint and DRY. I tried to keep functions under 5 lines and made sure that naming conventions were consistent and descriptive. On occassions I used global varibales which is bad practice. On reflection I should have made an object to contain information to be passed into functions.

    Secondly I was having to create mutiple layers of functions due to my logic structure.  Although it kept individual functions clean, it was a trade off on ease of following the overall logic path. 

- Using HTML tags to track variables: <br>
    This is the first project I have used HTML element tags to track variables in order to keep the code as succint. Although it worked, I would like to read up on best practices as I don't think I used them as efficiently as I could have. 


##  Future Improvments
- - -

- Generate the board in JavaScript to avoid code duplication (code written but not released)
- Game can save mid-round and remember whos turn it was
- Add an AI to allow a player to play against the computer. Started the logic using an API move suggestor
- Fully implement a custom token upload. This was pesudocoded but not implemented.  