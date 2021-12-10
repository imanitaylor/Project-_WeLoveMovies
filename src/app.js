if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

//import the notFound and errorHandler error handlers
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());



app.use(notFound);
app.use(errorHandler);

module.exports = app;
