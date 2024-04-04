const path = require("path");

const getUserAccount = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..', '..', 'frontend', 'views', 'user-account.html' ))
}


module.exports = {
    getUserAccount
}