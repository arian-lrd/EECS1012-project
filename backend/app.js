// Set up the app
const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(cookieParser());


//load environment variables
require('dotenv').config();



app.use(session({
    secret: process.env.JWT_SECRET_KEY, // SEcret key loaded from .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));


// Import the controllers
const homeRouter = require('./routes/home')
const accountRouter = require('./routes/user-account')
const gameplayRouter = require('./routes/gameplay')
const loginRegisterRouter = require('./routes/login-register')
const scoreboardRouter = require('./routes/scoreboard')


//app.use(express.static("../frontend/public")): what's the difference with this?
app.use(express.static(path.join(__dirname , "../frontend/public")))
app.use(express.urlencoded({extended: false}))
app.use(express.json())



app.use('/user-account.html', accountRouter)
app.use('/gameplay.html', gameplayRouter)
app.use('/login-register.html', loginRegisterRouter)
app.use('/scoreboard.html', scoreboardRouter)
app.use('/scoreboard', scoreboardRouter)
app.use('/home.html', homeRouter)
app.use('/', homeRouter)
// app.use('/home', home)
// app.use('/views', home)

// Use the routers for different parts of the site
// Assuming the HTML files are served directly from the 'public' directory,
// and these routes are for dynamic content (like API endpoints)
app.use('/user-account', accountRouter); // Changed from '/user-account.html'
app.use('/gameplay', gameplayRouter);    // Changed from '/gameplay.html'
app.use('/login-register', loginRegisterRouter); // Changed from '/login-register.html'
app.use('/scoreboard', scoreboardRouter); // Changed from '/scoreboard.html'
app.use('/', homeRouter); // Home router can catch the base route



// Set the server to start listening
app.listen(5001, ()=>{
    console.log('Server is listening on port 5001...')
})