import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Páginas (Padrão: inglês e minúsculo)
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import MyTrips from "./pages/my-trips";

// Guards (Padrão: inglês e minúsculo)
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
    path: "/register", // Antigo /SingIn
    element: (
      <RedirectIfAuthed>
        <Register />
      </RedirectIfAuthed>
    ),
  },
  {
    path: "/my-trips", // Dashboard principal
    element: (
      <RequireAuth>
        <MyTrips />
      </RequireAuth>
    ),
  },
  {
    path: "/home/:tripId", // Editor de roteiro (Site.jsx)
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/my-trips" replace />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}