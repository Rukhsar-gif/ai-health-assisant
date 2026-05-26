import Doctor from "../models/Doctor.js";

// ✅ Add doctor (admin use)
export const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body); // ✅ SAVE TO DB
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors); // ✅ IMPORTANT
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const doctor = await Doctor.findByIdAndDelete(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json({
      message: "Doctor deleted successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};
