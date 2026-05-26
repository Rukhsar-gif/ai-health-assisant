// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import { generateAIDiet } from "../services/ai";

// const Diet = () => {
//   const [dietPlans, setDietPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔍 Filters
//   const [search, setSearch] = useState("");
//   const [filterGoal, setFilterGoal] = useState("");
//   const [filterType, setFilterType] = useState("");

//   // 🤖 AI
//   const [age, setAge] = useState("");
//   const [weight, setWeight] = useState("");
//   const [goal, setGoal] = useState("");
//   const [aiDiet, setAiDiet] = useState("");
//   const [aiLoading, setAiLoading] = useState(false);

//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");

//   // ================= FETCH =================
//   useEffect(() => {
//     const fetchDiet = async () => {
//       try {
//         const res = await api.get("/diet");
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data.diets || [];

//         setDietPlans(data);
//       } catch (err) {
//         console.error("Error fetching diet");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDiet();
//   }, []);

//   // ================= AI =================
//   const handleGenerateAI = async () => {
//     if (!age || !weight || !goal) {
//       setAiDiet("⚠️ Please fill all fields");
//       return;
//     }

//     try {
//       setAiLoading(true);
//       setAiDiet("Generating... ⏳");

//       const result = await generateAIDiet({ age, weight, goal });

//       setAiDiet(result);
//     } catch (err) {
//       setAiDiet("❌ Error generating diet");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this diet?")) return;

//     try {
//       await api.delete(`/diet/${id}`);
//       setDietPlans(dietPlans.filter((d) => d._id !== id));
//     } catch (err) {
//       console.error("Delete failed");
//     }
//   };

//   // ================= FILTER =================
//   const filteredDiets = dietPlans.filter((diet) => {
//     return (
//       diet.title.toLowerCase().includes(search.toLowerCase()) &&
//       (filterGoal === "" || diet.goal === filterGoal) &&
//       (filterType === "" || diet.type === filterType)
//     );
//   });

//   // ================= UI =================
//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <div className="max-w-6xl mx-auto">

//         {/* 🔥 HEADER */}
//         <h1 className="text-3xl font-bold mb-6">
//           🥗 Diet & Nutrition
//         </h1>

//         {/* 👑 ADMIN BUTTON */}
//         {role === "admin" && (
//           <button
//             onClick={() => navigate("/add-diet")}
//             className="mb-6 bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             ➕ Add Diet Plan
//           </button>
//         )}

//         {/* 🤖 AI GENERATOR */}
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl mb-8">

//           <h2 className="text-xl font-semibold mb-4">
//             🤖 AI Diet Generator
//           </h2>

//           <div className="grid md:grid-cols-3 gap-4">
//             <input
//               type="number"
//               placeholder="Age"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="p-3 rounded-lg bg-white/20 border border-white/30"
//             />

//             <input
//               type="number"
//               placeholder="Weight (kg)"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               className="p-3 rounded-lg bg-white/20 border border-white/30"
//             />

//             <select
//               value={goal}
//               onChange={(e) => setGoal(e.target.value)}
//               className="p-3 rounded-lg bg-white/20 border border-white/30"
//             >
//               <option value="" className="text-black">Select Goal</option>
//               <option value="weight loss" className="text-black">Weight Loss</option>
//               <option value="muscle gain" className="text-black">Muscle Gain</option>
//               <option value="maintain" className="text-black">Maintain</option>
//             </select>
//           </div>

//           <button
//             onClick={handleGenerateAI}
//             disabled={aiLoading}
//             className={`mt-4 px-5 py-2 rounded-lg ${
//               aiLoading ? "bg-gray-500" : "bg-purple-600 hover:bg-purple-700"
//             }`}
//           >
//             {aiLoading ? "Generating..." : "Generate AI Diet"}
//           </button>

//           {aiDiet && (
//             <div className="mt-4 bg-white/10 p-4 rounded whitespace-pre-line text-sm">
//               {aiDiet}
//             </div>
//           )}
//         </div>

