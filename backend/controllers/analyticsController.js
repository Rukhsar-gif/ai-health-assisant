import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Diet from "../models/Diet.js";

export const getAnalytics = async (req, res) => {
  try {

    // ✅ Total Users
    const totalUsers = await User.countDocuments();

    // ✅ Total Doctors
    const totalDoctors = await Doctor.countDocuments();

    // ✅ Total Diet Plans
    const totalDietPlans = await Diet.countDocuments();

    // ✅ Unique Vaccines Count
    const users = await User.find();

    const vaccineSet = new Set();

    users.forEach((user) => {

      user.vaccinationSchedule?.forEach((vaccine) => {

        vaccineSet.add(vaccine.vaccineName);

      });

    });

    const totalVaccines = vaccineSet.size;

    // ✅ Response
    res.json({
      totalUsers,
      totalDoctors,
      totalDietPlans,
      totalVaccines,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Analytics Error",
    });

  }
};