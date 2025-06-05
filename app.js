const connectDB = require('./config/db')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const { urlencoded } = require('body-parser')

// load config
dotenv.config({ path: './config/config.env' })

// Fix: Use correct env variable name for MongoDB URI
const mongoUri = process.env.MongoDB_URI

// passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(methodOverride((req,res) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// logs more stuff for dev
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

// HandleBars Helpers
const { formatDate, stripTags, editIcon, select } = require('./helpers/hbs')

// HandleBars
const hbs = exphbs.create({
    helpers: {formatDate, stripTags, editIcon, select},
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views', 'components'),
    extname: '.hbs'
})

// sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoUri })
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Handle bars
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

// set global variable
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

// makes the app live on specified port
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode at port ${process.env.PORT}`))