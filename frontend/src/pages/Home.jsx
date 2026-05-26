import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-950 text-white min-h-screen overflow-hidden">

      {/* 🔥 HERO SECTION */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 py-28">

        {/* Gradient Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-[120px] rounded-full top-10"></div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight z-10">
          Future of <span className="text-blue-400">Healthcare</span> is Here
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl z-10">
          Smart healthcare platform with AI assistance, doctor access,
          emergency support, and personalized wellness — all in one place.
        </p>

        <div className="flex gap-4 mt-8 z-10 flex-wrap justify-center">

          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 px-6 py-3 rounded-full text-white font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-gray-500 px-6 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Login
          </button>

        </div>
      </div>

      {/* 🔥 FLOATING CARDS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 -mt-16">

        <GlassCard title="👨‍⚕️ Doctors" desc="Find and connect with experts instantly" />
        <GlassCard title="🥗 Diet AI" desc="Personalized diet plans with smart suggestions" />
        <GlassCard title="🚑 Emergency" desc="Quick SOS & first aid guidance anytime" />

      </div>

      {/* 🔥 FEATURES SECTION */}
      <div className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <Feature title="AI Assistant" desc="Instant health guidance with smart AI." />
          <Feature title="First Aid Videos" desc="Emergency help with real tutorials." />
          <Feature title="Location Health" desc="Nearby hospitals and services." />
          <Feature title="Secure System" desc="User authentication and data safety." />
          <Feature title="Smart Dashboard" desc="Personalized health insights." />
          <Feature title="Notifications" desc="Reminders and alerts for health." />

        </div>

      </div>

      {/* 🔥 CTA SECTION */}
      <div className="text-center py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">

        <h2 className="text-3xl font-bold mb-4">
          Start Your Health Journey Today
        </h2>

        <p className="text-gray-200 mb-6">
          Join now and experience smart healthcare.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
        >
          Join Now
        </button>

      </div>

      {/* 🔥 FOOTER */}
      <div className="text-center py-6 text-gray-400 text-sm">
        © 2026 HealthCare+ | Designed with ❤️
      </div>

    </div>
  );
};



// 🔥 Glass Card
const GlassCard = ({ title, desc }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{desc}</p>
  </div>
);


// 🔥 Feature Card
const Feature = ({ title, desc }) => (
  <div className="bg-gray-900 p-6 rounded-2xl hover:bg-gray-800 transition">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
);

export default Home;