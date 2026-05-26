import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  symptoms: {
    type: String,
  },

  doctorName: {
    type: String,
    required: true,
  },

  appointmentDate: {
    type: String,
    required: true,
  },

  appointmentTime: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model(
  "Appointment",
  appointmentSchema
);