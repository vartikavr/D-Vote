const Party = require("../schemas/party");

module.exports.getAllParties = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      const parties = await Party.find({}).sort({ name: 1 });
      res.status(200).send({ parties });
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res.status(403).send({ error: "error in getting all parties" });
  }
};

module.exports.getSpecificParty = async (req, res) => {
  try {
    const party = await Party.findOne({ name: req.body.partyName });
    return res.status(200).send({ party });
  } catch (e) {
    return res.status(403).send({ error: "error in getting specific party" });
  }
};

module.exports.addParty = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      const newParty = new Party({
        name: req.body.name,
        partyLogo: req.body.image,
      });
      await newParty.save();
      return res.status(200).send({ success: "added party!" });
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res.status(403).send({ error: "error in adding party!" });
  }
};

module.exports.checkIsValidParty = async (req, res) => {
  try {
    const isValidParty = await Party.findOne({ name: req.body.party });
    if (isValidParty) {
      return res.status(200).send({ success: "Valid Party name" });
    } else {
      return res.status(403).send({ isValidParty: false });
    }
  } catch (e) {
    return res.status(403).send({ error: "error in checking valid party!" });
  }
};
