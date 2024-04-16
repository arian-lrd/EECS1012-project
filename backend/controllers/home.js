const path = require('path');

const getHomePage = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'home.html'));
}

//const namei = path.join(__dirname, '..', '..', 'frontend', 'views', 'home.html')

//console.log(namei)


module.exports = {
    getHomePage
}