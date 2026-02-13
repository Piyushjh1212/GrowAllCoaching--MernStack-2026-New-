import React from 'react'
import './Contact.css'

export default function Contact() {
  return (
    <section className="contact-section">

      <div className="contact-left">
        <div className="contact-container">
          <h2>Contact Form</h2>

          <form>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              required
            />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <div className="contact-right">
        <h2>
          If you've any query regarding the course content, please contact us.
        </h2>

        <div className="image-frame">
          {/* Yaha image add kar sakte ho */}
          <img src="/contact-image.jpg" alt="Contact" />
        </div>
      </div>

    </section>
  )
}