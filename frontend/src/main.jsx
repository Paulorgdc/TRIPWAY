import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './app-routes'; // Importando o cérebro das rotas
import './index.css';

// Frameworks de estilo
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);