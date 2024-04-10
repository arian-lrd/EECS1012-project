const express = require('express');
const router = express.Router();

const {
    getLoginRegisterPage,
    evaluateUser,
    registerUser
    //list the controllers
} = require('../controllers/login-register')


//router.use(express.json())


//router.route('/')
    //.method(controllers)


router.route('/')
    .get(getLoginRegisterPage)
    

router.route('/login')
    .post(evaluateUser);
    //.method(controllers)


router.route('/signup')
    .post(registerUser);
// router.route('/home')
//     .get(getHomePage)

    //.method(controllers)


module.exports = router