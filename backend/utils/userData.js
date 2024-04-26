// Import required libraries
const fs = require('fs');
const path = require('path');

// Set paths to files
const dataFilePath = path.join(__dirname, '..', 'records', 'data.json');


// Function to load users from data.json
function loadUsers() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        const users = JSON.parse(data);
        return users;
    } catch (err) {
        console.error('Error reading or parsing data.json:', err);
        return [];
    }
}


// Function to save users to json.data
function saveUsers(users) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing data.json:', err);
        return false;
    }
}


// Function to delete users from json.data
function deleteUser(username) {
    let users = loadUsers();
    const filteredUsers = users.filter(user => user.username !== username);
    return saveUsers(filteredUsers);
}


// Function to find users through: usersname
function getUserByUsername(username) {
    const users = loadUsers();
    return users.find(user => user.username === username);
}


// Export functions
module.exports = {
    loadUsers,
    getUserByUsername,
    deleteUser
};
