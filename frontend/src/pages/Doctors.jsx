// // import React, { useEffect, useState } from "react";
// // import api from "../services/api";

// // const Doctor = () => {
// //   const [doctors, setDoctors] = useState([]);
// //   const [filteredDoctors, setFilteredDoctors] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [search, setSearch] = useState("");
// //   const [specialization, setSpecialization] = useState("");

// //   // 🔥 Fetch Doctors
// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         const res = await api.get("/doctors");

// //         const data = Array.isArray(res.data)
// //           ? res.data
// //           : res.data.doctors || [];

// //         setDoctors(data);
// //         setFilteredDoctors(data);

// //       } catch (err) {
// //         console.error("Error fetching doctors");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDoctors();
// //   }, []);

// //   // 🔍 Search + Filter Logic
// //   useEffect(() => {
// //     let result = doctors;

// //     if (search) {
// //       result = result.filter((doc) =>
// //         doc.name.toLowerCase().includes(search.toLowerCase())
// //       );
// //     }

// //     if (specialization) {
// //       result = result.filter((doc) =>
// //         doc.specialization === specialization
// //       );
// //     }

// //     setFilteredDoctors(result);
// //   }, [search, specialization, doctors]);

// //   // Get unique specializations
// //   const specializations = [...new Set(doctors.map((d) => d.specialization))];

  

// //   return (
// //     <div className="min-h-screen bg-gray-950 text-white p-6">

// //       <h1 className="text-3xl font-bold mb-6">
// //         👨‍⚕️ Find Doctors
// //       </h1>

// //       {/* 🔍 Search & Filter */}
// //       <div className="flex flex-col md:flex-row gap-4 mb-6">

// //         <input
// //           type="text"
// //           placeholder="Search doctor..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
// //         />

// //         <select
// //           value={specialization}
// //           onChange={(e) => setSpecialization(e.target.value)}
// //           className="p-3 rounded-lg bg-white/10 border border-white/20"
// //         >
// //           <option value="">All Specializations</option>
// //           {specializations.map((spec, i) => (
// //             <option key={i} value={spec} className="text-black">
// //               {spec}
// //             </option>
// //           ))}
// //         </select>

// //       </div>

// //       {/* 🧾 Content */}
// //       {loading ? (
// //         <p className="text-center text-blue-400 animate-pulse">
// //           Loading doctors...
// //         </p>
// //       ) : filteredDoctors.length === 0 ? (
// //         <p className="text-center text-gray-400">
// //           No doctors found 😔
// //         </p>
// //       ) : (
// //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

// //           {filteredDoctors.map((doc) => (
// //             <div
// //               key={doc._id}
// //               className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow hover:scale-105 transition"
// //             >
// //               <h2 className="text-xl font-semibold">
// //                 {doc.name}
// //               </h2>

// //               <p className="text-blue-400 mt-1">
// //                 {doc.specialization}
// //               </p>

// //               <p className="text-gray-400 mt-2 text-sm">
// //                 {doc.hospital}, {doc.city}
// //               </p>

// //               <button className="mt-4 w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition">
// //                 Book Appointment
// //               </button>
// //             </div>
// //           ))}

// //         </div>
// //       )}

// //     </div>
// //   );
// // };

// // export default Doctor;


// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// const Doctor = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [specialization, setSpecialization] = useState("");

//   // ✅ Appointment Modal
//   const [selectedDoctor, setSelectedDoctor] = useState(null);

//   // 🔥 Fetch Doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await api.get("/doctors");

//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.doctors || [];

//         setDoctors(data);
//         setFilteredDoctors(data);

//       } catch (err) {
//         console.error("Error fetching doctors");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // 🔍 Search + Filter Logic
//   useEffect(() => {
//     let result = doctors;

//     if (search) {
//       result = result.filter((doc) =>
//         doc.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (specialization) {
//       result = result.filter(
//         (doc) => doc.specialization === specialization
//       );
//     }

//     setFilteredDoctors(result);

//   }, [search, specialization, doctors]);

//   // ✅ Unique Specializations
//   const specializations = [
//     ...new Set(doctors.map((d) => d.specialization)),
//   ];

//   return (
//     <div className="min-h-screen bg-[#020617] text-white p-6">

//       {/* 🔥 Background Glow */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
//       <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

//       {/* 🔥 Title */}
//       <div className="relative z-10 mb-10">

//         <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//           👨‍⚕️ Find Doctors
//         </h1>

//         <p className="text-gray-400 mt-2">
//           Book appointments with trusted healthcare professionals
//         </p>

