const express = require('express');
const router = express.Router();
const path = require('path')

// Import controllers
const  {
    getGameplay,
    getUserHighScore,
    updateScore
} = require(path.join(__dirname, '..', 'controllers', 'gameplay.js'))

const  {
    cookieJwtAuth
} = require(path.join(__dirname, '..', 'controllers', 'login-register.js'))

//router.use(es)
router.route('/')
    .get(getGameplay)

router.route('/highscore')  // Add a new route for fetching the high score
    .get(cookieJwtAuth, getUserHighScore);


router.post('/update-score', cookieJwtAuth, updateScore);


module.exports = router