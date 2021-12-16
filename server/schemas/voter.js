const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  constituency: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Voter", voterSchema);
