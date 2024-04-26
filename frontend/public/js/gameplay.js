var gameSequence = [];
var playerSequence = [];
var playerTimes = [];
var level = 1;
var restarts = 0;
var score = 0;
var highScore = 0;
var allTimeHigh = 0;
var highlightTime = 500;
var nextImgDelay = 300;

const allImgs = document.querySelectorAll(".grid > img");
const startGameBtn = document.getElementById('start-game-btn');
const startGameScreen = document.getElementsByClassName("start-game-screen")[0];
const gameScreen = document.getElementsByClassName("game-screen")[0];
const gameOverScreen = document.getElementsByClassName("game-over-screen")[0];
const quitGameBtn = document.getElementById("quit-game-btn");
const finalScoreElement = document.getElementById("final-score");
const rankElement = document.getElementById("rank");
const playAgainBtn = document.getElementById("play-again-btn");

function addRandomImg(){
    let max = 4;
    let i = Math.floor(Math.random() * max);
    let img = allImgs[i];
    gameSequence.push(img);
}


function highlight(img){ 
    return new Promise(function(resolve){
        img.classList.add("highlighted");
        
        playImgSound(img);
        setTimeout(function(){
            removeHighlight(img);
            setTimeout(resolve, nextImgDelay);
        }, highlightTime);
    });
}

function removeHighlight(img){
    img.classList.remove("highlighted");
}


function disableImgs(){
    for (let img of allImgs){
        img.removeEventListener("click", handleImgClick);
    }
}

function enableImgs(){
    for (let img of allImgs){
        img.addEventListener("click", handleImgClick);
    }
}

async function gameTurn(){
    addRandomImg();

    for (let img of gameSequence){
        await highlight(img);
    }  
    enableImgs();
    playerTimes.push(Date.now()); // keep track of the time before the first image is clicked
}

function handleImgClick(event){
    let img = event.currentTarget;
    // prevent user from guessing an image multiple times while it is still highlighted
    if (!img.classList.contains("highlighted")){
        playerTimes.push(Date.now()); // keep track of the time after an image has been clicked
        playerSequence.push(img);
        highlight(img);

        if (isCorrect()){
            let beforeClick = playerTimes[playerTimes.length - 2];
            let afterClick = playerTimes[playerTimes.length - 1];
            let imgScore = calclulateScore(beforeClick, afterClick);
            score += imgScore;
    
            if (score > highScore){
                highScore = score;
            }
                
            // if player has clicked on the last image on the sequence
            if (playerSequence.length == gameSequence.length){
                playerSequence = [];
                playerTimes = [];
                level ++;
    
                disableImgs();
                sendScoreToServer();
                // wait until last image is not highlighted anymore, plus a little bit more time
                setTimeout(gameTurn, highlightTime + nextImgDelay * 2);
            }
    
            displayGameInfo();
        } else {
            gameOver();
        }
    }
}

function isCorrect(){
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            return false;
        }
    }
    return true;
}

function displayGameInfo(){
    document.getElementById("level").textContent = "Level: " + level;
    document.getElementById("current-score").textContent = "Score: " + score;
    document.getElementById("high-score").textContent = "High score: " + highScore;
    document.getElementById("all-time-high").textContent = "All-time highest score: " + allTimeHigh; 
}

function newGame(){
    gameOverScreen.classList.add("hide");
    startGameScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
    resetGameVariables(); // Make sure this function resets all game-related variables
    displayGameInfo();

    // after clicking the start game button, delay starting the game
    setTimeout(() => {
        gameTurn();
    }, 500);
}

function calclulateScore(beforeClick, afterClick){
    let reactionTime = afterClick - beforeClick;
    let maxPoints = 20;

    if (reactionTime < highlightTime){
        return maxPoints;
    }
    else {
        return Math.floor(maxPoints * (highlightTime / reactionTime) + 1);
    }
}

function playImgSound(img){
    let soundElement;

    if (img.id === "0") {
        soundElement = document.getElementById("highlight0");
    } else if (img.id === "1") {
        soundElement = document.getElementById("highlight1");
    } else if (img.id === "2") {
        soundElement = document.getElementById("highlight2");
    } else if (img.id === "3") {
        soundElement = document.getElementById("highlight3");
    }

    if (soundElement) {
        soundElement.play().catch(error => {
            console.error("Error playing sound:", error);
            // Handle the error (e.g., by showing UI to ask the user to start playback)
        });
    }
}

function resetGameVariables(){
    gameSequence = [];
    playerSequence = [];
    playerTimes = [];
    level = 1;
    score = 0;
    highScore = fetchHighScore();
    highlightTime = 500;
    nextImgDelay = 300;
    document.getElementById("mistake").load();
}

function gameOver(){
    document.getElementById("mistake").play();
    disableImgs();
    restarts ++;
    sendScoreToServer();

    displayGameOverInfo();
}

function displayGameOverInfo(){
    gameScreen.classList.add("hide");
    gameOverScreen.classList.remove("hide");
    finalScoreElement.textContent = "Your score: " + score;
    rankElement.textContent = "This score's global rank: ";
}

// enable game-related buttons
document.addEventListener('DOMContentLoaded', () => {
    startGameBtn.addEventListener('click', newGame);
    quitGameBtn.addEventListener("click", gameOver);
    playAgainBtn.addEventListener("click", newGame);
});

async function fetchHighScore() {
    try {
        const response = await fetch('/gameplay/highscore');
        if (!response.ok) {
            throw new Error('Failed to fetch high score');
        }
        const data = await response.json();
        highScore = data.highScore;
        displayHighScore(highScore);
    } catch (error) {
        console.error('Error fetching high score:', error);
    }
}

function displayHighScore(highScore) {
    console.log("High Score:", highScore);
    const highScoreElement = document.getElementById("high-score");
    highScoreElement.textContent = `High score: ${highScore}`;
}


document.addEventListener('DOMContentLoaded', () => {
    // Assuming you want to fetch the high score as soon as the page loads
    fetchHighScore();
});


async function sendScoreToServer() {
    try {
        const response = await fetch('/gameplay/update-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Assuming you're storing the JWT in a cookie named 'token'
                // No need for the line below since the cookie is httpOnly
                //'Authorization': 'Bearer ' + document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]
            },
            body: JSON.stringify({ score: score }),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to update score');
        }

        const result = await response.json();
        if (result.success && result.highScore !== undefined) {
            highScore = result.highScore; // Update local highScore if it was beaten
            displayGameInfo(); // Update display information
        }
        console.log("Score updated successfully:", result);   
        // if (result.success && result.highScore) {
        //     allTimeHigh = result.highScore; // Update all-time high score if needed
        //     displayGameInfo(); // Refresh the display to show the new all-time high score
        // }
    } catch (error) {
        console.error('Error sending score to server:', error);
    }
}
