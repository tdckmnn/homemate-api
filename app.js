//import dependencies
const express = require("express");

//define express app
const app = express();

//define env port
const port = process.env.PORT || 3001;

app.listen(port, console.log(`Example app listening on port ${port}!`));