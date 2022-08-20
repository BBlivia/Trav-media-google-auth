const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars') //* sets up our template im using handlebars
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db'); // we importted the function we just build in db.js



//Loads our config, and tells server where to find the dotenv and the other enviroment variables 
dotenv.config({path: './config/config.env' })

connectDB()
const app = express()

//LOGGING
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))  //* tells us what pages are being used 
}

//Handlebars
app.engine('.hbs', exphbs.engine({   
    defaultLayout: 'main',  // this is our main layout it's what will be wrapped around all our layout parts so we dont have to pass it in everytime 
        extname: '.hbs'
    })
)
app.set('view engine', 'hbs')
//Passport config 
require('./config/passport')(passport)



app.use(session ({
    secret: 'keyboard cat',
    resave: false,   //dont wanna save a session
saveUninitialized: false,  //dont create session if nothing in store
cookie: {secure: true }
    
})
)

app.use(passport.initialize())
app.use(passport.session())

//Static folder (public)
app.use(express.static(path.join(__dirname, 'public'))) 

//Routes
app.use('/', require('./routes/index')) 
app.use('/auth', require('./routes/auth')) 

const PORT = process.env.PORT || 4001  // accessing port on env file
app.listen(PORT, console.log(`server running on ${process.env.NODE_ENV} mode on PORT ${PORT}`)) // NODE_ENV comes from our script 
