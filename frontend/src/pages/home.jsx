// src/pages/home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearchLocation, FaListUl, FaShareAlt, FaPlus } from 'react-icons/fa';
import Navbar from '../components/navbar';
import videoBg from "../assets/background.mp4";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    // Adicionamos flex-column aqui para o footer descer
    <div className="home-container d-flex flex-column">
      <video autoPlay loop muted className="home-video-bg">
        <source src={videoBg} type="video/mp4" />
      </video>

      <Navbar />

      {/* Adicionamos flex-grow-1 para essa parte ocupar o espaço do meio */}
      <main className="container mt-5 dashboard-wrapper flex-grow-1">
        <div className="glass-card p-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark mb-3">Bem-vindo ao TripWay! 🌍</h2>
            <p className="text-muted fs-5">Planejar a viagem dos seus sonhos nunca foi tão simples. Veja como funciona:</p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="tutorial-step">
                <FaSearchLocation className="tutorial-icon" />
                <h5 className="fw-bold text-dark">1. Escolha o Destino</h5>
                <p className="text-muted small m-0">Busque no mapa interativo a cidade ou país que você deseja explorar.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="tutorial-step">
                <FaListUl className="tutorial-icon" />
                <h5 className="fw-bold text-dark">2. Monte seu Roteiro</h5>
                <p className="text-muted small m-0">Adicione hotéis, restaurantes e pontos turísticos ao seu itinerário diário.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="tutorial-step">
                <FaShareAlt className="tutorial-icon" />
                <h5 className="fw-bold text-dark">3. Salve e Aproveite</h5>
                <p className="text-muted small m-0">Suas rotas ficam salvas nas "Minhas Rotas" para você acessar de qualquer lugar.</p>
              </div>
            </div>
          </div>

          <div className="text-center border-top pt-4">
            <button className="btn-tripway mx-auto" style={{fontSize: '1.2rem', padding: '15px 40px'}} onClick={() => navigate('/editor/new')}>
              <FaPlus className="me-2" /> Começar Minha Primeira Rota
            </button>
          </div>
        </div>
      </main>

      {/* NOVO FOOTER AQUI */}
      <footer className="w-100 text-center py-3 mt-auto" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <small className="text-white fw-medium">
          &copy; 2025 TRIPWAY. Todos os direitos reservados.
        </small>
      </footer>
    </div>
  );
}