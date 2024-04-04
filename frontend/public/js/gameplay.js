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

        if (restarts == 0){
            highScore = score;
        }
        else if (score > highScore){
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
    numGuessed = playerSequence.length - 1;
    
    if (playerSequence.length == 0 || playerSequence[numGuessed] == gameSequence[numGuessed]){
        return true;
    }
    
    return false;
}

function displayGameInfo(){
    document.getElementById("level").innerHTML = "Level: " + level;
    document.getElementById("current-score").innerHTML = "Score: " + score;
    document.getElementById("high-score").innerHTML = "High score: " + highScore;
    document.getElementById("all-time-high").innerHTML = "All-time highest score: " + allTimeHigh; 
}

function newGame(){
    resetGameVariables();
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
    if (img == document.getElementById("0")){
        document.getElementById("highlight0").play();
    }
    if (img == document.getElementById("1")){
        document.getElementById("highlight1").play();
    }
    if (img == document.getElementById("2")){
        document.getElementById("highlight2").play();
    }
    if (img == document.getElementById("3")){
        document.getElementById("highlight3").play();
    }
}

function resetGameVariables(){
    gameSequence = [];
    playerSequence = [];
    playerTimes = [];
    level = 1;
    score = 0;
    highlightTime = 500;
    nextImgDelay = 300;
    document.getElementById("mistake").pause();
}

function gameOver(){
    document.getElementById("mistake").play();
    disableImgs();
    restarts ++;
    // display restart menu
}



newGame();