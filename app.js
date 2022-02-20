//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require('dotenv').config();

//define express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

//define env port
const port = process.env.PORT || 3001;

//Database
const dbConfig = require('./service/db.service.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the databse");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now..", err);
    process.exit();
});

//routes
app.get('/v', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

app.listen(port, console.log(`Example app listening on port ${port}!`));