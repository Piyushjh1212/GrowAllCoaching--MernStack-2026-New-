import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const res = await fetch("http://localhost:5000/api/v1/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      console.log("Login Response:", data); // 🔍 DEBUG

      setLoading(false);

      if (res.ok) {

        // 🔑 Save token
        localStorage.setItem("token", data.token);

        console.log("Saved Token:", localStorage.getItem("token")); // 🔍 DEBUG

        navigate("/admin");

      } else {

        setError(data.error || "Invalid email or password");

      }

    } catch (err) {

      console.error(err);
      setError("Server error! Please try again later.");
      setLoading(false);

    }
  };

  return (
    <div className="login-page">
      <div className="login-page__box">

        <h2 className="login-page__title">Admin Login GAC</h2>

        {error && <div className="login-page__error">{error}</div>}

        <form className="login-page__form" onSubmit={handleLogin}>

          <div className="login-page__field">
            <input
              type="email"
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

          <button
            type="submit"
            className="login-page__button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;