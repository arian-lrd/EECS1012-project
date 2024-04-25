// Import require modules
const path = require('path');
const fs = require('fs')

//// Set up the paths to files that will be used in this code

// Set up path to data.json file
const dataFilePath = path.join(__dirname, '..', 'records', 'data.json');

//// Import required controllers
// cookieJwtAuth: authenitcate users. (Used in future)
const  {
    cookieJwtAuth
} = require(path.join(__dirname, '..', 'controllers', 'login-register.js'))



///Function definitions

// Sends the 'gameplay.html' file in response to a GET request
const getGameplay = (req, res) => {
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'gameplay.html'));
}


// Function to asynchronously read user data from a JSON file and parse it
function readUserData(callback) {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            // Calls the callback with an error object and no data
            return callback(err, null);
        }
        try {
            // Attempt to parse the read data into JSON format
            const users = JSON.parse(data);
            // Calls the callback with no error and the parsed data
            callback(null, users);
        } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            // Calls the callback with a parsing error object and no data
            callback(parseError, null);
        }
    });
}


// Retrieves and sends the high score of a specific user
const getUserHighScore = (req, res) => {
    const username = req.user.username // Extract username from the request object
    readUserData((err, users) => {
        if (err) {
            return res.status(500).send('Error fetching user data');
        }
        const user = users.find(user => user.username === username);
        if (user) {
            res.json({ highScore: user.highScore });  // Send user's high score as JSON
        } else {
            res.status(400).send('User not found'); // Send an error if the user is not found
        }
    });
};

// Writes updated user data to the JSON file
function updateUserData(users, callback) {
    // Stringifies the data with an indentation of 2 spaces for readability
    fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), 'utf8', callback);
}

// Updates the high score of a specific user if the new score is higher
const updateScore = (req, res) => {
    const username = req.user.username;
    const { score } = req.body;  // Assuming the score is sent in the request body

    readUserData((err, users) => {
        if (err) {
            console.error('Error reading user data:', err);
            return res.status(500).send('Error fetching user data');
        }

        let user = users.find(user => user.username === username);
        if (user) {
            if (score > user.highScore) {
                user.highScore = score;  // Update the high score if the new score is higher
                updateUserData(users, (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing user data:", writeErr);
                        return res.status(500).send("Error updating user score");
                    }
                    res.json({success: true, highScore: user.highScore}); // Send success response
                });
            } else {
                res.json({ success: true, highScore: user.highScore });  // No update needed, send current high score
            }
        } else {
            res.status(404).send('User not found'); // Send an error if the user is not found
        }
    });
};

// Export the controllers
module.exports = {
    getGameplay,
    getUserHighScore,
    updateScore
}