import React, { useState } from "react";
import api from "../services/api";

const SOS = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    emergency: "",
    location: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  // ================= FIND HOSPITALS =================

  const openHospitals = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        window.open(
          `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`,
          "_blank"
        );
      },
      () => {
        setMessage({
          text: "❌ Could not access location.",
          type: "error",
        });
      }
    );
  };

  // ================= DETECT LOCATION =================

  const detectLocation = () => {
    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          setForm((prev) => ({
            ...prev,
            location:
              data.display_name ||
              `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          }));

        } catch (err) {
          setForm((prev) => ({
            ...prev,
            location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          }));
        }

        setLocating(false);
      },

      () => {
        setLocating(false);

        setMessage({
          text: "❌ Location permission denied.",
          type: "error",
        });
      }
    );
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SEND SOS =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Validation

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.emergency.trim()
    ) {
      setMessage({
        text: "⚠️ Please fill all required fields.",
        type: "error",
      });

      return;
    }

    // Phone validation

    if (form.phone.length < 10) {
      setMessage({
        text: "⚠️ Enter valid phone number.",
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);

      setMessage({
        text: "",
        type: "",
      });

      // ================= API CALL =================

      const res = await api.post("/sos", form);

      setMessage({
        text:
          res.data.message ||
          "✅ Emergency alert sent successfully!",
        type: "success",
      });

      // Reset form

      setForm({
        name: "",
        phone: "",
        emergency: "",
        location: "",
      });

    } catch (err) {
      console.log(err);

      setMessage({
        text:
          err.response?.data?.message ||
          "❌ Failed to send SOS alert.",
        type: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center px-4 py-10">

      {/* HEADER */}

      <h1 className="text-3xl font-bold text-red-600 mb-2">
        🚨 Emergency SOS
      </h1>

      <p className="text-gray-500 mb-6 text-center">
        Fill the form below to alert your doctor immediately.
      </p>

      {/* HOSPITAL BUTTON */}

      <button
        onClick={openHospitals}
        className="mb-8 bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition"
      >
        📍 Find Nearby Hospitals
      </button>

      {/* MESSAGE */}

      {message.text && (
        <div
          className={`w-full max-w-md p-3 rounded-xl mb-4 text-center border ${message.type === "success"
              ? "bg-green-100 border-green-300 text-green-700"
              : "bg-red-100 border-red-300 text-red-700"
            }`}
        >
          {message.text}
        </div>
      )}

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-3xl shadow-lg space-y-4"
      >

        {/* NAME */}

        <div>
          <label className="block text-sm font-semibold mb-1">
            Your Name *
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* PHONE */}

        <div>
          <label className="block text-sm font-semibold mb-1">
            WhatsApp Number *
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* EMERGENCY */}

        <div>
          <label className="block text-sm font-semibold mb-1">
            Describe Emergency *
          </label>

          <textarea
            name="emergency"
            rows="4"
            value={form.emergency}
            onChange={handleChange}
            placeholder="Chest pain, breathing issue..."
            className="w-full p-3 border rounded-xl resize-none"
          />
        </div>

        {/* LOCATION */}

        <div>
          <label className="block text-sm font-semibold mb-1">
            Location
          </label>

          <div className="flex gap-2">

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Your address"
              className="flex-1 p-3 border rounded-xl"
            />

            <button
              type="button"
              onClick={detectLocation}
              disabled={locating}
              className="px-3 rounded-xl bg-red-100"
            >
              {locating ? "⏳" : "📡"}
            </button>

          </div>
        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold ${loading
              ? "bg-red-400"
              : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {loading
            ? "Sending Alert..."
            : "🚨 Send Emergency Alert"}
        </button>

      </form>

      {/* HELPLINES */}

      <div className="mt-8 text-center text-sm text-gray-500">

        <p>🚑 Ambulance: 108</p>
        <p>👮 Police: 100</p>
        <p>🔥 Fire: 101</p>

      </div>
    </div>
  );
};

export default SOS;