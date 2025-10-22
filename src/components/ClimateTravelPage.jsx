import { API_BASE_URL } from '../config';
import React, { useState } from "react";
import SearchForm from "./SearchForm";
import MapView from "./MapView";
import Header from "./Header"; // ✅ Import your Header component
import axios from "axios";

function ClimateTravelPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: -1.2921, lon: 36.8219 }); // default Nairobi

  const handleSearch = async (payload) => {
    try {
      console.log("Searching with payload:", payload);
      payload.location = userLocation;
      const res = await axios.post(`${API_BASE_URL}/api/recommend`, payload);
      console.log("Search response:", res.data);
      setRecommendations(res.data.recommendations || []);
      setExplanation(res.data.explanation || "");
    } catch (err) {
      console.error("Search failed:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      } else if (err.request) {
        console.error("Error request:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
      alert("Search failed. Check the browser console for more details.");
    }
  };

  const handleGetRoute = async (dest) => {
    try {
      const start = { lat: userLocation.lat, lon: userLocation.lon };
      const end = { lat: dest.lat, lon: dest.lon };
      console.log("Requesting route from:", start, "to:", end);
      const res = await axios.post(`${API_BASE_URL}/api/route`, { start, end });
      console.log("Route response:", res.data);
      setSelectedDestination({ ...dest, routeGeoJSON: res.data.geojson || res.data.data });
    } catch (err) {
      console.error("Routing failed:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      } else if (err.request) {
        console.error("Error request:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
      alert("Routing failed. Check backend/config and browser console.");
    }
  };

  return (
    <>
      {/* ✅ Add Header here */}
      <Header />

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", height: "100vh" }}>
        <aside style={{ padding: 16, borderRight: "1px solid #eee" }}>
          <h2>Climate Travel</h2>
          <p>Pick a month and preferred temperature range, then search.</p>
          <SearchForm onSearch={handleSearch} />

          <div style={{ marginTop: 12 }}>
            <h3>Recommendations</h3>
            {recommendations.length === 0 && <p>No recommendations yet.</p>}
            <ul>
              {recommendations.map((r) => (
                <li key={r.id} style={{ marginBottom: 8 }}>
                  <strong>{r.name}</strong><br />
                  {r.temp}°C • {r.precip}mm<br />
                  <button onClick={() => handleGetRoute(r)} style={{ marginTop: 6 }}>Show route</button>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 10, whiteSpace: "pre-line" }}>
              <strong>Explanation</strong>
              <p>{explanation}</p>
            </div>
          </div>
        </aside>

        <main>
          <MapView
            userLocation={userLocation}
            destination={selectedDestination}
            recommendations={recommendations}
          />
        </main>
      </div>
    </>
  );
}

export default ClimateTravelPage;
