import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoBg from "../assets/background.mp4"; // Seu vídeo
import logo from "../assets/logo.png"; // Use o seu logo aqui
import "./auth.css";

const API_REGISTER_URL = "http://127.0.0.1:8000/api/auth/register/";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch(API_REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        alert("Conta criada! Bem-vindo ao TripWay.");
        navigate("/"); 
      } else {
        alert("Erro ao cadastrar. Verifique os dados.");
      }
    } catch (err) {
      alert("Servidor offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <video autoPlay loop muted className="auth-video">
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="auth-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" style={{width: '40px'}} />
          <h1 className="logo-text">TripWay</h1>
        </div>
        
<h2 className="auth-subtitle">Crie sua conta grátis</h2>

        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Seu nome"
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          <input 
            type="email" 
            className="form-control" 
            placeholder="seu@email.com"
            onChange={e => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            className="form-control" 
            placeholder="Sua senha"
            onChange={e => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit" className="btn-auth mt-2" disabled={loading}>
            {loading ? "Criando..." : "Começar minha jornada"}
          </button>
        </form>

<p className="mt-4 mb-0 small text-muted text-center">
  Já faz parte? <Link to="/">Entrar</Link>
</p>
      </div>
    </div>
  );
}