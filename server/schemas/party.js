const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  partyLogo: {
    type: String,
    required: true,
  },
  constituenciesWon: {
    type: Number,
  },
});

module.exports = mongoose.model("Party", partySchema);
