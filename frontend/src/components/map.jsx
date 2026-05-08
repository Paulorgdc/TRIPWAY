import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const getMarkerIcon = (color = "blue") => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center?.lat && center?.lng) {
      map.setView([center.lat, center.lng], zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function Map({
  center = { lat: -15.7938, lng: -47.8827 },
  markers = [],
  zoom = 13,
  onAddItinerary = null, // Nova função para o botão do Popup
  onHomeDragEnd = null,
  isAdjustingHome = false,
  height = "70vh",
}) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      style={{ height, width: "100%", borderRadius: "12px", zIndex: 0 }}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {markers.map((m, i) => (
        <Marker 
          key={m.id || i} 
          position={[m.lat, m.lng]} 
          icon={getMarkerIcon(m.color || "blue")}
          draggable={m.id === "home-base" && isAdjustingHome}
          eventHandlers={{ 
            dragend: (e) => {
              if (m.id === "home-base" && onHomeDragEnd) {
                const marker = e.target;
                const position = marker.getLatLng();
                onHomeDragEnd({ lat: position.lat, lng: position.lng });
              }
            }
          }}
        >
          <Popup>
            <div className="text-center">
              <strong className="d-block mb-2">{m.title}</strong>
              
              {/* Botão de Selecionar apenas para Pontos de Interesse (POIs) */}
              {m.isPoi && (
                <button 
                  className="btn btn-primary btn-sm fw-bold px-3"
                  style={{ borderRadius: '8px', fontSize: '0.75rem' }}
                  onClick={() => onAddItinerary && onAddItinerary(m)}
                >
                  Selecionar
                </button>
              )}

              {m.id === "home-base" && isAdjustingHome && (
                <p className="text-primary small m-0 mt-2">Arraste para o local correto</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}