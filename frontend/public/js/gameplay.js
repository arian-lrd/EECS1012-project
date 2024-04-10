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
    // prevent user from guessing an image multiple times while it still highlighted
    if (!img.classList.contains("highlighted")){
        playerTimes.push(Date.now()); // keep track of the time after an image has been clicked
        playerSequence.push(img);
        highlight(img);
        
        let imgScore = calclulateScore(playerTimes[playerTimes.length - 2], playerTimes[playerTimes.length - 1]);
        let beforeClick = playerTimes[playerTimes.length - 2];
        let afterClick = playerTimes[playerTimes.length - 1];
        
        console.log(`${level}-${playerSequence.length} reaction time: ${afterClick - beforeClick}, score: ${imgScore}`);
        score += imgScore;

        if (score > highScore){
            highScore = score;
        }
    }
    
    if (isCorrect()){
        // if player has clicked on the last image on the sequence
        if (playerSequence.length == gameSequence.length){
            playerSequence = [];
            playerTimes = [];
            level ++;

            disableImgs();
            // wait until last image is not highlighted anymore, plus a little bit more time
            setTimeout(gameTurn, highlightTime + nextImgDelay * 2);
        }

        displayGameInfo();
    }
    else {
        gameOver();
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
    document.getElementById("level").innerHTML = "Level: " + level;
    document.getElementById("current-score").innerHTML = "Score: " + score;
    document.getElementById("high-score").innerHTML = "High score: " + highScore;
    document.getElementById("all-time-high").innerHTML = "All-time highest score: " + allTimeHigh; 
}

function newGame(){
    resetGameVariables(); // Make sure this function resets all game-related variables
    gameTurn();
    displayGameInfo();
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
    //restarts = 0; // Ensure restarts are also reset if necessary
    highlightTime = 500;
    nextImgDelay = 300;
    document.getElementById("mistake").pause();
}

function gameOver(){
    document.getElementById("mistake").play();
    disableImgs();
    restarts ++;
    // display restart menu
    sendScoreToServer();
    const startGameButton = document.getElementById('start-game-btn');
    startGameButton.style.display = 'block'; // Unhide the button on game over
}

document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('start-game-btn');
    startGameButton.addEventListener('click', () => {
        newGame();  // Call the function that starts the game
        startGameButton.style.display = 'none';  // Optionally hide the button after starting the game
    });
});

//newGame();

async function fetchHighScore() {
    try {
        const response = await fetch('/gameplay/highscore');
        if (!response.ok) {
            throw new Error('Failed to fetch high score');
        }
        const { highScore } = await response.json();
        displayHighScore(highScore);
    } catch (error) {
        console.error('Error fetching high score:', error);
    }
}

function displayHighScore(highScore) {
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
                'Authorization': 'Bearer ' + document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]
            },
            body: JSON.stringify({ score: score })
        });

        if (!response.ok) {
            throw new Error('Failed to update score');
        }

        const result = await response.json();
        if (result.success && result.highScore) {
            allTimeHigh = result.highScore; // Update all-time high score if needed
            displayGameInfo(); // Refresh the display to show the new all-time high score
        }
    } catch (error) {
        console.error('Error sending score to server:', error);
    }
}