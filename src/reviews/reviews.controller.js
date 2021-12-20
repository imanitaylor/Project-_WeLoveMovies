const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
  
    const review = await service.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: "Review cannot be found." });
  }

  
  async function update(req, res) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    await service.update(updatedReview);
    const newData = await service.addCriticCategory(updatedReview.review_id);
    res.json({ data: newData });
  }



  async function destroy(req, res) {
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
  }


module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  
}