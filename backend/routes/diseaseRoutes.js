const express = require("express");
const router = express.Router();

// ✅ correct import
const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  addDisease,
  getDiseases,
  getSingleDisease,
  updateDisease,
  deleteDisease
} = require("../controllers/diseaseController");

// ✅ Routes
router.post("/", protect, adminOnly, addDisease);     // only admin
router.get("/", getDiseases);                         // public
router.get("/:id", getSingleDisease);                 // public
router.put("/:id", protect, adminOnly, updateDisease); // admin
router.delete("/:id", protect, adminOnly, deleteDisease); // admin

module.exports = router;