//       </div>

//       {/* 🔍 Search + Filter */}
//       <div className="relative z-10 flex flex-col md:flex-row gap-4 mb-8">

//         <input
//           type="text"
//           placeholder="Search doctor..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="
//             flex-1 p-4 rounded-2xl
//             bg-white/10 backdrop-blur-xl
//             border border-white/10
//             focus:outline-none focus:ring-2 focus:ring-cyan-500
//             placeholder:text-gray-400
//           "
//         />

//         <select
//           value={specialization}
//           onChange={(e) => setSpecialization(e.target.value)}
//           className="
//             p-4 rounded-2xl
//             bg-white/10 backdrop-blur-xl
//             border border-white/10
//             focus:outline-none focus:ring-2 focus:ring-cyan-500
//           "
//         >
//           <option value="" className="text-black">
//             All Specializations
//           </option>

//           {specializations.map((spec, i) => (
//             <option key={i} value={spec} className="text-black">
//               {spec}
//             </option>
//           ))}
//         </select>

//       </div>

//       {/* 🧾 Content */}
//       {loading ? (
//         <p className="text-center text-cyan-400 animate-pulse">
//           Loading doctors...
//         </p>
//       ) : filteredDoctors.length === 0 ? (
//         <p className="text-center text-gray-400">
//           No doctors found 😔
//         </p>
//       ) : (
//         <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {filteredDoctors.map((doc) => (
//             <div
//               key={doc._id}
//               className="
//                 bg-white/10 backdrop-blur-2xl
//                 border border-white/10
//                 p-6 rounded-3xl
//                 shadow-xl
//                 hover:scale-105
//                 hover:border-cyan-400/30
//                 transition-all duration-300
//               "
//             >

//               {/* Doctor Avatar */}
//               <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold mb-4">
//                 👨‍⚕️
//               </div>

//               {/* Doctor Info */}
//               <h2 className="text-2xl font-bold">
//                 {doc.name}
//               </h2>

//               <p className="text-cyan-400 mt-1 font-medium">
//                 {doc.specialization}
//               </p>

//               <p className="text-gray-400 mt-3 text-sm">
//                 🏥 {doc.hospital}
//               </p>

//               <p className="text-gray-400 text-sm">
//                 📍 {doc.city}
//               </p>

//               {/* Button */}
//               <button
//                 onClick={() => setSelectedDoctor(doc)}
//                 className="
//                   mt-6 w-full
//                   bg-gradient-to-r from-cyan-500 to-blue-600
//                   hover:from-cyan-400 hover:to-blue-500
//                   py-3 rounded-2xl
//                   font-semibold
//                   shadow-lg shadow-cyan-500/20
//                   transition-all duration-300
//                   hover:scale-[1.02]
//                 "
//               >
//                 Book Appointment
//               </button>

//             </div>
//           ))}

//         </div>
//       )}

//       {/* ✅ Appointment Modal */}
//       {selectedDoctor && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

//           <div
//             className="
//               bg-[#0f172a]
//               border border-cyan-500/20
//               rounded-3xl
//               p-8
//               w-[90%] max-w-md
//               shadow-2xl
//             "
//           >

//             <div className="text-center">

//               <div className="text-6xl mb-4">
//                 ✅
//               </div>

//               <h2 className="text-3xl font-bold mb-3">
//                 Appointment Booked
//               </h2>

//               <p className="text-gray-400">
//                 Your appointment with
//               </p>

//               <h3 className="text-cyan-400 text-2xl font-semibold mt-3">
//                 Dr. {selectedDoctor.name}
//               </h3>

//               <p className="text-gray-500 mt-2">
//                 {selectedDoctor.specialization}
//               </p>

//               <button
//                 onClick={() => setSelectedDoctor(null)}
//                 className="
//                   mt-8 w-full
//                   bg-gradient-to-r from-cyan-500 to-blue-600
//                   hover:from-cyan-400 hover:to-blue-500
//                   py-3 rounded-2xl
//                   font-semibold
//                   transition-all duration-300
//                 "
//               >
//                 Close
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// };

// export default Doctor;


import React, { useEffect, useState } from "react";
import api from "../services/api";

