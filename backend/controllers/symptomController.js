const Disease = require("../models/Disease");

exports.checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    const diseases = await Disease.find({
      symptoms: { $in: symptoms }
    });

    res.json(diseases);
  } catch (err) {
    res.status(500).json(err);
  }
};