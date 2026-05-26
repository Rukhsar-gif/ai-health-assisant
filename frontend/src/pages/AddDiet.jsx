import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddDiet = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    type: "",
    calories: ""
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  // ✅ Handle Input
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.goal ||
      !form.type
    ) {
      setMessage("⚠️ Please fill all required fields");
      return;
    }

    try {

      setLoading(true);

      setMessage("");

      // ✅ FIXED
      await api.post("/diet/add", form);

      setMessage("✅ Diet added successfully");

      // Reset Form
      setForm({
        title: "",
        description: "",
        goal: "",
        type: "",
        calories: ""
      });

      // Redirect
      setTimeout(() => {
        navigate("/diet");
      }, 1200);

    } catch (err) {

      console.log(err);

      setMessage(
        err.response?.data?.message ||
        "❌ Error adding diet"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 text-white">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          🥗 Add Diet Plan
        </h1>

        {/* Message */}
        {message && (
          <p className="text-center mb-4 text-sm text-yellow-300">
            {message}
          </p>
        )}

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Diet Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Breakfast, Lunch, Dinner..."
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full mb-4 p-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none"
        />

        {/* Goal */}
        <select
          name="goal"
          value={form.goal}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/20 border border-white/30"
        >
          <option value="" className="text-black">
            Select Goal
          </option>

          <option value="weight loss" className="text-black">
            Weight Loss
          </option>

          <option value="muscle gain" className="text-black">
            Muscle Gain
          </option>

          <option value="maintain" className="text-black">
            Maintain
          </option>
        </select>

        {/* Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-white/20 border border-white/30"
        >
          <option value="" className="text-black">
            Select Type
          </option>

          <option value="veg" className="text-black">
            Veg
          </option>

          <option value="non-veg" className="text-black">
            Non-Veg
          </option>

          <option value="vegan" className="text-black">
            Vegan
          </option>
        </select>

        {/* Calories */}
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={form.calories}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-xl bg-white/20 border border-white/30 focus:outline-none"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Diet Plan"}
        </button>

      </form>
    </div>
  );
};

export default AddDiet;