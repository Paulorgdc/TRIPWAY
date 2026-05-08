import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import LogoutButton from '../components/logout-button';
import { getUser } from '../auth/auth-storage';
import videoBg from "../assets/background.mp4"; // Mesmo vídeo!
import logo from "../assets/logo.png"; // Use o seu logo aqui
import "./home.css"; // Importamos o CSS do home para usar o efeito "glass"

const API_BASE = "http://127.0.0.1:8000/api/trips/";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Pega o usuário logado (corrige o "Olá undefined")
  const currentUser = getUser() || {};
  const userName = currentUser.name || currentUser.first_name || "Viajante";

  useEffect(() => {
    fetch(API_BASE, { credentials: 'include' })
      .then(res => res.json())
      .then(data => { setTrips(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="home-container"> {/* Classe que coloca o fundo full-screen */}
      
      {/* Vídeo de fundo */}
      <video autoPlay loop muted className="home-video-bg">
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Navbar de Vidro (Igual ao Editor) */}
      <nav className="glass-nav container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100 px-lg-5">
          <h2 className="nav-logo m-0">
            <img src={logo} alt="Logo" style={{width: '35px', filter: 'brightness(0) invert(1)'}} /> 
            TripWay
          </h2>
          
          <div className="d-flex gap-4 align-items-center text-white">
            <span style={{fontWeight: 300}}>Olá, <strong>{userName}</strong></span>
            <LogoutButton className="btn btn-outline-light btn-sm" />
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal num Card de Vidro */}
      <main className="container mt-5">
        <div className="glass-card p-5">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <div>
              <h3 className="fw-bold mb-1">Meus Roteiros</h3>
              <p className="text-muted m-0 small">Suas próximas aventuras começam aqui.</p>
            </div>
            <button className="btn btn-primary px-4 py-2" style={{borderRadius: '12px'}} onClick={() => navigate('/home/new')}>
              <FaPlus className="me-2" /> Novo Roteiro
            </button>
          </div>

          {loading ? (
            <p className="text-center text-muted">Carregando viagens...</p>
          ) : trips.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-muted">Nenhuma viagem encontrada.</h5>
              <p className="text-muted small">Clique no botão acima para planejar seu próximo destino.</p>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {trips.map(trip => (
                <Link key={trip.id} to={`/home/${trip.id}`} className="list-group-item list-group-item-action bg-transparent d-flex justify-content-between align-items-center py-3">
                  <div>
                    <h5 className="mb-1 fw-bold text-dark">{trip.title}</h5>
                    <small className="text-muted">Salvo em: {new Date(trip.created_at).toLocaleDateString()}</small>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.preventDefault(); /* Lógica de delete */}}>
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