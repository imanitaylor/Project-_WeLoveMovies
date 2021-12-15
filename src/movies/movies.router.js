const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


// - `GET /movies/:movieId`
// - `GET /movies/:movieId` (incorrect ID)
// - `GET /movies/:movieId/theaters`
// - `GET /movies/:movieId/reviews`

// - `GET /movies`
// - `GET /movies?is_showing=true`
router.route("/").get(controller.list).all(methodNotAllowed);


module.exports = router;