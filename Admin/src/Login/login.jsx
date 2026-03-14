// Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // CSS file ka naam same rakha (capitalized)

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Frontend-only login
    localStorage.setItem("token", "TEMP_ADMIN_TOKEN");

    // Redirect to admin dashboard
    navigate("/admin");
  };

  return (
    <div className="login-page">
      <div className="login-page__box">
        <h2 className="login-page__title">Admin Login GAC</h2>
        <form className="login-page__form" onSubmit={handleLogin}>
          <div className="login-page__field">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-page__input"
              required
            />
          </div>
          <div className="login-page__field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-page__input"
              required
            />
          </div>
          <button type="submit" className="login-page__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;