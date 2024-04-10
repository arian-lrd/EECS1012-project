const path = require('path');
const fs = require('fs')

const topTenFilePath = path.join(__dirname, '..', 'records', 'topTen.json')

const getScoreboardPage = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'scoreboard.html'));
}


const getTopScores = (req, res) =>{
    fs.readFile(topTenFilePath, 'utf8', (err, data) => {
        if(err) {
            console.err("Error sending topTen.json:", err);
            return res.status(500).send("Error fetching top ten scores")
        }

        let scores = JSON.parse(data);

        scores.sort((a, b) => {
            return Number(b.highScore) - Number(a.highScore);
        });

        res.json(scores.slice(0, 10));

        
    })
}


module.exports = {
    getScoreboardPage,
    getTopScores
}