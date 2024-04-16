const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'records', 'data.json');
const topTenFilePath = path.join(__dirname,  '..', 'records','topTen.json');

function updateTopTenScores() {
    return new Promise ((resolve, reject) => {
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data.json:', err);
                return reject(err);
            }
    
            let users;
            try {
                users = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing user data:', parseError);
                return reject(parseError);
            }
            // Sort users by highScore in descending order
            users.sort((a, b) => Number(b.highScore) - Number(a.highScore));


            // Get the top 10 high scores
            let topTen = users.slice(0, 10);

            // Write the topTen to topTen.json
            fs.writeFile(topTenFilePath, JSON.stringify(topTen, null, 2), (err) => {
                if (err) {
                    console.error('Error writing topTen.json:', err);
                    return reject(err);
                }
                console.log('Top 10 high scores updated successfully.');
                resolve();
            });
        });
    });
}

// Call updateTopTenScores every time data.json is modified
// For example, after a user's high score is updated in data.json
module.exports = {
    updateTopTenScores
}
