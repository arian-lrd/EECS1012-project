const express = require('express');
const router = express.Router();

const {
    getHomePage
    //list the controllers
} = require('../controllers/home')


//router.use(express.json())


//router.route('/')
    //.method(controllers)


router.route('/')
    .get(getHomePage)
    //.method(controllers)

router.route('/home')
    .get(getHomePage)

    //.method(controllers)


module.exports = router