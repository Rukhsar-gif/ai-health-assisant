import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Psychiatrist",
  "Gynecologist",
  "ENT Specialist",
  "Ophthalmologist",
  "Dentist",
  "Other",
];

const DoctorRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    hospital: "",
    contact: "",
    city: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Handle Input ──────────────────────────────────
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage({ text: "", type: "" }); // clear message on change
  };

  // ── Submit ────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Frontend validation
    if (!form.name || !form.email || !form.password || !form.specialization) {
      return setMessage({
        text: "⚠️ Name, Email, Password and Specialization are required.",
        type: "error",
      });
    }

    if (form.password.length < 6) {
      return setMessage({
        text: "⚠️ Password must be at least 6 characters.",
        type: "error",
      });
    }

    if (form.password !== form.confirmPassword) {
      return setMessage({
        text: "⚠️ Passwords do not match.",
        type: "error",
      });
    }

    setLoading(true);

    try {
      const { confirmPassword, ...submitData } = form; // exclude confirmPassword

      const res = await api.post("/doctors/register", submitData);

      // Save token (same pattern as user login)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      setMessage({ text: res.data.message, type: "success" });

      // Redirect to doctor dashboard after short delay
      setTimeout(() => navigate("/doctor/dashboard"), 1500);

    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "❌ Registration failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg border border-blue-100 p-8">

        {/* ── Header ── */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🩺</div>
          <h1 className="text-2xl font-bold text-blue-700">Doctor Registration</h1>
          <p className="text-gray-400 text-sm mt-1">Create your doctor account</p>
        </div>

        {/* ── Alert Message ── */}
        {message.text && (
          <div
            className={`p-3 rounded-xl mb-4 text-center text-sm font-medium border ${
              message.type === "success"
                ? "bg-green-50 border-green-300 text-green-700"
                : "bg-red-50 border-red-300 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Dr. Rahul Sharma"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="doctor@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showPassword ? "🙈 Hide" : "👁 Show"}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          {/* SPECIALIZATION */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Specialization <span className="text-red-500">*</span>
            </label>
            <select
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            >
              <option value="">-- Select Specialization --</option>
              {SPECIALIZATIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* HOSPITAL + CITY (side by side) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Hospital
              </label>
              <input
                type="text"
                name="hospital"
                placeholder="e.g. AIIMS Delhi"
                value={form.hospital}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Mumbai"
                value={form.city}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              placeholder="+91 98765 43210"
              value={form.contact}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-lg font-semibold text-white transition-all shadow-md mt-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Registering...
              </span>
            ) : (
              "🩺 Register as Doctor"
            )}
          </button>

        </form>

        {/* ── Footer ── */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/doctor/login" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default DoctorRegister;
