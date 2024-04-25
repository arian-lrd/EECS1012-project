// app.js file for the backend

// Import the required modules
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const path = require('path');

// Set up the app
const app = express()


//load environment variables for JWT signature
require('dotenv').config();


// Import the controllers
const homeRouter = require('./routes/home')
const accountRouter = require('./routes/user-account')
const gameplayRouter = require('./routes/gameplay')
const loginRegisterRouter = require('./routes/login-register')
const scoreboardRouter = require('./routes/scoreboard')


// Configure session handling
app.use(session({
    secret: process.env.JWT_SECRET_KEY, // Secret key loaded from .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));


// Set up : Cookie parser
//          Json parser
//          urlencoded parser
//          Static file server
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname , "../frontend/public")))


// Set up the routing paths
// TODO: Fix the routing paths by removing the redundant paths
// Note: Due to some miconfiguration currently both sets of routing instructions
//       are required at for the code to run
app.use('/user-account.html', accountRouter)
app.use('/gameplay.html', gameplayRouter)
app.use('/login-register.html', loginRegisterRouter)
app.use('/scoreboard.html', scoreboardRouter)
app.use('/scoreboard', scoreboardRouter)
app.use('/home.html', homeRouter)
app.use('/', homeRouter)
/* 
app.use('/home', home)
app.use('/views', home)
 */
// Use the routers for different parts of the site
// Assuming the HTML files are served directly from the 'public' directory,
// and these routes are for dynamic content (like API endpoints)
app.use('/user-account', accountRouter); 
app.use('/gameplay', gameplayRouter);    
app.use('/login-register', loginRegisterRouter);
app.use('/scoreboard', scoreboardRouter); 
app.use('/', homeRouter); 



// Set the server to start listening
app.listen(5001, ()=>{
    console.log('Server is listening on port 5001...')
})