

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// // import dotenv from "dotenv";
// import "dotenv/config";
// import axios from "axios";
// // dotenv.config();
// import aiRoutes from "./routes/aiRoutes.js";
// import sosRoutes from "./routes/sosRoutes.js";

// // ================= IMPORT ROUTES =================
// import authRoutes from "./routes/authRoutes.js";
// import doctorRoutes from "./routes/doctorRoutes.js";
// import dietRoutes from "./routes/dietRoutes.js";
// import vaccineRoutes from "./routes/vaccineRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";

// // ================= CONFIG =================


// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());

// // ================= DATABASE =================
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB Error:", err);
//   });

// // ================= MAIN ROUTES =================
// app.use("/api/auth", authRoutes);
// app.use("/api/doctors", doctorRoutes);
// app.use("/api/diet", dietRoutes);
// app.use("/api/vaccines", vaccineRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/sos", sosRoutes);

// // =====================================================
// // 🌍 WEATHER API ROUTE (Location Health Feature)
// // =====================================================

// app.get("/api/weather/:city", async (req, res) => {
//   try {
//     const city = req.params.city;

//     const response = await axios.get(
//       "https://api.openweathermap.org/data/2.5/weather",
//       {
//         params: {
//           q: city,
//           appid: process.env.WEATHER_API_KEY,
//           units: "metric",
//         },
//       }
//     );

//     res.json(response.data);

//   } catch (error) {
//     console.log(
//       "❌ Weather API Error:",
//       error.response?.data || error.message
//     );

//     res.status(500).json({
//       message: "Failed to fetch weather data",
//     });
//   }
// });

// // ================= TEST ROUTE =================
// app.get("/", (req, res) => {
//   res.send("🚀 Public Health Backend Running");
// });

// // ================= PORT =================
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🔥 Server running on port ${PORT}`);
// });



import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import axios from "axios";

// ================= IMPORT ROUTES =================
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import vaccineRoutes from "./routes/vaccineRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import sosRoutes from "./routes/sosRoutes.js";

// ================= APP =================
const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/vaccines", vaccineRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/sos", sosRoutes);

// =====================================================
// 🌍 WEATHER API ROUTE
// =====================================================

app.get("/api/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.log(
      "❌ Weather API Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Failed to fetch weather data",
    });
  }
});

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Public Health Backend Running");
});

// ================= PORT =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});