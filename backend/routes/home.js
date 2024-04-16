const express = require('express');
const router = express.Router();

const {
    getHomePage
} = require('../controllers/home')



router.route('/')
    .get(getHomePage)

router.route('/home')
    .get(getHomePage)


module.exports = router