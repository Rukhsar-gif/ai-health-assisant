import express from "express";

import {
  createAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

// CREATE
router.post("/", createAppointment);

// GET ALL
router.get("/", getAppointments);

export default router;