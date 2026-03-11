import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../Utils/parseJwt";

export const AutoLogout = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) return;

    const decoded = parseJwt(token);

    if (!decoded) return;

    const expiryTime = decoded.exp * 1000;
    const currentTime = Date.now();

    const logoutTime = expiryTime - currentTime;

    if (logoutTime <= 0) {
      localStorage.removeItem("token");
      navigate("/UserLogin");
    }

    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/UserLogin");
    }, logoutTime);

    return () => clearTimeout(timer);

  }, [navigate]);

  return null;
};