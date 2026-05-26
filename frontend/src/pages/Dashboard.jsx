import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([
    "💊 Take your medicines on time",
    "💉 Vaccination reminder available",
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* 🔥 HERO */}
      <div className="relative mb-10">

        <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[120px] rounded-full"></div>

        <h1 className="text-4xl font-bold z-10 relative">
          Welcome, {user?.name || "User"} 👋
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your health smartly with AI-powered tools
        </p>

      </div>

      {/* 🔥 QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <Card title="👨‍⚕️ Doctors" desc="Find doctors near you" onClick={() => navigate("/doctors")} />
        <Card title="🚑 First Aid" desc="Emergency help videos" onClick={() => navigate("/first-aid")} />
        <Card title="🥗 Diet Plan" desc="Personalized diet plans" onClick={() => navigate("/diet")} />
        <Card title="💬 Chat AI" desc="Ask health questions" onClick={() => navigate("/vapiWidget")} />
        <Card title="📍 Location Health" desc="Nearby hospitals" onClick={() => navigate("/location-health")} />
        <Card title="🆘 SOS" desc="Emergency help instantly" onClick={() => navigate("/sos")} />

      </div>

      {/* 🔔 NOTIFICATIONS */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow mb-10">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">🔔 Notifications</h2>

          <button
            onClick={clearNotifications}
            className="text-sm text-red-400 hover:underline"
          >
            Clear All
          </button>
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-400">No notifications</p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((note, i) => (
              <li key={i} className="bg-gray-800 p-3 rounded-lg">
                {note}
              </li>
            ))}
          </ul>
        )}

      </div>

     

    </div>
  );
};

// 🔥 Card Component
const Card = ({ title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow hover:scale-105 hover:bg-white/20 transition cursor-pointer"
  >
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-gray-300 mt-2">{desc}</p>
  </div>
);

// 🔥 Stat Component
const Stat = ({ title, value }) => (
  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow text-white">
    <h3 className="text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;





