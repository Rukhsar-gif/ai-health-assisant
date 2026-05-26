import Appointment from "../models/Appointment.js";

// ================= CREATE APPOINTMENT =================
export const createAppointment = async (req, res) => {
  try {

    const appointment =
      await Appointment.create(req.body);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to book appointment",
    });

  }
};

// ================= GET APPOINTMENTS =================
export const getAppointments = async (req, res) => {
  try {

    const appointments =
      await Appointment.find().sort({
        createdAt: -1,
      });

    res.json(appointments);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch appointments",
    });

  }
};