// Import the required modules
const path = require("path");

// Import required utility functions from utils/userData.js
// getUserByUsername: searches for a user by name in the user database 
const {
    getUserByUsername,
    deleteUser} = require(path.join(__dirname, '..', 'utils', 'userData.js'))

// Serve Account page to valid users
const getUserAccountPage = (req, res) => {
    // redirect users to login before accessing account page
    if (!req.user || !req.user.username) {
        return res.redirect('/login-register.html')
    }
    res.status(200).sendFile(path.join(__dirname, '..', '..', 'frontend', 'views', 'user-account.html'));
}


// Retrieve user accounts
const getUserAccount = (req, res)=>{
    // redirect users to login before sending registered
    if (!req.user || !req.user.username) {
        return res.redirect('/login-register.html')
    }
    // retrieve the user from user database
    const user = getUserByUsername(req.user.username);
    // Send 404 id user does not exist
    if (!user) {
        return res.status(404).send("User not found");
    }
    // If found, send the user information back in json format
    res.status(200).json({
        username: user.username,
        highScore: user.highScore
    })
}

const deleteUserAccount = (req, res) => {
    // redirect users to login before sending registered
    if (!req.user || !req.user.username) {
        return res.status(401).send('Unauthorized');
    }
    // delete user and store operation succes in a flag
    const success = deleteUser(req.user.username);
    if (success) {
        // Clear cookie after deleting user and send 200 status code
        res.clearCookie('token');  // Clear session token
        res.sendStatus(200);
    } else {
        // Send 500 status code if deletion failed
        res.status(500).send('Error deleting account');
    }
};

// Export the controllers

module.exports = {
    getUserAccount,
    getUserAccountPage,
    deleteUserAccount
}