import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ✅ States
  const [doctorCount, setDoctorCount] = useState(null);
  const [dietCount, setDietCount] = useState(null);
  const [vaccineCount, setVaccineCount] = useState(null);
  const [userCount, setUserCount] = useState(null);

  // 🔥 Fetch APIs
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.doctors || [];

      setDoctorCount(data.length);
    } catch (err) {
      console.error("Doctor API error:", err);
      setDoctorCount(0);
    }
  };

  const fetchDiet = async () => {
    try {
      const res = await api.get("/diet");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.diets || [];

      setDietCount(data.length);
    } catch (err) {
      console.error("Diet API error:", err);
      setDietCount(0);
    }
  };

  const fetchVaccines = async () => {
    try {
      const res = await api.get("/vaccines");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.vaccines || [];

      setVaccineCount(data.length);
    } catch (err) {
      console.error("Vaccine API error:", err);
      setVaccineCount(0);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.users || [];

      setUserCount(data.length);
    } catch (err) {
      console.error("User API error:", err);
      setUserCount(0);
    }
  };

  // 🔄 Load + Auto Refresh
  useEffect(() => {
    fetchDoctors();
    fetchDiet();
    fetchVaccines();
    fetchUsers();

    const interval = setInterval(() => {
      fetchDoctors();
      fetchDiet();
      fetchVaccines();
      fetchUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🎨 UI
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* 🔥 HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          👑 Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Real-time monitoring of healthcare system
        </p>
      </div>

      {/* 📊 STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <StatCard title="Doctors" value={doctorCount} icon="👨‍⚕️" />
        <StatCard title="Diet Plans" value={dietCount} icon="🥗" />
        <StatCard title="Vaccines" value={vaccineCount} icon="💉" />
        <StatCard title="Users" value={userCount} icon="👥" />

      </div>

      {/* ⚡ QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6">

        <ActionCard
          title="➕ Add Doctor"
          desc="Manage doctors"
          onClick={() => navigate("/add-doctor")}
        />

        <ActionCard
          title="🥗 Add Diet"
          desc="Create diet plans"
          onClick={() => navigate("/add-diet")}
        />

        <ActionCard
          title="💉 Add Vaccine"
          desc="Manage vaccines"
          onClick={() => navigate("/vaccination")}
        />

      </div>

    </div>
  );
};

// 🔥 STAT CARD (Glass UI)
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow hover:scale-105 transition">

    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-2xl">{icon}</span>
    </div>

    <p className="text-3xl font-bold mt-4 text-blue-400">
      {value === null ? "..." : value}
    </p>

  </div>
);

// 🔥 ACTION CARD
const ActionCard = ({ title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow hover:scale-105 hover:bg-white/20 transition cursor-pointer"
  >
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-gray-300 mt-2">{desc}</p>
  </div>
);

export default AdminDashboard;