const Voter = require("../schemas/voter");

module.exports.getAllVoters = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      const voters = await Voter.find({}).sort({ name: 1 });
      res.status(200).send({ voters });
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res.status(403).send({ error: "error in getting all voters" });
  }
};

module.exports.addVoter = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      const newVoter = new Voter({
        name: req.body.name,
        voterId: req.body.voterId,
        address: req.body.address,
        constituency: req.body.constituency,
      });
      await newVoter.save();
      return res.status(200).send({ success: "added voter!" });
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res.status(403).send({ error: "error in adding voter!" });
  }
};

module.exports.deleteVoter = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      if (req.body.hasNotVoted) {
        const { id } = req.params;
        await Voter.findByIdAndDelete(id);
        return res.status(200).send({ success: "deleted voter!" });
      } else {
        return res.status(403).send({ hasAlreadyVoted: true });
      }
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return re.status(403).send({ error: "error in deleting voter" });
  }
};

module.exports.checkIfVoterRegistered = async (req, res) => {
  try {
    const isVoterRegistered = await Voter.findOne({
      address: new RegExp(`^${req.body.storeAddress}$`, "i"),
    });
    if (isVoterRegistered) {
      return res
        .status(200)
        .send({ success: "Voter is registered!", voter: isVoterRegistered });
    } else {
      return res.status(403).send({ isVoterRegistered: false });
    }
  } catch (e) {
    return res
      .status(403)
      .send({ error: "error in checking if voter is registered" });
  }
};
