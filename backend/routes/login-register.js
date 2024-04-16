const express = require('express');
const router = express.Router();

const {
    getLoginRegisterPage,
    evaluateUser,
    registerUser,
    cookieJwtAuth
    //list the controllers
} = require('../controllers/login-register')


//router.use(express.json())


//router.route('/')
    //.method(controllers)


router.route('/')
    .get(cookieJwtAuth, getLoginRegisterPage)
    

router.route('/login')
    .post(evaluateUser);
    //.method(controllers)


router.route('/signup')
    .post(registerUser);

router.post('/logout', (req, res) => {
    res.clearCookie('token');  // Replace 'token' with the name of your cookie
    res.sendStatus(200);  // Send back a success status
});
// router.route('/home')
//     .get(getHomePage)

    //.method(controllers)


module.exports = router