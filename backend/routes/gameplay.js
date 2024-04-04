const express = require('express');
const router = express.Router();

// Import controllers
const  {
    getGameplay
} = require('../controllers/gameplay.js')

//router.use(es)
router.route('/')
    .get(getGameplay)

// router.route('.html')
//     .get(getUserAccount)


module.exports = router