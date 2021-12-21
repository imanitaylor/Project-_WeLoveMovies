const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// DELETE /reviews/:reviewId
// DELETE /reviews/:reviewId (incorrect ID)
// UPDATE /reviews/:reviewId
// UPDATE /reviews/:reviewId (incorrect ID)
router
  .route("/:reviewId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
