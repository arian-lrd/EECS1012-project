const express = require('express');
const router = express.Router();

// Import controllers
const  {
    getGameplay,
    getUserHighScore,
    updateScore
} = require('../controllers/gameplay.js')

//router.use(es)
router.route('/')
    .get(getGameplay)

router.route('/highscore')  // Add a new route for fetching the high score
    .get(getUserHighScore);

router.post('/update-score', updateScore);

// router.route('.html')
//     .get(getUserAccount)


module.exports = router