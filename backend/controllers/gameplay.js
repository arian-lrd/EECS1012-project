const path = require('path');


// Send the file to a get request
const getGameplay = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'gameplay.html'));
}

//const namei = path.join(__dirname, '..', '..', 'frontend', 'views', 'home.html')

//console.log(namei)


module.exports = {
    getGameplay
}