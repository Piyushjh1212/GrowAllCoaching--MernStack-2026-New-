import React, { useEffect, useState } from 'react'
import './Contact.css'

export default function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Remove error while typing
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  useEffect(() => {
  if (serverMessage) {
    const timer = setTimeout(() => {
      setServerMessage("");
    }, 1500);

    return () => clearTimeout(timer);
  }
}, [serverMessage]);


  // Validation Function
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:5000/api/v1/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setIsSuccess(true);
      setServerMessage("Message sent successfully!");

      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setServerMessage("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">

      <div className="contact-left">
        <div className="contact-container">
          <h2>Contact Form</h2>

          <form onSubmit={handleSubmit} noValidate>

            {serverMessage && (
              <p className={isSuccess ? "success" : "error"}>
                {serverMessage}
              </p>
            )}

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <p className="error">{errors.message}</p>}

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
          <img src="/contact-image.jpg" alt="Contact" />
        </div>
      </div>

    </section>
  );
}
