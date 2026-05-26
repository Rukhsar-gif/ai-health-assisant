// // import React, { useEffect, useState } from "react";
// // import api from "../services/api";

// // const Vaccination = () => {
// //   const role = localStorage.getItem("role");

// //   const [vaccines, setVaccines] = useState([]);
// //   const [vaccineName, setVaccineName] = useState("");
// //   const [nextDueDate, setNextDueDate] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [message, setMessage] = useState("");

// //   // ================= FETCH VACCINES =================
// //   const fetchVaccines = async () => {
// //     try {
// //       const res = await api.get("/vaccines");

// //       const data = Array.isArray(res.data)
// //         ? res.data
// //         : res.data.vaccines || [];

// //       setVaccines(data);

// //     } catch (err) {
// //       console.log(err);

// //       setMessage(
// //         err.response?.data?.message || "❌ Failed to load vaccines"
// //       );

// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchVaccines();
// //   }, []);

// //   // ================= ADD VACCINE =================
// //   const handleAdd = async (e) => {
// //     e.preventDefault();

// //     if (!vaccineName || !nextDueDate) {
// //       setMessage("⚠️ Please fill all fields");
// //       return;
// //     }

// //     try {
// //       setMessage("");

// //       // ✅ FIXED API ROUTE
// //       await api.post("/vaccines/add", {
// //         vaccineName,
// //         nextDueDate,
// //       });

// //       setMessage("✅ Vaccine added successfully");

// //       setVaccineName("");
// //       setNextDueDate("");

// //       fetchVaccines();

// //     } catch (err) {
// //       console.log(err);

// //       setMessage(
// //         err.response?.data?.message || "❌ Error adding vaccine"
// //       );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#06142E] text-white p-6">

// //       <div className="max-w-6xl mx-auto">

// //         {/* ================= HEADER ================= */}
// //         <div className="mb-10">
// //           <h1 className="text-4xl font-bold mb-2">
// //             💉 Vaccination Management
// //           </h1>

// //           <p className="text-gray-400">
// //             Track and manage vaccination schedules easily
// //           </p>
// //         </div>

// //         {/* ================= ADMIN FORM ================= */}
// //         {role === "admin" && (
// //           <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-10">

// //             <h2 className="text-2xl font-semibold mb-6">
// //               ➕ Add New Vaccine
// //             </h2>

// //             {/* Message */}
// //             {message && (
// //               <div className="mb-4 bg-blue-500/20 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-xl">
// //                 {message}
// //               </div>
// //             )}

// //             <form onSubmit={handleAdd} className="space-y-5">

// //               {/* Vaccine Name */}
// //               <div>
// //                 <label className="block mb-2 text-sm text-gray-300">
// //                   Vaccine Name
// //                 </label>

// //                 <input
// //                   type="text"
// //                   placeholder="Enter vaccine name"
// //                   value={vaccineName}
// //                   onChange={(e) => setVaccineName(e.target.value)}
// //                   className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
// //                 />
// //               </div>

// //               {/* Date */}
// //               <div>
// //                 <label className="block mb-2 text-sm text-gray-300">
// //                   Next Due Date
// //                 </label>

// //                 <input
// //                   type="date"
// //                   value={nextDueDate}
// //                   onChange={(e) => setNextDueDate(e.target.value)}
// //                   className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
// //                 />
// //               </div>

// //               {/* Button */}
// //               <button
// //                 type="submit"
// //                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
// //               >
// //                 Add Vaccine
// //               </button>

// //             </form>
// //           </div>
// //         )}

// //         {/* ================= VACCINE LIST ================= */}
// //         <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

// //           <h2 className="text-2xl font-semibold mb-6">
// //             📋 Vaccination Records
// //           </h2>

// //           {loading ? (
// //             <div className="text-center py-10 text-blue-400 animate-pulse">
// //               Loading vaccines...
// //             </div>
// //           ) : vaccines.length === 0 ? (
// //             <div className="text-center py-10 text-gray-400">
// //               No vaccination records found
// //             </div>
// //           ) : (
// //             <div className="grid md:grid-cols-2 gap-5">

// //               {vaccines.map((v, index) => (
// //                 <div
// //                   key={index}
// //                   className="bg-[#0B1F3A] border border-white/10 rounded-2xl p-5 hover:border-blue-500/40 transition"
// //                 >

// //                   <div className="flex justify-between items-start">

// //                     <div>
// //                       <h3 className="text-xl font-semibold mb-2">
// //                         {v.vaccineName}
// //                       </h3>

