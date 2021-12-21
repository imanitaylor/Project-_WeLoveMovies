const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//--- Middleware Functions ---//
//to make sure that the review parameter has a matching id to a review in the database
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: "Review cannot be found." });
}

//--- Route Functions ---//

//PUT method route. calls two service functions
//the first is a normal update service that updates the review with what is new
//the second service then created a neted table display of the updated review, showing the critic
//then displays the updated and formatted review
async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await service.update(updatedReview);
  const newData = await service.addNestedCritic(updatedReview.review_id);
  res.json({ data: newData });
}

//DELETE method for a specific review
async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
