import express from "express";

import {
  addVaccine,
  getVaccines,
} from "../controllers/vaccineController.js";

import {
  verifyToken,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addVaccine);

router.get("/", verifyToken, getVaccines);

export default router;