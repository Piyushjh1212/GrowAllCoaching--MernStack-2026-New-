import React, { useState, useEffect } from 'react'
import './Homepage.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const navigate = useNavigate()

    const HandleClick = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        checkLogin();

        window.addEventListener("storage", checkLogin);

        return () => {
            window.removeEventListener("storage", checkLogin);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate("/")
    }

    return (

        <header className="navbar">
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

            <nav className={isOpen ? "nav-center active" : "nav-center"}>
                <div className='menu-list'>
                    <a href="#">Company</a>
                    <a href="#">Contact</a>
                    <a href="#">Support</a>
                    <a href="#">Investors</a>
                </div>
            </nav>

            <div className="nav-right">

                {!isLoggedIn ? (
                    <>
                        <div className='cta-user-login-signup-btn'>
                            <Link to="/UserLogin" className="cta-btn login">
                                Login
                            </Link>

                            <Link to="/UserSignUp" className="cta-btn signup">
                                Sign Up
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='cta-User-profole-login'>
                            <button className="user-icon" onClick={() => navigate("/UserProfileDashboard")}>
                                <FaUser />
                            </button>

                            <button className="cta-btn login" onClick={handleLogout}>
                                Logout
                            </button>
                            <div className="cta-menu-toggle" onClick={HandleClick}>☰</div>
                        </div>

                    </>
                )}

            </div>



        </header>
    )
}