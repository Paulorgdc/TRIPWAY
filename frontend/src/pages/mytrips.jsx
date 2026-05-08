// src/pages/mytrips.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Navbar from '../components/navbar'; // <-- ISSO AQUI RESOLVE A TELA BRANCA!
import { getUser } from '../auth/auth-storage';
import videoBg from "../assets/background.mp4";
import "./home.css";

const API_BASE = "http://127.0.0.1:8000/api/trips/";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_BASE, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTrips(data);
        else setTrips([]); 
        setLoading(false);
      })
      .catch(() => {
        setTrips([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      <video autoPlay loop muted className="home-video-bg">
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Nossa Navbar Universal! */}
      <Navbar />

      <main className="container mt-5 dashboard-wrapper">
        <div className="glass-card p-5">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <div>
              <h3 className="fw-bold mb-1 text-dark">Meus Roteiros</h3>
              <p className="text-muted m-0 small">Suas próximas aventuras começam aqui.</p>
            </div>
            <button className="btn-tripway" onClick={() => navigate('/editor/new')}>
              <FaPlus className="me-2" /> Novo Roteiro
            </button>
          </div>

          {loading ? (
            <p className="text-center text-muted py-4">Carregando viagens...</p>
          ) : trips.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-muted fw-bold">Nenhuma viagem encontrada.</h5>
              <p className="text-muted small">Clique no botão acima para planejar seu próximo destino.</p>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {trips.map(trip => (
                <Link key={trip.id} to={`/editor/${trip.id}`} className="list-group-item list-group-item-action bg-transparent d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h5 className="mb-1 fw-bold text-dark">{trip.title}</h5>
                    <small className="text-muted">Salvo em: {new Date(trip.created_at).toLocaleDateString()}</small>
                  </div>
                  <button className="btn btn-sm btn-outline-danger border-0" onClick={(e) => { e.preventDefault(); }}>
                    <FaTrash />
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}