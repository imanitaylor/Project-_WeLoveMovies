const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//--- Middleware---//
async function movieExists (req, res, next){
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie){
        res.locals.movie = movie;
        return next();
    }

    return next({
        status: 404,
        message: "Movie cannot be found.",
    })

}



//--- Route handlers ---//

// two cases are considered wit hthe main list function
//if there the route contains "is_showing" checks, if not then normal list response
async function list(req, res, next){
   
    const { is_showing } = req.query;
    if ( is_showing === "true"){
    const data = await service.listShowingMovies();
    res.json({ data });
    }
   
   else {
    const data = await service.list();
    res.json({ data });
   }
}

async function read (req, res, next){
    const { movie } = res.locals;
    res.json({ data: movie })
}


async function readTheaters(req, res, next){
    const { movie } = res.locals;
    const data = await service.readTheaters(movie.movie_id);
    res.json({ data });
}


async function readReviews(req, res, next){
    const { movie } = res.locals;
    const data = await service.readReviews(movie.movie_id);
   //res.json({ data: Object.values(info) });
   res.json({ data })
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
    readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
}