



import User from "../models/User.js";

// ================= ADD VACCINE =================
export const addVaccine = async (req, res) => {

  try {

    const {
      vaccineName,
      nextDueDate,
      category,
    } = req.body;

    // ✅ Validation
    if (
      !vaccineName ||
      !nextDueDate ||
      !category
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ Get all users
    const users = await User.find();

    // ✅ Add vaccine to every user
    for (let user of users) {

      if (!user.vaccinationSchedule) {
        user.vaccinationSchedule = [];
      }

      user.vaccinationSchedule.push({
        vaccineName,
        dueDate: nextDueDate,
        category,
        status: "pending",
      });

      await user.save();
    }

    res.status(201).json({
      message: "Vaccine added successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ================= GET VACCINES =================
export const getVaccines = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    res.json(user.vaccinationSchedule);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};