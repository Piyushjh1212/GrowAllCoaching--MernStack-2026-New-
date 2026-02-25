// Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Frontend-only login: koi bhi input chalega
    localStorage.setItem("token", "TEMP_ADMIN_TOKEN");

    // Redirect to admin dashboard
    navigate("/admin");
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login (Frontend Only)</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;