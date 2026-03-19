import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PublicRoute = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/v1/UserLoginSignup/profile",
          {
            credentials: "include" // ⭐ cookie send karega
          }
        );

        if (res.ok) {
          setIsAuth(true);
        }

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    checkAuth();

  }, []);

  if (loading) return <p>Checking...</p>;

  return isAuth ? <Navigate to="/" /> : children;
};