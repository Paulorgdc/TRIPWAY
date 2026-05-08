// src/pages/login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../auth/auth-storage";
import videoBg from "../assets/background.mp4"; // Certifique-se de que o nome está certo
import logo from "../assets/logo.png"; // Use o seu logo aqui
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ATENÇÃO: A URL deve bater com o seu backend
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuth(data.user, true);
        // Redireciona para a lista de viagens
        navigate("/my-trips"); 
      } else {
        alert(data.error || "Usuário ou senha incorretos");
      }
    } catch (err) {
      alert("Não foi possível conectar ao servidor. O Django está rodando?");
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
          <img src={logo} alt="Logo" className="logo-img" />
          <h1 className="logo-text">TRIPWAY</h1>
        </div>
        
        <h2 className="auth-subtitle">Sua jornada começa aqui.</h2>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="E-mail ou usuário"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="form-control" 
            placeholder="Sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-auth mt-2" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

<p className="mt-4 mb-0 small text-muted text-center">
  Novo aqui? <Link to="/register">Criar conta</Link>
</p>
      </div>
    </div>
  );
}