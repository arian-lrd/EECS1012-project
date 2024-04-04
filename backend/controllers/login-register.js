const path = require('path');

const getLoginRegisterPage = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'login-register.html'));
}

//const namei = path.join(__dirname, '..', '..', 'frontend', 'views', 'home.html')

//console.log(namei)


module.exports = {
    getLoginRegisterPage
}