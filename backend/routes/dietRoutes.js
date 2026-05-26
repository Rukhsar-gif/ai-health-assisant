import express from "express";

import {
  addDiet,
  getDiets,
  deleteDiet,
} from "../controllers/dietController.js";

const router = express.Router();

// ✅ Add Diet
router.post("/add", addDiet);

// ✅ Get All Diets
router.get("/", getDiets);

// ✅ Delete Diet
router.delete("/:id", deleteDiet);

export default router;