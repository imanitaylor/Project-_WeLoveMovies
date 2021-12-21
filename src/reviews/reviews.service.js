const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//uses the map property function to add a nested critic table when joined
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

//this is a formatting function
//makes sure that the addCritic map function is added properly when its joined
function addNestedCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic);
}

//GET method route, for a specific reviewId
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

//PUT method route, for a specific reviewId
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

//DELETE method route, for a specific reviewId
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  update,
  addNestedCritic,
  delete: destroy,
};
