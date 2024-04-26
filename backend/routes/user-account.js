// Import Express module to create router and Path module for path operations
const express = require('express');
const path = require('path');

// Initialize router from express
const router = express.Router();

// Import controllers from corresponding controller files
// Controller imports for user account management
const  {
    getUserAccount,
    getUserAccountPage,
    deleteUserAccount
} = require(path.join(__dirname, '..', 'controllers', 'user-account.js'))

// Controller import for authentication
const  {
    cookieJwtAuth
} = require(path.join(__dirname, '..', 'controllers', 'login-register.js'))

// Route to serve the Account webpage after authentication
// cookieJwtAuth middleware authenticates the user before proceeding to getUserAccountPage
router.get("/", cookieJwtAuth, getUserAccountPage)

// Route to serve specific user account data after authentication
// cookieJwtAuth middleware ensures only authenticated requests access user data
router.get("/data", cookieJwtAuth, getUserAccount)

// Route to handle account deletion requests
// Includes authentication and user account deletion functionality
router.delete("/delete", cookieJwtAuth, deleteUserAccount)


// Export the configured router to be used in other parts of the application
module.exports = router