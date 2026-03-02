import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const [isLoginForm, setIsLoginForm] = useState({
        email : "",
        password : ""
    })

    const HandleChangeLogin = (e) => {
        const { name, value } = e.target; // get field name and value
        setIsLoginForm((prev) => ({
            ...prev,
            [name]: value, // dynamically update the field
        }));
    };


    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Email:", isLoginForm.email);
        console.log("Password:", isLoginForm.password);
        alert("Login clicked!");
    };

    return (
        <div className="hac-login-page">
            {/* Left side image */}
            <div className="hac-login-image">
                <img
                    src="https://res.cloudinary.com/dieboinjz/image/upload/v1772264976/modules/odoslpn3peoglrmazexd.jpg"
                    alt="Login Visual"
                />
            </div>

            {/* Right side form */}
            <div className="hac-login-container">
                <form className="hac-login-form" onSubmit={handleLogin}>
                    <h2 className="hac-login-title">Login</h2>

                    <label className="hac-login-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={isLoginForm.email}
                        onChange={HandleChangeLogin}
                        required
                        className="hac-login-input"
                    />

                    <label className="hac-login-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={isLoginForm.password}
                        onChange={HandleChangeLogin}
                        required
                        className="hac-login-input"
                    />

                    <button type="submit" className="hac-cta-btn hac-login-btn">
                        Login
                    </button>

                    <p className="hac-signup-text">
                        Don't have an account?{" "}
                        <Link to="/UserSignUp" className="hac-cta-btn hac-signup-btn-small">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;