import { Navigate, useLocation } from "react-router-dom";
import { isAuthed } from "./auth-storage";

export default function RedirectIfAuthed({ children }) {
  const location = useLocation();
  
  return isAuthed()
    ? <Navigate to="/home" replace state={{ from: location }} /> 
    : children;
}