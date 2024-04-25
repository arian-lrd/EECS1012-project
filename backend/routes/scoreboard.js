// Import the Express module to create a router instance
const express = require('express');
const router = express.Router();

// Import controller functions related to the scoreboard
// getScoreboardPage: Loads the main scoreboard view
// getTopScores: Retrieves the top 10 scores from the database
const {
    getScoreboardPage,
    getTopScores
} = require('../controllers/scoreboard')


// Route configuration for scoreboard page

// Serve scoreboard page
router.route('/')
    .get(getScoreboardPage)

// Serve the top ten scores
router.route('/topTen')
    .get(getTopScores)

// Export the configured router
module.exports = router