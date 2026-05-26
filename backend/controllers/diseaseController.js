const Disease = require("../models/Disease");

exports.addDisease = async (req, res) => {
  try {
    const disease = await Disease.create(req.body);
    res.status(201).json(disease);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSingleDisease = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    res.json(disease);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDisease = async (req, res) => {
  try {
    const updated = await Disease.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteDisease = async (req, res) => {
  try {
    await Disease.findByIdAndDelete(req.params.id);
    res.json({ message: "Disease deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};