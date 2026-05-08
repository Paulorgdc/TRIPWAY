import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícones coloridos para os marcadores
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

function FitBounds({ geojson }) {
  const map = useMap();
  useEffect(() => {
    if (!geojson) return;
    try {
      const layer = L.geoJSON(geojson);
      const bounds = layer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    } catch (e) {
      console.warn("Erro ao ajustar zoom da rota:", e);
    }
  }, [geojson, map]);
  return null;
}

function ClickHandler({ onClickMap }) {
  useMapEvents({
    click(e) {
      if (onClickMap) onClickMap({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function Map({
  center = { lat: -15.7938, lng: -47.8827 }, // Brasília por padrão
  markers = [],
  routeGeoJSON = null,
  zoom = 13,
  onClickMap = null,
  onMarkerClick = null,
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
      <ClickHandler onClickMap={onClickMap} />

      {markers.map((m, i) => (
        <Marker 
          key={i} 
          position={[m.lat, m.lng]} 
          icon={getMarkerIcon(m.color || "blue")}
          eventHandlers={{ click: () => onMarkerClick && onMarkerClick(m) }}
        >
          <Popup>
            <strong>{m.title || "Local Selecionado"}</strong>
            {m.isPoi && <><br/><small className="text-primary">Clique para adicionar</small></>}
          </Popup>
        </Marker>
      ))}

      {routeGeoJSON && (
        <>
          <GeoJSON data={routeGeoJSON} style={{ color: "#1976d2", weight: 5 }} />
          <FitBounds geojson={routeGeoJSON} />
        </>
      )}
    </MapContainer>
  );
}