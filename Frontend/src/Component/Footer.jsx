import React from 'react'
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="creative-footer">

      <div className="footer-content">

        <div className="footer-brand">
          <h2>Growall Coaching</h2>
          <p>Empowering students with practical skills & real-world knowledge.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Company Email: <span className='footer-span'>growallcoaching@gmail.com</span></p>
          <p>hr Email: <span className='footer-span'>hr.growallcoaching@gmail.com </span></p>
          <p>Phone: +91 70246 18290</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="instagram">
              <FaInstagram />
            </a>

            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="twitter">
              <FaTwitter />
            </a>

            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="facebook">
              <FaFacebookF />
            </a>

            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="youtube">
              <FaYoutube />
            </a>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Growall Coaching. All Rights Reserved.
      </div>

    </footer>

  )
}