// //                       <p className="text-gray-400 text-sm">
// //                         Due Date:
// //                       </p>

// //                       <p className="text-white">
// //                         {v.dueDate?.slice(0, 10)}
// //                       </p>
// //                     </div>

// //                     <span
// //                       className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                         v.status === "pending"
// //                           ? "bg-yellow-500/20 text-yellow-300"
// //                           : "bg-green-500/20 text-green-300"
// //                       }`}
// //                     >
// //                       {v.status}
// //                     </span>

// //                   </div>

// //                 </div>
// //               ))}

// //             </div>
// //           )}

// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Vaccination;



// import React, { useEffect, useState } from "react";
// import api from "../services/api";

// const Vaccination = () => {
//   const role = localStorage.getItem("role");

//   const [vaccines, setVaccines] = useState([]);
//   const [vaccineName, setVaccineName] = useState("");
//   const [nextDueDate, setNextDueDate] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   // ================= FETCH VACCINES =================
//   const fetchVaccines = async () => {
//     try {
//       const res = await api.get("/vaccines");

//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.vaccines || [];

//       // 🔥 AUTO STATUS DETECTION
//       const updatedVaccines = data.map((vaccine) => {
//         const today = new Date();

//         const dueDate = new Date(vaccine.dueDate);

//         let status = vaccine.status || "pending";

//         // 🔴 OVERDUE
//         if (
//           status !== "completed" &&
//           dueDate < today
//         ) {
//           status = "overdue";
//         }

//         return {
//           ...vaccine,
//           status,
//         };
//       });

//       setVaccines(updatedVaccines);

//     } catch (err) {
//       console.log(err);

//       setMessage(
//         err.response?.data?.message || "❌ Failed to load vaccines"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVaccines();
//   }, []);

//   // ================= ADD VACCINE =================
//   const handleAdd = async (e) => {
//     e.preventDefault();

//     if (!vaccineName || !nextDueDate) {
//       setMessage("⚠️ Please fill all fields");
//       return;
//     }

//     try {
//       setMessage("");

//       await api.post("/vaccines/add", {
//         vaccineName,
//         nextDueDate,
//       });

//       setMessage("✅ Vaccine added successfully");

//       setVaccineName("");
//       setNextDueDate("");

//       fetchVaccines();

//     } catch (err) {
//       console.log(err);

//       setMessage(
//         err.response?.data?.message || "❌ Error adding vaccine"
//       );
//     }
//   };

//   // ================= MARK AS COMPLETED =================
//   const markCompleted = async (id) => {
//     try {

//       const updated = vaccines.map((v) =>
//         v._id === id
//           ? { ...v, status: "completed" }
//           : v
//       );

//       setVaccines(updated);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= COUNTS =================
//   const completedCount = vaccines.filter(
//     (v) => v.status === "completed"
//   ).length;

//   const pendingCount = vaccines.filter(
//     (v) => v.status === "pending"
//   ).length;

//   const overdueCount = vaccines.filter(
//     (v) => v.status === "overdue"
//   ).length;

//   return (
//     <div className="min-h-screen bg-[#06142E] text-white p-6">

//       <div className="max-w-7xl mx-auto">

//         {/* ================= HEADER ================= */}
//         <div className="mb-10">
//           <h1 className="text-4xl font-bold mb-3">
//             💉 Vaccination Management
//           </h1>

//           <p className="text-gray-400">
//             Track, manage and monitor vaccination schedules smartly
//           </p>
//         </div>

//         {/* ================= STATUS CARDS ================= */}
//         <div className="grid md:grid-cols-3 gap-5 mb-10">

//           {/* Completed */}
//           <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
//             <h3 className="text-green-300 text-lg mb-2">
//               ✅ Completed
//             </h3>

//             <p className="text-4xl font-bold">
//               {completedCount}
//             </p>
//           </div>

//           {/* Pending */}
//           <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
//             <h3 className="text-yellow-300 text-lg mb-2">
//               🟡 Pending
//             </h3>

//             <p className="text-4xl font-bold">
//               {pendingCount}
//             </p>
//           </div>

//           {/* Overdue */}
//           <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
//             <h3 className="text-red-300 text-lg mb-2">
//               🔴 Overdue
//             </h3>

//             <p className="text-4xl font-bold">
//               {overdueCount}
//             </p>
//           </div>

//         </div>

//         {/* ================= ADMIN FORM ================= */}
//         {role === "admin" && (
//           <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-10">

