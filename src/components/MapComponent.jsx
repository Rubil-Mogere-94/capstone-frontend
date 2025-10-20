import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getWikipediaSummary } from '../services/wikipediaService';

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

const MapComponent = ({ center, zoom, markers }) => {
  const [wikipediaData, setWikipediaData] = useState({});

  const handleWikipediaSearch = async (title, markerId) => {
    if (!wikipediaData[markerId]) {
      const summary = await getWikipediaSummary(title);
      setWikipediaData((prevData) => ({ ...prevData, [markerId]: summary }));
    }
  };

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div>
              <h3>{marker.data.name}, {marker.data.country}</h3>
              {marker.data.description && <p>{marker.data.description}</p>}
              <button onClick={() => handleWikipediaSearch(marker.data.name, index)}>
                More Info (Wikipedia)
              </button>
              {wikipediaData[index] && (
                <div>
                  <h4>{wikipediaData[index].title}</h4>
                  <p>{wikipediaData[index].extract}</p>
                  {wikipediaData[index].content_urls && (
                    <a
                      href={wikipediaData[index].content_urls.desktop.page}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more on Wikipedia
                    </a>
                  )}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
