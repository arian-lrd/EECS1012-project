const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'records', 'data.json');

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

function saveUsers(users) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing data.json:', err);
        return false;
    }
}

function deleteUser(username) {
    let users = loadUsers();
    const filteredUsers = users.filter(user => user.username !== username);
    return saveUsers(filteredUsers);
}


function getUserByUsername(username) {
    const users = loadUsers();
    return users.find(user => user.username === username);
}

module.exports = {
    loadUsers,
    getUserByUsername,
    deleteUser
};