const Doctor = () => {
  const role = localStorage.getItem("role");

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");

  // ================= APPOINTMENT STATES =================
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [appointmentForm, setAppointmentForm] = useState({
    patientName: "",
    phone: "",
    address: "",
    symptoms: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [message, setMessage] = useState("");

  // ================= FETCH DOCTORS =================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.doctors || [];

        setDoctors(data);
        setFilteredDoctors(data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // ================= SEARCH FILTER =================
  useEffect(() => {
    let result = doctors;

    if (search) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (specialization) {
      result = result.filter(
        (doc) => doc.specialization === specialization
      );
    }

    setFilteredDoctors(result);

  }, [search, specialization, doctors]);

  // ================= UNIQUE SPECIALIZATION =================
  const specializations = [
    ...new Set(doctors.map((d) => d.specialization)),
  ];

  // ================= OPEN MODAL =================
  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setAppointmentForm({
      ...appointmentForm,
      [e.target.name]: e.target.value,
    });
  };

  // ================= BOOK APPOINTMENT =================
  const handleBookAppointment = async (e) => {
    e.preventDefault();

    const {
      patientName,
      phone,
      address,
      symptoms,
      appointmentDate,
      appointmentTime,
    } = appointmentForm;

    if (
      !patientName ||
      !phone ||
      !address ||
      !appointmentDate ||
      !appointmentTime
    ) {
      setMessage("⚠️ Please fill all required fields");
      return;
    }

    try {
      setMessage("");

      await api.post("/appointments", {
        ...appointmentForm,
        doctorName: selectedDoctor.name,
      });

      setMessage("✅ Appointment booked successfully");

      setAppointmentForm({
        patientName: "",
        phone: "",
        address: "",
        symptoms: "",
        appointmentDate: "",
        appointmentTime: "",
      });

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
      }, 1500);

    } catch (err) {
      console.log(err);

      setMessage(
        err.response?.data?.message ||
          "❌ Failed to book appointment"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#06142E] text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            👨‍⚕️ Find Doctors
          </h1>

          <p className="text-gray-400">
            Book doctor appointments and request home visits
          </p>
        </div>

        {/* ================= SEARCH FILTER ================= */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
          />

          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="p-4 rounded-2xl bg-white/10 border border-white/20 outline-none"
          >
            <option value="" className="text-black">
              All Specializations
            </option>

            {specializations.map((spec, i) => (
              <option
                key={i}
                value={spec}
                className="text-black"
              >
                {spec}
              </option>
            ))}
          </select>

        </div>

        {/* ================= DOCTOR LIST ================= */}
        {loading ? (
          <div className="text-center text-blue-400 animate-pulse">
            Loading doctors...
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center text-gray-400">
            No doctors found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-3xl shadow-2xl hover:border-blue-500/40 transition"
              >

                <div className="mb-5">

                  <h2 className="text-2xl font-semibold mb-2">
                    {doc.name}
                  </h2>

                  <p className="text-blue-400 font-medium">
                    {doc.specialization}
                  </p>

                  <p className="text-gray-400 mt-3">
                    🏥 {doc.hospital}
                  </p>

                  <p className="text-gray-400">
                    📍 {doc.city}
                  </p>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() => openBookingModal(doc)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
                >
                  🚑 Book Home Visit
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* ================= BOOKING MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">

          <div className="bg-[#0B1F3A] border border-white/20 rounded-3xl p-8 w-full max-w-2xl">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

              <div>
                <h2 className="text-3xl font-bold">
                  🩺 Book Appointment
                </h2>

                <p className="text-gray-400 mt-1">
                  Dr. {selectedDoctor?.name}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-400 hover:text-white"
              >
                ✕
              </button>

            </div>

            {/* MESSAGE */}
            {message && (
              <div className="mb-4 bg-blue-500/20 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-xl">
                {message}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleBookAppointment}
              className="space-y-5"
            >

              {/* NAME */}
              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                value={appointmentForm.patientName}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
              />

              {/* PHONE */}
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={appointmentForm.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
              />

              {/* ADDRESS */}
              <textarea
                name="address"
                placeholder="Home Address"
                value={appointmentForm.address}
                onChange={handleChange}
                rows="3"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
              />

              {/* SYMPTOMS */}
              <textarea
                name="symptoms"
                placeholder="Symptoms"
                value={appointmentForm.symptoms}
                onChange={handleChange}
                rows="3"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
              />

              {/* DATE */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Appointment Date
                </label>

                <input
                  type="date"
                  name="appointmentDate"
                  value={appointmentForm.appointmentDate}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
                />
              </div>

              {/* TIME */}
              <div>
                <label className="block mb-2 text-gray-300">
                  Appointment Time
                </label>

                <input
                  type="time"
                  name="appointmentTime"
                  value={appointmentForm.appointmentTime}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
              >
                ✅ Confirm Appointment
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Doctor;