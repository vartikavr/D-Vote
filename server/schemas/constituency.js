const mongoose = require("mongoose");

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //array of candidate ids associated with this constituency
  candidateIds: [
    {
      type: Number,
    },
  ],
  winnerParty: {
    type: String,
    default: "none",
  },
});

module.exports = mongoose.model("Constituency", constituencySchema);
