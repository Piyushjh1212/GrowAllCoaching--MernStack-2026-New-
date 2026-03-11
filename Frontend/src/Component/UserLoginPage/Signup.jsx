  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import "./StyleLoginPage.css";

  const SignupPage = () => {
    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const handleChangeSignup = (e) => {
      const { name, value } = e.target;
      setSignupForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSignup = async (e) => {
      e.preventDefault();

      if (signupForm.password !== signupForm.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/UserLoginSignup/Signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupForm),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Signup failed");
        }

        localStorage.setItem("token", data.token);


        alert("Signup Successful ✅");
        navigate("/");

      } catch (error) {
        alert(error.message);
      }
    };

    return (
      <div className="hac-login-page">
        <div className="hac-login-image">
          <img
            src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80"
            alt="Signup Visual"
          />
        </div>

        <div className="hac-login-container">
          <form className="hac-login-form" onSubmit={handleSignup}>
            <h2 className="hac-login-title">Sign Up</h2>

            <label className="hac-login-label">Name</label>
            <input
              type="text"
              name="name"
              className="hac-login-input"
              value={signupForm.name}
              onChange={handleChangeSignup}
              required
            />

            <label className="hac-login-label">Email</label>
            <input
              type="email"
              name="email"
              className="hac-login-input"
              value={signupForm.email}
              onChange={handleChangeSignup}
              required
            />

            <label className="hac-login-label">Password</label>
            <input
              type="password"
              name="password"
              className="hac-login-input"
              value={signupForm.password}
              onChange={handleChangeSignup}
              required
            />

            <label className="hac-login-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="hac-login-input"
              value={signupForm.confirmPassword}
              onChange={handleChangeSignup}
              required
            />

            <button
              type="submit"
              className="hac-cta-btn hac-login-btn"
            >
              Sign Up
            </button>

            <p className="hac-signup-text">
              Already have an account?{" "}
              <Link
                to="/UserLogin"
                className="hac-cta-btn hac-signup-btn-small"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  };

  export default SignupPage;