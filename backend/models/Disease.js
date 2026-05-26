const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: String,
  symptoms: [String],
  prevention: [String],
  treatment: [String],
  officialSource: String,
  outbreakLevel: { type: String, default: "normal" }
}, { timestamps: true });

module.exports = mongoose.model("Disease", diseaseSchema);