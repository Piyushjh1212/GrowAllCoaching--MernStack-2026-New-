import React from 'react'
import './Homepage.css'
import { useState } from 'react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const HandleClick = () => {
        setIsOpen(!isOpen)
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
                <a href="#" className="cta-btn login">Login</a>
                <a href="#" className="cta-btn signup">Sign Up</a>
            </div>

            <div className="menu-toggle" onClick={HandleClick}>☰</div>

        </header>
    )
}
