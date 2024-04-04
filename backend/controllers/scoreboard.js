const path = require('path');

const getScoreboardPage = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'scoreboard.html'));
}

//const namei = path.join(__dirname, '..', '..', 'frontend', 'views', 'home.html')

//console.log(namei)


module.exports = {
    getScoreboardPage
}