// Import Express library and create a router instance
const express = require('express');
const router = express.Router();

// Import controller functions related to home page 
// getHomePage: Renders home webpage of the application
const {
    getHomePage
} = require('../controllers/home') // TODO: Fix the path format with path.join


// Set up the routes
// Main route to render the hom page.
router.route('/')
    .get(getHomePage)

// Serve home page to /home as well.
router.route('/home')
    .get(getHomePage)


// Export router to be mounted on app.js
module.exports = router