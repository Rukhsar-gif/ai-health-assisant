import Diet from "../models/Diet.js";

// ✅ Add Diet
export const addDiet = async (req, res) => {
  try {

    const diet = await Diet.create(req.body);

    res.status(201).json(diet);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
};

// ✅ Get All Diets
export const getDiets = async (req, res) => {
  try {

    const diets = await Diet.find();

    res.json(diets);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// ✅ DELETE Diet
export const deleteDiet = async (req, res) => {
  try {

    const { id } = req.params;

    const deletedDiet = await Diet.findByIdAndDelete(id);

    if (!deletedDiet) {
      return res.status(404).json({
        message: "Diet not found",
      });
    }

    res.json({
      message: "Diet deleted successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Delete failed",
    });

  }
};