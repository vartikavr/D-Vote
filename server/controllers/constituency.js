const Constituency = require("../schemas/constituency");
const Party = require("../schemas/party");

module.exports.getAllConstituencies = async (req, res) => {
  try {
    const constituencies = await Constituency.find({}).sort({ name: 1 });
    let party;
    if (winnerParty != null) {
      party = await Party.findOne({ name: winnerParty });
    } else {
      party = winnerParty;
    }
    return res.status(200).send({
      constituencies,
      startElection,
      endElection,
      party,
    });
  } catch (e) {
    return res
      .status(403)
      .send({ error: "error in getting all constituencies!" });
  }
};

module.exports.specificConstituency = async (req, res) => {
  try {
    const { id } = req.params;
    const constituency = await Constituency.findById(id);
    return res.status(200).send({ constituency, startElection, endElection });
  } catch (e) {
    return res
      .status(403)
      .send({ error: "error in getting specific constituency details." });
  }
};

module.exports.addConstituency = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      if (!startElection) {
        const newConstituency = new Constituency({
          name: req.body.name,
        });
        await newConstituency.save();
        res.status(200).send({ success: "Added constituency!" });
      } else {
        return res.status(403).send({ hasElectionStarted: true });
      }
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res.status(403).send({ error: "error in adding constituency" });
  }
};

module.exports.newCandidateAdded = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      if (!startElection) {
        const { id } = req.params;
        const currentConstituency = await Constituency.findById(id);
        currentConstituency.candidateIds.push(req.body.candidateId);
        await currentConstituency.save();
        return res
          .status(200)
          .send({ success: "candidate added in constituency successfully!" });
      } else {
        return res.status(403).send({ hasElectionStarted: true });
      }
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res
      .status(403)
      .send({ error: "error in adding candidate to constituency!" });
  }
};

module.exports.editConstituencyWinnerParty = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      const constituency = await Constituency.findById(req.body.id);
      constituency.winnerParty = req.body.winnerParty;
      await constituency.save();
      return res
        .status(200)
        .send({ success: "Successfully updated winner party of constituency" });
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res
      .status(403)
      .send({ error: "Error in updating constituency winner party" });
  }
};

module.exports.deleteConstituency = async (req, res) => {
  try {
    if (req.body.isAdmin) {
      if (!startElection) {
        const { id } = req.params;
        const constituencyToBeDeleted = await Constituency.findById(id);
        if (constituencyToBeDeleted.candidateIds.length === 0) {
          await Constituency.findByIdAndDelete(id);
          return res.status(200).send({ success: "Constituency deleted!" });
        } else {
          return res.status(403).send({ candidatesAlreadyRegistered: true });
        }
      } else {
        return res.status(403).send({ hasElectionStarted: true });
      }
    } else {
      return res.status(403).send({ isAdmin: false });
    }
  } catch (e) {
    return res.status(403).send({ error: "error in deleting constituency" });
  }
};
