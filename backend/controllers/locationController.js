const axios = require("axios");

exports.checkLocationHealth = async (req, res) => {
  try {
    const { city, state } = req.body;

    if (!city || !state) {
      return res.status(400).json({ message: "City and State required" });
    }

    const fullAddress = `${city}, ${state}, India`;

    // 1️⃣ GEOCODING USING NOMINATIM
    const geoResponse = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: fullAddress,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "health-app",
        },
      }
    );

    if (geoResponse.data.length === 0) {
      return res.status(404).json({ message: "Location not found" });
    }

    const lat = geoResponse.data[0].lat;
    const lon = geoResponse.data[0].lon;

    // 2️⃣ FIND NEARBY HOSPITALS USING OVERPASS
    const overpassQuery = `
    [out:json];
    (
      node["amenity"="hospital"](around:1000, ${lat}, ${lon});
      way["amenity"="hospital"](around:1000, ${lat}, ${lon});
      relation["amenity"="hospital"](around:1000, ${lat}, ${lon});
    );
    out center;
    `;

    const hospitalResponse = await axios.post(
      "https://overpass-api.de/api/interpreter",
      overpassQuery,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );

    res.json({
      coordinates: { lat, lon },
      totalHospitals: hospitalResponse.data.elements.length,
      hospitals: hospitalResponse.data.elements,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};