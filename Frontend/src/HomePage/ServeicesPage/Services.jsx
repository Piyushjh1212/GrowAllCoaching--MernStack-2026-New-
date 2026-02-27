import React from "react";
import "./Services.css";

export default function Services() {
  const services = [
    {
      title: "LEARNING MANAGEMENT SYSTEM",
      desc: "Build scalable full-stack applications using MongoDB, Express, React & Node.js.",
      img: "https://growallcoaching.online/Image/Lmsimage.png"
    },
    {
      title: "Business Website Package",
      desc: "Modern, responsive websites & interactive dashboards using HTML, CSS & React.",
      img: "https://growallcoaching.online/Image/businesswebite.png"
    },
    {
      title: "Mobile App Development",
      desc: "Secure REST APIs, database architecture & authentication for professional apps.",
      img: "https://growallcoaching.online/Image/mobileappdevelopment.png"
    },
    {
      title: "MERN Stack Development",
      desc: "Personalized guidance in SDE roadmap, DSA, projects & interview prep.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&h=400&w=600"
    },
      {
      title: "AI & Automation Solutions",
      desc: "Personalized guidance in SDE roadmap, DSA, projects & interview prep.",
      img: "https://growallcoaching.online/Image/920a29cc-a992-4dd1-b762-3aed1e1572c7.png"
    },
       {
      title: "Digital Marketing and Branding",
      desc: "Personalized guidance in SDE roadmap, DSA, projects & interview prep.",
      img: "https://growallcoaching.online/Image/250010f8-adb7-4740-9161-5d142678825b.png"
    },
    
  ];

  return (
    <section className="services-pro-container">
      <h1 className="services-title">Professional Services</h1>
      <p className="services-subtitle">
        High-quality services for learners, startups & tech enthusiasts.
      </p>

      <div className="services-grid">
        {services.map((service, idx) => (
          <div className="service-card" key={idx}>
            <div className="service-image">
              <img src={service.img} alt={service.title} />
            </div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <button className="service-btn">Explore Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}