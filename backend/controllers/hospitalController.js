const Hospital = require("../models/Hospital");

// Add hospital (Admin use)
exports.addHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get hospitals by city
exports.getHospitalsByCity = async (req, res) => {
  try {
    const hospitals = await Hospital.find({ city: req.params.city });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json(err);
  }
};