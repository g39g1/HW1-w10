import React, { useState } from "react";
import axios from "axios";

function Datas() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");  

    if (!lat || !lon) {
      setError("Please enter both latitude and longitude.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://project-w9/weather", {
        params: {
          lat: lat,
          lon: lon,
        },
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });

      console.log(response.data);

      if (response.data.success) {
        setWeatherData(response.data.data);  
      } else {
        setError(response.data.error?.message || "Failed to fetch weather data.");
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Error fetching weather data.");  
    } 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Weather Information</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="lat" className="block text-gray-700 font-medium">Latitude:</label>
            <input
              type="number"
              id="lat"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lon" className="block text-gray-700 font-medium">Longitude:</label>
            <input
              type="number"
              id="lon"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </form>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        {weatherData && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Weather Info:</h3>
            <p className="text-gray-600">Coordinates: {weatherData.coordinates.lat}, {weatherData.coordinates.lon}</p>
            <p className="text-gray-600">Temperature: {weatherData.data.tempC}°C</p>
            <p className="text-gray-600">Humidity: {weatherData.data.humidity}%</p>
            <p className="text-gray-600">Condition: {weatherData.data.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Datas;
