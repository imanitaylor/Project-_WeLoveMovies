const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//uses the map property to add the critic table
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

//GET request to /movies
//grab all movies from the table and only display the following columns
function list() {
  return knex("movies").select(
    "movie_id as id",
    "title",
    "runtime_in_minutes",
    "rating",
    "description",
    "image_url"
  );
}

// will be a function called in the GET request to /movies..
//if the main route has a query parameter of is_showing
//joins with the movies_theaters table to see the disctinct movies where "is_showing" is true
function listShowingMovies() {
  return knex("movies as m")
    .select(
      "m.movie_id as id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.movie_id")
    .where({ "mt.is_showing": true });
}

//GET method to read a movies data given a movieId
function read(movieId) {
  return knex("movies").where({ movie_id: movieId }).first();
}

//GET method to read a movies data given a movieId, this includes the theaters its at
function readTheaters(movieId) {
  return knex("movies as m")
    .where({ "m.movie_id": movieId })
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "m.movie_id");
}

//GET method to read a movies data given a movieId, this includes its reviews
function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.*"
    )
    .where({ "r.movie_id": movieId })
    .then((res) => res.map(addCritic));
}

module.exports = {
  list,
  listShowingMovies,
  read,
  readTheaters,
  readReviews,
};
