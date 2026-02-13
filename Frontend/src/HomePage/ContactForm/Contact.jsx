import React from 'react'
import './Contact.css'
import { useState } from 'react'

export default function Contact() {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [Errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formdate set here
  const HandleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // error handling Works here

  const validate = () => {
    let newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    // Fake delay (simulate API call)
    setTimeout(() => {
      console.log("Form Data:", formData)

      setformData({
        name: '',
        email: '',
        message: ''
      })

      setIsSubmitting(false)
    }, 2000)
  }


  return (
    <section className="contact-section">

      <div className="contact-left">
        <div className="contact-container">
          <h2>Contact Form</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={HandleChange}

            />
            {Errors.name && <p className="error">{Errors.name}</p>}



            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={HandleChange}

            />
            {Errors.email && <p className="error">{Errors.email}</p>}


            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={HandleChange}

            />
            {Errors.message && <p className="error">{Errors.message}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

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