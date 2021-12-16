const Constituency = require("./schemas/constituency");

module.exports.isValidConstituency = async (req, res, next) => {
  const constituency = await Constituency.findOne({
    name: req.body.constituency,
  });
  if (constituency == undefined) {
    return res.status(403).send({ isNotValidConstituency: true });
  }
  next();
};
