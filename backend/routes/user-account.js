const express = require('express');
const router = express.Router();

const  {
    getUserAccount
} = require('../controllers/user-account')

//router.use(es)

router.route('/')
    .get(getUserAccount)

// router.route('.html')
//     .get(getUserAccount)


module.exports = router