const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vaccineName: {
      type: String,
      required: true,
    },
    doseNumber: {
      type: Number,
      required: true,
    },
    vaccinationDate: {
      type: Date,
      required: true,
    },
    nextDueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vaccination", vaccinationSchema);