const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  city: String,
  contact: String,
  emergencyAvailable: Boolean
});

module.exports = mongoose.model("Hospital", hospitalSchema);