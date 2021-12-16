const express = require("express");
const router = express.Router();
const constituency = require("../controllers/constituency");

router.get("/", constituency.getAllConstituencies);

router.get("/:id", constituency.specificConstituency);

router.post("/add", constituency.addConstituency);

router.post("/:id/add", constituency.newCandidateAdded);

router.post("/:id/delete", constituency.deleteConstituency);

module.exports = router;
