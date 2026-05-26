const express = require("express");
const router = express.Router();
const { checkLocationHealth } = require("../controllers/locationController");

router.post("/location-health", checkLocationHealth);

module.exports = router;