const express = require('express');
const router = express.Router();


//import functions
const {
    getScoreboardPage,
    getTopScores
    //list the controllers
} = require('../controllers/scoreboard')


// load the scoreboard page
router.route('/')
    .get(getScoreboardPage)

// load the top 10 scores
router.route('/topTen')
    .get(getTopScores)


module.exports = router