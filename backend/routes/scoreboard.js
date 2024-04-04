const express = require('express');
const router = express.Router();

const {
    getScoreboardPage
    //list the controllers
} = require('../controllers/scoreboard')


//router.use(express.json())


//router.route('/')
    //.method(controllers)


router.route('/')
    .get(getScoreboardPage)
    //.method(controllers)

// router.route('/home')
//     .get(getHomePage)

    //.method(controllers)


module.exports = router