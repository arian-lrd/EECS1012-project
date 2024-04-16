const path = require('path');
const fs = require('fs')

const  {
    cookieJwtAuth
} = require(path.join(__dirname, '..', 'controllers', 'login-register.js'))

const dataFilePath = path.join(__dirname, '..', 'records', 'data.json');

// Function to read user data from the JSON file
function readUserData(callback) {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            return callback(err, null);
        }

        try {
            const users = JSON.parse(data);
            callback(null, users);
        } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            callback(parseError, null);
        }
    });
}

// Send the file to a get request
const getGameplay = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'gameplay.html'));
}


const getUserHighScore = (req, res) => {
    const username = req.user.username//What?

    readUserData((err, users) => {
        if (err) {
            return res.status(500).send('Error fetching user data');
        }

        const user = users.find(user => user.username === username);
        if (user) {
            res.json({ highScore: user.highScore });
        } else {
            res.status(400).send('User not found');
        }
    });
};


function updateUserData(users, callback) {
    fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), 'utf8', callback);
}

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
                user.highScore = score;
                updateUserData(users, (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing user data:", writeErr);
                        return res.status(500).send("Error updating user score");
                    }
                    res.json({success: true, highScore: user.highScore});
                });
                // Write the updated users data back to the file
                // fs.writeFile(dataFilePath, JSON.stringify(users), (writeErr) => {
                //     if (writeErr) {
                //         console.error('Error writing user data:', writeErr);
                //         return res.status(500).send('Error updating user score');
                //     }
                //     res.json({ success: true, highScore: user.highScore });
                // });
            } else {
                res.json({ success: true, highScore: user.highScore });  // No update needed
            }
        } else {
            res.status(404).send('User not found');
        }
    });
};

module.exports = {
    getGameplay,
    getUserHighScore,
    updateScore
}