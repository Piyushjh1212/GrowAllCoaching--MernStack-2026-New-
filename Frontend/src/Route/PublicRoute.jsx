import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PublicRoute = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = async () => {

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        const res = await fetch(
          "http://localhost:5000/api/v1/UserLoginSignup/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.ok) {
          setIsAuth(true);
        } else {
          localStorage.removeItem("token");
        }

      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    checkAuth();

  }, [token]);

  if (loading) return <p>Checking...</p>;

  return isAuth ? <Navigate to="/" /> : children;
};