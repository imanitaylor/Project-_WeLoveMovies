if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

//import the notFound and errorHandler error handlers
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

//import routers
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
