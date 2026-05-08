import { useNavigate } from "react-router-dom";
import { clearAuth } from "../auth/auth-storage";

export default function LogoutButton({ className = "btn btn-danger btn-sm" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/", { replace: true });
  };

  return (
    <button className={className} onClick={handleLogout} style={{ fontWeight: 500 }}>
      Sair
    </button>
  );
}