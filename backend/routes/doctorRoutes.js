import express from "express";
import { addDoctor, getDoctors, deleteDoctor } from "../controllers/doctorController.js";

const router = express.Router();

// 🔒 Only admin can add doctor
router.post("/add", addDoctor);

// 👀 Everyone can view doctors
router.get("/", getDoctors);

// 🗑 Delete Doctor
router.delete("/:id", deleteDoctor);

export default router;
