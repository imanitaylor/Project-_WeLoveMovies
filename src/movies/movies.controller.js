const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


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

module.exports = {
    list,
}