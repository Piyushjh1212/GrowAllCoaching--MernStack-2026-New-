import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuth(false);
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

        if (!res.ok) {
          setIsAuth(false);
          localStorage.removeItem("token");
        } else {
          setIsAuth(true);
        }

      } catch (err) {
        console.error(err);
        setIsAuth(false);
        localStorage.removeItem("token");
      }
    };

    verifyToken();
  }, [token]);

  if (isAuth === null) return <p>Checking auth...</p>;

  return isAuth ? children : <Navigate to="/UserLogin" />;
};