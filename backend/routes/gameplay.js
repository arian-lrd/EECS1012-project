// Import Express to create a router instance
const express = require('express');
const router = express.Router();

// Import path module
const path = require('path')

// Import controllers
// getGameplay: Accesses and sends the gameplay page
// getUserHighScore: Sends a json response containing user high score
// updateScore: Updates the server side record of user's high score if they reach a new high score
const  {
    getGameplay,
    getUserHighScore,
    updateScore
} = require(path.join(__dirname, '..', 'controllers', 'gameplay.js'))

// cookieJwtAuth: Authenitactes user identitiy by checking JWT cookie
const  {
    cookieJwtAuth
} = require(path.join(__dirname, '..', 'controllers', 'login-register.js'))


// Set up the routes 
// Main route to serve gampelay page on get request
router.route('/')
    .get(getGameplay)

// On get request to Authenticatt and send user high score
router.route('/highscore') 
    .get(cookieJwtAuth, getUserHighScore);

// Route to update user high score on server. JWT middleware is called first
router.post('/update-score', cookieJwtAuth, updateScore);

// Export the router to be mounted on app.j
module.exports = router