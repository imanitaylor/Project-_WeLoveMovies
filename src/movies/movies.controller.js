const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//--- Middleware---//
//to make sure that a paramater that is put in has a matching id to a movie in the database
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  //if move exist then store that movie in local variable and pass it to the next function
  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  //if not then pass an error to the user
  return next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

//--- Route handlers ---//

// two cases are considered wit hthe main list function
//if there the route contains "is_showing" checks, if not then normal list response
async function list(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing === "true") {
    const data = await service.listShowingMovies();
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

//simple read function. is passes a local variable that contains a movies info (if it exists)
async function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

//read function. is passes a local variable that contains a movies info (if it exists)
//the readTheaters service function will attach theaters the movie is at
async function readTheaters(req, res, next) {
  const { movie } = res.locals;
  const data = await service.readTheaters(movie.movie_id);
  res.json({ data });
}

//read function. is passes a local variable that contains a movies info (if it exists)
//the readReviews service function will attach reviews the movie has
async function readReviews(req, res, next) {
  const { movie } = res.locals;
  const data = await service.readReviews(movie.movie_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};
