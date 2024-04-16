const express = require('express');
const path = require('path');
const router = express.Router();


const  {
    getUserAccount,
    getUserAccountPage,
    deleteUserAccount
} = require(path.join(__dirname, '..', 'controllers', 'user-account.js'))

const  {
    cookieJwtAuth
} = require(path.join(__dirname, '..', 'controllers', 'login-register.js'))


//router.use(es)

// router.route('/')
//     .get(getUserAccount)

router.get("/", cookieJwtAuth, getUserAccountPage)
router.get("/data", cookieJwtAuth, getUserAccount)
router.delete("/delete", cookieJwtAuth, deleteUserAccount)

// router.route('.html')
//     .get(getUserAccount)


module.exports = router