//         {/* 🔍 FILTER */}
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl mb-6 grid md:grid-cols-3 gap-4">

//           <input
//             type="text"
//             placeholder="Search diet..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="p-3 rounded-lg bg-white/20 border border-white/30"
//           />

//           <select
//             value={filterGoal}
//             onChange={(e) => setFilterGoal(e.target.value)}
//             className="p-3 rounded-lg bg-white/20 border border-white/30"
//           >
//             <option value="" className="text-black">All Goals</option>
//             <option value="weight loss" className="text-black">Weight Loss</option>
//             <option value="muscle gain" className="text-black">Muscle Gain</option>
//             <option value="maintain" className="text-black">Maintain</option>
//           </select>

//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="p-3 rounded-lg bg-white/20 border border-white/30"
//           >
//             <option value="" className="text-black">All Types</option>
//             <option value="veg" className="text-black">Veg</option>
//             <option value="non-veg" className="text-black">Non-Veg</option>
//             <option value="vegan" className="text-black">Vegan</option>
//           </select>

//         </div>

//         {/* 📋 LIST */}
//         <h2 className="text-xl font-semibold mb-4">
//           📋 Diet Plans
//         </h2>

//         {loading ? (
//           <p className="text-blue-400 animate-pulse">Loading...</p>
//         ) : filteredDiets.length === 0 ? (
//           <p className="text-gray-400 text-center">
//             No matching diet found 😔
//           </p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {filteredDiets.map((diet) => (
//               <div
//                 key={diet._id}
//                 className="bg-white/10 border border-white/20 p-5 rounded-2xl hover:scale-105 transition"
//               >
//                 <h3 className="text-lg font-bold">{diet.title}</h3>

//                 <p className="text-gray-300 mt-2 text-sm">
//                   {diet.description}
//                 </p>

//                 <p className="text-sm text-gray-400 mt-2">
//                   🎯 {diet.goal} | 🍽 {diet.type}
//                 </p>

//                 {role === "admin" && (
//                   <div className="mt-3 flex gap-2">
//                     {/* <button
//                       onClick={() => navigate(`/edit-diet/${diet._id}`)}
//                       className="bg-blue-600 px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button> */}

//                     <button
//                       onClick={() => handleDelete(diet._id)}
//                       className="bg-red-600 px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}

//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Diet;



import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { generateAIDiet } from "../services/ai";

