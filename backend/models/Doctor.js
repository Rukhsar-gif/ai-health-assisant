// const mongoose = require("mongoose");

// const doctorSchema = new mongoose.Schema({
//   name: String,
//   specialization: String,
//   hospital: String,
//   contact: String,
//   city: String
// });

// module.exports = mongoose.model("Doctor", doctorSchema);


import mongoose from "mongoose";
 
const doctorSchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
 
    // ── Professional Info ─────────────────────
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
    },
    hospital: {
      type: String,
      trim: true,
      default: "",
    },
    contact: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
 
    // ── Auth ──────────────────────────────────
    role: {
      type: String,
      default: "doctor",
    },
  },
  { timestamps: true }
);
 
export default mongoose.model("Doctor", doctorSchema);