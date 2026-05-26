import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
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
    console.error("Weather API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

export default router;