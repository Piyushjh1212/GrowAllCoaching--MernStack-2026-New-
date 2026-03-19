import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ children }) => {

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {

    const verifyToken = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/v1/UserLoginSignup/profile",
          {
            credentials: "include" // ⭐ cookie automatically send hogi
          }
        );

        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }

      } catch (err) {
        console.error(err);
        setIsAuth(false);
      }

    };

    verifyToken();

  }, []);

  if (isAuth === null) return <p>Checking auth...</p>;

  return isAuth ? children : <Navigate to="/UserLogin" />;
};