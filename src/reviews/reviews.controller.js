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

  
  async function destroy(req, res) {
    // your solution here
    const { review } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
  }


module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    
}