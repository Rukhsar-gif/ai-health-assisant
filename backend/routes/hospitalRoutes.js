const express = require("express");
const router = express.Router();
const { addHospital, getHospitalsByCity } = require("../controllers/hospitalController");

// Add hospital
router.post("/", addHospital);

// Get hospitals by city
router.get("/:city", getHospitalsByCity);

module.exports = router;