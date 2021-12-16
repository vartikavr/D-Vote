const express = require("express");
const router = express.Router();
const party = require("../controllers/party");

router.post("/", party.getAllParties);

router.post("/i", party.getSpecificParty);

router.post("/add", party.addParty);

router.post("/candidate", party.checkIsValidParty);

module.exports = router;
