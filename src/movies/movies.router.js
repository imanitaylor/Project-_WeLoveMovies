const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


// - `GET /movies/:movieId/theaters`
router.route("/:movieId/theaters").get(controller.readTheaters).all(methodNotAllowed);

// - `GET /movies/:movieId/reviews`
router.route("/:movieId/reviews").get(controller.readReviews).all(methodNotAllowed);


// - `GET /movies/:movieId`
// - `GET /movies/:movieId` (incorrect ID)
router.route("/:movieId").get(controller.read).all(methodNotAllowed);


// - `GET /movies`
// - `GET /movies?is_showing=true`
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;