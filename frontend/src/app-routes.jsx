import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Páginas (Agora cada uma tem sua função clara)
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";       // Tela de Boas-vindas / Tutorial
import Editor from "./pages/editor";   // O Mapa / Criador de rotas
import MyTrips from "./pages/mytrips"; // Lista de rotas salvas

// Guards
import RequireAuth from "./auth/require-auth";
import RedirectIfAuthed from "./auth/redirect-if-authed";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RedirectIfAuthed>
        <Login />
      </RedirectIfAuthed>
    ),
  },
  {
    path: "/register", 
    element: (
      <RedirectIfAuthed>
        <Register />
      </RedirectIfAuthed>
    ),
  },
  {
    path: "/home", // Nova rota principal (Tutorial)
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/mytrips", // Suas viagens salvas
    element: (
      <RequireAuth>
        <MyTrips />
      </RequireAuth>
    ),
  },
  {
    path: "/editor/:tripId", // O Editor de rotas (serve tanto para "new" quanto para editar uma pronta)
    element: (
      <RequireAuth>
        <Editor />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/home" replace />, // Se o usuário digitar URL errada, joga pro Tutorial
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}