const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const connectDB = require('./models/db.js')
const exphbs = require('express-handlebars')
const path = require('path')
const router = require('./routes/bugeyeRoutes')
//const public = path.join(__dirname, '/public');

const AuthRoute  = require('./routes/auth')

const app = express()

// Load config
dotenv.config();

connectDB();

// Logs
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Static folder
app.use(express.static(path.join(__dirname, './public/css')));
//app.use(express.static(path.join(__dirname, '/public/')));
//app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app

// Handlebars Helpers
//const { formatDate, select } = require('../helpers/hbs');

// Handlebars
app.engine('.hbs', exphbs({ helpers: {
    //formatDate,
    //select
}, extname: '.hbs', partialsDir: [ path.join(__dirname, './partials')] }));
app.set('view engine', '.hbs');

const PORT = process.env.PORT || 8000

// Routes
app.use('/auth', AuthRoute)
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}. Ctrl^c to quit.`);
});