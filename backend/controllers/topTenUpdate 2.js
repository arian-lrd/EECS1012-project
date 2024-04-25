// Import the required modules
const fs = require('fs');
const path = require('path');

//// Set up the paths to files that will be used in this code
// Set up path to users database in data.json file
const dataFilePath = path.join(__dirname, '..', 'records', 'data.json');
// Set up path to top ten users information in topTen.json file
const topTenFilePath = path.join(__dirname,  '..', 'records','topTen.json');

// Function t to update the top ten scores 
function updateTopTenScores() {
    return new Promise ((resolve, reject) => {
        // Read the user data from the JSON file
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data.json:', err);
                return reject(err);
            }
    
            let users;
            try {
                // Attempt to parse the JSON data into an array of users
                users = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing user data:', parseError);
                return reject(parseError); // Reject the promise if JSON parsing fails
            }
            // Sort users by highScore in descending order
            users.sort((a, b) => Number(b.highScore) - Number(a.highScore));

            // Slice the first 10 elements to get the top ten high scores
            let topTen = users.slice(0, 10);

            // Write the topTen to topTen.json
            fs.writeFile(topTenFilePath, JSON.stringify(topTen, null, 2), (err) => {
                if (err) {
                    console.error('Error writing topTen.json:', err);
                    return reject(err); // Reject the promise if file writing fails
                }
                console.log('Top 10 high scores updated successfully.');
                resolve(); // Resolve the promise indicating success
            });
        });
    });
}

/*Note:  Call updateTopTenScores every time data.json is modified
For example, after a user's high score is updated in data.json */

// Export the controllers
module.exports = {
    updateTopTenScores
}
