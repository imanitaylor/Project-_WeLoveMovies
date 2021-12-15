const knex = require("../db/connection");

//GET request to /movies
//grab all movies from the table and only display the following columns
function list(){
return knex("movies").select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url")
}


// will be a function called in the GET request to /movies..
//if the main route has a query parameter of is_showing
//joins with the movies_theaters table to see the disctinct movies where "is_showing" is true
function listShowingMovies(){
    return knex("movies as m")
    .select("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
    .join("movies_theaters as mt","m.movie_id","mt.movie_id")
    .distinct("m.movie_id")
    .where({ "mt.is_showing" : true })
    }




module.exports = {
    list,
    listShowingMovies,
}