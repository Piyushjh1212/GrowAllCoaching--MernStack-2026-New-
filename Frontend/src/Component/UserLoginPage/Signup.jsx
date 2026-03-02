import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css"; // you can reuse LoginPage.css or create a separate one

const SignupPage = () => {
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

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Form Data:", signupForm);

    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Signup clicked!");
  };

  return (
    <div className="hac-login-page">
      {/* Left image */}
      <div className="hac-login-image">
        <img
          src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80"
          alt="Signup Visual"
        />
      </div>

      {/* Right form */}
      <div className="hac-login-container">
        <form className="hac-login-form" onSubmit={handleSignup}>
          <h2 className="hac-login-title">Sign Up</h2>

          <label className="hac-login-label">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={signupForm.name}
            onChange={handleChangeSignup}
            required
            className="hac-login-input"
          />

          <label className="hac-login-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupForm.email}
            onChange={handleChangeSignup}
            required
            className="hac-login-input"
          />

          <label className="hac-login-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupForm.password}
            onChange={handleChangeSignup}
            required
            className="hac-login-input"
          />

          <label className="hac-login-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={signupForm.confirmPassword}
            onChange={handleChangeSignup}
            required
            className="hac-login-input"
          />

          <button type="submit" className="hac-cta-btn hac-login-btn">
            Sign Up
          </button>

          <p className="hac-signup-text">
            Already have an account?{" "}
            <Link to="/UserLogin" className="hac-cta-btn hac-signup-btn-small">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;