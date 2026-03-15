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

  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleChangeSignup = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(getPasswordStrength(value));
      setPasswordErrors(validatePassword(value));
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("1 uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("1 lowercase letter");
    if (!/\d/.test(password)) errors.push("1 number");
    if (!/[@$!%*?&]/.test(password)) errors.push("1 special character (!@#$%^&*)");
    return errors;
  };

  const isStrongPassword = (password) => validatePassword(password).length === 0;

  const getPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 8) return "Too Short";

    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 2) return "Weak";
    if (strength === 3) return "Medium";
    return "Strong";
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.confirmPassword) {
      setPasswordErrors(["Passwords do not match"]);
      return;
    }

    if (!isStrongPassword(signupForm.password)) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/UserLoginSignup/Signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupForm),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="sp-pg-page">
      <div className="sp-pg-image">
        <img
          src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80"
          alt="Signup Visual"
        />
      </div>

      <div className="sp-pg-container">
        <form className="sp-pg-form" onSubmit={handleSignup}>
          <h2 className="sp-pg-title">Sign Up</h2>

          <label className="sp-pg-label">Name</label>
          <input
            type="text"
            name="name"
            className="sp-pg-input"
            value={signupForm.name}
            onChange={handleChangeSignup}
            required
          />

          <label className="sp-pg-label">Email</label>
          <input
            type="email"
            name="email"
            className="sp-pg-input"
            value={signupForm.email}
            onChange={handleChangeSignup}
            required
          />

          <label className="sp-pg-label">Password</label>
          <input
            type="password"
            name="password"
            className="sp-pg-input"
            value={signupForm.password}
            onChange={handleChangeSignup}
            required
          />

          {signupForm.password && (
            <>
              <p
                className={`sp-pg-password-strength ${
                  passwordStrength === "Weak"
                    ? "weak"
                    : passwordStrength === "Medium"
                    ? "medium"
                    : "strong"
                }`}
              >
                Strength: {passwordStrength}
              </p>

              {passwordErrors.length > 0 && (
                <ul className="sp-pg-password-errors">
                  {passwordErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              )}
            </>
          )}

          <label className="sp-pg-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="sp-pg-input"
            value={signupForm.confirmPassword}
            onChange={handleChangeSignup}
            required
          />

          <button type="submit" className="sp-pg-btn" disabled={passwordErrors.length > 0}>
            Sign Up
          </button>

          <p className="sp-pg-text">
            Already have an account?{" "}
            <Link to="/UserLogin" className="sp-pg-login-btn-small">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;