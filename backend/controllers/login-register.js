//// Import the required modules
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const bcrypt = require('bcrypt');

// Set JWT secret key and salting rounds
const saltRounds = 10;
const usersDataFile = path.join(__dirname, '../records/data.json')
let users = require(usersDataFile)
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET_KEY;


const getLoginRegisterPage = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'login-register.html'));
}


//Login
const evaluateUser = (req, res) => {
    // opening brace for the function
    console.log('Request body:', req.body);
    const { username, password } = req.body;

    console.log('Username:', username);
    console.log('Password:', password);

    validateUser(username, password, (isValid) => {  // opening brace for the callback
        if (isValid) {  // opening brace for the if statement
            // Generate a token (if using JWT)
            const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });

            // Set the token as a cookie in the response
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            console.log (`token is: ${token}`);

            return res.redirect('/gameplay.html');
        } else {  // opening brace for the else statement
            // Handle authentication failure
            res.status(401).send('Unauthorized');
        }  // closing brace for the else statement
    });  // closing brace for the callback
};

//define the validateUser function

function validateUser(username, password, callback) {
    const user = users.find(u => u.username === username)
    if (!user) return callback(false);
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        }
        callback(result);
    });

}


const registerUser = (req, res) => {
    console.log('Request body:', req.body);
    const { username, password } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);

    const existingUser = users.find(u=> u.username === username);
    

    if (existingUser) {
        return res.status(409).send("User already exists");
    } else {
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Error registring user")
            }
            const newUser = {username, password: hashedPassword, highScore: 0};
            users.push(newUser);
            //generate JWT
            const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' })

            // Write updated users to its file
            fs.writeFile(usersDataFile, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                    return res.status(500).send("Error registring user");
                }
                //return res.status(200).send('User registered successfully')
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000});
                return res.redirect('/gameplay.html')
            });
        });
    }
};


const cookieJwtAuth = (req, res, next) => {
    console.log(`\n\n\n\nThe request is ${req} \n\n\n\n`)
    console.log(req.cookies)
    console.log(req.cookies.token)
    const token = req.cookies.token
    if (!token) {
        if (req._parsedOriginalUrl.pathname !== '/login-register.html') {
            return res.redirect('/login-register.html');
        }
        return next()
    }//This may not be neccesary, since I still want users to be able to play if they are anonymous
    try {
        //important part
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (user && req._parsedOriginalUrl.pathname === '/login-register.html') {
            return res.redirect('/user-account.html')
        }
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token")
        return res.redirect("/")
    }
}


module.exports = {
    getLoginRegisterPage,
    evaluateUser,
    registerUser,
    cookieJwtAuth
}