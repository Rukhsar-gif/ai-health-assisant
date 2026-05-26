


// // import React, { useState } from "react";
// // import api from "../services/api";

// // const AddDoctor = () => {
// //   const [form, setForm] = useState({
// //     name: "",
// //     specialization: "",
// //     hospital: "",
// //     city: ""
// //   });

// //   const [loading, setLoading] = useState(false);

// //   // Handle input change
// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   // Submit form
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       await api.post("/doctors/add", form);

// //       alert("Doctor added successfully ✅");

// //       setForm({
// //         name: "",
// //         specialization: "",
// //         hospital: "",
// //         city: ""
// //       });

// //     } catch (err) {
// //       alert(err.response?.data?.message || "Error adding doctor");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-100 to-white p-6">

// //       <div className="max-w-xl mx-auto">

// //         {/* Card */}
// //         <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg">

// //           <h1 className="text-2xl font-bold mb-6 text-gray-800">
// //             ➕ Add Doctor
// //           </h1>

// //           <form onSubmit={handleSubmit} className="space-y-4">

// //             {/* Name */}
// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Doctor Name"
// //               value={form.name}
// //               onChange={handleChange}
// //               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
// //               required
// //             />

// //             {/* Specialization */}
// //             <input
// //               type="text"
// //               name="specialization"
// //               placeholder="Specialization"
// //               value={form.specialization}
// //               onChange={handleChange}
// //               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
// //               required
// //             />

// //             {/* Hospital */}
// //             <input
// //               type="text"
// //               name="hospital"
// //               placeholder="Hospital Name"
// //               value={form.hospital}
// //               onChange={handleChange}
// //               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
// //               required
// //             />

// //             {/* City */}
// //             <input
// //               type="text"
// //               name="city"
// //               placeholder="City"
// //               value={form.city}
// //               onChange={handleChange}
// //               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
// //               required
// //             />

// //             {/* Button */}
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
// //             >
// //               {loading ? "Adding..." : "Add Doctor"}
// //             </button>

// //           </form>

// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default AddDoctor;


// import React, { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// const AddDoctor = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     specialization: "",
//     hospital: "",
//     city: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // 🔥 Handle input
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   // 🔥 Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.specialization || !form.hospital || !form.city) {
//       setMessage("⚠️ Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       await api.post("/doctors/add", form);

//       setMessage("✅ Doctor added successfully");

//       // Reset form
//       setForm({
//         name: "",
//         specialization: "",
//         hospital: "",
//         city: ""
//       });

//       // Redirect after short delay
//       setTimeout(() => {
//         navigate("/doctor");
//       }, 1200);

//     } catch (err) {
//       setMessage(err.response?.data?.message || "❌ Error adding doctor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 text-white">

//       {/* 🔥 Card */}
//       <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">

//         <h1 className="text-3xl font-bold mb-6 text-center">
//           👨‍⚕️ Add Doctor
//         </h1>

//         {/* Message */}
//         {message && (
//           <p className="text-center mb-4 text-sm text-yellow-300">
//             {message}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Name */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Doctor Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
//           />

//           {/* Specialization */}
//           <input
//             type="text"
//             name="specialization"
//             placeholder="Specialization (e.g., Cardiologist)"
//             value={form.specialization}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
//           />

//           {/* Hospital */}
//           <input
//             type="text"
//             name="hospital"
//             placeholder="Hospital Name"
//             value={form.hospital}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
//           />

