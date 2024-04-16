const path = require('path');
const fs = require('fs')

const topTenFilePath = path.join(__dirname, '..', 'records', 'topTen.json')

const  {
    updateTopTenScores
} = require(path.join(__dirname, '..', 'controllers', 'topTenUpdate.js'))

// const getScoreboardPage = (req, res)=>{
//     res
//     .status(200)
//     .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'scoreboard.html'));
// }

const getScoreboardPage = async (req, res) => {
    try {
        await updateTopTenScores();  // Wait for the top ten scores to update
        res.status(200).sendFile(path.join(__dirname, '..', '..', 'frontend', 'views', 'scoreboard.html'));
    } catch (error) {
        console.error("Failed to update top ten scores:", error);
        res.status(500).send("Error updating top ten scores.");
    }
};


// const getTopScores = (req, res) =>{
//     updateTopTenScores()
//     fs.readFile(topTenFilePath, 'utf8', (err, data) => {
//         if(err) {
//             console.err("Error sending topTen.json:", err);
//             return res.status(500).send("Error fetching top ten scores")
//         }

//         let scores = JSON.parse(data);

//         scores.sort((a, b) => {
//             return Number(b.highScore) - Number(a.highScore);
//         });

//         res.json(scores.slice(0, 10));

        
//     })
// }
const getTopScores = async (req, res) => {
    try {
        // Update the top ten scores first and wait for the operation to complete
        await updateTopTenScores();

        // Then read the updated top ten scores file
        const data = fs.readFileSync(topTenFilePath, 'utf8'); // Use readFileSync for simplicity in an async function
        const scores = JSON.parse(data);

        // Ensure scores are sorted, though they should already be if updateTopTenScores works correctly
        scores.sort((a, b) => Number(b.highScore) - Number(a.highScore));

        // Send the top 10 scores
        res.json(scores.slice(0, 10));
    } catch (err) {
        console.error("Error handling top scores:", err);
        res.status(500).send("Error fetching top ten scores");
    }
};


module.exports = {
    getScoreboardPage,
    getTopScores
}