// Import the required modules
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const bcrypt = require('bcrypt');
require('dotenv').config();

// Set JWT secret key and salting rounds
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET_KEY;

// Load require files
// Load users data from data.json and store in 'users' variable
const usersDataFile = path.join(__dirname, '../records/data.json')
let users = require(usersDataFile)


// Sends the 'login-register.html' file in response to a GET request
const getLoginRegisterPage = (req, res)=>{
    res
    .status(200)
    .sendFile(path.join(__dirname, '..','..', 'frontend', 'views', 'login-register.html'));
}


// Authenticate the user based on username and password using the validateUser function and respond accordingly
const evaluateUser = (req, res) => {
    const { username, password } = req.body;
    
    // Log information
    console.log('Request body:', req.body);
    console.log('Username:', username);
    console.log('Password:', password);

    validateUser(username, password, (isValid) => {  // opening brace for the callback
        if (isValid) { 
            // Generate a JWT for the user that expires in 1 hour
            const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });

            // Set the token as a secure HTTP-only cookie in the response
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            console.log (`token is: ${token}`);

            return res.redirect('/gameplay.html');
        } else { 
            // Respond with an Unauthorized status if validation fails
            res.status(401).send('Unauthorized');
        }  
    });  
};


// Function to check if user exists and verify password
function validateUser(username, password, callback) {
    const user = users.find(u => u.username === username)
    if (!user) return callback(false);
    // Compare provided password with stored hashed password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        }
        callback(result);
    });

}


// Register a new user with a hashed password
const registerUser = (req, res) => {
    // extract username and password
    const { username, password } = req.body;
    // Log information
    console.log('Request body:', req.body);
    console.log('Username:', username);
    console.log('Password:', password);
    // search in the users database
    const existingUser = users.find(u=> u.username === username);
    
    if (existingUser) {
        // Send a conflict status if user already exists
        return res.status(409).send("User already exists");
    } else {
        // Hash the new user's password and add them to the users array
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Error registring user")
            }
            const newUser = {username, password: hashedPassword, highScore: 0};
            users.push(newUser);

            // Generate a token for the new user
            const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' })

            // Write updated user data back to the file
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
    // Log information
    console.log(`\n\n\n\nThe request is ${req} \n\n\n\n`)
    console.log(req.cookies)
    console.log(req.cookies.token)
    const token = req.cookies.token //extract token
    if (!token) {
        // Redirect to login page if no token is present and not already on login page
        if (req._parsedOriginalUrl.pathname !== '/login-register.html') {
            return res.redirect('/login-register.html');
        }
        return next()
    }//This may not be neccesary, since I still want users to be able to play if they are anonymous
    try {
        // Verify the token and redirect if already on login page
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

// Export functions for use in other parts of the application
module.exports = {
    getLoginRegisterPage,
    evaluateUser,
    registerUser,
    cookieJwtAuth
}