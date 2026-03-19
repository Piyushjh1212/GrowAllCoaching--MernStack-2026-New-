import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 🔐 Check login using cookie
 useEffect(() => {
  let isMounted = true; // safety flag in case component unmounts

  const checkLogin = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/UserLoginSignup/profile",
        {
          credentials: "include", // cookie send karega
        }
      );

      if (!isMounted) return; // unmounted component pe state update na ho

      setIsLoggedIn(res.ok);
    } catch (error) {
      if (!isMounted) return;
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  checkLogin();

  return () => {
    isMounted = false;
  };
}, []);

  // 🚪 Logout
 const handleLogout = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/UserLoginSignup/logout",
      {
        method: "POST",
        credentials: "include" // cookie send karega
      }
    );

    if (res.ok) {
      setIsLoggedIn(false); // state update
      navigate("/");        // redirect
      // ❌ no need for localStorage.removeItem or window.location.reload
    } else {
      console.error("Logout failed");
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <header className="navbar">

      {/* LEFT : Logo */}
      <div className="nav-left">
        <img
          src="https://res.cloudinary.com/dieboinjz/image/upload/v1772387672/GacImages/cjgywtxrv1g6etyve2rl.jpg"
          alt="Nova Logo"
          className="logo"
        />

        <span className="brand">
          Grow All Coaching <br /> & IT solutions
        </span>
      </div>

      {/* CENTER : Navigation */}
      <nav className={isOpen ? "nav-center active" : "nav-center"}>
        <div className="menu-list">
          <a href="#">Company</a>
          <a href="#">Contact</a>
          <a href="#">Support</a>
          <a href="#">Practice</a>
          <a href="#">Investors</a>
        </div>
      </nav>

      {/* RIGHT : Login / Profile */}
      <div className="nav-right">

        {!isLoggedIn ? (

          <div className="cta-user-login-signup-btn">
            <Link to="/UserLogin" className="cta-btn login">Login</Link>
            <Link to="/UserSignUp" className="cta-btn signup">Sign Up</Link>
          </div>

        ) : (

          <div className="cta-user-profile-logout">

            <button
              className="user-icon"
              onClick={() => navigate("/UserProfileDashboard")}
            >
              <FaUser />
            </button>

            <button
              className="cta-btn login"
              onClick={handleLogout}
            >
              Logout
            </button>

            <div
              className="cta-menu-toggle"
              onClick={toggleMenu}
            >
              ☰
            </div>

          </div>

        )}

      </div>

    </header>
  );
}

