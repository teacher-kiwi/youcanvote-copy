const mongoose = require("mongoose");

const schema = {
  title: String,
  token: String,
  isDone: { type: Boolean, default: false },
  yesCount: { type: Number, default: 0 },
  noCount: { type: Number, default: 0 },
};

const Vote = mongoose.model("Vote", schema);

module.exports = Vote;
