import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StyleLoginPage.css";

const LoginPage = () => {

    const [attemptsLeft, setAttemptsLeft] = useState(null);
    const [retryAfter, setRetryAfter] = useState(null);

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
                credentials: "include", // this is important if you are save token in cokiees
                body: JSON.stringify(isLoginForm),
            });

            const data = await response.json();

            if (!response.ok) {
                // Agar backend remainingAttempts bhej raha hai
                if (data.remainingAttempts !== undefined && data.retryAfter !== undefined) {
                    setAttemptsLeft(data.remainingAttempts);
                    setRetryAfter(data.retryAfter);
                }
                alert(data.message || "Login failed");
                return;
            }


            setAttemptsLeft(null);
            setRetryAfter(null);

            navigate("/");
            navigate(0) // iski jagah navigate(0) the but ye better version hai

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
                    {attemptsLeft !== null && (
                        <p className="hac-login-attempts">
                            You have {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} left.
                            {retryAfter && retryAfter > 0 &&
                                ` Try again after ${Math.ceil(retryAfter / 60)} min.`}
                        </p>
                    )}
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

                    <button
                        type="submit"
                        className="hac-cta-btn hac-login-btn"
                        disabled={retryAfter > 0}>
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