//             <h2 className="text-2xl font-semibold mb-6">
//               ➕ Add New Vaccine
//             </h2>

//             {/* Message */}
//             {message && (
//               <div className="mb-4 bg-blue-500/20 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-xl">
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleAdd} className="space-y-5">

//               {/* Vaccine Name */}
//               <div>
//                 <label className="block mb-2 text-sm text-gray-300">
//                   Vaccine Name
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="Enter vaccine name"
//                   value={vaccineName}
//                   onChange={(e) => setVaccineName(e.target.value)}
//                   className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
//                 />
//               </div>

//               {/* Due Date */}
//               <div>
//                 <label className="block mb-2 text-sm text-gray-300">
//                   Next Due Date
//                 </label>

//                 <input
//                   type="date"
//                   value={nextDueDate}
//                   onChange={(e) => setNextDueDate(e.target.value)}
//                   className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
//                 />
//               </div>

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
//               >
//                 Add Vaccine
//               </button>

//             </form>
//           </div>
//         )}

//         {/* ================= VACCINE LIST ================= */}
//         <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

//           <h2 className="text-2xl font-semibold mb-6">
//             📋 Vaccination Records
//           </h2>

//           {loading ? (
//             <div className="text-center py-10 text-blue-400 animate-pulse">
//               Loading vaccines...
//             </div>
//           ) : vaccines.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">
//               No vaccination records found
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-5">

//               {vaccines.map((v, index) => (
//                 <div
//                   key={index}
//                   className="bg-[#0B1F3A] border border-white/10 rounded-2xl p-5 hover:border-blue-500/40 transition"
//                 >

//                   <div className="flex justify-between items-start mb-4">

//                     <div>
//                       <h3 className="text-xl font-semibold mb-2">
//                         {v.vaccineName}
//                       </h3>

//                       <p className="text-gray-400 text-sm">
//                         Due Date
//                       </p>

//                       <p className="text-white">
//                         {v.dueDate?.slice(0, 10)}
//                       </p>
//                     </div>

//                     {/* STATUS */}
//                     <span
//                       className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                         v.status === "completed"
//                           ? "bg-green-500/20 text-green-300 border border-green-500/30"
//                           : v.status === "overdue"
//                           ? "bg-red-500/20 text-red-300 border border-red-500/30"
//                           : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
//                       }`}
//                     >
//                       {v.status}
//                     </span>

//                   </div>

//                   {/* BUTTON */}
//                   {v.status !== "completed" && (
//                     <button
//                       onClick={() => markCompleted(v._id)}
//                       className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-medium transition"
//                     >
//                       Mark as Completed
//                     </button>
//                   )}

//                 </div>
//               ))}

//             </div>
//           )}

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Vaccination;



import React, { useEffect, useState } from "react";
import api from "../services/api";

