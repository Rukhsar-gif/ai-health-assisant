import React, { useState } from "react";
import api from "../services/api"; // axios instance

const LocationHealth = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧠 Disease Prediction Logic
  const analyzeHealth = (temp, humidity) => {
    let diseases = [];
    let risk = "Low";
    let tips = [];

    if (humidity > 70) {
      diseases.push("Dengue", "Malaria");
      risk = "High";
      tips.push("Avoid stagnant water", "Use mosquito repellent");
    }

    if (temp > 35) {
      diseases.push("Heatstroke", "Dehydration");
      risk = "High";
      tips.push("Drink plenty of water", "Avoid sun exposure");
    }

    if (temp < 15) {
      diseases.push("Cold", "Flu");
      risk = "Medium";
      tips.push("Wear warm clothes", "Avoid cold exposure");
    }

    if (humidity < 30) {
      diseases.push("Dry skin", "Respiratory issues");
      tips.push("Use moisturizer", "Stay hydrated");
    }

    return {
      diseases: diseases.length ? diseases : ["Low risk"],
      risk,
      tips: tips.length ? tips : ["Maintain hygiene", "Eat healthy"]
    };
  };

  // 🔍 Fetch from backend
  const handleSearch = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setData(null);

      const res = await api.get(`/weather/${city}`);

      console.log("Backend Weather:", res.data);

      const temp = res.data.main.temp;
      const humidity = res.data.main.humidity;
      const weather = res.data.weather[0].main;

      const health = analyzeHealth(temp, humidity);

      setData({
        city: res.data.name,
        temp,
        humidity,
        weather,
        ...health
      });

    } catch (err) {
      console.error("Error:", err);
      setData({ error: "❌ City not found or server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen relative overflow-hidden bg-black text-white">

    {/* Animated Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950"></div>

    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

    {/* Main Container */}
    <div className="relative z-10 flex items-center justify-center min-h-screen p-6">

      <div className="w-full max-w-3xl backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[35px] shadow-[0_0_50px_rgba(0,0,0,0.6)] p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg mb-4">

            <span className="text-4xl">🌍</span>

          </div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">

            Smart Location Health AI

          </h1>

          <p className="text-gray-300 mt-3 text-lg">
            Real-time climate based disease prediction system
          </p>

        </div>

        {/* Search Box */}
        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search city (e.g. Mumbai, Delhi, Indore)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 p-4 rounded-2xl outline-none text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 transition"
          />

          <button
            onClick={handleSearch}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg font-bold"
          >
            Analyze 🚀
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 text-center">

            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-cyan-300 animate-pulse">
              AI analyzing environmental health risks...
            </p>

          </div>
        )}

        {/* Error */}
        {data?.error && (
          <div className="mt-6 bg-red-500/20 border border-red-400/30 p-4 rounded-2xl text-center text-red-300">
            {data.error}
          </div>
        )}

        {/* Result */}
        {data && !data.error && (

          <div className="mt-8 space-y-6">

            {/* Weather Cards */}
            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:scale-105 transition">

                <p className="text-gray-300">🌡 Temperature</p>

                <h2 className="text-3xl font-bold mt-2">
                  {data.temp}°C
                </h2>

              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:scale-105 transition">

                <p className="text-gray-300">💧 Humidity</p>

                <h2 className="text-3xl font-bold mt-2">
                  {data.humidity}%
                </h2>

              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:scale-105 transition">

                <p className="text-gray-300">🌤 Weather</p>

                <h2 className="text-3xl font-bold mt-2">
                  {data.weather}
                </h2>

              </div>

            </div>

            {/* Risk Level */}
            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">

              <div className="flex justify-between items-center flex-wrap gap-4">

                <div>
                  <h2 className="text-2xl font-bold">
                    📍 {data.city}
                  </h2>

                  <p className="text-gray-300 mt-1">
                    AI-powered environmental health insights
                  </p>
                </div>

                <div
                  className={`px-6 py-3 rounded-full text-lg font-bold shadow-lg ${
                    data.risk === "High"
                      ? "bg-red-500/20 text-red-300 border border-red-400/30"
                      : data.risk === "Medium"
                      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                      : "bg-green-500/20 text-green-300 border border-green-400/30"
                  }`}
                >
                  {data.risk} Risk
                </div>

              </div>

            </div>

            {/* Diseases */}
            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">

              <h3 className="text-2xl font-bold mb-4 text-red-300">
                ⚠ Possible Diseases
              </h3>

              <div className="flex flex-wrap gap-3">

                {data.diseases.map((d, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-full bg-red-500/20 border border-red-400/20 text-red-200 hover:scale-105 transition"
                  >
                    {d}
                  </div>
                ))}

              </div>

            </div>

            {/* Precautions */}
            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">

              <h3 className="text-2xl font-bold mb-4 text-cyan-300">
                💡 AI Safety Recommendations
              </h3>

              <div className="space-y-3">

                {data.tips.map((t, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition"
                  >
                    {t}
                  </div>
                ))}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>
);
};

export default LocationHealth;