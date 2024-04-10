// Set up the app
const express = require('express')
const app = express()
const path = require('path')

// Import the controllers
const homeRouter = require('./routes/home')
const accountRouter = require('./routes/user-account')
const gameplayRouter = require('./routes/gameplay')
const loginRegisterRouter = require('./routes/login-register')
const scoreboardRouter = require('./routes/scoreboard')


//app.use(express.static("../frontend/public")): what's the difference with this?
app.use(express.static(path.join(__dirname , "../frontend/public")))
app.use(express.urlencoded({extended: false}))
// app.use(express.json())

/* 
/home -- only get
/account -- get, p
/scoreboard
/gemplay
/loign-register

*/


app.use('/user-account.html', accountRouter)
app.use('/gameplay.html', gameplayRouter)
app.use('/login-register.html', loginRegisterRouter)
app.use('/scoreboard.html', scoreboardRouter)
app.use('/home.html', homeRouter)
app.use('/', homeRouter)
// app.use('/home', home)
// app.use('/views', home)




// Set the server to start listening
app.listen(5001, ()=>{
    console.log('Server is listening on port 5001...')
})