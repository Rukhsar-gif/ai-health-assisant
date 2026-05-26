import express from "express";
import { sendSOS } from "../controllers/sosController.js";

const router = express.Router();

// 🚨 SEND SOS
router.post("/", sendSOS);

export default router;