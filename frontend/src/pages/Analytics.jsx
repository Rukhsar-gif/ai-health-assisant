import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Users,
  UserRound,
  ShieldCheck,
  Salad
} from "lucide-react";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalDietPlans: 0,
    totalUsers: 0,
    totalVaccines: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics");

        setStats(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081028] via-[#0f172a] to-[#020617] text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-3">
            📊 Admin Analytics Dashboard
          </h1>

          <p className="text-gray-400">
            Live healthcare platform statistics
          </p>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-blue-400 animate-pulse text-xl">
            Loading analytics...
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Users */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:scale-105 transition">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-400">
                      Total Users
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stats.totalUsers}
                    </h2>
                  </div>

                  <div className="bg-blue-500/20 p-4 rounded-2xl">
                    <Users size={34} className="text-blue-400" />
                  </div>

                </div>

              </div>

              {/* Doctors */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:scale-105 transition">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-400">
                      Total Doctors
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stats.totalDoctors}
                    </h2>
                  </div>

                  <div className="bg-green-500/20 p-4 rounded-2xl">
                    <UserRound size={34} className="text-green-400" />
                  </div>

                </div>

              </div>

              {/* Vaccines */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:scale-105 transition">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-400">
                      Total Vaccines
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stats.totalVaccines}
                    </h2>
                  </div>

                  <div className="bg-yellow-500/20 p-4 rounded-2xl">
                    <ShieldCheck size={34} className="text-yellow-400" />
                  </div>

                </div>

              </div>

              {/* Diet */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:scale-105 transition">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-400">
                      Diet Plans
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stats.totalDietPlans}
                    </h2>
                  </div>

                  <div className="bg-pink-500/20 p-4 rounded-2xl">
                    <Salad size={34} className="text-pink-400" />
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Section */}
            <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-lg">

              <h2 className="text-2xl font-semibold mb-4">
                🚀 Platform Insights
              </h2>

              <div className="grid md:grid-cols-2 gap-6 text-gray-300">

                <div className="bg-white/5 p-5 rounded-2xl">
                  ✅ Doctors are actively available for appointments.
                </div>

                <div className="bg-white/5 p-5 rounded-2xl">
                  🥗 Diet plans are helping users maintain healthy lifestyles.
                </div>

                <div className="bg-white/5 p-5 rounded-2xl">
                  💉 Vaccination awareness is improving public health.
                </div>

                <div className="bg-white/5 p-5 rounded-2xl">
                  🤖 AI-powered healthcare features are active.
                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Analytics;