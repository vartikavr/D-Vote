const express = require("express");
const router = express.Router();
const voter = require("../controllers/voter");

const { isValidConstituency } = require("../middleware");

router.post("/", voter.getAllVoters);

router.post("/add", isValidConstituency, voter.addVoter);

router.post("/:id/delete", voter.deleteVoter);

router.post("/checkVoter", voter.checkIfVoterRegistered);

module.exports = router;
