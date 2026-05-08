// src/pages/home.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRoute, FaSave, FaArrowLeft, FaMapMarkedAlt } from "react-icons/fa";
import Map from "../components/map";
import SearchMap from "../components/search-map";
import LogoutButton from "../components/logout-button";
import videoBg from "../assets/background.mp4";
import "./home.css";

export default function Home() {
  const { tripId } = useParams();
  const [mapCenter, setMapCenter] = useState({ lat: -15.7938, lng: -47.8827 });

  return (
    <div className="home-container">
      {/* Vídeo de fundo com menos brilho para não atrapalhar o mapa */}
      <video autoPlay loop muted className="home-video-bg">
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Navbar flutuante e moderna */}
      <nav className="glass-nav container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100 px-lg-5">
          <div className="d-flex align-items-center gap-3">
            <Link to="/my-trips" className="btn-back"> <FaArrowLeft /> </Link>
            <h2 className="nav-logo m-0">TripWay <small>Editor</small></h2>
          </div>
          
          <div className="d-flex gap-3 align-items-center">
            <button className="btn-save"> <FaSave className="me-2" /> Salvar Roteiro </button>
            <LogoutButton className="btn-logout-header" />
          </div>
        </div>
      </nav>

      <main className="main-content container-fluid px-lg-5">
        <div className="row h-100">
          {/* Coluna de Controles (Esquerda) */}
          <div className="col-lg-4 py-4">
            <div className="glass-card p-4 h-100">
              <h4 className="fw-bold mb-4"> <FaMapMarkedAlt className="text-primary me-2"/> Planejamento</h4>
              
              <div className="mb-4">
                <label className="small fw-bold text-muted">BUSCAR DESTINO</label>
                <SearchMap onResult={(r) => setMapCenter({ lat: r.lat, lng: r.lng })} />
              </div>

              <div className="itinerary-section">
                <label className="small fw-bold text-muted">SEU ROTEIRO</label>
                <div className="empty-state text-center py-5">
                  <p className="text-muted">Clique no mapa ou busque um local para começar.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna do Mapa (Direita) */}
          <div className="col-lg-8 py-4">
            <div className="map-wrapper shadow-lg">
              <Map center={mapCenter} height="100%" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}