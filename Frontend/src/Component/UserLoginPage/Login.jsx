import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {

    const navigate = useNavigate();

    const [isLoginForm, setIsLoginForm] = useState({
        email: "",
        password: ""
    });

    const HandleChangeLogin = (e) => {
        const { name, value } = e.target;
        setIsLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/v1/UserLoginSignup/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(isLoginForm),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // ✅ Token save
            localStorage.setItem("token", data.token);

            alert("Login Successful 🔥");

            navigate("/");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="hac-login-page">
            <div className="hac-login-image">
                <img
                    src="https://res.cloudinary.com/dieboinjz/image/upload/v1772264976/modules/odoslpn3peoglrmazexd.jpg"
                    alt="Login Visual"
                />
            </div>

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