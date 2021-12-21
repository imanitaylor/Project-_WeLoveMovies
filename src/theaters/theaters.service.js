const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//creates one theater element and lists all its movies
const reduceTheaterAndMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  timestamps: ["movies", null, "timestamps"],
  is_showing: ["theaters", null, "is_showing"],
});

//GET method
//joins the two tables
//then uses the reduceTheaterAndMovie
//this returns all the theaters and the movies playing at each theater
function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .where({ "mt.is_showing": true })
    .then(reduceTheaterAndMovies);
}

module.exports = {
  list,
};