const Vaccination = () => {
  const role = localStorage.getItem("role");

  const [vaccines, setVaccines] = useState([]);

  const [vaccineName, setVaccineName] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ================= FETCH VACCINES =================
  const fetchVaccines = async () => {
    try {

      const res = await api.get("/vaccines");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.vaccines || [];

      setVaccines(data);

    } catch (err) {

      console.log(err);

      setMessage(
        err.response?.data?.message ||
        "❌ Failed to load vaccines"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  // ================= ADD VACCINE =================
  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !vaccineName ||
      !nextDueDate ||
      !category
    ) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {

      setMessage("");

      await api.post("/vaccines/add", {
        vaccineName,
        nextDueDate,
        category,
      });

      setMessage("✅ Vaccine added successfully");

      setVaccineName("");
      setNextDueDate("");
      setCategory("");

      fetchVaccines();

    } catch (err) {

      console.log(err);

      setMessage(
        err.response?.data?.message ||
        "❌ Error adding vaccine"
      );
    }
  };

  // ================= STATUS LOGIC =================
  const getStatus = (dueDate, status) => {

    if (status === "completed") {
      return {
        text: "Completed",
        color:
          "bg-green-500/20 text-green-300",
      };
    }

    const today = new Date();

    const due = new Date(dueDate);

    const diff =
      (due - today) /
      (1000 * 60 * 60 * 24);

    if (diff < 0) {
      return {
        text: "Overdue",
        color:
          "bg-red-500/20 text-red-300",
      };
    }

    if (diff <= 2) {
      return {
        text: "Due Soon",
        color:
          "bg-yellow-500/20 text-yellow-300",
      };
    }

    return {
      text: "Pending",
      color:
        "bg-blue-500/20 text-blue-300",
    };
  };

  // ================= CATEGORIES =================
  const categories = [
    "Child Immunization",
    "Adolescent Vaccines",
    "Adult Vaccines",
    "Pregnancy Vaccines",
  ];

  return (
    <div className="min-h-screen bg-[#06142E] text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2">
            💉 Vaccination Management
          </h1>

          <p className="text-gray-400">
            Smart vaccination tracking and reminders
          </p>

        </div>

        {/* ================= ADMIN FORM ================= */}
        {role === "admin" && (
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-10">

            <h2 className="text-2xl font-semibold mb-6">
              ➕ Add New Vaccine
            </h2>

            {/* MESSAGE */}
            {message && (
              <div className="mb-4 bg-blue-500/20 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-xl">
                {message}
              </div>
            )}

            <form
              onSubmit={handleAdd}
              className="space-y-5"
            >

              {/* VACCINE NAME */}
              <div>

                <label className="block mb-2 text-sm text-gray-300">
                  Vaccine Name
                </label>

                <input
                  type="text"
                  placeholder="Enter vaccine name"
                  value={vaccineName}
                  onChange={(e) =>
                    setVaccineName(e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              {/* CATEGORY */}
              <div>

                <label className="block mb-2 text-sm text-gray-300">
                  Vaccine Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                >

                  <option
                    value=""
                    className="text-black"
                  >
                    Select Category
                  </option>

                  <option
                    value="Child Immunization"
                    className="text-black"
                  >
                    👶 Child Immunization
                  </option>

                  <option
                    value="Adolescent Vaccines"
                    className="text-black"
                  >
                    🧒 Adolescent Vaccines
                  </option>

                  <option
                    value="Adult Vaccines"
                    className="text-black"
                  >
                    🧑 Adult Vaccines
                  </option>

                  <option
                    value="Pregnancy Vaccines"
                    className="text-black"
                  >
                    🤰 Pregnancy Vaccines
                  </option>

                </select>

              </div>

              {/* DATE */}
              <div>

                <label className="block mb-2 text-sm text-gray-300">
                  Next Due Date
                </label>

                <input
                  type="date"
                  value={nextDueDate}
                  onChange={(e) =>
                    setNextDueDate(e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
              >
                Add Vaccine
              </button>

            </form>

          </div>
        )}

        {/* ================= VACCINE RECORDS ================= */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

          <h2 className="text-2xl font-semibold mb-8">
            📋 Vaccination Records
          </h2>

          {loading ? (
            <div className="text-center py-10 text-blue-400 animate-pulse">
              Loading vaccines...
            </div>
          ) : vaccines.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No vaccination records found
            </div>
          ) : (
            categories.map((categoryName) => {

              const categoryVaccines =
                vaccines.filter(
                  (v) =>
                    v.category === categoryName
                );

              if (
                categoryVaccines.length === 0
              )
                return null;

              return (
                <div
                  key={categoryName}
                  className="mb-12"
                >

                  {/* CATEGORY TITLE */}
                  <h3 className="text-2xl font-bold mb-5 text-blue-300">
                    {categoryName}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-5">

                    {categoryVaccines.map(
                      (v, index) => {

                        const vaccineStatus =
                          getStatus(
                            v.dueDate,
                            v.status
                          );

                        return (
                          <div
                            key={index}
                            className="bg-[#0B1F3A] border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition"
                          >

                            <div className="flex justify-between items-start">

                              <div>

                                <h3 className="text-xl font-semibold mb-2">
                                  {v.vaccineName}
                                </h3>

                                <p className="text-gray-400 text-sm">
                                  Due Date
                                </p>

                                <p className="text-white mt-1">
                                  {v.dueDate?.slice(
                                    0,
                                    10
                                  )}
                                </p>

                              </div>

                              {/* STATUS */}
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${vaccineStatus.color}`}
                              >
                                {vaccineStatus.text}
                              </span>

                            </div>

                            {/* ALERT */}
                            {vaccineStatus.text ===
                              "Due Soon" && (
                              <div className="mt-4 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-4 py-2 rounded-xl text-sm">
                                ⚠️ Reminder:
                                Vaccine due within
                                2 days
                              </div>
                            )}

                            {vaccineStatus.text ===
                              "Overdue" && (
                              <div className="mt-4 bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-xl text-sm">
                                🚨 Vaccine overdue.
                                Please take action.
                              </div>
                            )}

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

    </div>
  );
};

export default Vaccination;