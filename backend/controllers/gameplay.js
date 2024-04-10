const path = require('path');
const fs = require('fs')

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
    const username = req.session.username || "defaultUser"; // Fallback to 'defaultUser' if session username is not set

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


const updateScore = (req, res) => {
    const username = req.session.username || "defaultUser";
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
                // Write the updated users data back to the file
                fs.writeFile(dataFilePath, JSON.stringify(users), (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing user data:', writeErr);
                        return res.status(500).send('Error updating user score');
                    }
                    res.json({ success: true, highScore: user.highScore });
                });
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