//           {/* City */}
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={form.city}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
//           />

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-lg font-semibold transition ${
//               loading
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Adding..." : "Add Doctor"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// };

// export default AddDoctor;




import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const navigate = useNavigate();

  // ================= STATES =================
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    hospital: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Doctor List
  const [doctors, setDoctors] = useState([]);

  // ================= FETCH DOCTORS =================
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.doctors || [];

      setDoctors(data);

    } catch (err) {
      console.error("Error fetching doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= ADD DOCTOR =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.specialization ||
      !form.hospital ||
      !form.city
    ) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await api.post("/doctors/add", form);

      setMessage("✅ Doctor added successfully");

      // Reset Form
      setForm({
        name: "",
        specialization: "",
        hospital: "",
        city: ""
      });

      // Refresh doctors
      fetchDoctors();

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "❌ Error adding doctor"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE DOCTOR =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/doctors/${id}`);

      setDoctors(
        doctors.filter((doc) => doc._id !== id)
      );

      setMessage("🗑 Doctor deleted successfully");

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete doctor");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      {/* 🔥 Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* 🔥 Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            👨‍⚕️ Doctor Management
          </h1>

          <p className="text-gray-400 mt-2">
            Add and manage healthcare professionals
          </p>

        </div>

        {/* ================= GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ================= ADD FORM ================= */}
          <div
            className="
              bg-white/10 backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-8
              shadow-2xl
            "
          >

            <h2 className="text-2xl font-bold mb-6">
              ➕ Add Doctor
            </h2>

            {/* Message */}
            {message && (
              <div
                className="
                  mb-5 p-4 rounded-2xl
                  bg-cyan-500/10
                  border border-cyan-500/20
                  text-cyan-300
                "
              >
                {message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Doctor Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter doctor name"
                  value={form.name}
                  onChange={handleChange}
                  className="
                    w-full p-4 rounded-2xl
                    bg-white/10
                    border border-white/10
                    focus:outline-none
                    focus:ring-2 focus:ring-cyan-500
                    placeholder:text-gray-500
                  "
                />
              </div>

              {/* Specialization */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Specialization
                </label>

                <input
                  type="text"
                  name="specialization"
                  placeholder="Cardiologist, Dentist..."
                  value={form.specialization}
                  onChange={handleChange}
                  className="
                    w-full p-4 rounded-2xl
                    bg-white/10
                    border border-white/10
                    focus:outline-none
                    focus:ring-2 focus:ring-cyan-500
                    placeholder:text-gray-500
                  "
                />
              </div>

              {/* Hospital */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Hospital
                </label>

                <input
                  type="text"
                  name="hospital"
                  placeholder="Hospital name"
                  value={form.hospital}
                  onChange={handleChange}
                  className="
                    w-full p-4 rounded-2xl
                    bg-white/10
                    border border-white/10
                    focus:outline-none
                    focus:ring-2 focus:ring-cyan-500
                    placeholder:text-gray-500
                  "
                />
              </div>

              {/* City */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Doctor city"
                  value={form.city}
                  onChange={handleChange}
                  className="
                    w-full p-4 rounded-2xl
                    bg-white/10
                    border border-white/10
                    focus:outline-none
                    focus:ring-2 focus:ring-cyan-500
                    placeholder:text-gray-500
                  "
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-4 rounded-2xl
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  hover:from-cyan-400 hover:to-blue-500
                  font-semibold
                  transition-all duration-300
                  hover:scale-[1.02]
                  shadow-lg shadow-cyan-500/20
                "
              >
                {loading ? "Adding..." : "Add Doctor"}
              </button>

            </form>

          </div>

          {/* ================= DOCTOR LIST ================= */}
          <div
            className="
              bg-white/10 backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-8
              shadow-2xl
            "
          >

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                🏥 Doctor List
              </h2>

              <span
                className="
                  bg-cyan-500/20
                  text-cyan-300
                  px-4 py-1 rounded-full text-sm
                "
              >
                {doctors.length} Doctors
              </span>

            </div>

            {doctors.length === 0 ? (
              <p className="text-gray-400">
                No doctors available
              </p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">

                {doctors.map((doc) => (
                  <div
                    key={doc._id}
                    className="
                      bg-white/5
                      border border-white/10
                      rounded-2xl
                      p-5
                      hover:border-cyan-500/30
                      transition-all
                    "
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h3 className="text-xl font-semibold">
                          {doc.name}
                        </h3>

                        <p className="text-cyan-400 mt-1">
                          {doc.specialization}
                        </p>

                        <p className="text-gray-400 text-sm mt-2">
                          🏥 {doc.hospital}
                        </p>

                        <p className="text-gray-500 text-sm">
                          📍 {doc.city}
                        </p>

                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="
                          bg-red-500/20
                          hover:bg-red-500
                          text-red-300
                          hover:text-white
                          px-4 py-2 rounded-xl
                          transition-all duration-300
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddDoctor;