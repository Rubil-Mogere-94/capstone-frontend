import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// fix default icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView({ userLocation, destination, recommendations }) {
  // center map: user location if provided else first recommendation
  const center = userLocation ? [userLocation.lat, userLocation.lon]
    : (recommendations[0] ? [recommendations[0].lat, recommendations[0].lon] : [0, 0]);

  // prepare geojson route (OpenRouteService returns geojson FeatureCollection)
  const routeGeoJSON = destination && destination.routeGeoJSON ? destination.routeGeoJSON : null;

  return (
    <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lon]}>
          <Popup>You (start)</Popup>
        </Marker>
      )}

      {recommendations.map(r => (
        <Marker key={r.id} position={[r.lat, r.lon]}>
          <Popup>
            <strong>{r.name}</strong><br />
            {r.temp}°C • {r.precip}mm
          </Popup>
        </Marker>
      ))}

      {/* Draw route: supports either geojson from OpenRouteService or nested data */}
      {routeGeoJSON && routeGeoJSON.type && routeGeoJSON.type === "FeatureCollection" && (
        <GeoJSON data={routeGeoJSON} />
      )}
      {/* fallback if the backend returned a different format with coordinates */}
      {destination && destination.routeGeoJSON && destination.routeGeoJSON.coordinates && (
        <Polyline positions={destination.routeGeoJSON.coordinates.map(c => [c[1], c[0]])} />
      )}
    </MapContainer>
  );
}