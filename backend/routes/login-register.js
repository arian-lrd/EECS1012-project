// Import the Express library to create a router instance
const express = require('express');
const router = express.Router();


// Import controller functions related to user login and registration
// getLoginRegisterPage: Renders the login and registration page
// evaluateUser: Processes login attempts
// registerUser: Handles new user registrations
// cookieJwtAuth: Middleware for authenticating users via JWT in cookies
const {
    getLoginRegisterPage,
    evaluateUser,
    registerUser,
    cookieJwtAuth
} = require('../controllers/login-register') //TODO: Fix path format

// Main route for the login and registration page
// cookieJwtAuth checks if the user is already logged in and either redirects or shows the page
router.route('/')
    .get(cookieJwtAuth, getLoginRegisterPage)

    
// Route for handling post request to login the user
// Calls evaluateUser function to check user credentials
router.route('/login')
    .post(evaluateUser);


// Route to handle post requests to sign up a new user
// Call registerUser function to create the user
    router.route('/signup')
    .post(registerUser);

// Route to handle user log out requests
// Clears cookie and send back 200 status code
router.post('/logout', (req, res) => {
    res.clearCookie('token');  
    res.sendStatus(200);  
});

// Export router to be mounted on app.js
module.exports = router