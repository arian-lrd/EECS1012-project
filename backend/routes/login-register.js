const express = require('express');
const router = express.Router();

const {
    getLoginRegisterPage
    //list the controllers
} = require('../controllers/login-register')


//router.use(express.json())


//router.route('/')
    //.method(controllers)


router.route('/')
    .get(getLoginRegisterPage)
    //.method(controllers)

// router.route('/home')
//     .get(getHomePage)

    //.method(controllers)


module.exports = router