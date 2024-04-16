const path = require("path");
const {getUserByUsername, deleteUser} = require(path.join(__dirname, '..', 'utils', 'userData.js'))

const getUserAccountPage = (req, res)=>{
    if (!req.user || !req.user.username) {
        return res.redirect('/login-register.html')
    }
    res.status(200).sendFile(path.join(__dirname, '..', '..', 'frontend', 'views', 'user-account.html'));

}



const getUserAccount = (req, res)=>{
    if (!req.user || !req.user.username) {
        return res.redirect('/login-register.html')
    }

    const user = getUserByUsername(req.user.username);
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).json({
        username: user.username,
        highScore: user.highScore
    })
}

const deleteUserAccount = (req, res) => {
    if (!req.user || !req.user.username) {
        return res.status(401).send('Unauthorized');
    }

    const success = deleteUser(req.user.username);
    if (success) {
        res.clearCookie('token');  // Clear session token
        res.sendStatus(200);
    } else {
        res.status(500).send('Error deleting account');
    }
};


module.exports = {
    getUserAccount,
    getUserAccountPage,
    deleteUserAccount
}