const express = require('express');
const router = express.Router();


// import functions
const {
    getLoginRegisterPage,
    evaluateUser,
    registerUser,
    cookieJwtAuth
} = require('../controllers/login-register')


router.route('/')
    .get(cookieJwtAuth, getLoginRegisterPage)
    
// route for user login 
router.route('/login')
    .post(evaluateUser);

// route for user signup
router.route('/signup')
    .post(registerUser);

// route for user logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');  // Replace 'token' with the name of your cookie
    res.sendStatus(200);  // Send back a success status
});


module.exports = router