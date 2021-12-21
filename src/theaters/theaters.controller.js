const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//will call the list service function and then display that data in json
async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