const Diet = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [filterGoal, setFilterGoal] = useState("");
  const [filterType, setFilterType] = useState("");

  // 🤖 AI Inputs
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [disease, setDisease] = useState("");
  const [goal, setGoal] = useState("");
  const [foodType, setFoodType] = useState("");

  const [aiDiet, setAiDiet] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // ================= FETCH =================
  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const res = await api.get("/diet");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.diets || [];

        setDietPlans(data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiet();
  }, []);

  // ================= AI GENERATE =================
  const handleGenerateAI = async () => {

    if (
      !age ||
      !weight ||
      !disease ||
      !goal ||
      !foodType
    ) {
      setAiDiet("⚠️ Please fill all fields");
      return;
    }

    try {

      setAiLoading(true);

      setAiDiet("Generating AI Diet... ⏳");

      const result = await generateAIDiet({
        age,
        weight,
        disease,
        goal,
        foodType,
      });

      setAiDiet(result);

    } catch (err) {

      console.log(err);

      setAiDiet("❌ Error generating diet");

    } finally {
      setAiLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this diet?")) return;

    try {

      await api.delete(`/diet/${id}`);

      setDietPlans(
        dietPlans.filter((diet) => diet._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER =================
  const filteredDiets = dietPlans.filter((diet) => {
    return (
      diet.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterGoal === "" || diet.goal === filterGoal) &&
      (filterType === "" || diet.type === filterType)
    );
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-8">
          🥗 Diet & Nutrition
        </h1>

        {/* ADMIN */}
        {role === "admin" && (
          <button
            onClick={() => navigate("/add-diet")}
            className="mb-8 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
          >
            ➕ Add Diet Plan
          </button>
        )}

        {/* AI DIET */}
        <div className="bg-white/10 border border-white/20 rounded-3xl p-8 mb-10 backdrop-blur-xl">

          <h2 className="text-2xl font-semibold mb-6">
            🤖 AI Personalized Diet Generator
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="p-3 rounded-xl bg-white/20 border border-white/20"
            />

            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-3 rounded-xl bg-white/20 border border-white/20"
            />

            <select
  value={disease}
  onChange={(e) => setDisease(e.target.value)}
  className="p-3 rounded-xl bg-white/20 border border-white/20 text-white"
>
  <option value="" className="text-black">
    Select Disease
  </option>

  <option value="None" className="text-black">
    None
  </option>

  <option value="Diabetes" className="text-black">
    Diabetes
  </option>

  <option value="High Blood Pressure" className="text-black">
    High Blood Pressure
  </option>

  <option value="Thyroid" className="text-black">
    Thyroid
  </option>

  <option value="Heart Disease" className="text-black">
    Heart Disease
  </option>

  <option value="PCOS" className="text-black">
    PCOS
  </option>

  <option value="Obesity" className="text-black">
    Obesity
  </option>

  <option value="Anemia" className="text-black">
    Anemia
  </option>

  <option value="Kidney Disease" className="text-black">
    Kidney Disease
  </option>

  <option value="Liver Disease" className="text-black">
    Liver Disease
  </option>

  <option value="Pregnancy" className="text-black">
    Pregnancy
  </option>

</select>

            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="p-3 rounded-xl bg-white/20 border border-white/20"
            >
              <option value="" className="text-black">
                Select Goal
              </option>

              <option value="Weight Loss" className="text-black">
                Weight Loss
              </option>

              <option value="Muscle Gain" className="text-black">
                Muscle Gain
              </option>

              <option value="Maintain Health" className="text-black">
                Maintain Health
              </option>
            </select>

            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="p-3 rounded-xl bg-white/20 border border-white/20"
            >
              <option value="" className="text-black">
                Food Preference
              </option>

              <option value="Veg" className="text-black">
                Veg
              </option>

              <option value="Non-Veg" className="text-black">
                Non-Veg
              </option>

              <option value="Vegan" className="text-black">
                Vegan
              </option>
            </select>

          </div>

          <button
            onClick={handleGenerateAI}
            disabled={aiLoading}
            className={`mt-6 px-6 py-3 rounded-xl font-semibold ${
              aiLoading
                ? "bg-gray-600"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {aiLoading
              ? "Generating..."
              : "Generate AI Diet"}
          </button>

          {aiDiet && (
            <div className="mt-6 bg-black/30 border border-white/10 rounded-2xl p-5 whitespace-pre-line">
              {aiDiet}
            </div>
          )}
        </div>

         {/* 📋 LIST */}
           <h2 className="text-xl font-semibold mb-4">
             📋 Diet Plans
            </h2>

           {loading ? (
          <p className="text-blue-400 animate-pulse">Loading...</p>
        ) : filteredDiets.length === 0 ? (
          <p className="text-gray-400 text-center">
            No matching diet found 😔
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDiets.map((diet) => (
              <div
                key={diet._id}
                className="bg-white/10 border border-white/20 p-5 rounded-2xl hover:scale-105 transition"
              >
                <h3 className="text-lg font-bold">{diet.title}</h3>

                <p className="text-gray-300 mt-2 text-sm">
                  {diet.description}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  🎯 {diet.goal} | 🍽 {diet.type}
                </p>

                {role === "admin" && (
                  <div className="mt-3 flex gap-2">
                    {/* <button
                      onClick={() => navigate(`/edit-diet/${diet._id}`)}
                      className="bg-blue-600 px-3 py-1 rounded"
                    >
                      Edit
                    </button> */}

                    <button
                      onClick={() => handleDelete(diet._id)}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Diet;